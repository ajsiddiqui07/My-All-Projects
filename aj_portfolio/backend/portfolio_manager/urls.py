from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    public_portfolio,
    current_user,
    admin_overview,
    ProfileViewSet,
    ProjectViewSet,
    SkillCategoryViewSet,
    SkillViewSet,
    ServiceViewSet,
    TestimonialViewSet,
    SocialLinkViewSet,
    ExperienceViewSet,
    EducationViewSet,
    CertificationViewSet,
)

router = DefaultRouter()
router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"skill-categories", SkillCategoryViewSet, basename="skillcategory")
router.register(r"skills", SkillViewSet, basename="skill")
router.register(r"services", ServiceViewSet, basename="service")
router.register(r"testimonials", TestimonialViewSet, basename="testimonial")
router.register(r"social-links", SocialLinkViewSet, basename="sociallink")
router.register(r"experiences", ExperienceViewSet, basename="experience")
router.register(r"education", EducationViewSet, basename="education")
router.register(r"certifications", CertificationViewSet, basename="certification")
router.register(r"profile-data", ProfileViewSet, basename="profiledata")

urlpatterns = [
    # Public aggregated endpoint for the main portfolio
    path("portfolio/", public_portfolio, name="public-portfolio"),
    # Current authenticated admin info
    path("auth/me/", current_user, name="current-user"),
    # Dashboard summary statistics
    path("overview/", admin_overview, name="admin-overview"),
    # DRF CRUD endpoints
    path("", include(router.urls)),
]
