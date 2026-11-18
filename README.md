# TSANGAYA+

### Structured Learning, Attendance & Child Welfare Platform for Tsangaya Communities

TSANGAYA+ is a web-based platform developed to support the organisation and monitoring of complementary basic education activities within Tsangaya communities.

The platform provides a centralised system for managing learning centres, users, learners, learning sessions, attendance, assessments, and learner welfare records.

It is designed to complement existing Quranic education rather than replace the role of Mallams or traditional Islamic learning structures.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Objectives](#2-project-objectives)
3. [Key Features](#3-key-features)
4. [User Roles and Permissions](#4-user-roles-and-permissions)
5. [Learning Structure](#5-learning-structure)
6. [Technology Stack](#6-technology-stack)
7. [System Architecture](#7-system-architecture)
8. [Database Overview](#8-database-overview)
9. [System Requirements](#9-system-requirements)
10. [Installation and Setup](#10-installation-and-setup)
11. [Running the Application](#11-running-the-application)
12. [Application Structure](#12-application-structure)
13. [Testing](#13-testing)
14. [Security and Data Protection](#14-security-and-data-protection)
15. [Current Limitations](#15-current-limitations)
16. [Future Enhancements](#16-future-enhancements)
17. [Project Documentation](#17-project-documentation)
18. [Contributors](#18-contributors)
19. [Acknowledgements](#19-acknowledgements)
20. [License](#20-license)

---

## 1. Project Overview

TSANGAYA+ was developed to address programme management needs associated with complementary education activities in Tsangaya communities.

The platform provides digital tools for:

- Managing learning centres and authorised users.
- Registering and maintaining learner records.
- Organising structured learning sessions.
- Recording learner attendance.
- Monitoring learner performance through assessments.
- Documenting learner welfare needs.
- Monitoring teacher and overall system activities.

The project was informed by field validation and consideration of the operational realities of Tsangaya communities.

The proposed pilot environment is Gwani Chashiya Tsangaya, with a broader programme target of 200–300 Almajirai across four approved Tsangaya centres.

**Project proposal:** Accelerating Basic Literacy Integration and Reducing Out-of-School Children via Tsangaya Scheduling Optimization.

---

## 2. Project Objectives

The main objective is to develop a digital platform that supports the organisation and monitoring of complementary learning activities within Tsangaya communities.

Specific objectives include:

1. Establishing a centralised learner registration system.
2. Supporting structured learning session management.
3. Providing digital attendance recording.
4. Supporting baseline, midline, and endline learner assessments.
5. Providing learner welfare record management.
6. Implementing role-based access control.
7. Improving programme monitoring and record management.

---

## 3. Key Features

### 3.1 Authentication and Role-Based Access

- Secure user authentication.
- Role-specific dashboards.
- Access restrictions based on assigned roles.
- Separate responsibilities for Admins, Programme Officers, and Teachers.

### 3.2 User Management

- Create and manage user accounts.
- Assign system roles.
- Manage relevant user information.
- Associate users with learning centres where applicable.

### 3.3 Learning Centre Management

- Register learning centres.
- View centre records.
- Maintain centre information.

### 3.4 Learning Session Management

- Create and manage learning sessions.
- Assign teachers.
- Associate sessions with centres and subjects.
- Organise sessions by Class A and Class B.
- Manage session statuses.

### 3.5 Learner Management

- Register learners.
- Maintain learner records.
- Associate learners with learning centres.
- Record consent information.
- Manage relevant learner information.

### 3.6 Attendance Management

- Record attendance against learning sessions.
- Track learner participation.
- Record absence reasons.
- Add attendance notes.

### 3.7 Assessment Management

- Record baseline assessments.
- Record midline assessments.
- Record endline assessments.
- Calculate final assessment percentages according to the application's rules.
- Display grades and performance information.
- Maintain assessment score history.

### 3.8 Learner Welfare Management

- Record learner welfare needs.
- Categorise welfare concerns.
- Maintain welfare records.
- Support programme-level welfare monitoring.

Available welfare categories include:

- Clothing.
- Health.
- Learning Materials.
- Other concerns.

### 3.9 Activity Monitoring

- View relevant teacher activities.
- Monitor overall system activities.
- Support administrative oversight and accountability.

---

## 4. User Roles and Permissions

The system has three primary user roles.

| Role              | Responsibilities                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| Admin             | Manages users, learning centres, learning sessions, and overall system activities              |
| Programme Officer | Registers learners, manages learner records and welfare needs, and monitors teacher activities |
| Teacher           | Views assigned learning sessions and records learner attendance and assessments                |

### Admin

The Admin is responsible for managing system resources and administrative operations.

Main responsibilities:

- User management.
- Centre management.
- Learning session management.
- Overall system activity monitoring.

### Programme Officer

The Programme Officer manages learner-related programme activities.

Main responsibilities:

- Learner registration.
- Learner record management.
- Welfare need recording and management.
- Teacher activity monitoring.

The Programme Officer's monitoring responsibilities do not include editing teachers' attendance or assessment records.

### Teacher

The Teacher is responsible for assigned learning activities.

Main responsibilities:

- Viewing assigned sessions.
- Accessing session details.
- Recording attendance.
- Recording assessment scores.
- Reviewing relevant learner assessment information.

Teachers access sessions assigned to their accounts.

---

## 5. Learning Structure

The platform supports three complementary learning subjects:

1. Literacy.
2. Numeracy.
3. Basic Modern Education.

Each subject is organised into two class groups:

- Class A.
- Class B.

Learning sessions contain information such as:

- Learning centre.
- Assigned teacher.
- Subject.
- Class group.
- Topic.
- Session date.
- Session status.

Available session statuses:

- Scheduled.
- Delivered.
- Cancelled.
- Rescheduled.

---

## 6. Technology Stack

TSANGAYA+ was developed using the following technologies:

| Technology   | Purpose                                |
| ------------ | -------------------------------------- |
| Laravel 13   | Backend application framework          |
| PHP          | Server-side programming language       |
| React        | Frontend user interface                |
| TypeScript   | Type-safe frontend development         |
| Inertia.js   | Integration between Laravel and React  |
| Tailwind CSS | Utility-first styling                  |
| shadcn/ui    | Reusable user interface components     |
| Lucide       | Interface icons                        |
| MySQL        | Local development database             |
| Eloquent ORM | Database interaction and relationships |
| Vite         | Frontend development and build tooling |
| Wayfinder    | Type-safe route integration            |
| Git          | Version control                        |
| GitHub       | Source code hosting and collaboration  |

---

## 7. System Architecture

TSANGAYA+ follows an integrated client-server architecture.

The frontend is developed with React and TypeScript, while Laravel handles server-side requests, authentication, validation, business logic, and database operations.

Inertia.js connects the frontend and backend.

Eloquent ORM manages communication between the Laravel application and the relational database.

### Request Flow

1. A user interacts with the application through a web browser.
2. The React frontend provides the user interface.
3. Inertia.js communicates application requests to Laravel.
4. Laravel processes requests through routes, middleware, and controllers.
5. Eloquent ORM interacts with the database.
6. The application returns the appropriate response to the frontend.

---

## 8. Database Overview

The database is organised around the major entities and activities within the platform.

The principal application tables include:

| Table                      | Purpose                                  |
| -------------------------- | ---------------------------------------- |
| roles                      | Stores available user roles              |
| users                      | Stores user account information          |
| centres                    | Stores learning centre records           |
| learners                   | Stores learner information               |
| subjects                   | Stores learning subjects                 |
| learning_sessions          | Stores scheduled learning sessions       |
| attendances                | Stores learner attendance records        |
| assessment_records         | Stores learner assessment records        |
| assessment_score_histories | Tracks assessment score changes          |
| learner_class_movements    | Records relevant learner class movements |
| welfare_needs              | Stores learner welfare needs             |
| welfare_supports           | Stores welfare support records           |
| activities                 | Stores relevant system activity records  |

Additional Laravel infrastructure tables may be used for authentication, sessions, caching, and queued jobs depending on the application configuration.

### Database Relationships

The database uses relational links to connect:

- Users to roles and learning centres.
- Learners to learning centres.
- Learning sessions to centres, teachers, and subjects.
- Attendance records to learners and sessions.
- Assessment records to learners and subjects.
- Welfare records to learners.
- Assessment history to assessment records.

The actual migrations in the repository are the source of truth for the implemented database structure.

---

## 9. System Requirements

Before installing the application, ensure that the development environment includes:

- PHP version compatible with the project's Laravel and Composer dependencies.
- Composer.
- Node.js and npm.
- MySQL or another database driver supported by the project configuration.
- Git.
- A modern web browser.

Recommended development tools include:

- Visual Studio Code.
- Laravel Herd or another compatible local PHP environment.
- phpMyAdmin or a database management tool.
- GitHub.

---

## 10. Installation and Setup

Follow these steps to install TSANGAYA+ on a local development machine.

### Step 1: Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/digitaldive34/TSANGAYA_PLUS.git
```

Navigate into the project directory:

```bash
cd TSANGAYA_PLUS
```

### Step 2: Install PHP Dependencies

Run:

```bash
composer install
```

This installs the backend dependencies defined in `composer.json`.

### Step 3: Install Frontend Dependencies

Run:

```bash
npm install
```

This installs the JavaScript and frontend dependencies defined in `package.json`.

### Step 4: Configure the Environment

Create a local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

Open the `.env` file and configure the application environment.

Example MySQL configuration:

```env
APP_NAME=TSANGAYA_PLUS
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tsangaya_plus
DB_USERNAME=root
DB_PASSWORD=
```

Adjust the database username, password, and other values to match your local environment.

**Important:** Create the `tsangaya_plus` database in MySQL before running migrations. The database driver is determined by the local environment configuration.

### Email delivery

When an administrator creates a staff account, TSANGAYA+ sends a welcome email with a link to the sign-in page. The email does not contain the account password; the administrator should share that password through a secure channel.

For local development, the default `MAIL_MAILER=log` writes email content to the Laravel log instead of delivering it. To send real email, configure the SMTP values in `.env` using the settings from your mail provider, for example:

```env
APP_URL=https://your-application-domain.example
MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-smtp-username
MAIL_PASSWORD=your-smtp-password
MAIL_FROM_ADDRESS=your-verified-sender@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

Use the public URL of your deployed application for `APP_URL` so the email's sign-in link works for recipients. Keep SMTP credentials in `.env` and do not commit them to source control.

For Gmail SMTP, use the full Gmail address as `MAIL_USERNAME` and a Google App Password as `MAIL_PASSWORD` (requires 2-Step Verification). A normal Google account password is rejected; Gmail's `535 5.7.8` response indicates the SMTP credentials were not accepted. After changing `.env`, run `php artisan config:clear` if configuration is cached.

### Step 5: Generate the Application Key

Run:

```bash
php artisan key:generate
```

This generates the application encryption key and updates the local environment configuration.

### Step 6: Run Database Migrations

Run:

```bash
php artisan migrate
```

This creates the database tables defined by the application's migrations.

If the project includes seeders required for initial roles or demonstration records, run the appropriate database seeding command:

```bash
php artisan db:seed
```

Only run database seeding when the project's seeders are configured and appropriate for the environment.

### Step 7: Generate or Refresh Wayfinder Routes

If the project requires generated Wayfinder route files and they are not already current, use the generation command configured for the installed Wayfinder version.

Consult the project's Composer scripts and Wayfinder configuration before running a generation command.

### Step 8: Build Frontend Assets

For development:

```bash
npm run dev
```

For a production frontend build:

```bash
npm run build
```

---

## 11. Running the Application

The application requires the Laravel backend and Vite development server during local development.

Open two terminal windows.

**Terminal 1 – Laravel server**

```bash
php artisan serve
```

**Terminal 2 – Vite development server**

```bash
npm run dev
```

Open the application in your browser:

```text
http://127.0.0.1:8000
```

Use an authorised account to log in.

---

## 12. Application Structure

The project follows Laravel and Inertia React application conventions.

Important directories include:

```text
TSANGAYA_PLUS/
│
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   └── Models/
│
├── bootstrap/
│
├── config/
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
│
├── public/
│
├── resources/
│   ├── js/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── routes/
│   └── css/
│
├── routes/
│
├── storage/
│
├── tests/
│
├── package.json
├── composer.json
├── components.json
├── vite.config.ts
└── README.md
```

The structure above describes the main application organisation. Individual files and additional directories may vary according to the current repository.

### Important Directories

**app/Models/**

Contains Eloquent models representing application entities and their database relationships.

**app/Http/Controllers/**

Contains controllers responsible for handling application requests and coordinating application operations.

**app/Http/Middleware/**

Contains middleware used for request processing and access control.

**database/migrations/**

Contains database migration files defining the database schema.

**resources/js/pages/**

Contains React page components used by the Inertia application.

**resources/js/components/**

Contains reusable interface components.

**resources/js/layouts/**

Contains application layout components.

**resources/js/routes/**

Contains generated or integrated route-related frontend files used by Wayfinder.

**routes/**

Contains the application's server-side route definitions.

---

## 13. Testing

The completed application underwent functional testing across its main modules.

Testing covered:

- Authentication.
- Role-based access.
- Admin dashboard.
- User management.
- Centre management.
- Learning session management.
- Learner registration.
- Attendance recording.
- Assessment recording.
- Welfare management.
- Activity monitoring.
- Application navigation.

The developer reported that the implemented features worked successfully during testing, with no unresolved functional issue reported at the conclusion of testing.

### Running Automated Tests

Where automated tests are configured in the project, run:

```bash
php artisan test
```

The command executes the Laravel test suite.

Automated test results should be reviewed separately from manual functional testing results.

Further security, performance, compatibility, and field-based user acceptance testing are recommended before wider deployment.

---

## 14. Security and Data Protection

TSANGAYA+ handles information relating to learners, teachers, learning centres, attendance, assessments, and welfare needs.

The following practices should be observed:

- Use authorised accounts only.
- Keep login credentials confidential.
- Restrict access according to user responsibilities.
- Avoid unnecessary collection of personal information.
- Protect children's records from unauthorised disclosure.
- Use secure environment configuration.
- Keep production debugging disabled.
- Maintain regular database backups.
- Review access permissions periodically.

The `.env` file contains sensitive configuration information and should not be committed to the public repository.

---

## 15. Current Limitations

The current version is a web-based application.

The following limitations should be considered:

1. Normal server and database operations require internet or network connectivity to the application server.
2. Offline attendance recording and automatic synchronisation are not implemented.
3. PWA installation support is a proposed future enhancement.
4. Wider field deployment requires additional validation and user acceptance testing.
5. Further security and performance assessments are recommended.

---

## 16. Future Enhancements

The following improvements are proposed for future development:

### Progressive Web App Support

Transform the platform into an installable Progressive Web App on supported devices.

### Offline Attendance Recording

Allow teachers to record attendance when internet connectivity is unavailable.

### Automatic Data Synchronisation

Synchronise approved offline records with the central database when connectivity returns.

### Improved Reporting and Analytics

Provide downloadable reports, attendance summaries, assessment analysis, and centre-level performance reports.

### Enhanced Welfare Monitoring

Introduce improved follow-up processes, case tracking, and welfare support history.

### Multilingual Support

Explore Hausa language support to improve accessibility for intended users.

### Notifications and Reminders

Introduce relevant reminders for learning sessions, assessment activities, and welfare follow-up.

These are proposed enhancements and are not features of the current implementation.

---

## 17. Project Documentation

Additional project documentation includes:

- Software Requirements Specification (SRS).
- System Design and Architecture Document.
- Functional Specification and Use Cases Document.
- Database Schema and Data Dictionary.
- System User Manual.
- Testing and Quality Assurance Report.
- Project Recommendations and Future Enhancements.
- Project Presentation Notes.

These documents provide further information about the project's requirements, implementation, database design, usage, testing, and future development.

---

## 18. Contributors

**HCM Foundation – Group B**

| Name                    | Project Role                                 |
| ----------------------- | -------------------------------------------- |
| Abduljalil Abdulrahman  | Project Lead / PM & Research Lead            |
| [Your Name]             | Software Development Lead                    |
| Joel Arinze Jonathan    | Data Science Lead                            |
| Habiba Abdulkarim Kwami | Entrepreneurship & Business Development Lead |

### Supervisors

- **Head Supervisor:** Bashir Hassan.
- **Co-Supervisor:** Jerry Anjungu.

---

## 19. Acknowledgements

We acknowledge the support and guidance of the HCM Foundation, our supervisors, instructors, project team members, and the Tsangaya community stakeholders whose contributions helped shape the direction of this project.

We also appreciate the Mallams and other stakeholders who participated in the needs assessment and provided insights into the practical realities of Tsangaya education.

---

## 20. License

This project was developed as an HCM Foundation capstone project.

The repository's owner or project team should specify the applicable software licence before distributing or reusing the source code.

---

**TSANGAYA+ — Supporting structured learning, better records, and learner welfare within Tsangaya communities.**
