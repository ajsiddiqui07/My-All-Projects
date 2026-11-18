from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model

from contact.models import ContactMessage
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
from .serializers import (
    ProfileSerializer,
    ProjectSerializer,
    SkillCategorySerializer,
    SkillSerializer,
    ServiceSerializer,
    TestimonialSerializer,
    SocialLinkSerializer,
    ExperienceSerializer,
    EducationSerializer,
    CertificationSerializer,
)

User = get_user_model()


class IsAdminOrStaff(permissions.BasePermission):
    """
    Allows access only to authenticated admin/staff users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser))


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def public_portfolio(request):
    """
    Public aggregated portfolio payload consumed by the public homepage.
    """
    profile_obj = Profile.objects.first()
    if not profile_obj:
        profile_obj = Profile.objects.create()

    projects = Project.objects.filter(is_featured=True).order_by("order", "id")
    # If no featured filter was set or none match, fetch all projects
    if not projects.exists():
        projects = Project.objects.all().order_by("order", "id")

    services = Service.objects.all().order_by("order", "id")
    skill_categories = SkillCategory.objects.prefetch_related("skills").order_by("order", "id")
    testimonials = Testimonial.objects.all().order_by("order", "id")
    social_links = SocialLink.objects.all().order_by("order", "id")
    experiences = Experience.objects.all().order_by("order", "id")
    education = Education.objects.all().order_by("order", "id")
    certifications = Certification.objects.all().order_by("order", "id")

    return Response({
        "profile": ProfileSerializer(profile_obj, context={"request": request}).data,
        "projects": ProjectSerializer(projects, many=True, context={"request": request}).data,
        "services": ServiceSerializer(services, many=True).data,
        "skill_groups": SkillCategorySerializer(skill_categories, many=True, context={"request": request}).data,
        "testimonials": TestimonialSerializer(testimonials, many=True, context={"request": request}).data,
        "social_links": SocialLinkSerializer(social_links, many=True).data,
        "experiences": ExperienceSerializer(experiences, many=True).data,
        "education": EducationSerializer(education, many=True).data,
        "certifications": CertificationSerializer(certifications, many=True).data,
    })


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    """
    Returns authenticated user info, confirming admin authorization.
    """
    user = request.user
    if not (user.is_staff or user.is_superuser):
        return Response(
            {"detail": "You do not have administrative access to the profile management area."},
            status=status.HTTP_403_FORBIDDEN,
        )
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
    })


@api_view(["GET"])
@permission_classes([IsAdminOrStaff])
def admin_overview(request):
    """
    Dashboard overview statistics.
    """
    profile = Profile.objects.first()
    return Response({
        "projects_count": Project.objects.count(),
        "skills_count": Skill.objects.count(),
        "categories_count": SkillCategory.objects.count(),
        "services_count": Service.objects.count(),
        "testimonials_count": Testimonial.objects.count(),
        "messages_count": ContactMessage.objects.count(),
        "last_updated": profile.updated_at if profile else None,
        "full_name": profile.full_name if profile else "Arbaz Siddiqui",
        "professional_title": profile.professional_title if profile else "Creative Designer & Web Developer",
    })


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrStaff]

    def list(self, request, *args, **kwargs):
        profile = Profile.objects.first()
        if not profile:
            profile = Profile.objects.create()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by("order", "id")
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrStaff]


class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all().order_by("order", "id")
    serializer_class = SkillCategorySerializer
    permission_classes = [IsAdminOrStaff]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by("order", "id")
    serializer_class = SkillSerializer
    permission_classes = [IsAdminOrStaff]


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by("order", "id")
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrStaff]


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all().order_by("order", "id")
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminOrStaff]


class SocialLinkViewSet(viewsets.ModelViewSet):
    queryset = SocialLink.objects.all().order_by("order", "id")
    serializer_class = SocialLinkSerializer
    permission_classes = [IsAdminOrStaff]


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by("order", "id")
    serializer_class = ExperienceSerializer
    permission_classes = [IsAdminOrStaff]


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all().order_by("order", "id")
    serializer_class = EducationSerializer
    permission_classes = [IsAdminOrStaff]


class CertificationViewSet(viewsets.ModelViewSet):
    queryset = Certification.objects.all().order_by("order", "id")
    serializer_class = CertificationSerializer
    permission_classes = [IsAdminOrStaff]
