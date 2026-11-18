"use client";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Dribbble,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MoveUpRight,
  Phone,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const INITIAL_PROJECTS = [
  { title: "Restaurant Website", image: "work-img-1.png", type: "Web design · Development", live_url: "", github_url: "" },
  { title: "Design For Agriculture", image: "work-img-2.png", type: "Branding · Web design", live_url: "", github_url: "" },
  { title: "Chicken Shop Website", image: "work-img-3.png", type: "Web design · Development", live_url: "", github_url: "" },
  { title: "Systems For Mining", image: "work-img-4.png", type: "Product design · Development", live_url: "", github_url: "" },
  { title: "SEO Medicine Website", image: "work-img-5.png", type: "Web design · SEO", live_url: "", github_url: "" },
];

const INITIAL_SERVICES = [
  {
    title: "Website Developer",
    number: "01",
    description: "Practical, polished solutions shaped around your goals and your customers.",
    items: ["Web development", "Web performance", "Responsive design"],
  },
  {
    title: "Backend Developer",
    number: "02",
    description: "Practical, polished solutions shaped around your goals and your customers.",
    items: ["Database design", "API development", "Reliable integrations"],
  },
  {
    title: "Web Designer",
    number: "03",
    description: "Practical, polished solutions shaped around your goals and your customers.",
    items: ["User interfaces", "Prototyping", "Design systems"],
  },
  {
    title: "SEO Specialist",
    number: "04",
    description: "Practical, polished solutions shaped around your goals and your customers.",
    items: ["Technical SEO", "Search strategy", "Site optimization"],
  },
];

const INITIAL_SKILL_GROUPS = [
  {
    title: "Frontend",
    icon: "▣",
    skills: [
      ["HTML", "skills-frontend-1.svg"],
      ["CSS", "skills-frontend-2.svg"],
      ["JavaScript", "skills-frontend-3.svg"],
      ["React", "skills-frontend-4.svg"],
      ["Sass", "skills-frontend-5.svg"],
      ["Git", "skills-frontend-6.svg"],
      ["GitHub", "skills-frontend-7.svg"],
    ],
  },
  {
    title: "Backend",
    icon: "▧",
    skills: [
      ["Laravel", "skills-backend-1.svg"],
      ["PostgreSQL", "skills-backend-2.svg"],
      ["Node.js", "skills-backend-3.svg"],
      ["Supabase", "skills-backend-4.svg"],
      ["Socket.io", "skills-backend-5.svg"],
    ],
  },
  {
    title: "Design",
    icon: "✳",
    skills: [
      ["Figma", "skills-design-1.svg"],
      ["Blender", "skills-design-2.svg"],
      ["After Effects", "skills-design-3.svg"],
      ["Photoshop", "skills-design-4.svg"],
      ["Illustrator", "skills-design-5.svg"],
      ["Framer", "skills-design-6.svg"],
    ],
  },
];

const INITIAL_TESTIMONIALS = [
  { name: "Sara The", image: "testimonial-1.png", quote: "This young professional is disciplined and delivered a thoughtful, high-quality project. Communication was clear throughout. Great work!", rating: "5.0", rating_stars: "★★★★★" },
  { name: "Elemar Rice", image: "testimonial-2.png", quote: "This young professional is disciplined and delivered a thoughtful, high-quality project. Communication was clear throughout. Great work!", rating: "5.0", rating_stars: "★★★★★" },
  { name: "Rita Treds", image: "testimonial-3.png", quote: "This young professional is disciplined and delivered a thoughtful, high-quality project. Communication was clear throughout. Great work!", rating: "5.0", rating_stars: "★★★★★" },
  { name: "Augus Drix", image: "testimonial-4.png", quote: "This young professional is disciplined and delivered a thoughtful, high-quality project. Communication was clear throughout. Great work!", rating: "5.0", rating_stars: "★★★★★" },
];

const INITIAL_SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/", icon_name: "Instagram", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon_name: "Linkedin", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/", icon_name: "Github", Icon: Github },
  { label: "Dribbble", href: "https://dribbble.com/", icon_name: "Dribbble", Icon: Dribbble },
];

