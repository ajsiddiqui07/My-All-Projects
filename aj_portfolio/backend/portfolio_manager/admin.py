from django.contrib import admin
from .models import (
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

admin.site.register(Profile)
admin.site.register(Project)
admin.site.register(SkillCategory)
admin.site.register(Skill)
admin.site.register(Service)
admin.site.register(Testimonial)
admin.site.register(SocialLink)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Certification)
