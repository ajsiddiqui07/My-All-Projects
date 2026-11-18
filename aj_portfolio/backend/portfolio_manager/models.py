from django.db import models


class Profile(models.Model):
    full_name = models.CharField(max_length=150, default="Arbaz Siddiqui")
    brand_name = models.CharField(max_length=100, default="Bianca")
    professional_title = models.CharField(max_length=200, default="Creative Designer & Web Developer")
    location = models.CharField(max_length=150, default="Surat")
    hero_eyebrow = models.CharField(max_length=255, default="Hi! I'm Arbaz Siddiqui Based in Surat")
    hero_heading_line1 = models.CharField(max_length=200, default="Creative Designer")
    hero_heading_line2 = models.CharField(max_length=200, default="Web Developer")
    hero_description = models.TextField(default="I build designs and websites that solve problems,\ninspiring success.")
    profile_picture = models.ImageField(upload_to="profile/", null=True, blank=True)
    profile_picture_legacy = models.CharField(max_length=255, default="home-img.png", blank=True)

    about_section_index = models.CharField(max_length=100, default="01 / A LITTLE ABOUT ME")
    about_description = models.TextField(
        default="About Me: Passionate Full Stack Developer specializing in Python, Django REST Framework, JavaScript, React, and SQL. I enjoy creating modern web applications and turning ideas into practical digital solutions. I also leverage AI-powered tools and vibe coding workflows to accelerate development, simplify learning, solve problems, and improve productivity. Always eager to explore new technologies and build something meaningful."
    )
    about_note = models.TextField(
        default="If you have a project in mind, take a look at my work and let's make something meaningful together."
    )
    about_cta_text = models.CharField(max_length=100, default="Let's talk")

    email = models.EmailField(max_length=254, default="bianca123@email.com")
    phone = models.CharField(max_length=50, default="+99 123 456 7890")
    location_display = models.CharField(max_length=150, default="Lima, Peru")
    location_url = models.URLField(max_length=500, default="https://maps.google.com/?q=Lima+Peru")

    services_intro = models.TextField(
        default="I independently build attractive, responsive, and secure web applications tailored to your needs. From planning and design to development and deployment, I focus on delivering complete digital solutions that meet your requirements and provide a smooth user experience."
    )

    footer_text = models.TextField(
        default="Collaborate with Arbaz Siddiqui\nand start your journey in\ncreative development today."
    )
    copyright_text = models.CharField(max_length=255, default="Arbaz Siddiqui. Made with care.")

    resume_file = models.FileField(upload_to="resumes/", null=True, blank=True)

    seo_meta_title = models.CharField(max_length=255, default="Bianca — Creative Designer & Web Developer")
    seo_meta_description = models.TextField(
        default="Creative designer and web developer building thoughtful digital experiences that solve problems and inspire success."
    )
    seo_keywords = models.CharField(max_length=500, default="developer, designer, portfolio, react, django, python", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return f"{self.full_name} ({self.professional_title})"


class Project(models.Model):
    title = models.CharField(max_length=200)
    project_type = models.CharField(max_length=150, default="Web design · Development")
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="projects/", null=True, blank=True)
    image_legacy = models.CharField(max_length=255, blank=True)
    technologies = models.CharField(max_length=300, blank=True)
    github_url = models.URLField(max_length=500, blank=True)
    live_url = models.URLField(max_length=500, blank=True)
    order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class SkillCategory(models.Model):
    title = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, default="▣")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    icon_image = models.ImageField(upload_to="skills/", null=True, blank=True)
    icon_legacy = models.CharField(max_length=255, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.name} ({self.category.title})"


class Service(models.Model):
    service_number = models.CharField(max_length=10, default="01")
    title = models.CharField(max_length=150)
    description = models.TextField(default="Practical, polished solutions shaped around your goals and your customers.")
    items = models.JSONField(default=list, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.service_number} - {self.title}"


class Testimonial(models.Model):
    name = models.CharField(max_length=120)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=5.0)
    rating_stars = models.CharField(max_length=20, default="★★★★★")
    quote = models.TextField(
        default="This young professional is disciplined and delivered a thoughtful, high-quality project. Communication was clear throughout. Great work!"
    )
    image = models.ImageField(upload_to="testimonials/", null=True, blank=True)
    image_legacy = models.CharField(max_length=255, blank=True)
    company_or_role = models.CharField(max_length=150, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class SocialLink(models.Model):
    label = models.CharField(max_length=100)
    href = models.URLField(max_length=500)
    icon_name = models.CharField(max_length=50, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.label


class Experience(models.Model):
    position = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    period = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.position} at {self.company}"


class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    year = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Certification(models.Model):
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    issue_date = models.CharField(max_length=100, blank=True)
    credential_url = models.URLField(max_length=500, blank=True)
    credential_id = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name
