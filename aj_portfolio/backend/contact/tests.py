import json

from django.test import TestCase

from .models import ContactMessage


class ContactApiTests(TestCase):
    def test_valid_contact_message_is_saved(self):
        response = self.client.post(
            "/api/contact/",
            data=json.dumps(
                {
                    "name": "Alex",
                    "email": "alex@example.com",
                    "message": "Let's work together.",
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(ContactMessage.objects.get().email, "alex@example.com")

    def test_invalid_email_is_rejected(self):
        response = self.client.post(
            "/api/contact/",
            data=json.dumps(
                {"name": "Alex", "email": "not-an-email", "message": "Hello."}
            ),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_frontend_preflight_is_allowed(self):
        response = self.client.options(
            "/api/contact/",
            HTTP_ORIGIN="http://localhost:3000",
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
        )

        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            response["Access-Control-Allow-Origin"], "http://localhost:3000"
        )
