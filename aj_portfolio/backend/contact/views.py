import json

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .models import ContactMessage


@require_GET
def health(request):
    return JsonResponse({"status": "ok"})


@csrf_exempt
@require_POST
def contact(request):
    if request.content_type != "application/json":
        return JsonResponse({"error": "Content-Type must be application/json."}, status=415)

    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Request body must be valid JSON."}, status=400)

    if not isinstance(data, dict):
        return JsonResponse({"error": "Request body must be a JSON object."}, status=400)

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    if not all(isinstance(value, str) for value in (name, email, message)):
        return JsonResponse({"error": "Name, email, and message are required."}, status=400)

    name, email, message = name.strip(), email.strip(), message.strip()
    if not name or len(name) > 120:
        return JsonResponse({"error": "Name must be between 1 and 120 characters."}, status=400)
    if len(email) > 254:
        return JsonResponse({"error": "Email must be 254 characters or fewer."}, status=400)
    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({"error": "Enter a valid email address."}, status=400)
    if not message or len(message) > 5000:
        return JsonResponse({"error": "Message must be between 1 and 5000 characters."}, status=400)

    ContactMessage.objects.create(name=name, email=email, message=message)
    return JsonResponse({"message": "Your message has been received."}, status=201)
