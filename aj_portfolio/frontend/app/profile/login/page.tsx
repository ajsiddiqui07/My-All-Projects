"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";
import { getAccessToken, login } from "@/lib/api";

export default function ProfileLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to profile dashboard
    const token = getAccessToken();
    if (token) {
      router.push("/profile");
    }
  }, [router]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        router.push("/profile");
      } else {
        setError(result.error || "Login failed. Please check credentials.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#0a0d0a] text-[#f0f3ef] font-sans antialiased relative selection:bg-[#4be45c] selection:text-[#080a08]">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-[#4be45c]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#121612]/90 border border-[#232a23] backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative z-10">
        {/* Top return link */}
        <div className="flex items-center justify-between mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#9da39d] hover:text-[#4be45c] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </a>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1c241c] border border-[#2b382b] text-[11px] text-[#a4f5a8]">
            <ShieldCheck size={12} className="text-[#4be45c]" />
            <span>Admin Gateway</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1b261b] to-[#121a12] border border-[#344634] flex items-center justify-center mx-auto mb-4 text-[#4be45c] shadow-lg shadow-[#4be45c]/5">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
            Profile Management
          </h1>
          <p className="text-xs text-[#9da39d] max-w-xs mx-auto">
            Authorized administrator access only. Sign in with your credentials to manage portfolio content.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9da39d] mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e776e]">
                <User size={16} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-[#171d17] border border-[#283228] rounded-xl text-sm text-white placeholder-[#525a52] focus:outline-none focus:border-[#4be45c] focus:ring-1 focus:ring-[#4be45c] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9da39d] mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e776e]">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-11 py-2.5 bg-[#171d17] border border-[#283228] rounded-xl text-sm text-white placeholder-[#525a52] focus:outline-none focus:border-[#4be45c] focus:ring-1 focus:ring-[#4be45c] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6e776e] hover:text-[#f0f3ef] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#4be45c] hover:bg-[#3dd14e] text-[#071007] font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#4be45c]/20 hover:shadow-[#4be45c]/30 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#071007] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#1e251e] text-center">
          <p className="text-[11px] text-[#6d756d]">
            Protected by Django REST Framework &amp; SimpleJWT.
          </p>
        </div>
      </div>
    </div>
  );
}
