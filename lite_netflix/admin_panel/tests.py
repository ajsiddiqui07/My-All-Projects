import tempfile
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from netflix_lite.models import Movie, MovieList


class AdminPanelTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        # Create a superuser
        self.superuser = User.objects.create_superuser(
            username='test_superuser',
            email='superuser@example.com',
            password='SuperSecretPassword123!'
        )

        # Create a regular user
        self.regular_user = User.objects.create_user(
            username='test_regular',
            email='regular@example.com',
            password='RegularPassword123!'
        )

        # Create a sample movie
        # 1x1 GIF for test image
        dummy_image = (
            b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x80\x00\x00'
            b'\xff\xff\xff\x00\x00\x00\x21\xf9\x04\x01\x00\x00\x00'
            b'\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02'
            b'\x44\x01\x00\x3b'
        )
        self.card_file = SimpleUploadedFile("card.gif", dummy_image, content_type="image/gif")
        self.cover_file = SimpleUploadedFile("cover.gif", dummy_image, content_type="image/gif")
        self.video_file = SimpleUploadedFile("movie.mp4", b"dummy video content", content_type="video/mp4")

        self.movie = Movie.objects.create(
            title='Inception Test',
            description='A mind-bending thriller about dream infiltration.',
            release_date='2020-07-16',
            genre='science_fiction',
            length=148,
            image_card=self.card_file,
            image_cover=self.cover_file,
            video=self.video_file,
            movie_views=42
        )

        # Create a MovieList entry
        self.movie_list_entry = MovieList.objects.create(
            owner_user=self.regular_user,
            movie=self.movie
        )

    # ========================================================
    # 1. AUTHENTICATION & ACCESS CONTROL TESTS
    # ========================================================

    def test_unauthenticated_user_redirected_to_admin_login(self):
        """Unauthenticated visitors must be redirected to admin login page."""
        response = self.client.get(reverse('admin_panel:dashboard'))
        self.assertEqual(response.status_code, 302)
        self.assertTrue(response.url.startswith(reverse('admin_panel:login')))

    def test_regular_user_access_denied_to_admin_routes(self):
        """Ordinary logged-in users must be denied access to admin panel."""
        self.client.login(username='test_regular', password='RegularPassword123!')
        response = self.client.get(reverse('admin_panel:dashboard'))
        self.assertEqual(response.status_code, 302)
        self.assertTrue(response.url.startswith(reverse('admin_panel:login')))

    def test_superuser_successful_admin_login(self):
        """Superuser can successfully authenticate on the admin login page."""
        response = self.client.post(reverse('admin_panel:login'), {
            'username': 'test_superuser',
            'password': 'SuperSecretPassword123!',
            'remember_me': True
        })
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('admin_panel:dashboard'))

    def test_invalid_login_credentials_rejected(self):
        """Invalid credentials show error and reject login."""
        response = self.client.post(reverse('admin_panel:login'), {
            'username': 'test_superuser',
            'password': 'WrongPassword!',
        })
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Invalid username or password")

    def test_regular_user_rejected_on_admin_login_form(self):
        """Ordinary users entering credentials on admin login form are denied access."""
        response = self.client.post(reverse('admin_panel:login'), {
            'username': 'test_regular',
            'password': 'RegularPassword123!',
        })
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Access Denied")

    def test_admin_logout_terminates_session(self):
        """Logging out terminates the session and redirects to admin login."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')
        response = self.client.get(reverse('admin_panel:logout'))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('admin_panel:login'))

    # ========================================================
    # 2. DASHBOARD VIEW TESTS
    # ========================================================

    def test_dashboard_renders_with_real_database_metrics(self):
        """Dashboard renders with accurate database counts."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')
        response = self.client.get(reverse('admin_panel:dashboard'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['total_movies'], 1)
        self.assertEqual(response.context['total_users'], 2)
        self.assertEqual(response.context['total_views'], 42)
        self.assertEqual(response.context['total_my_list'], 1)
        self.assertIn('charts_json', response.context)

    # ========================================================
    # 3. MOVIE MANAGEMENT TESTS
    # ========================================================

    def test_movie_list_renders_and_filters(self):
        """Movie list renders, supports searching and genre filtering."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        # Normal list
        response = self.client.get(reverse('admin_panel:movie_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Inception Test')

        # Search matching
        response = self.client.get(reverse('admin_panel:movie_list') + '?q=Inception')
        self.assertContains(response, 'Inception Test')

        # Search non-matching
        response = self.client.get(reverse('admin_panel:movie_list') + '?q=NonExistentMovie')
        self.assertContains(response, 'No movies match your criteria')

        # Filter by genre
        response = self.client.get(reverse('admin_panel:movie_list') + '?genre=science_fiction')
        self.assertContains(response, 'Inception Test')

        response = self.client.get(reverse('admin_panel:movie_list') + '?genre=romance')
        self.assertContains(response, 'No movies match your criteria')

    def test_movie_create(self):
        """Admin can create a new movie with media files."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        dummy_img = (
            b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x80\x00\x00'
            b'\xff\xff\xff\x00\x00\x00\x21\xf9\x04\x01\x00\x00\x00'
            b'\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02'
            b'\x44\x01\x00\x3b'
        )
        card = SimpleUploadedFile("card2.gif", dummy_img, content_type="image/gif")
        cover = SimpleUploadedFile("cover2.gif", dummy_img, content_type="image/gif")
        vid = SimpleUploadedFile("vid2.mp4", b"dummy video", content_type="video/mp4")

        response = self.client.post(reverse('admin_panel:movie_add'), {
            'title': 'The Dark Knight Test',
            'description': 'Batman fights the Joker in Gotham City.',
            'release_date': '2008-07-18',
            'genre': 'action',
            'length': 152,
            'image_card': card,
            'image_cover': cover,
            'video': vid,
        })
        self.assertEqual(response.status_code, 302)
        self.assertTrue(Movie.objects.filter(title='The Dark Knight Test').exists())

    def test_movie_edit(self):
        """Admin can edit an existing movie without re-uploading media."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        response = self.client.post(reverse('admin_panel:movie_edit', kwargs={'pk': str(self.movie.uu_id)}), {
            'title': 'Inception Remastered',
            'description': 'Updated description.',
            'release_date': '2020-07-16',
            'genre': 'science_fiction',
            'length': 150,
        })
        self.assertEqual(response.status_code, 302)
        self.movie.refresh_from_db()
        self.assertEqual(self.movie.title, 'Inception Remastered')
        self.assertEqual(self.movie.length, 150)

    def test_movie_preview(self):
        """Movie preview page displays movie details and stream player."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')
        response = self.client.get(reverse('admin_panel:movie_preview', kwargs={'pk': str(self.movie.uu_id)}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Inception Test')
        self.assertContains(response, 'Science Fiction')

    def test_movie_delete(self):
        """Admin can delete a movie."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')
        movie_uuid = str(self.movie.uu_id)
        response = self.client.post(reverse('admin_panel:movie_delete', kwargs={'pk': movie_uuid}))
        self.assertEqual(response.status_code, 302)
        self.assertFalse(Movie.objects.filter(uu_id=movie_uuid).exists())

    # ========================================================
    # 4. USER MANAGEMENT TESTS
    # ========================================================

    def test_user_list_and_search(self):
        """User list displays accounts and supports search by username/email."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        response = self.client.get(reverse('admin_panel:user_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'test_superuser')
        self.assertContains(response, 'test_regular')

        # Search
        response = self.client.get(reverse('admin_panel:user_list') + '?q=test_regular')
        self.assertContains(response, 'test_regular')

    def test_user_create_with_hashed_password(self):
        """Admin creates a new user; password must be properly hashed."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        response = self.client.post(reverse('admin_panel:user_add'), {
            'username': 'new_created_user',
            'email': 'newuser@example.com',
            'first_name': 'New',
            'last_name': 'User',
            'password': 'SecureCreatedPass123!',
            'password_confirm': 'SecureCreatedPass123!',
            'is_active': True,
            'is_staff': False,
            'is_superuser': False,
        })
        self.assertEqual(response.status_code, 302)
        created_user = User.objects.get(username='new_created_user')
        self.assertTrue(created_user.check_password('SecureCreatedPass123!'))
        self.assertNotEqual(created_user.password, 'SecureCreatedPass123!')

    def test_user_self_demotion_prevented(self):
        """Logged-in admin cannot remove their own superuser status."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        response = self.client.post(reverse('admin_panel:user_edit', kwargs={'user_id': self.superuser.id}), {
            'username': 'test_superuser',
            'email': 'superuser@example.com',
            'first_name': '',
            'last_name': '',
            'is_active': True,
            'is_staff': True,
            'is_superuser': False,  # Attempting self demotion
        })
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "You cannot remove your own superuser privileges")
        self.superuser.refresh_from_db()
        self.assertTrue(self.superuser.is_superuser)

    def test_user_self_deactivation_prevented(self):
        """Admin cannot deactivate their own account."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        response = self.client.post(reverse('admin_panel:user_toggle_status', kwargs={'user_id': self.superuser.id}))
        self.assertEqual(response.status_code, 302)
        self.superuser.refresh_from_db()
        self.assertTrue(self.superuser.is_active)

    def test_user_delete_self_prevented(self):
        """Admin cannot delete their own account."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        response = self.client.post(reverse('admin_panel:user_delete', kwargs={'user_id': self.superuser.id}))
        self.assertEqual(response.status_code, 302)
        self.assertTrue(User.objects.filter(id=self.superuser.id).exists())

    def test_toggle_user_active_status(self):
        """Admin can toggle another user's active status."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        # Deactivate regular user
        response = self.client.post(reverse('admin_panel:user_toggle_status', kwargs={'user_id': self.regular_user.id}))
        self.assertEqual(response.status_code, 302)
        self.regular_user.refresh_from_db()
        self.assertFalse(self.regular_user.is_active)

        # Reactivate regular user
        response = self.client.post(reverse('admin_panel:user_toggle_status', kwargs={'user_id': self.regular_user.id}))
        self.assertEqual(response.status_code, 302)
        self.regular_user.refresh_from_db()
        self.assertTrue(self.regular_user.is_active)

    def test_admin_reset_user_password(self):
        """Admin resets a user's password securely."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        response = self.client.post(reverse('admin_panel:user_password', kwargs={'user_id': self.regular_user.id}), {
            'new_password': 'BrandNewPassword999!',
            'confirm_password': 'BrandNewPassword999!',
        })
        self.assertEqual(response.status_code, 302)
        self.regular_user.refresh_from_db()
        self.assertTrue(self.regular_user.check_password('BrandNewPassword999!'))

    # ========================================================
    # 5. MY LIST MANAGEMENT TESTS
    # ========================================================

    def test_my_list_management_view_and_delete(self):
        """Admin can view saved bookmarks and remove an entry."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        response = self.client.get(reverse('admin_panel:my_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'test_regular')
        self.assertContains(response, 'Inception Test')

        # Remove bookmark entry
        entry_id = self.movie_list_entry.id
        response = self.client.post(reverse('admin_panel:my_list_delete', kwargs={'item_id': entry_id}))
        self.assertEqual(response.status_code, 302)
        self.assertFalse(MovieList.objects.filter(id=entry_id).exists())

    # ========================================================
    # 6. ADMIN PROFILE & SETTINGS TESTS
    # ========================================================

    def test_admin_profile_update(self):
        """Admin can update their own profile information."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        response = self.client.post(reverse('admin_panel:profile'), {
            'action': 'update_profile',
            'username': 'test_superuser',
            'email': 'updated_super@example.com',
            'first_name': 'Chief',
            'last_name': 'Admin',
        })
        self.assertEqual(response.status_code, 302)
        self.superuser.refresh_from_db()
        self.assertEqual(self.superuser.email, 'updated_super@example.com')
        self.assertEqual(self.superuser.first_name, 'Chief')

    def test_admin_settings_view_and_clearsessions(self):
        """Settings page displays diagnostics and executes session cleanup."""
        self.client.login(username='test_superuser', password='SuperSecretPassword123!')

        response = self.client.get(reverse('admin_panel:settings'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Django')
        self.assertContains(response, 'Python')

        # Session cleanup POST
        response = self.client.post(reverse('admin_panel:settings'), {
            'action': 'clear_sessions'
        })
        self.assertEqual(response.status_code, 302)

    # ========================================================
    # 7. PUBLIC FRONTEND INTEGRITY TESTS
    # ========================================================

    def test_public_frontend_remains_intact(self):
        """Verify that existing public Netflix pages still work perfectly."""
        # Public login page
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)

        # Public signup page
        response = self.client.get(reverse('signup'))
        self.assertEqual(response.status_code, 200)

        # Log in as ordinary user
        self.client.login(username='test_regular', password='RegularPassword123!')

        # Public home page
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Inception Test')

        # Public movie player page
        response = self.client.get(reverse('movie', kwargs={'pk': str(self.movie.uu_id)}))
        self.assertEqual(response.status_code, 200)

        # Public genre page
        response = self.client.get(reverse('genre', kwargs={'pk': 'science_fiction'}))
        self.assertEqual(response.status_code, 200)

        # Public My List page
        response = self.client.get(reverse('my-list'))
        self.assertEqual(response.status_code, 200)
