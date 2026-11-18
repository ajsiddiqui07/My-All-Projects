import os
import django
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_api.settings")
django.setup()

from django.test import Client

client = Client()

# 1. Test public portfolio endpoint
res = client.get("/api/portfolio/")
assert res.status_code == 200, f"Expected 200, got {res.status_code}"
data = res.json()
print("✓ Public portfolio 200 OK")

# 2. Test unauthenticated access to protected endpoint (should fail 401)
res_unauth = client.get("/api/profile-data/")
assert res_unauth.status_code == 401
print("✓ Unauthenticated access blocked (401)")

# 3. Test JWT login
res_login = client.post(
    "/api/auth/token/",
    {"username": "admin", "password": "adminpassword123"},
    content_type="application/json",
)
assert res_login.status_code == 200
tokens = res_login.json()
auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {tokens['access']}"}
print("✓ JWT login successful")

# 4. Test Updating Profile Information
profile_id = data["profile"]["id"]
update_data = {
    "full_name": "Arbaz Siddiqui (Updated)",
    "professional_title": "Creative Designer & Full Stack Engineer",
    "location": "Surat, India",
    "brand_name": "Bianca",
}
res_patch = client.patch(
    f"/api/profile-data/{profile_id}/",
    update_data,
    content_type="application/json",
    **auth_headers,
)
assert res_patch.status_code == 200, f"Expected 200, got {res_patch.status_code}: {res_patch.content}"
assert res_patch.json()["full_name"] == "Arbaz Siddiqui (Updated)"
print("✓ Profile update (PATCH) successful")

# Revert name back to original
client.patch(
    f"/api/profile-data/{profile_id}/",
    {"full_name": "Arbaz Siddiqui", "professional_title": "Creative Designer & Web Developer"},
    content_type="application/json",
    **auth_headers,
)

# 5. Test Image Upload on Project
# Create a dummy image
img_io = BytesIO()
dummy_img = Image.new("RGB", (100, 100), color="blue")
dummy_img.save(img_io, format="PNG")
img_io.seek(0)
test_file = SimpleUploadedFile("test_project.png", img_io.read(), content_type="image/png")

res_create_proj = client.post(
    "/api/projects/",
    {
        "title": "New Test Project",
        "project_type": "Full Stack Application",
        "description": "A testing project created by CRUD test",
        "technologies": "Django, Next.js, PostgreSQL",
        "github_url": "https://github.com/example/test",
        "live_url": "https://example.com/live",
        "order": 10,
        "is_featured": True,
        "image": test_file,
    },
    **auth_headers,
)
assert res_create_proj.status_code == 201, f"Expected 201, got {res_create_proj.status_code}: {res_create_proj.content}"
created_proj_id = res_create_proj.json()["id"]
print(f"✓ Project creation with image upload successful (ID: {created_proj_id})")

# 6. Test Updating the created project
res_update_proj = client.patch(
    f"/api/projects/{created_proj_id}/",
    {"title": "Updated Test Project"},
    content_type="application/json",
    **auth_headers,
)
assert res_update_proj.status_code == 200
assert res_update_proj.json()["title"] == "Updated Test Project"
print("✓ Project update successful")

# 7. Test Deleting the test project
res_del_proj = client.delete(f"/api/projects/{created_proj_id}/", **auth_headers)
assert res_del_proj.status_code == 204
print("✓ Project deletion successful")

# 8. Test Services CRUD
res_service = client.post(
    "/api/services/",
    {
        "service_number": "05",
        "title": "Cloud Architecture",
        "description": "Scalable cloud infrastructures",
        "items": ["AWS", "Docker", "CI/CD"],
        "order": 5,
    },
    content_type="application/json",
    **auth_headers,
)
assert res_service.status_code == 201
new_svc_id = res_service.json()["id"]
print(f"✓ Service creation successful (ID: {new_svc_id})")

res_del_svc = client.delete(f"/api/services/{new_svc_id}/", **auth_headers)
assert res_del_svc.status_code == 204
print("✓ Service deletion successful")

print("\nALL BACKEND TESTS INCLUDING IMAGE UPLOADS AND CRUD PASSED!")
