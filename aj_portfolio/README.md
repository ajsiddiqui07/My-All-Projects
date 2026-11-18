# Bianca / Arbaz Siddiqui Portfolio

A responsive Next.js and Tailwind CSS portfolio with a Django REST Framework backend and a secure Profile Management Dashboard.

## Features

- **Public Portfolio**: Preserves 100% of the original sleek dark aesthetic, animations, responsive design, and layout. All content (hero, about me, projects, services, skills, testimonials, contact details, social links, and footer) is dynamically loaded from the Django database with instant fallback defaults.
- **Private Management Area (`/profile`)**:
  - Secure JWT authentication using Django REST Framework and Simple JWT.
  - Login route at `/profile/login`.
  - Full CRUD management interface:
    - **Personal Information**: Full name, title, location, hero eyebrow/heading/copy, profile picture upload with live preview.
    - **About Me**: Section index, about description, collaboration note, CTA button label.
    - **Projects**: Add, edit, delete projects, cover image uploads, technologies, GitHub links, live demo links, and display order.
    - **Skills & Toolkit**: Manage categories (Frontend, Backend, Design) and technologies with custom icon uploads and ordering.
    - **Services**: Manage service numbers, titles, descriptions, feature bullet lists, and ordering.
    - **Experience & Education**: Manage work history, degrees, institutions, and descriptions.
    - **Certifications**: Manage credentials, issuers, verification URLs, and credential IDs.
    - **Testimonials**: Manage client names, company/roles, ratings, reviews, and avatars.
    - **Contact & Social Links**: Email, phone, Google Maps location, and social media platforms.
    - **Resume & SEO**: PDF/CV document uploads, browser tab title, meta description, and keywords.
  - Only authorized administrators (`is_staff` / `is_superuser`) can access `/profile` and management APIs.
  - Automatic token refresh, secure logout, and redirection of unauthenticated users.

---

## Getting Started

### 1. Django Backend Setup

Open a terminal:

```powershell
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_portfolio
python manage.py runserver
```

> **Default Admin Credentials:**
> - **Username:** `admin`
> - **Password:** `adminpassword123`
>
> *(To change the password anytime, run: `python manage.py changepassword admin`)*

Backend will run on `http://localhost:8000`.

### 2. Frontend Setup

In another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`.

---

## Routes

| Route | Description | Access |
|---|---|---|
| `/` | Public portfolio website (design and layout preserved exactly) | Public |
| `/profile/login` | Administrator login with JWT authentication | Public |
| `/profile` | Private portfolio studio dashboard | Admin Only |

---

## API Endpoints

- `GET /api/portfolio/`: Aggregated public portfolio payload (no auth required)
- `POST /api/auth/token/`: Obtain JWT access and refresh token pair
- `POST /api/auth/token/refresh/`: Refresh expired access token
- `GET /api/auth/me/`: Current admin user verification
- `GET /api/overview/`: Dashboard statistics and counts
- `GET / POST / PATCH / DELETE /api/profile-data/`: Personal profile and SEO information
- `GET / POST / PATCH / DELETE /api/projects/`: Project CRUD with file uploads
- `GET / POST / PATCH / DELETE /api/skill-categories/`: Skill category CRUD
- `GET / POST / PATCH / DELETE /api/skills/`: Skill CRUD with icon uploads
- `GET / POST / PATCH / DELETE /api/services/`: Services CRUD
- `GET / POST / PATCH / DELETE /api/testimonials/`: Testimonials CRUD with avatar uploads
- `GET / POST / PATCH / DELETE /api/social-links/`: Social media links CRUD
- `GET / POST / PATCH / DELETE /api/experiences/`: Work experience CRUD
- `GET / POST / PATCH / DELETE /api/education/`: Education CRUD
- `GET / POST / PATCH / DELETE /api/certifications/`: Certifications CRUD
- `POST /api/contact/`: Public contact form submission
- `GET /api/health/`: Service health check