const INITIAL_PROFILE = {
  full_name: "Arbaz Siddiqui",
  brand_name: "Bianca",
  professional_title: "Creative Designer & Web Developer",
  location: "Surat",
  hero_eyebrow: "Hi! I'm Arbaz Siddiqui Based in Surat",
  hero_heading_line1: "Creative Designer",
  hero_heading_line2: "Web Developer",
  hero_description: "I build designs and websites that solve problems,\ninspiring success.",
  profile_picture_url: null,
  profile_picture_legacy: "home-img.png",
  about_section_index: "01 / A LITTLE ABOUT ME",
  about_description: "About Me: Passionate Full Stack Developer specializing in Python, Django REST Framework, JavaScript, React, and SQL. I enjoy creating modern web applications and turning ideas into practical digital solutions. I also leverage AI-powered tools and vibe coding workflows to accelerate development, simplify learning, solve problems, and improve productivity. Always eager to explore new technologies and build something meaningful.",
  about_note: "If you have a project in mind, take a look at my work and let's make something meaningful together.",
  about_cta_text: "Let's talk",
  email: "bianca123@email.com",
  phone: "+99 123 456 7890",
  location_display: "Lima, Peru",
  location_url: "https://maps.google.com/?q=Lima+Peru",
  services_intro: "I independently build attractive, responsive, and secure web applications tailored to your needs. From planning and design to development and deployment, I focus on delivering complete digital solutions that meet your requirements and provide a smooth user experience.",
  footer_text: "Collaborate with Arbaz Siddiqui\nand start your journey in\ncreative development today.",
  copyright_text: "Arbaz Siddiqui. Made with care.",
};

const socialIconMap: Record<string, any> = {
  Instagram,
  Linkedin,
  Github,
  Dribbble,
};

function resolveImage(img?: string | null, fallback = ""): string {
  if (!img) return fallback;
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `/assets/img/${img}`;
}

