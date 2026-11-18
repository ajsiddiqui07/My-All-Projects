from rest_framework import serializers
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


class ProfileSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()
    resume_file_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = "__all__"

    def get_profile_picture_url(self, obj):
        if obj.profile_picture:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.profile_picture.url)
            return obj.profile_picture.url
        if obj.profile_picture_legacy:
            return f"/assets/img/{obj.profile_picture_legacy}"
        return None

    def get_resume_file_url(self, obj):
        if obj.resume_file:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.resume_file.url)
            return obj.resume_file.url
        return None


class ProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = "__all__"

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        if obj.image_legacy:
            return f"/assets/img/{obj.image_legacy}"
        return None


class SkillSerializer(serializers.ModelSerializer):
    category_title = serializers.ReadOnlyField(source="category.title")
    icon_url = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = "__all__"

    def get_icon_url(self, obj):
        if obj.icon_image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.icon_image.url)
            return obj.icon_image.url
        if obj.icon_legacy:
            return f"/assets/img/{obj.icon_legacy}"
        return None


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = "__all__"


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class TestimonialSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = "__all__"

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        if obj.image_legacy:
            return f"/assets/img/{obj.image_legacy}"
        return None


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = "__all__"


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = "__all__"
