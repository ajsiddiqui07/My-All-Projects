"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Award,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Code2,
  Edit3,
  ExternalLink,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Share2,
  Star,
  Trash2,
  Upload,
  User,
  Wrench,
  X,
} from "lucide-react";
import {
  API_BASE_URL,
  authFetch,
  clearTokens,
  getAccessToken,
  logout,
} from "@/lib/api";
import {
  Certification,
  DashboardOverview,
  Education,
  Experience,
  Profile,
  Project,
  Service,
  Skill,
  SkillCategory,
  SocialLink,
  Testimonial,
} from "@/lib/types";

type TabKey =
  | "overview"
  | "personal"
  | "projects"
  | "skills"
  | "services"
  | "experience"
  | "education"
  | "certifications"
  | "testimonials"
  | "contact"
  | "seo";

export default function ProfileDashboard() {
  const router = useRouter();

  // Navigation state
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication state
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Data states
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Modal / Form states
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalItem, setModalItem] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }

  // 1. Initial Authentication and Data Fetching
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/profile/login");
      return;
    }

    async function checkAuthAndLoad() {
      try {
        const res = await authFetch("/api/auth/me/");
        if (!res.ok) {
          logout();
          return;
        }
        const userData = await res.json();
        setCurrentUser(userData);
        await loadAllData();
      } catch {
        logout();
      } finally {
        setAuthChecking(false);
      }
    }

    checkAuthAndLoad();
  }, [router]);

  async function loadAllData() {
    setLoading(true);
    try {
      const [
        resOverview,
        resProfile,
        resProjects,
        resCategories,
        resSkills,
        resServices,
        resExp,
        resEdu,
        resCert,
        resTestimonials,
        resSocial,
      ] = await Promise.all([
        authFetch("/api/overview/"),
        authFetch("/api/profile-data/"),
        authFetch("/api/projects/"),
        authFetch("/api/skill-categories/"),
        authFetch("/api/skills/"),
        authFetch("/api/services/"),
        authFetch("/api/experiences/"),
        authFetch("/api/education/"),
        authFetch("/api/certifications/"),
        authFetch("/api/testimonials/"),
        authFetch("/api/social-links/"),
      ]);

      if (resOverview.ok) setOverview(await resOverview.json());
      if (resProfile.ok) setProfile(await resProfile.json());
      if (resProjects.ok) setProjects(await resProjects.json());
      if (resCategories.ok) setCategories(await resCategories.json());
      if (resSkills.ok) setSkills(await resSkills.json());
      if (resServices.ok) setServices(await resServices.json());
      if (resExp.ok) setExperiences(await resExp.json());
      if (resEdu.ok) setEducations(await resEdu.json());
      if (resCert.ok) setCertifications(await resCert.json());
      if (resTestimonials.ok) setTestimonials(await resTestimonials.json());
      if (resSocial.ok) setSocialLinks(await resSocial.json());
    } catch (err: any) {
      showToast("Error loading portfolio data: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  // Handle Profile Update (Personal info, SEO, About, Contact)
  async function handleProfileSave(e: FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, val]) => {
        if (key === "profile_picture" || key === "resume_file") return;
        if (val !== null && val !== undefined) {
          formData.append(key, String(val));
        }
      });

      if (selectedFile) {
        if (activeTab === "personal") {
          formData.append("profile_picture", selectedFile);
        } else if (activeTab === "seo") {
          formData.append("resume_file", selectedFile);
        }
      }

      const res = await authFetch(`/api/profile-data/${profile.id}/`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        setSelectedFile(null);
        setImagePreview(null);
        showToast("Profile information updated successfully!");
        // Refresh overview
        const ovRes = await authFetch("/api/overview/");
        if (ovRes.ok) setOverview(await ovRes.json());
      } else {
        showToast("Failed to update profile.", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  }

  // Handle File Selection with Preview
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    }
  }

  // Open Modal for Add/Edit
  function openModal(type: string, item: any = null) {
    setModalType(type);
    setModalItem(item ? { ...item } : {});
    setImagePreview(item?.image_url || item?.icon_url || null);
    setSelectedFile(null);
  }

  function closeModal() {
    setModalType(null);
    setModalItem(null);
    setImagePreview(null);
    setSelectedFile(null);
  }

  // Generic Save for Items (Project, Skill, Service, etc.)
  async function handleItemSave(e: FormEvent) {
    e.preventDefault();
    if (!modalType || !modalItem) return;
    setLoading(true);

    const isEdit = !!modalItem.id;
    let endpoint = "";
    let isMultipart = false;

    switch (modalType) {
      case "project":
        endpoint = isEdit ? `/api/projects/${modalItem.id}/` : "/api/projects/";
        isMultipart = true;
        break;
      case "category":
        endpoint = isEdit
          ? `/api/skill-categories/${modalItem.id}/`
          : "/api/skill-categories/";
        break;
      case "skill":
        endpoint = isEdit ? `/api/skills/${modalItem.id}/` : "/api/skills/";
        isMultipart = true;
        break;
      case "service":
        endpoint = isEdit ? `/api/services/${modalItem.id}/` : "/api/services/";
        break;
      case "testimonial":
        endpoint = isEdit
          ? `/api/testimonials/${modalItem.id}/`
          : "/api/testimonials/";
        isMultipart = true;
        break;
      case "social":
        endpoint = isEdit
          ? `/api/social-links/${modalItem.id}/`
          : "/api/social-links/";
        break;
      case "experience":
        endpoint = isEdit
          ? `/api/experiences/${modalItem.id}/`
          : "/api/experiences/";
        break;
      case "education":
        endpoint = isEdit ? `/api/education/${modalItem.id}/` : "/api/education/";
        break;
      case "certification":
        endpoint = isEdit
          ? `/api/certifications/${modalItem.id}/`
          : "/api/certifications/";
        break;
    }

    try {
      let body: any;
      let headers: Record<string, string> = {};

      if (isMultipart) {
        const fd = new FormData();
        Object.entries(modalItem).forEach(([k, v]) => {
          if (["image", "icon_image", "image_url", "icon_url"].includes(k)) return;
          if (v !== null && v !== undefined) {
            fd.append(k, String(v));
          }
        });
        if (selectedFile) {
          if (modalType === "project" || modalType === "testimonial") {
            fd.append("image", selectedFile);
          } else if (modalType === "skill") {
            fd.append("icon_image", selectedFile);
          }
        }
        body = fd;
      } else {
        headers["Content-Type"] = "application/json";
        // Handle service items array conversion
        if (modalType === "service" && typeof modalItem.items === "string") {
          modalItem.items = modalItem.items
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean);
        }
        body = JSON.stringify(modalItem);
      }

      const res = await authFetch(endpoint, {
        method: isEdit ? "PATCH" : "POST",
        headers,
        body,
      });

      if (res.ok) {
        showToast(
          `${modalType.charAt(0).toUpperCase() + modalType.slice(1)} ${isEdit ? "updated" : "created"} successfully!`
        );
        closeModal();
        await loadAllData();
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(
          err.detail || err.error || "Failed to save. Please verify input.",
          "error"
        );
      }
    } catch (err: any) {
      showToast(err.message || "An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  }

  // Generic Delete
  async function handleDelete(endpoint: string, itemName: string) {
    if (!confirm(`Are you sure you want to delete "${itemName}"? This cannot be undone.`)) {
      return;
    }
    setLoading(true);
    try {
      const res = await authFetch(endpoint, { method: "DELETE" });
      if (res.ok || res.status === 204) {
        showToast(`"${itemName}" deleted successfully.`);
        await loadAllData();
      } else {
        showToast(`Failed to delete "${itemName}".`, "error");
      }
    } catch (err: any) {
      showToast(err.message || "Error deleting item.", "error");
    } finally {
      setLoading(false);
    }
  }

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#090c09] text-white flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-3 border-[#4be45c] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#9da39d]">Verifying admin credentials...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090c09] text-[#e7ebe6] flex flex-col antialiased selection:bg-[#4be45c] selection:text-[#080a08]">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium animate-in slide-in-from-bottom-4 ${
            toast.type === "success"
              ? "bg-[#142315] border-[#294c2c] text-[#a4f5a8]"
              : "bg-[#2d1111] border-[#572020] text-red-300"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} className="text-[#4be45c]" />
          ) : (
            <AlertCircle size={18} className="text-red-400" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-white/50 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-16 border-b border-[#1b221b] bg-[#0d110d]/90 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#9da39d] hover:text-white hover:bg-[#1a211a]"
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4be45c] shadow-[0_0_8px_#4be45c]" />
            <h1 className="font-bold text-base md:text-lg tracking-tight text-white flex items-center gap-1.5">
              Portfolio Studio <span className="text-xs px-2 py-0.5 rounded-full bg-[#1b261b] text-[#4be45c] border border-[#2b3d2b] font-mono">v2.0</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141b14] border border-[#263326] text-xs font-medium text-[#c4ccc3] hover:text-[#4be45c] hover:border-[#4be45c]/40 transition-colors"
          >
            <ExternalLink size={13} />
            <span>View Public Site</span>
          </a>

          <div className="flex items-center gap-2 pl-3 border-l border-[#1b221b]">
            <div className="w-8 h-8 rounded-full bg-[#1b241b] border border-[#2a382a] flex items-center justify-center text-xs font-bold text-[#4be45c]">
              {currentUser?.username?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-white leading-none">
                {currentUser?.username || "Admin"}
              </p>
              <p className="text-[10px] text-[#7d877d] leading-none mt-1">
                Administrator
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-lg text-[#9da39d] hover:text-red-400 hover:bg-red-950/20 transition-colors"
            title="Log out"
          >
            <LogOut size={17} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-16 md:inset-y-0 left-0 z-40 w-64 bg-[#0d120d] border-r border-[#1a211a] flex flex-col justify-between transition-transform duration-200 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#636c63] px-3 py-2">
              Dashboard Navigation
            </div>

            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "personal", label: "Personal Information", icon: User },
              { id: "projects", label: "Projects", icon: Briefcase, count: projects.length },
              { id: "skills", label: "Skills & Toolkit", icon: Code2, count: skills.length },
              { id: "services", label: "Services", icon: Wrench, count: services.length },
              { id: "experience", label: "Experience", icon: Layers, count: experiences.length },
              { id: "education", label: "Education", icon: GraduationCap, count: educations.length },
              { id: "certifications", label: "Certifications", icon: Award, count: certifications.length },
              { id: "testimonials", label: "Testimonials", icon: Star, count: testimonials.length },
              { id: "contact", label: "Contact & Social", icon: Share2 },
              { id: "seo", label: "Resume & SEO", icon: FileText },
            ].map(({ id, label, icon: Icon, count }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id as TabKey);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#182318] text-[#4be45c] shadow-sm border border-[#2b422c]"
                      : "text-[#9da39d] hover:bg-[#131813] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      size={16}
                      className={isActive ? "text-[#4be45c]" : "text-[#717a71]"}
                    />
                    <span>{label}</span>
                  </div>
                  {count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive
                          ? "bg-[#253926] text-[#a4f5a8]"
                          : "bg-[#182018] text-[#6d776d]"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-[#1a211a] bg-[#0b0f0b]">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#141d14] border border-[#243324] text-xs font-medium text-[#c0c7bf] hover:text-[#4be45c] hover:border-[#4be45c]/30 transition-all"
            >
              <ExternalLink size={13} />
              <span>Preview Live Site</span>
            </a>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          />
        )}

        {/* Main Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#080b08]">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Header for current tab */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#1b221b]">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white capitalize">
                  {activeTab === "seo" ? "Resume & SEO Configuration" : activeTab}
                </h2>
                <p className="text-xs text-[#8c948b] mt-1">
                  Manage and update content rendered on your live portfolio.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadAllData}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-lg bg-[#121712] border border-[#243024] text-xs text-[#a2aba1] hover:text-white flex items-center gap-1.5 transition-colors"
                  title="Reload data"
                >
                  <RefreshCw
                    size={13}
                    className={loading ? "animate-spin text-[#4be45c]" : ""}
                  />
                  <span>Sync</span>
                </button>
              </div>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Hero Summary Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121a12] via-[#0f140f] to-[#0a0d0a] border border-[#233123] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#4be45c] px-2 py-0.5 rounded-md bg-[#182918] border border-[#284628]">
                      Active Portfolio Profile
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">
                      {profile?.full_name || "Arbaz Siddiqui"}
                    </h3>
                    <p className="text-sm text-[#9da39d]">
                      {profile?.professional_title || "Creative Designer & Web Developer"} • {profile?.location || "Surat"}
                    </p>
                    <p className="text-xs text-[#6e776e] mt-2">
                      Brand display: <span className="text-white font-medium">{profile?.brand_name || "Bianca"}</span> | Last updated: {overview?.last_updated ? new Date(overview.last_updated).toLocaleString() : "Recently"}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("personal")}
                    className="px-4 py-2.5 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs transition-all shadow-md flex items-center gap-2"
                  >
                    <Edit3 size={14} /> Edit Personal Info
                  </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { label: "Projects", val: projects.length, tab: "projects" },
                    { label: "Skills", val: skills.length, tab: "skills" },
                    { label: "Categories", val: categories.length, tab: "skills" },
                    { label: "Services", val: services.length, tab: "services" },
                    { label: "Testimonials", val: testimonials.length, tab: "testimonials" },
                    { label: "Inquiries", val: overview?.messages_count || 0, tab: "contact" },
                  ].map((m) => (
                    <button
                      key={m.label}
                      onClick={() => setActiveTab(m.tab as TabKey)}
                      className="p-4 rounded-xl bg-[#101510] border border-[#1e271e] hover:border-[#4be45c]/40 text-left transition-all group"
                    >
                      <p className="text-xs text-[#879087] group-hover:text-[#4be45c] transition-colors">{m.label}</p>
                      <p className="text-2xl font-bold text-white mt-1 font-mono">{m.val}</p>
                    </button>
                  ))}
                </div>

                {/* Quick Management Shortcuts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Briefcase size={16} className="text-[#4be45c]" />
                      Featured Projects ({projects.length})
                    </h4>
                    <p className="text-xs text-[#8c948b]">
                      Update projects rendered in the public portfolio grid. Supports live URLs and custom cover previews.
                    </p>
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => openModal("project")}
                        className="px-3 py-1.5 rounded-lg bg-[#182318] border border-[#2b3d2b] text-xs text-[#a4f5a8] hover:bg-[#203120] flex items-center gap-1.5"
                      >
                        <Plus size={13} /> Add Project
                      </button>
                      <button
                        onClick={() => setActiveTab("projects")}
                        className="px-3 py-1.5 rounded-lg bg-[#141814] text-xs text-[#9da39d] hover:text-white"
                      >
                        Manage All
                      </button>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Code2 size={16} className="text-[#4be45c]" />
                      Toolkit &amp; Skill Groups ({skills.length} skills in {categories.length} groups)
                    </h4>
                    <p className="text-xs text-[#8c948b]">
                      Manage frontend, backend, design technologies, icon badges, and display orders.
                    </p>
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => openModal("skill")}
                        className="px-3 py-1.5 rounded-lg bg-[#182318] border border-[#2b3d2b] text-xs text-[#a4f5a8] hover:bg-[#203120] flex items-center gap-1.5"
                      >
                        <Plus size={13} /> Add Skill
                      </button>
                      <button
                        onClick={() => setActiveTab("skills")}
                        className="px-3 py-1.5 rounded-lg bg-[#141814] text-xs text-[#9da39d] hover:text-white"
                      >
                        Manage All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PERSONAL INFORMATION & ABOUT ME */}
            {activeTab === "personal" && profile && (
              <form onSubmit={handleProfileSave} className="space-y-6">
                <div className="p-6 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-5">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-[#1b221b] pb-3">
                    <User size={16} className="text-[#4be45c]" />
                    Basic Profile &amp; Hero Section
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profile.full_name || ""}
                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Brand Name (Navbar/Footer)</label>
                      <input
                        type="text"
                        value={profile.brand_name || ""}
                        onChange={(e) => setProfile({ ...profile, brand_name: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={profile.professional_title || ""}
                        onChange={(e) => setProfile({ ...profile, professional_title: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Location</label>
                      <input
                        type="text"
                        value={profile.location || ""}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>

                  {/* Hero Headings */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Hero Eyebrow Text</label>
                      <input
                        type="text"
                        value={profile.hero_eyebrow || ""}
                        onChange={(e) => setProfile({ ...profile, hero_eyebrow: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Hero Heading Line 1</label>
                      <input
                        type="text"
                        value={profile.hero_heading_line1 || ""}
                        onChange={(e) => setProfile({ ...profile, hero_heading_line1: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Hero Heading Line 2 (Highlighted)</label>
                      <input
                        type="text"
                        value={profile.hero_heading_line2 || ""}
                        onChange={(e) => setProfile({ ...profile, hero_heading_line2: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Hero Description</label>
                      <input
                        type="text"
                        value={profile.hero_description || ""}
                        onChange={(e) => setProfile({ ...profile, hero_description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>

                  {/* Profile Picture Upload with Preview */}
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-[#9da39d] mb-2">
                      Profile Picture (Hero Portrait)
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-[#141a14] border border-[#232f23]">
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#1d261d] border border-[#2b3a2b] flex-shrink-0 flex items-center justify-center relative">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : profile.profile_picture_url ? (
                          <img
                            src={profile.profile_picture_url}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src="/assets/img/home-img.png"
                            alt="Current"
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                      <div className="space-y-2 flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          id="profile_picture_input"
                          className="hidden"
                        />
                        <label
                          htmlFor="profile_picture_input"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1e291e] hover:bg-[#273627] border border-[#334733] text-xs font-semibold text-white cursor-pointer transition-colors"
                        >
                          <Upload size={14} /> Upload New Picture
                        </label>
                        <p className="text-[11px] text-[#717b71]">
                          Upload a PNG, JPG, or WEBP portrait. Transparent background recommended for seamless integration with the hero background glow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Me Section Form */}
                <div className="p-6 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-[#1b221b] pb-3">
                    <FileText size={16} className="text-[#4be45c]" />
                    About Me Section
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Section Index Title</label>
                      <input
                        type="text"
                        value={profile.about_section_index || ""}
                        onChange={(e) => setProfile({ ...profile, about_section_index: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Call to Action Button Label</label>
                      <input
                        type="text"
                        value={profile.about_cta_text || ""}
                        onChange={(e) => setProfile({ ...profile, about_cta_text: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">About Me Main Description</label>
                    <textarea
                      rows={5}
                      value={profile.about_description || ""}
                      onChange={(e) => setProfile({ ...profile, about_description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">About Me Subtext / Collaboration Note</label>
                    <textarea
                      rows={2}
                      value={profile.about_note || ""}
                      onChange={(e) => setProfile({ ...profile, about_note: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                </div>

                {/* Save button bar */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs flex items-center gap-2 shadow-lg shadow-[#4be45c]/20 disabled:opacity-50"
                  >
                    <Save size={15} /> Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: PROJECTS */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#8c948b]">
                    Showing {projects.length} portfolio projects. Drag or adjust display orders.
                  </p>
                  <button
                    onClick={() => openModal("project")}
                    className="px-3.5 py-2 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Plus size={15} /> Add New Project
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-2xl bg-[#101410] border border-[#1d251d] hover:border-[#2d3a2d] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#171e17] border border-[#263326] relative mb-3">
                          {proj.image_url ? (
                            <img
                              src={proj.image_url}
                              alt={proj.title}
                              className="w-full h-full object-cover"
                            />
                          ) : proj.image_legacy ? (
                            <img
                              src={`/assets/img/${proj.image_legacy}`}
                              alt={proj.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#556155]">
                              <ImageIcon size={24} />
                            </div>
                          )}
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#a4f5a8]">
                            #{String(idx + 1).padStart(2, "0")} (Order: {proj.order})
                          </span>
                        </div>

                        <h4 className="text-base font-semibold text-white">{proj.title}</h4>
                        <p className="text-xs text-[#4be45c] font-medium mt-0.5">{proj.project_type}</p>
                        {proj.description && (
                          <p className="text-xs text-[#879087] mt-2 line-clamp-2">{proj.description}</p>
                        )}
                        {proj.technologies && (
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {proj.technologies.split(",").map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-[#182118] border border-[#253225] text-[#b3bbb2]"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#1b221b]">
                        <div className="flex items-center gap-2">
                          {proj.github_url && (
                            <a
                              href={proj.github_url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-[#151c15] text-[#9da39d] hover:text-white"
                              title="GitHub Link"
                            >
                              <Code2 size={13} />
                            </a>
                          )}
                          {proj.live_url && (
                            <a
                              href={proj.live_url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-[#151c15] text-[#9da39d] hover:text-[#4be45c]"
                              title="Live Demo"
                            >
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openModal("project", proj)}
                            className="p-1.5 rounded-lg bg-[#162016] text-[#c0c8bf] hover:text-[#4be45c] hover:bg-[#1d2b1d] transition-colors"
                            title="Edit project"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(`/api/projects/${proj.id}/`, proj.title)}
                            className="p-1.5 rounded-lg bg-[#201515] text-red-400 hover:bg-red-950/40 transition-colors"
                            title="Delete project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SKILLS & CATEGORIES */}
            {activeTab === "skills" && (
              <div className="space-y-8">
                {/* Categories Management */}
                <div className="p-6 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1b221b] pb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Skill Categories</h3>
                      <p className="text-xs text-[#8c948b]">Manage high-level groups (e.g. Frontend, Backend, Design).</p>
                    </div>
                    <button
                      onClick={() => openModal("category")}
                      className="px-3 py-1.5 rounded-xl bg-[#182318] border border-[#2b3f2c] text-xs font-semibold text-[#a4f5a8] hover:bg-[#203120] flex items-center gap-1.5"
                    >
                      <Plus size={13} /> Add Category
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="p-3.5 rounded-xl bg-[#141a14] border border-[#243124] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[#4be45c] text-base">{cat.icon}</span>
                          <span className="text-sm font-semibold text-white">{cat.title}</span>
                          <span className="text-[10px] text-[#717b71] font-mono">#{cat.order}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openModal("category", cat)}
                            className="p-1 rounded text-[#9da39d] hover:text-white"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(`/api/skill-categories/${cat.id}/`, cat.title)}
                            className="p-1 rounded text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Management */}
                <div className="p-6 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1b221b] pb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Skills &amp; Technologies</h3>
                      <p className="text-xs text-[#8c948b]">Individual technologies mapped inside categories.</p>
                    </div>
                    <button
                      onClick={() => openModal("skill")}
                      className="px-3.5 py-2 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Plus size={14} /> Add New Skill
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-3 rounded-xl bg-[#131913] border border-[#222d22] flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-7 h-7 rounded-lg bg-[#1a231a] border border-[#2c3d2c] flex items-center justify-center flex-shrink-0">
                            {skill.icon_url ? (
                              <img
                                src={skill.icon_url}
                                alt={skill.name}
                                className="w-4 h-4 object-contain"
                              />
                            ) : skill.icon_legacy ? (
                              <img
                                src={`/assets/img/${skill.icon_legacy}`}
                                alt={skill.name}
                                className="w-4 h-4 object-contain"
                              />
                            ) : (
                              <Code2 size={14} className="text-[#4be45c]" />
                            )}
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-white truncate">{skill.name}</p>
                            <p className="text-[10px] text-[#717b71] truncate">{skill.category_title || "General"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            onClick={() => openModal("skill", skill)}
                            className="p-1 rounded text-[#9da39d] hover:text-[#4be45c]"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(`/api/skills/${skill.id}/`, skill.name)}
                            className="p-1 rounded text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SERVICES */}
            {activeTab === "services" && profile && (
              <div className="space-y-6">
                {/* Service intro section text */}
                <div className="p-6 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Services Section Overview Text</h3>
                    <button
                      onClick={handleProfileSave}
                      className="px-3 py-1.5 rounded-lg bg-[#182318] border border-[#2b3f2c] text-xs font-semibold text-[#a4f5a8] hover:bg-[#203120] flex items-center gap-1.5"
                    >
                      <Save size={13} /> Update Intro Text
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={profile.services_intro || ""}
                    onChange={(e) => setProfile({ ...profile, services_intro: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#8c948b]">Showing {services.length} services.</p>
                  <button
                    onClick={() => openModal("service")}
                    className="px-3.5 py-2 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Plus size={14} /> Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((svc) => (
                    <div
                      key={svc.id}
                      className="p-5 rounded-2xl bg-[#101410] border border-[#1d251d] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-[#4be45c] px-2 py-0.5 rounded bg-[#162116] border border-[#253625]">
                            {svc.service_number}
                          </span>
                          <span className="text-[10px] text-[#717b71]">Order: {svc.order}</span>
                        </div>
                        <h4 className="text-base font-semibold text-white">{svc.title}</h4>
                        <p className="text-xs text-[#8c948b] mt-1.5">{svc.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {svc.items?.map((item) => (
                            <span
                              key={item}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-[#161c16] border border-[#283528] text-[#c0c8bf]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-[#1b221b]">
                        <button
                          onClick={() => openModal("service", svc)}
                          className="px-3 py-1.5 rounded-lg bg-[#162016] text-xs text-[#c0c8bf] hover:text-[#4be45c] flex items-center gap-1.5"
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(`/api/services/${svc.id}/`, svc.title)}
                          className="px-3 py-1.5 rounded-lg bg-[#201515] text-xs text-red-400 hover:bg-red-950/40 flex items-center gap-1.5"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: EXPERIENCE & EDUCATION & CERTIFICATIONS */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Work Experience Items</h3>
                  <button
                    onClick={() => openModal("experience")}
                    className="px-3.5 py-2 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Plus size={14} /> Add Experience
                  </button>
                </div>

                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-xl bg-[#101410] border border-[#1d251d] flex items-start justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-white">{exp.position}</h4>
                        <p className="text-xs text-[#4be45c]">{exp.company} • {exp.period}</p>
                        <p className="text-xs text-[#8c948b] mt-1.5">{exp.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => openModal("experience", exp)}
                          className="p-1.5 rounded-lg bg-[#162016] text-[#c0c8bf] hover:text-[#4be45c]"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(`/api/experiences/${exp.id}/`, exp.position)}
                          className="p-1.5 rounded-lg bg-[#201515] text-red-400 hover:bg-red-950/40"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: EDUCATION */}
            {activeTab === "education" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Education History</h3>
                  <button
                    onClick={() => openModal("education")}
                    className="px-3.5 py-2 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Plus size={14} /> Add Education
                  </button>
                </div>

                <div className="space-y-3">
                  {educations.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-xl bg-[#101410] border border-[#1d251d] flex items-start justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-white">{edu.degree}</h4>
                        <p className="text-xs text-[#4be45c]">{edu.institution} • {edu.year}</p>
                        {edu.description && (
                          <p className="text-xs text-[#8c948b] mt-1.5">{edu.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => openModal("education", edu)}
                          className="p-1.5 rounded-lg bg-[#162016] text-[#c0c8bf] hover:text-[#4be45c]"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(`/api/education/${edu.id}/`, edu.degree)}
                          className="p-1.5 rounded-lg bg-[#201515] text-red-400 hover:bg-red-950/40"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: CERTIFICATIONS */}
            {activeTab === "certifications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Certifications &amp; Licenses</h3>
                  <button
                    onClick={() => openModal("certification")}
                    className="px-3.5 py-2 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Plus size={14} /> Add Certification
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl bg-[#101410] border border-[#1d251d] flex items-start justify-between gap-3"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-white">{cert.name}</h4>
                        <p className="text-xs text-[#4be45c]">{cert.issuer} • {cert.issue_date}</p>
                        {cert.credential_id && (
                          <p className="text-[11px] text-[#717b71] font-mono mt-1">ID: {cert.credential_id}</p>
                        )}
                        {cert.credential_url && (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#a4f5a8] hover:underline mt-2"
                          >
                            <ExternalLink size={11} /> Verify Credential
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => openModal("certification", cert)}
                          className="p-1.5 rounded-lg bg-[#162016] text-[#c0c8bf] hover:text-[#4be45c]"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(`/api/certifications/${cert.id}/`, cert.name)}
                          className="p-1.5 rounded-lg bg-[#201515] text-red-400 hover:bg-red-950/40"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: TESTIMONIALS */}
            {activeTab === "testimonials" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#8c948b]">Showing {testimonials.length} client reviews.</p>
                  <button
                    onClick={() => openModal("testimonial")}
                    className="px-3.5 py-2 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Plus size={14} /> Add Testimonial
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((test) => (
                    <div
                      key={test.id}
                      className="p-5 rounded-2xl bg-[#101410] border border-[#1d251d] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#4be45c]">{test.rating}</span>
                            <span className="text-[11px] text-[#4be45c] tracking-widest">{test.rating_stars}</span>
                          </div>
                          <span className="text-[10px] text-[#717b71]">Order: {test.order}</span>
                        </div>
                        <p className="text-xs text-[#c0c8bf] italic leading-relaxed">
                          “{test.quote}”
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#1b221b]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1c241c] border border-[#2b392b] flex-shrink-0">
                            {test.image_url ? (
                              <img src={test.image_url} alt="" className="w-full h-full object-cover" />
                            ) : test.image_legacy ? (
                              <img src={`/assets/img/${test.image_legacy}`} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <User size={14} className="text-[#6d776d] m-auto" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">{test.name}</p>
                            <p className="text-[10px] text-[#788278]">{test.company_or_role || "Client"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openModal("testimonial", test)}
                            className="p-1.5 rounded-lg bg-[#162016] text-[#c0c8bf] hover:text-[#4be45c]"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(`/api/testimonials/${test.id}/`, test.name)}
                            className="p-1.5 rounded-lg bg-[#201515] text-red-400 hover:bg-red-950/40"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 10: CONTACT & SOCIAL LINKS */}
            {activeTab === "contact" && profile && (
              <div className="space-y-6">
                <form onSubmit={handleProfileSave} className="p-6 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-[#1b221b] pb-3">
                    <Mail size={16} className="text-[#4be45c]" />
                    Direct Contact Channels
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Email Address</label>
                      <input
                        type="email"
                        value={profile.email || ""}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={profile.phone || ""}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Location Display Label</label>
                      <input
                        type="text"
                        value={profile.location_display || ""}
                        onChange={(e) => setProfile({ ...profile, location_display: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Location Google Maps URL</label>
                      <input
                        type="url"
                        value={profile.location_url || ""}
                        onChange={(e) => setProfile({ ...profile, location_url: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs flex items-center gap-1.5"
                    >
                      <Save size={14} /> Save Contact Details
                    </button>
                  </div>
                </form>

                {/* Social Media Links CRUD */}
                <div className="p-6 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1b221b] pb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Social Media Links</h3>
                      <p className="text-xs text-[#8c948b]">Appears in the Contact section and Footer.</p>
                    </div>
                    <button
                      onClick={() => openModal("social")}
                      className="px-3 py-1.5 rounded-xl bg-[#182318] border border-[#2b3f2c] text-xs font-semibold text-[#a4f5a8] hover:bg-[#203120] flex items-center gap-1.5"
                    >
                      <Plus size={13} /> Add Social Link
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {socialLinks.map((sl) => (
                      <div
                        key={sl.id}
                        className="p-3.5 rounded-xl bg-[#141a14] border border-[#243124] flex items-center justify-between"
                      >
                        <div className="truncate">
                          <p className="text-xs font-semibold text-white">{sl.label}</p>
                          <a
                            href={sl.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-[#4be45c] hover:underline truncate block"
                          >
                            {sl.href}
                          </a>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openModal("social", sl)}
                            className="p-1 rounded text-[#9da39d] hover:text-white"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(`/api/social-links/${sl.id}/`, sl.label)}
                            className="p-1 rounded text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 11: RESUME & SEO */}
            {activeTab === "seo" && profile && (
              <form onSubmit={handleProfileSave} className="space-y-6">
                {/* Resume Upload */}
                <div className="p-6 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-[#1b221b] pb-3">
                    <FileText size={16} className="text-[#4be45c]" />
                    Resume / CV Document
                  </h3>

                  <div className="p-4 rounded-xl bg-[#141a14] border border-[#232f23] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-white">Current Resume Document</p>
                      <p className="text-xs text-[#8c948b] mt-0.5">
                        {profile.resume_file_url ? (
                          <a
                            href={profile.resume_file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#4be45c] hover:underline inline-flex items-center gap-1"
                          >
                            <ExternalLink size={12} /> View / Download Uploaded CV
                          </a>
                        ) : (
                          "No resume uploaded yet."
                        )}
                      </p>
                    </div>

                    <div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        id="resume_file_input"
                        className="hidden"
                      />
                      <label
                        htmlFor="resume_file_input"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1e291e] hover:bg-[#273627] border border-[#334733] text-xs font-semibold text-white cursor-pointer transition-colors"
                      >
                        <Upload size={14} /> Upload New CV (PDF)
                      </label>
                    </div>
                  </div>
                </div>

                {/* SEO Meta Information */}
                <div className="p-6 rounded-2xl bg-[#101410] border border-[#1d251d] space-y-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-[#1b221b] pb-3">
                    <Code2 size={16} className="text-[#4be45c]" />
                    Website SEO &amp; Meta Information
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">
                      Browser Tab Title (SEO Meta Title)
                    </label>
                    <input
                      type="text"
                      value={profile.seo_meta_title || ""}
                      onChange={(e) => setProfile({ ...profile, seo_meta_title: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">
                      Search Engine Meta Description
                    </label>
                    <textarea
                      rows={3}
                      value={profile.seo_meta_description || ""}
                      onChange={(e) => setProfile({ ...profile, seo_meta_description: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">
                      SEO Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      value={profile.seo_keywords || ""}
                      onChange={(e) => setProfile({ ...profile, seo_keywords: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Footer Catchphrase / Collaboration Text</label>
                      <textarea
                        rows={2}
                        value={profile.footer_text || ""}
                        onChange={(e) => setProfile({ ...profile, footer_text: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Footer Copyright Notice</label>
                      <input
                        type="text"
                        value={profile.copyright_text || ""}
                        onChange={(e) => setProfile({ ...profile, copyright_text: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#151b15] border border-[#263326] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs flex items-center gap-2 shadow-lg shadow-[#4be45c]/20"
                  >
                    <Save size={15} /> Save SEO &amp; Document Settings
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>

      {/* MODAL DIALOG FOR ADD / EDIT */}
      {modalType && modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#111711] border border-[#273627] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 px-6 border-b border-[#1f291f] flex items-center justify-between bg-[#151d15]">
              <h3 className="text-base font-bold text-white capitalize">
                {modalItem.id ? `Edit ${modalType}` : `Add New ${modalType}`}
              </h3>
              <button
                onClick={closeModal}
                className="text-[#8c948b] hover:text-white p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleItemSave} className="p-6 overflow-y-auto space-y-4">
              {/* Project Form */}
              {modalType === "project" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={modalItem.title || ""}
                      onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                      placeholder="e.g. Modern E-Commerce Platform"
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Project Type / Tagline</label>
                    <input
                      type="text"
                      required
                      value={modalItem.project_type || ""}
                      onChange={(e) => setModalItem({ ...modalItem, project_type: e.target.value })}
                      placeholder="e.g. Web design · Development"
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Description (Optional)</label>
                    <textarea
                      rows={2}
                      value={modalItem.description || ""}
                      onChange={(e) => setModalItem({ ...modalItem, description: e.target.value })}
                      placeholder="Brief overview of what this project accomplished..."
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Technologies (Comma separated)</label>
                    <input
                      type="text"
                      value={modalItem.technologies || ""}
                      onChange={(e) => setModalItem({ ...modalItem, technologies: e.target.value })}
                      placeholder="React, Next.js, Django, PostgreSQL"
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Live Demo URL</label>
                      <input
                        type="url"
                        value={modalItem.live_url || ""}
                        onChange={(e) => setModalItem({ ...modalItem, live_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">GitHub Repo URL</label>
                      <input
                        type="url"
                        value={modalItem.github_url || ""}
                        onChange={(e) => setModalItem({ ...modalItem, github_url: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Display Order</label>
                      <input
                        type="number"
                        value={modalItem.order ?? 0}
                        onChange={(e) => setModalItem({ ...modalItem, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="is_featured"
                        checked={modalItem.is_featured ?? true}
                        onChange={(e) => setModalItem({ ...modalItem, is_featured: e.target.checked })}
                        className="rounded border-[#293829] text-[#4be45c] focus:ring-[#4be45c]"
                      />
                      <label htmlFor="is_featured" className="text-xs font-medium text-white cursor-pointer">
                        Featured on Homepage
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-2">Project Image</label>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#162016] border border-[#273827]">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-16 h-12 object-cover rounded-lg" />
                      ) : modalItem.image_legacy ? (
                        <img src={`/assets/img/${modalItem.image_legacy}`} alt="" className="w-16 h-12 object-cover rounded-lg" />
                      ) : null}
                      <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs text-[#9da39d]" />
                    </div>
                  </div>
                </>
              )}

              {/* Skill Category Form */}
              {modalType === "category" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Category Title</label>
                    <input
                      type="text"
                      required
                      value={modalItem.title || ""}
                      onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                      placeholder="e.g. Frontend, Backend, Tools"
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Category Icon Symbol</label>
                      <input
                        type="text"
                        value={modalItem.icon || "▣"}
                        onChange={(e) => setModalItem({ ...modalItem, icon: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Display Order</label>
                      <input
                        type="number"
                        value={modalItem.order ?? 0}
                        onChange={(e) => setModalItem({ ...modalItem, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Skill Form */}
              {modalType === "skill" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Skill Name</label>
                    <input
                      type="text"
                      required
                      value={modalItem.name || ""}
                      onChange={(e) => setModalItem({ ...modalItem, name: e.target.value })}
                      placeholder="e.g. TypeScript, React, Python"
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Category</label>
                    <select
                      value={modalItem.category || (categories[0]?.id || "")}
                      onChange={(e) => setModalItem({ ...modalItem, category: parseInt(e.target.value) })}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#111711] text-white">
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Display Order</label>
                    <input
                      type="number"
                      value={modalItem.order ?? 0}
                      onChange={(e) => setModalItem({ ...modalItem, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-2">Skill Icon (SVG / PNG)</label>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#162016] border border-[#273827]">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-8 h-8 object-contain" />
                      ) : modalItem.icon_legacy ? (
                        <img src={`/assets/img/${modalItem.icon_legacy}`} alt="" className="w-8 h-8 object-contain" />
                      ) : null}
                      <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs text-[#9da39d]" />
                    </div>
                  </div>
                </>
              )}

              {/* Service Form */}
              {modalType === "service" && (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Number (e.g. 01)</label>
                      <input
                        type="text"
                        required
                        value={modalItem.service_number || "01"}
                        onChange={(e) => setModalItem({ ...modalItem, service_number: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        value={modalItem.title || ""}
                        onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                        placeholder="e.g. Full Stack Development"
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={modalItem.description || ""}
                      onChange={(e) => setModalItem({ ...modalItem, description: e.target.value })}
                      placeholder="Practical, polished solutions shaped around your goals..."
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">
                      Feature Items / Bullets (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={
                        Array.isArray(modalItem.items)
                          ? modalItem.items.join(", ")
                          : modalItem.items || ""
                      }
                      onChange={(e) => setModalItem({ ...modalItem, items: e.target.value })}
                      placeholder="Web development, Web performance, Responsive design"
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Display Order</label>
                    <input
                      type="number"
                      value={modalItem.order ?? 0}
                      onChange={(e) => setModalItem({ ...modalItem, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                </>
              )}

              {/* Testimonial Form */}
              {modalType === "testimonial" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Client Name</label>
                      <input
                        type="text"
                        required
                        value={modalItem.name || ""}
                        onChange={(e) => setModalItem({ ...modalItem, name: e.target.value })}
                        placeholder="Sara The"
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Company / Role</label>
                      <input
                        type="text"
                        value={modalItem.company_or_role || ""}
                        onChange={(e) => setModalItem({ ...modalItem, company_or_role: e.target.value })}
                        placeholder="Product Lead"
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Rating (e.g. 5.0)</label>
                      <input
                        type="text"
                        value={modalItem.rating || "5.0"}
                        onChange={(e) => setModalItem({ ...modalItem, rating: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Display Order</label>
                      <input
                        type="number"
                        value={modalItem.order ?? 0}
                        onChange={(e) => setModalItem({ ...modalItem, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Quote</label>
                    <textarea
                      rows={3}
                      required
                      value={modalItem.quote || ""}
                      onChange={(e) => setModalItem({ ...modalItem, quote: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-2">Client Avatar</label>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#162016] border border-[#273827]">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-10 h-10 rounded-full object-cover" />
                      ) : modalItem.image_legacy ? (
                        <img src={`/assets/img/${modalItem.image_legacy}`} alt="" className="w-10 h-10 rounded-full object-cover" />
                      ) : null}
                      <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs text-[#9da39d]" />
                    </div>
                  </div>
                </>
              )}

              {/* Social Link Form */}
              {modalType === "social" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Platform Label</label>
                    <input
                      type="text"
                      required
                      value={modalItem.label || ""}
                      onChange={(e) => setModalItem({ ...modalItem, label: e.target.value })}
                      placeholder="e.g. GitHub, LinkedIn, X/Twitter"
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Profile Link URL</label>
                    <input
                      type="url"
                      required
                      value={modalItem.href || ""}
                      onChange={(e) => setModalItem({ ...modalItem, href: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Display Order</label>
                    <input
                      type="number"
                      value={modalItem.order ?? 0}
                      onChange={(e) => setModalItem({ ...modalItem, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                </>
              )}

              {/* Experience Form */}
              {modalType === "experience" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Job Position</label>
                    <input
                      type="text"
                      required
                      value={modalItem.position || ""}
                      onChange={(e) => setModalItem({ ...modalItem, position: e.target.value })}
                      placeholder="Senior Full Stack Engineer"
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Company / Studio</label>
                      <input
                        type="text"
                        required
                        value={modalItem.company || ""}
                        onChange={(e) => setModalItem({ ...modalItem, company: e.target.value })}
                        placeholder="Digital Labs"
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Time Period</label>
                      <input
                        type="text"
                        required
                        value={modalItem.period || ""}
                        onChange={(e) => setModalItem({ ...modalItem, period: e.target.value })}
                        placeholder="2023 - Present"
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={modalItem.description || ""}
                      onChange={(e) => setModalItem({ ...modalItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Display Order</label>
                    <input
                      type="number"
                      value={modalItem.order ?? 0}
                      onChange={(e) => setModalItem({ ...modalItem, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                </>
              )}

              {/* Education Form */}
              {modalType === "education" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Degree / Qualification</label>
                    <input
                      type="text"
                      required
                      value={modalItem.degree || ""}
                      onChange={(e) => setModalItem({ ...modalItem, degree: e.target.value })}
                      placeholder="B.Tech in Computer Science"
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Institution</label>
                      <input
                        type="text"
                        required
                        value={modalItem.institution || ""}
                        onChange={(e) => setModalItem({ ...modalItem, institution: e.target.value })}
                        placeholder="University Name"
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Year / Period</label>
                      <input
                        type="text"
                        required
                        value={modalItem.year || ""}
                        onChange={(e) => setModalItem({ ...modalItem, year: e.target.value })}
                        placeholder="2019 - 2023"
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Description (Optional)</label>
                    <textarea
                      rows={2}
                      value={modalItem.description || ""}
                      onChange={(e) => setModalItem({ ...modalItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Display Order</label>
                    <input
                      type="number"
                      value={modalItem.order ?? 0}
                      onChange={(e) => setModalItem({ ...modalItem, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                </>
              )}

              {/* Certification Form */}
              {modalType === "certification" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Certificate Name</label>
                    <input
                      type="text"
                      required
                      value={modalItem.name || ""}
                      onChange={(e) => setModalItem({ ...modalItem, name: e.target.value })}
                      placeholder="Meta Full Stack Engineer"
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Issuer Organization</label>
                      <input
                        type="text"
                        required
                        value={modalItem.issuer || ""}
                        onChange={(e) => setModalItem({ ...modalItem, issuer: e.target.value })}
                        placeholder="Meta, AWS, Google"
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Issue Date / Year</label>
                      <input
                        type="text"
                        value={modalItem.issue_date || ""}
                        onChange={(e) => setModalItem({ ...modalItem, issue_date: e.target.value })}
                        placeholder="2023"
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#9da39d] mb-1">Credential URL</label>
                    <input
                      type="url"
                      value={modalItem.credential_url || ""}
                      onChange={(e) => setModalItem({ ...modalItem, credential_url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Credential ID (Optional)</label>
                      <input
                        type="text"
                        value={modalItem.credential_id || ""}
                        onChange={(e) => setModalItem({ ...modalItem, credential_id: e.target.value })}
                        placeholder="ABC-12345"
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#9da39d] mb-1">Display Order</label>
                      <input
                        type="number"
                        value={modalItem.order ?? 0}
                        onChange={(e) => setModalItem({ ...modalItem, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-xl bg-[#171f17] border border-[#293829] text-sm text-white focus:outline-none focus:border-[#4be45c]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1f291f]">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl bg-[#182018] text-[#9da39d] hover:text-white text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-[#4be45c] hover:bg-[#3ec44d] text-[#071007] font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>{modalItem.id ? "Update" : "Create"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
