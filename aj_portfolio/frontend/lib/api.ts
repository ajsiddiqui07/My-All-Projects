export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const ACCESS_TOKEN_KEY = "portfolio_admin_access_token";
const REFRESH_TOKEN_KEY = "portfolio_admin_refresh_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(access: string, refresh?: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  if (refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function login(username: string, password: string):Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        error:
          errData.detail ||
          errData.error ||
          "Invalid username or password. Please try again.",
      };
    }

    const data = await response.json();
    setTokens(data.access, data.refresh);

    // Verify user is administrator/staff
    const meRes = await fetch(`${API_BASE_URL}/api/auth/me/`, {
      headers: { Authorization: `Bearer ${data.access}` },
    });

    if (!meRes.ok) {
      clearTokens();
      return {
        success: false,
        error: "Access denied. Only authorized administrators can access this area.",
      };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: "Unable to connect to the backend server. Please make sure Django is running.",
    };
  }
}

export function logout() {
  clearTokens();
  if (typeof window !== "undefined") {
    window.location.href = "/profile/login";
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
      clearTokens();
      return null;
    }

    const data = await response.json();
    if (data.access) {
      setTokens(data.access, data.refresh);
      return data.access;
    }
    return null;
  } catch {
    clearTokens();
    return null;
  }
}

export async function authFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  let token = getAccessToken();

  if (!token) {
    logout();
    throw new Error("No authentication token found");
  }

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);

  let response = await fetch(url, {
    ...options,
    headers,
  });

  // If token expired, try refreshing
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers.set("Authorization", `Bearer ${newToken}`);
      response = await fetch(url, {
        ...options,
        headers,
      });
    } else {
      logout();
      throw new Error("Session expired. Please log in again.");
    }
  }

  return response;
}
