from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from portfolio_manager.models import (
    Profile,
    Project,
    SkillCategory,
    Skill,
    Service,
    Testimonial,
    SocialLink,
    Experience,
    Education,
    Certification,
)

User = get_user_model()


class Command(BaseCommand):
    help = "Seeds initial portfolio data from current hardcoded portfolio and ensures an admin user exists."

    def handle(self, *args, **options):
       

        # 2. Profile
        profile, created = Profile.objects.get_or_create(id=1)
        profile.full_name = "Arbaz Siddiqui"
        profile.brand_name = "Bianca"
        profile.professional_title = "Creative Designer & Web Developer"
        profile.location = "Surat"
        profile.hero_eyebrow = "Hi! I'm Arbaz Siddiqui Based in Surat"
        profile.hero_heading_line1 = "Creative Designer"
        profile.hero_heading_line2 = "Web Developer"
        profile.hero_description = "I build designs and websites that solve problems,\ninspiring success."
        profile.profile_picture_legacy = "home-img.png"
        profile.about_section_index = "01 / A LITTLE ABOUT ME"
        profile.about_description = (
            "About Me: Passionate Full Stack Developer specializing in Python, Django REST Framework, "
            "JavaScript, React, and SQL. I enjoy creating modern web applications and turning ideas into "
            "practical digital solutions. I also leverage AI-powered tools and vibe coding workflows to "
            "accelerate development, simplify learning, solve problems, and improve productivity. "
            "Always eager to explore new technologies and build something meaningful."
        )
        profile.about_note = "If you have a project in mind, take a look at my work and let's make something meaningful together."
        profile.about_cta_text = "Let's talk"
        profile.email = "bianca123@email.com"
        profile.phone = "+99 123 456 7890"
        profile.location_display = "Lima, Peru"
        profile.location_url = "https://maps.google.com/?q=Lima+Peru"
        profile.services_intro = (
            "I independently build attractive, responsive, and secure web applications tailored to your needs. "
            "From planning and design to development and deployment, I focus on delivering complete digital solutions "
            "that meet your requirements and provide a smooth user experience."
        )
        profile.footer_text = "Collaborate with Arbaz Siddiqui\nand start your journey in\ncreative development today."
        profile.copyright_text = "Arbaz Siddiqui. Made with care."
        profile.seo_meta_title = "Bianca — Creative Designer & Web Developer"
        profile.seo_meta_description = "Creative designer and web developer building thoughtful digital experiences that solve problems and inspire success."
        profile.seo_keywords = "developer, designer, portfolio, react, django, python, web development"
        profile.save()
        self.stdout.write(self.style.SUCCESS("Profile seeded."))

        # 3. Projects
        if Project.objects.count() == 0:
            initial_projects = [
                {"title": "Restaurant Website", "image_legacy": "work-img-1.png", "project_type": "Web design · Development", "order": 1, "technologies": "React, Tailwind, CSS"},
                {"title": "Design For Agriculture", "image_legacy": "work-img-2.png", "project_type": "Branding · Web design", "order": 2, "technologies": "Figma, Branding, UI/UX"},
                {"title": "Chicken Shop Website", "image_legacy": "work-img-3.png", "project_type": "Web design · Development", "order": 3, "technologies": "Next.js, TypeScript"},
                {"title": "Systems For Mining", "image_legacy": "work-img-4.png", "project_type": "Product design · Development", "order": 4, "technologies": "Django, Python, PostgreSQL"},
                {"title": "SEO Medicine Website", "image_legacy": "work-img-5.png", "project_type": "Web design · SEO", "order": 5, "technologies": "SEO, Web Vitals, React"},
            ]
            for p in initial_projects:
                Project.objects.create(**p)
            self.stdout.write(self.style.SUCCESS("Projects seeded."))

        # 4. Services
        if Service.objects.count() == 0:
            initial_services = [
                {
                    "title": "Website Developer",
                    "service_number": "01",
                    "description": "Practical, polished solutions shaped around your goals and your customers.",
                    "items": ["Web development", "Web performance", "Responsive design"],
                    "order": 1,
                },
                {
                    "title": "Backend Developer",
                    "service_number": "02",
                    "description": "Practical, polished solutions shaped around your goals and your customers.",
                    "items": ["Database design", "API development", "Reliable integrations"],
                    "order": 2,
                },
                {
                    "title": "Web Designer",
                    "service_number": "03",
                    "description": "Practical, polished solutions shaped around your goals and your customers.",
                    "items": ["User interfaces", "Prototyping", "Design systems"],
                    "order": 3,
                },
                {
                    "title": "SEO Specialist",
                    "service_number": "04",
                    "description": "Practical, polished solutions shaped around your goals and your customers.",
                    "items": ["Technical SEO", "Search strategy", "Site optimization"],
                    "order": 4,
                },
            ]
            for s in initial_services:
                Service.objects.create(**s)
            self.stdout.write(self.style.SUCCESS("Services seeded."))

        # 5. Skills
        if SkillCategory.objects.count() == 0:
            frontend_cat = SkillCategory.objects.create(title="Frontend", icon="▣", order=1)
            backend_cat = SkillCategory.objects.create(title="Backend", icon="▧", order=2)
            design_cat = SkillCategory.objects.create(title="Design", icon="✳", order=3)

            frontend_skills = [
                ("HTML", "skills-frontend-1.svg"),
                ("CSS", "skills-frontend-2.svg"),
                ("JavaScript", "skills-frontend-3.svg"),
                ("React", "skills-frontend-4.svg"),
                ("Sass", "skills-frontend-5.svg"),
                ("Git", "skills-frontend-6.svg"),
                ("GitHub", "skills-frontend-7.svg"),
            ]
            for idx, (name, icon) in enumerate(frontend_skills, start=1):
                Skill.objects.create(category=frontend_cat, name=name, icon_legacy=icon, order=idx)

            backend_skills = [
                ("Laravel", "skills-backend-1.svg"),
                ("PostgreSQL", "skills-backend-2.svg"),
                ("Node.js", "skills-backend-3.svg"),
                ("Supabase", "skills-backend-4.svg"),
                ("Socket.io", "skills-backend-5.svg"),
            ]
            for idx, (name, icon) in enumerate(backend_skills, start=1):
                Skill.objects.create(category=backend_cat, name=name, icon_legacy=icon, order=idx)

            design_skills = [
                ("Figma", "skills-design-1.svg"),
                ("Blender", "skills-design-2.svg"),
                ("After Effects", "skills-design-3.svg"),
                ("Photoshop", "skills-design-4.svg"),
                ("Illustrator", "skills-design-5.svg"),
                ("Framer", "skills-design-6.svg"),
            ]
            for idx, (name, icon) in enumerate(design_skills, start=1):
                Skill.objects.create(category=design_cat, name=name, icon_legacy=icon, order=idx)

            self.stdout.write(self.style.SUCCESS("Skills seeded."))

        # 6. Testimonials
        if Testimonial.objects.count() == 0:
            initial_testimonials = [
                {"name": "Sara The", "image_legacy": "testimonial-1.png", "order": 1, "company_or_role": "Product Manager"},
                {"name": "Elemar Rice", "image_legacy": "testimonial-2.png", "order": 2, "company_or_role": "Tech Lead"},
                {"name": "Rita Treds", "image_legacy": "testimonial-3.png", "order": 3, "company_or_role": "Creative Director"},
                {"name": "Augus Drix", "image_legacy": "testimonial-4.png", "order": 4, "company_or_role": "Founder & CEO"},
            ]
            for t in initial_testimonials:
                Testimonial.objects.create(**t)
            self.stdout.write(self.style.SUCCESS("Testimonials seeded."))

        # 7. Social Links
        if SocialLink.objects.count() == 0:
            initial_links = [
                {"label": "Instagram", "href": "https://www.instagram.com/", "icon_name": "Instagram", "order": 1},
                {"label": "LinkedIn", "href": "https://www.linkedin.com/", "icon_name": "Linkedin", "order": 2},
                {"label": "GitHub", "href": "https://github.com/", "icon_name": "Github", "order": 3},
                {"label": "Dribbble", "href": "https://dribbble.com/", "icon_name": "Dribbble", "order": 4},
            ]
            for sl in initial_links:
                SocialLink.objects.create(**sl)
            self.stdout.write(self.style.SUCCESS("Social links seeded."))

        # 8. Experience, Education, Certifications
        if Experience.objects.count() == 0:
            Experience.objects.create(
                position="Full Stack Developer",
                company="Digital Innovation Lab",
                period="2023 - Present",
                description="Designed high-performance web applications using React, Django, and modern cloud architectures.",
                order=1,
            )
            Experience.objects.create(
                position="Frontend Specialist",
                company="Creative Tech Solutions",
                period="2021 - 2023",
                description="Built interactive UI components and design systems for enterprise clients.",
                order=2,
            )
            self.stdout.write(self.style.SUCCESS("Experiences seeded."))

        if Education.objects.count() == 0:
            Education.objects.create(
                degree="Bachelor of Technology in Computer Science",
                institution="National University of Technology",
                year="2019 - 2023",
                description="Specialized in software design, algorithms, and web application architecture.",
                order=1,
            )
            self.stdout.write(self.style.SUCCESS("Education seeded."))

        if Certification.objects.count() == 0:
            Certification.objects.create(
                name="Meta Full-Stack Professional Certificate",
                issuer="Meta",
                issue_date="2023",
                credential_url="https://coursera.org",
                credential_id="META-CERT-2023",
                order=1,
            )
            self.stdout.write(self.style.SUCCESS("Certifications seeded."))

        self.stdout.write(self.style.SUCCESS("Successfully seeded all portfolio data!"))