export default function Home() {
  const [profile, setProfile] = useState<any>(INITIAL_PROFILE);
  const [projects, setProjects] = useState<any[]>(INITIAL_PROJECTS);
  const [services, setServices] = useState<any[]>(INITIAL_SERVICES);
  const [skillGroups, setSkillGroups] = useState<any[]>(INITIAL_SKILL_GROUPS);
  const [testimonials, setTestimonials] = useState<any[]>(INITIAL_TESTIMONIALS);
  const [socialLinks, setSocialLinks] = useState<any[]>(INITIAL_SOCIAL_LINKS);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>("01");
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Dynamic fetch from Django Backend
    fetch("http://localhost:8000/api/portfolio/", { cache: "no-store" })
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (!data) return;
        if (data.profile) setProfile(data.profile);
        if (data.projects && data.projects.length > 0) setProjects(data.projects);
        if (data.services && data.services.length > 0) setServices(data.services);
        if (data.skill_groups && data.skill_groups.length > 0) setSkillGroups(data.skill_groups);
        if (data.testimonials && data.testimonials.length > 0) setTestimonials(data.testimonials);
        if (data.social_links && data.social_links.length > 0) setSocialLinks(data.social_links);
      })
      .catch(() => {
        // Fallback silently remains active
      });
  }, []);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setFormStatus("");

    const formData = new FormData(form);
    try {
      const response = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setFormStatus(result.error ?? "Please check your details and try again.");
        return;
      }
      form.reset();
      setFormStatus("Thanks! Your message has been sent.");
    } catch {
      setFormStatus("Could not reach the contact service. Please try again later.");
    } finally {
      setSending(false);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <nav className="nav-shell container" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={closeMenu}>
            {profile.brand_name || "Bianca"}<span className="text-leaf">.</span>
          </a>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#work" onClick={closeMenu}>Works</a>
            <a href="#services" onClick={closeMenu}>My Services</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="http://localhost:3000/profile">Update</a>
            <a className="nav-contact" href="#contact" onClick={closeMenu}>
              Contact me <ArrowUpRight size={15} />
            </a>
          </div>
        </nav>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-content">
          <p className="eyebrow hero-location">
            {profile.hero_eyebrow || "Hi! I'm Arbaz Siddiqui Based in Surat"}
          </p>
          <h1>
            {profile.hero_heading_line1 || "Creative Designer"} <span>&amp;</span><br />
            <em>{profile.hero_heading_line2 || "Web Developer"}</em>
          </h1>
          <p className="hero-copy">
            {profile.hero_description ? (
              profile.hero_description.split("\n").map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br className="desktop-break" />}
                </span>
              ))
            ) : (
              <>I build designs and websites that solve problems,<br className="desktop-break" /> inspiring success.</>
            )}
          </p>
          <div className="image-container ml-[250px] mt-[25px]">
              <div className="image-frame"/>
            <img
              className="portrait mb-[25px] rotate-[10deg]"
              src={resolveImage(profile.profile_picture_url || profile.profile_picture_legacy || "home-img.pn")}
              alt={`${profile.full_name || ""} portrait`}
            />
            <a className="round-link" href="#about" aria-label={`Explore about ${profile.brand_name || "Bianca"}`}>
              <span>EXPLORE · MORE · LET&apos;S ·</span>
              <ArrowDown size={16} />
            </a>
          </div>
        </div>
        <a className="scroll-cue" href="#about">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDownRight size={16} />
        </a>
      </section>

      <section className="about section-wrap container" id="about">
        <div className="about-heading">
          <span className="section-index">
            {profile.about_section_index || "01 / A LITTLE ABOUT ME"}
          </span>
          <h5 className="hero-copy">
            {profile.about_description ? (
  <span>{profile.about_description}</span>
) : (
              <>
                Passionate <em>Full Stack Developer</em> specializing in
                <em>Python, Django REST Framework, JavaScript, React,</em> and
                <em>SQL</em>. I enjoy creating modern web applications and turning
                ideas into <em>practical digital solutions</em>. I also leverage
                <em>AI-powered tools</em> and <em>vibe coding workflows</em> to
                accelerate development, simplify learning, solve problems, and
                improve productivity. Always eager to explore
                <em>new technologies</em> and build something meaningful.
              </>
            )}
          </h5>
        </div>
        <div className="about-note">
          <p>
            {profile.about_note || "If you have a project in mind, take a look at my work and let's make something meaningful together."}
          </p>
          <a className="pill-link" href="#contact">
            {profile.about_cta_text || "Let's talk"} <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <section className="work section-wrap container" id="work">
        <div className="section-heading">
          <div>
            <span className="section-index">02 / SELECTED PROJECTS</span>
            <h2>View My <em>Work</em></h2>
          </div>
          <p>A few things I&apos;ve made<br />with care and curiosity.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <a
              className="project-card"
              href={project.live_url || project.github_url || "#contact"}
              key={project.id || project.title}
              target={project.live_url || project.github_url ? "_blank" : undefined}
              rel={project.live_url || project.github_url ? "noreferrer" : undefined}
            >
              <div className="project-image-wrap">
                <img
                  src={resolveImage(project.image_url || project.image_legacy || project.image)}
                  alt={`${project.title} project preview`}
                />
                <span className="project-open"><ArrowUpRight size={18} /></span>
              </div>
              <div className="project-meta">
                <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{project.title}</h3>
                  <span>{project.project_type || project.type}</span>
                </div>
                <ArrowRight className="project-arrow" size={18} />
              </div>
            </a>
          ))}
        </div>
        <p className="work-footnote"><span /> Always open to the next good idea.</p>
      </section>

      <section className="services section-wrap container" id="services">
        <div className="section-heading services-heading">
          <div>
            <span className="section-index">03 / WHAT I CAN DO</span>
            <h2><em>My</em> Services</h2>
          </div>
          <p>Thoughtful work from the first<br />sketch to the final launch.</p>
        </div>
        <div className="service-layout">
          <p className="service-intro">
            {profile.services_intro || "I independently build attractive, responsive, and secure web applications tailored to your needs. From planning and design to development and deployment, I focus on delivering complete digital solutions that meet your requirements and provide a smooth user experience."}
          </p>

          <div className="service-list">
            {services.map((service) => {
              const numKey = service.service_number || service.number;
              const isOpen = activeService === numKey;
              return (
                <div className={`service-row ${isOpen ? "service-row-open" : ""}`} key={service.id || numKey}>
                  <button
                    className="service-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setActiveService(isOpen ? null : numKey)}
                  >
                    <span className="service-number">{numKey}</span>
                    <span className="service-name">{service.title}</span>
                    <span className="service-toggle">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="service-details">
                      <p>{service.description || "Practical, polished solutions shaped around your goals and your customers."}</p>
                      <div>
                        {service.items?.map((item: string) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="skills section-wrap container" id="skills">
        <div className="section-heading skills-heading">
          <div>
            <span className="section-index">04 / MY TOOLKIT</span>
            <h2>My <em>Skills</em></h2>
          </div>
          <p>Tools I&apos;ve learned and grown with<br />by focusing on what I love.</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.id || group.title}>
              <div className="skill-card-title">
                <span>{group.icon}</span>
                <h3>{group.title}</h3>
                <ArrowUpRight size={16} />
              </div>
              <div className="skill-tags">
                {group.skills?.map((item: any) => {
                  const name = Array.isArray(item) ? item[0] : item.name;
                  const iconSrc = Array.isArray(item)
                    ? resolveImage(item[1])
                    : resolveImage(item.icon_url || item.icon_legacy);
                  return (
                    <span className="skill-tag" key={name}>
                      <img src={iconSrc} alt="" />
                      {name}
                    </span>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials section-wrap" id="testimonials">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-index">05 / KIND WORDS</span>
              <h2><em>What</em> They Say</h2>
            </div>
            <p>Good work is a collaboration.<br />Here&apos;s what clients say.</p>
          </div>
        </div>
        <div className="testimonial-track">
          {testimonials.map((person) => (
            <article className="testimonial-card" key={person.id || person.name}>
              <div className="rating">
                <strong>{person.rating || "5.0"}</strong>
                <span>{person.rating_stars || "★★★★★"}</span>
              </div>
              <p>“{person.quote || "This young professional is disciplined and delivered a thoughtful, high-quality project. Communication was clear throughout. Great work!"}”</p>
              <div className="testimonial-author">
                <img
                  src={resolveImage(person.image_url || person.image_legacy || person.image)}
                  alt=""
                />
                <span>{person.name}</span>
                <Check size={14} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section-wrap container" id="contact">
        <div className="section-heading contact-heading">
          <div>
            <span className="section-index">06 / YOUR TURN</span>
            <h2>Let&apos;s make<br />something <em>great.</em></h2>
          </div>
          <p>Have an idea in mind?<br />I&apos;d love to hear about it.</p>
        </div>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={submitContact}>
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" placeholder="How should I call you?" required maxLength={120} />
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required maxLength={254} />
            <label htmlFor="message">Tell me about your project</label>
            <textarea id="message" name="message" placeholder="A little about what you have in mind..." rows={4} required maxLength={5000} />
            <button className="submit-button" type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send message"} <MoveUpRight size={16} />
            </button>
            {formStatus && <p className="form-status" role="status">{formStatus}</p>}
          </form>
          <div className="contact-details">
            <a className="contact-detail" href={`mailto:${profile.email || "bianca123@email.com"}`}>
              <span className="detail-icon"><Mail size={17} /></span>
              <span>
                <small>Email me</small>
                <strong>{profile.email || "bianca123@email.com"}</strong>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a className="contact-detail" href={`tel:${profile.phone ? profile.phone.replace(/\s+/g, "") : "+991234567890"}`}>
              <span className="detail-icon"><Phone size={17} /></span>
              <span>
                <small>Call me</small>
                <strong>{profile.phone || "+99 123 456 7890"}</strong>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a
              className="contact-detail"
              href={profile.location_url || "https://maps.google.com/?q=Lima+Peru"}
              target="_blank"
              rel="noreferrer"
            >
              <span className="detail-icon"><MapPin size={17} /></span>
              <span>
                <small>Find me</small>
                <strong>{profile.location_display || "Lima, Peru"}</strong>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <div className="social-links">
              <span>FIND ME ELSEWHERE</span>
              <div>
                {socialLinks.map((item: any) => {
                  const IconComp = item.Icon || socialIconMap[item.icon_name] || socialIconMap[item.label] || Github;
                  return (
                    <a
                      href={item.href}
                      key={item.id || item.label}
                      aria-label={item.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconComp size={17} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-main container">
          <div>
            <span className="section-index">HAVE A GOOD ONE?</span>
            <h4 className="hero-copy">
              {profile.footer_text ? (
                profile.footer_text.split("\n").map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))
              ) : (
                <>
                  Collaborate with {profile.full_name || "Arbaz Siddiqui"}<br />
                  and start your journey in<br />
                  <em>creative development today.</em>
                </>
              )}
            </h4>
          </div>
          <a className="footer-cta" href="#contact">Start a project <ArrowUpRight size={17} /></a>
          <div className="footer-nav">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#skills">Skills</a>
          </div>
        </div>
        <div className="footer-bottom container">
          <a className="brand" href="#home">{profile.brand_name || "Arbaz"}<span>.</span></a>
          <span>© {new Date().getFullYear()} {profile.copyright_text || "Arbaz Siddiqui. Made with care."}</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
