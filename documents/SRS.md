# TSANGAYA+

## SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

**Project Title:** Structured Learning, Attendance and Child Welfare Platform for Tsangaya Communities

**Organisation:** HCM Foundation — Group B  
**Project Lead:** Abduljalil Abdulrahman  
**Software Development Lead:** Asmau Maharazu  
**Data Science Lead:** Joel Arinze Jonathan  
**Entrepreneurship and Business Development Lead:** Habiba Abdulkarim Kwami  
**Head Supervisor:** Bashir Hassan  
**Co-Supervisor:** Jerry Anjungu

**Document Version:** 2.0  
**Date:** 13 November 2026  
**Document Status:** Updated implementation-aligned specification  
**Project Repository:** digitaldive34/TSANGAYA_PLUS

---

# DOCUMENT CONTROL

| Item                  | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| Document title        | TSANGAYA+ Software Requirements Specification                             |
| Version               | 2.0                                                                       |
| Previous version      | 1.1                                                                       |
| Date                  | 13 November 2026                                                          |
| Prepared by           | Software Development Lead                                                 |
| Development framework | Laravel 13                                                                |
| Frontend              | React, TypeScript and Inertia.js                                          |
| UI framework          | Tailwind CSS and shadcn/ui                                                |
| Database              | Relational database; deployment configuration dependent                   |
| Intended audience     | Project team, supervisors, developers, testers and programme stakeholders |
| Status                | Updated implementation-aligned documentation                              |

### Revision history

| Version | Description                                                                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0     | Initial requirements specification                                                                                                                    |
| 1.1     | Revised proposal-aligned requirements and pilot scope                                                                                                 |
| 2.0     | Updated to reflect the developed system, implemented role permissions, actual workflows, technical architecture, testing and planned PWA enhancements |

# 1. INTRODUCTION

## 1.1 Purpose

This Software Requirements Specification defines the purpose, scope, functionality, technical requirements, operational expectations and constraints of the TSANGAYA+ platform.

It provides a comprehensive reference for understanding the system, its users, the services it provides, the information it manages and the technical environment in which it operates.

The document is intended to support system maintenance, future development, testing, evaluation and possible expansion.

## 1.2 Project Overview

TSANGAYA+ is a web-based structured learning, attendance and child welfare management platform developed to support foundational education programmes within Tsangaya communities.

The platform provides digital tools for managing learner registration, learning sessions, attendance, assessments, academic progress and welfare needs.

It is designed to complement existing Quranic education by helping programme personnel organise and monitor additional foundational learning activities.

The system does not replace Mallams, Quranic teachers, Islamic learning or the responsibilities of programme management.

## 1.3 Problem Statement

Managing learner information, attendance, learning activities, assessments and welfare records manually can make it difficult to maintain accurate information and monitor programme implementation.

Paper-based records may be difficult to consolidate, retrieve, update and analyse. They can also limit the ability of programme personnel to monitor learner participation and identify areas requiring intervention.

TSANGAYA+ addresses these challenges by providing a centralised digital platform through which authorised personnel can manage and monitor relevant programme information.

## 1.4 Objectives

The objectives of TSANGAYA+ are to:

1. Provide a centralised system for managing learner information.
2. Support the registration and management of Almajirai.
3. Provide unique identification codes for registered learners.
4. Support structured learning session management.
5. Enable teachers to record learner attendance.
6. Maintain attendance history.
7. Support baseline, midline and endline assessments.
8. Monitor learner performance and progress.
9. Document identified learner welfare needs.
10. Maintain records of support provided to learners.
11. Provide role-specific dashboards and access permissions.
12. Support programme monitoring and accountability.
13. Improve the organisation and accessibility of programme records.
14. Protect children's information through appropriate access restrictions.
15. Provide a foundation for future improvements, including PWA and offline functionality.

## 1.5 Intended Audience

This document is intended for:

- Project supervisors.
- HCM Foundation.
- Project and programme leadership.
- Software developers.
- System administrators.
- Programme Officers.
- Mallams and Teachers.
- Software testers and future maintainers.

# 2. PROJECT BACKGROUND

## 2.1 Programme Background

The project forms part of an initiative to improve access to foundational literacy, numeracy and basic modern education among Almajirai in participating Tsangaya communities.

The programme was designed around a 12-month implementation plan.

The initial pilot is associated with Gwani Chashiya Tsangaya.

The wider programme target is approximately 200–300 learners across four approved Tsangayas. This is a programme target and should not be interpreted as the actual number of learners currently registered in the software.

## 2.2 Field Validation

Initial field validation involved five Mallam interviews and three learner records.

The exercise provided useful information about existing learning arrangements, technology readiness, internet connectivity and the willingness of participating Mallams to adopt digital tools.

The findings informed the design of the platform, particularly the need for a simple interface, practical attendance management and respect for existing Quranic learning schedules.

## 2.3 Guiding Principles

TSANGAYA+ follows these principles:

- Complement Quranic education rather than replace it.
- Respect the authority and responsibilities of Mallams.
- Protect children's personal information.
- Keep the interface simple and accessible.
- Restrict information according to user responsibilities.
- Maintain accurate and traceable programme records.
- Prioritise practical functionality over unnecessary complexity.
- Introduce additional features only when justified by programme needs and technical feasibility.

# 3. SYSTEM SCOPE

## 3.1 Current System Scope

The developed application includes the following functional areas:

1. User authentication and role-based access.
2. User account management.
3. Tsangaya centre management.
4. Learner registration and management.
5. Learning session management.
6. Attendance recording.
7. Assessment management.
8. Assessment score history.
9. Learner class management.
10. Welfare needs management.
11. Welfare support records.
12. Role-specific dashboards.
13. Programme monitoring.
14. System activity monitoring.
15. User profile management.

## 3.2 Out-of-Scope Features

The following are not part of the current implementation:

- Native Android or iOS applications.
- Full offline data entry and synchronisation.
- QR-code attendance scanning.
- Facial recognition or biometric identification.
- Online payments.
- Payroll management.
- Parent or guardian portals.
- Automated food distribution and inventory management.
- AI-based tutoring.
- Predictive learner performance analytics.
- Automatic expansion to all approved Tsangaya centres.
- Formal educational certification.

## 3.3 Future Enhancements

The following are recommended for subsequent versions:

- Progressive Web Application (PWA) support.
- Installable mobile and desktop application experience.
- Offline attendance recording.
- Local browser-based data storage.
- Automatic or manual synchronisation when internet connectivity returns.
- Synchronisation conflict detection and resolution.
- Enhanced reporting and analytics.
- QR-based attendance, subject to feasibility and user testing.
- Additional centre support following pilot evaluation.

These are proposed enhancements, not features currently available in the implemented version.

# 4. USER ROLES AND RESPONSIBILITIES

The system uses three principal user roles.

## 4.1 Admin

The Admin is responsible for managing the platform's administrative operations.

Admin permissions include:

- Accessing the Admin dashboard.
- Creating and managing user accounts.
- Assigning roles to users.
- Managing user account status.
- Creating and managing Tsangaya centres.
- Creating and managing learning sessions.
- Viewing overall system activity.
- Accessing administrative settings where available.

The Admin role is not responsible for learner registration or routine welfare management.

## 4.2 Programme Officer

The Programme Officer is responsible for learner registration, welfare documentation and programme monitoring.

Permissions include:

- Accessing the Programme Officer dashboard.
- Registering new learners.
- Viewing learner records.
- Updating learner information where authorised.
- Managing learner welfare needs.
- Recording support provided to learners.
- Monitoring attendance records.
- Monitoring assessment information.
- Reviewing teacher activities.
- Monitoring programme implementation.

The Programme Officer has monitoring responsibilities and does not directly edit teachers' attendance or assessment records through the monitoring functions.

## 4.3 Teacher

The Teacher is responsible for delivering and documenting assigned learning activities.

Permissions include:

- Accessing the Teacher dashboard.
- Viewing assigned learning sessions.
- Viewing learners associated with permitted teaching responsibilities.
- Viewing assigned subjects and class groups.
- Recording learner attendance.
- Viewing attendance records for assigned sessions.
- Recording assessment scores.
- Reviewing learner assessment information.
- Viewing relevant learning history.

Teachers should only access sessions and information permitted by their assigned responsibilities.

## 4.4 Learners

Learners are beneficiaries of the programme. They do not require individual login accounts in the current version.

# 5. PROGRAMME AND LEARNING STRUCTURE

## 5.1 Learning Subjects

The programme supports three teaching areas:

1. Basic Literacy.
2. Numeracy.
3. Basic Modern Education.

Basic Modern Education may include practical life skills, personal hygiene and other approved foundational learning activities.

## 5.2 Class Groups

The programme uses two learning groups:

| Class   | Intended age range        | Learning objective                                    |
| ------- | ------------------------- | ----------------------------------------------------- |
| Class A | 10 years and below        | Foundational learning broadly comparable to Primary 1 |
| Class B | Above 10 through 15 years | Learning broadly comparable to Primary 5/6            |

These are programme learning targets and do not constitute formal school placement or certification.

## 5.3 Teaching Arrangements

The proposed teaching structure includes three teachers, with one assigned to each subject area.

Each subject is organised around Class A and Class B.

The system records the assigned teacher, subject, centre, class group, topic, date and session status.

## 5.4 Learning Session Status

The system supports the following statuses:

- Scheduled
- Delivered
- Cancelled
- Rescheduled

# 6. SYSTEM ARCHITECTURE AND TECHNOLOGY

## 6.1 Technology Stack

| Component            | Technology                            |
| -------------------- | ------------------------------------- |
| Backend framework    | Laravel 13                            |
| Frontend framework   | React                                 |
| Programming language | PHP and TypeScript                    |
| Frontend integration | Inertia.js                            |
| Styling              | Tailwind CSS                          |
| Component library    | shadcn/ui                             |
| Icons                | Lucide                                |
| Build tool           | Vite                                  |
| Route generation     | Laravel Wayfinder                     |
| Database             | Relational database                   |
| Authentication       | Laravel authentication infrastructure |
| Version control      | Git and GitHub                        |

## 6.2 Architectural Overview

TSANGAYA+ follows a client-server web application architecture.

The main communication flow is:

**User's Browser → React/Inertia Interface → Laravel Application → Database**

The frontend provides the user interface and handles user interactions.

The Laravel backend manages application logic, authentication, validation, database operations and access control.

The database stores structured information about users, centres, learners, attendance, learning sessions, assessments, welfare and system activities.

## 6.3 Development Architecture

The application separates responsibilities into:

- Models: represent database entities and relationships.
- Controllers: handle requests and application operations.
- Middleware: restrict access according to authentication and roles.
- Migrations: define database structure.
- React pages: provide application screens.
- Reusable UI components: maintain consistent interface design.
- Route definitions: manage application navigation.

## 6.4 Operating Environment

The system is designed to operate through modern web browsers on:

- Android smartphones.
- Desktop computers.
- Laptop computers.
- Other compatible devices.

An active internet connection is required for normal communication with the central application and database in the current implementation.

# 7. FUNCTIONAL REQUIREMENTS

The following requirements describe the implemented system's principal capabilities.

## 7.1 Authentication

| ID    | Requirement                                                               |
| ----- | ------------------------------------------------------------------------- |
| FR-01 | The system shall allow authorised users to sign in.                       |
| FR-02 | The system shall authenticate users using their registered credentials.   |
| FR-03 | The system shall provide appropriate feedback for invalid login attempts. |
| FR-04 | The system shall allow authenticated users to sign out.                   |
| FR-05 | The system shall restrict protected pages to authenticated users.         |
| FR-06 | The system shall enforce role-based access permissions.                   |

## 7.2 User Management

| ID    | Requirement                                                                                                   |
| ----- | ------------------------------------------------------------------------------------------------------------- |
| FR-07 | Admin shall be able to create user accounts.                                                                  |
| FR-08 | Admin shall be able to view registered users.                                                                 |
| FR-09 | Admin shall be able to update user information.                                                               |
| FR-10 | Admin shall be able to assign user roles.                                                                     |
| FR-11 | Admin shall be able to manage account status.                                                                 |
| FR-12 | User profiles shall support relevant information such as name, email, phone and optional profile information. |

## 7.3 Centre Management

| ID    | Requirement                                                          |
| ----- | -------------------------------------------------------------------- |
| FR-13 | Admin shall be able to create Tsangaya centre records.               |
| FR-14 | Admin shall be able to view centre information.                      |
| FR-15 | Admin shall be able to update centre records.                        |
| FR-16 | The system shall associate relevant users and learners with centres. |
| FR-17 | The system shall support the management of multiple centre records.  |

## 7.4 Learner Management

| ID    | Requirement                                                                |
| ----- | -------------------------------------------------------------------------- |
| FR-18 | Programme Officers shall be able to register learners.                     |
| FR-19 | The system shall generate or maintain unique learner identification codes. |
| FR-20 | The system shall store learner profile information.                        |
| FR-21 | The system shall associate learners with their respective centres.         |
| FR-22 | The system shall maintain learner class group information.                 |
| FR-23 | The system shall record learner consent information.                       |
| FR-24 | Authorised users shall be able to view learner records.                    |
| FR-25 | Authorised users shall be able to update learner information.              |

## 7.5 Learning Session Management

| ID    | Requirement                                             |
| ----- | ------------------------------------------------------- |
| FR-26 | Admin shall be able to create learning sessions.        |
| FR-27 | Each session shall be associated with a centre.         |
| FR-28 | Each session shall have an assigned teacher.            |
| FR-29 | Each session shall be associated with a subject.        |
| FR-30 | Each session shall identify its class group.            |
| FR-31 | Each session shall contain a topic and scheduled date.  |
| FR-32 | The system shall support session status updates.        |
| FR-33 | Teachers shall be able to view their assigned sessions. |

## 7.6 Attendance Management

| ID    | Requirement                                                                        |
| ----- | ---------------------------------------------------------------------------------- |
| FR-34 | Teachers shall be able to open their assigned learning sessions.                   |
| FR-35 | Teachers shall be able to record attendance for learners.                          |
| FR-36 | Attendance shall support Present and Absent statuses.                              |
| FR-37 | The system shall associate attendance records with learners and learning sessions. |
| FR-38 | The system shall record the user responsible for marking attendance.               |
| FR-39 | The system shall support absence reasons and additional notes.                     |
| FR-40 | Authorised users shall be able to review attendance history.                       |

## 7.7 Assessment Management

| ID    | Requirement                                                                               |
| ----- | ----------------------------------------------------------------------------------------- |
| FR-41 | Teachers shall be able to access assessment registers for permitted subjects and classes. |
| FR-42 | The system shall support Baseline assessments.                                            |
| FR-43 | The system shall support Midline assessments.                                             |
| FR-44 | The system shall support Endline assessments.                                             |
| FR-45 | The system shall store assessment scores against the appropriate learner and subject.     |
| FR-46 | The system shall maintain assessment score change history.                                |
| FR-47 | The system shall calculate final percentage based on available assessment scores.         |
| FR-48 | The system shall calculate the corresponding grade and performance category.              |
| FR-49 | Authorised programme personnel shall be able to monitor assessment results.               |

## 7.8 Welfare Management

| ID    | Requirement                                                                       |
| ----- | --------------------------------------------------------------------------------- |
| FR-50 | Programme Officers shall be able to record learner welfare needs.                 |
| FR-51 | Welfare records shall be associated with individual learners.                     |
| FR-52 | The system shall support Clothing, Health, Learning Materials and Other concerns. |
| FR-53 | The system shall support Open, In Progress and Resolved statuses.                 |
| FR-54 | The system shall allow authorised users to record support provided.               |
| FR-55 | The system shall maintain records of welfare support activities.                  |
| FR-56 | The system shall distinguish an identified need from support actually provided.   |

## 7.9 Dashboard and Monitoring

| ID    | Requirement                                                                                                   |
| ----- | ------------------------------------------------------------------------------------------------------------- |
| FR-57 | The system shall provide an Admin dashboard.                                                                  |
| FR-58 | The system shall provide a Programme Officer dashboard.                                                       |
| FR-59 | The system shall provide a Teacher dashboard.                                                                 |
| FR-60 | Dashboard information shall reflect the user's authorised responsibilities.                                   |
| FR-61 | Admin shall be able to review overall system activities.                                                      |
| FR-62 | Programme Officers shall be able to monitor relevant learner, attendance, assessment and welfare information. |
| FR-63 | Teachers shall be able to view information relevant to their assigned learning activities.                    |

# 8. NON-FUNCTIONAL REQUIREMENTS

## 8.1 Usability

- The interface should be understandable to users with basic digital skills.
- Forms should have clear labels and validation feedback.
- Navigation should be consistent.
- The application should support mobile and desktop screen sizes.
- Important operations should provide clear success or error messages.

## 8.2 Performance

- Common application pages should load within a reasonable period under normal network conditions.
- Database queries should be structured efficiently.
- Unnecessary data transfer should be minimised.
- The system should remain responsive during ordinary programme operations.

## 8.3 Security

- Authentication shall protect restricted application areas.
- Passwords shall be securely hashed.
- Backend role checks shall protect sensitive operations.
- Learner information shall only be accessible to authorised personnel.
- Sensitive configuration and credentials shall not be exposed in source control.
- Production deployment should use HTTPS.

## 8.4 Reliability

- The system should maintain the integrity of stored records.
- Database relationships and validation rules should reduce inconsistent data.
- Error handling should prevent ordinary user mistakes from corrupting records.
- Backups and restoration procedures should be established before operational deployment.

## 8.5 Maintainability

- Application code should remain organised and modular.
- Database changes should use Laravel migrations.
- Reusable components should be preferred.
- Future developers should be able to understand the application through its documentation.
- Implemented behaviour and documentation should be updated together.

## 8.6 Privacy and Data Protection

The platform handles information concerning children and staff.

Therefore:

- Only necessary information should be collected.
- Learner information should be protected.
- Access should follow role responsibilities.
- Data exports should be handled carefully.
- Consent information should be maintained where applicable.
- Data retention and deletion procedures should be established by programme management.

# 9. DATABASE REQUIREMENTS

The application uses a relational database structure.

The principal application tables are:

| Table                      | Purpose                             |
| -------------------------- | ----------------------------------- |
| roles                      | Stores application roles            |
| users                      | Stores staff accounts               |
| centres                    | Stores Tsangaya centre records      |
| learners                   | Stores learner information          |
| subjects                   | Stores learning subjects            |
| learning_sessions          | Stores scheduled learning sessions  |
| attendances                | Stores learner attendance           |
| assessment_records         | Stores assessment scores            |
| assessment_score_histories | Stores changes to assessment scores |
| learner_class_movements    | Records class movements             |
| welfare_needs              | Stores identified welfare needs     |
| welfare_supports           | Stores support provided             |
| activities                 | Stores system activity records      |

Laravel infrastructure tables support authentication, sessions, caching and background processing.

The detailed columns, data types, relationships, indexes and constraints are documented separately in the Database Design and Schema Document.

## 9.1 Assessment Calculations

The current application calculates assessment attributes using application-level model logic.

These include:

- Final percentage.
- Grade.
- Performance category.

The calculation uses available non-null assessment scores.

The calculation rules are documented in the database schema documentation and implemented in the AssessmentRecord model.

# 10. EXTERNAL INTERFACE REQUIREMENTS

## 10.1 User Interface

The application provides:

- Public landing page.
- Login page.
- Role-specific dashboards.
- User management pages.
- Centre management pages.
- Learner management pages.
- Learning session pages.
- Attendance pages.
- Assessment pages.
- Welfare management pages.
- Profile and settings pages.

## 10.2 Software Interfaces

The system uses:

- Laravel for backend operations.
- React and Inertia.js for frontend interaction.
- Vite for asset bundling.
- A relational database for persistent records.
- Browser-based communication with the Laravel application.

## 10.3 Hardware Interfaces

The current version does not require specialised hardware.

Users access the application using supported smartphones, tablets, laptops or desktop computers.

# 11. SYSTEM WORKFLOWS

## 11.1 User Authentication

1. A user opens the application.
2. The user enters registered login credentials.
3. The application validates the credentials.
4. The authenticated user is redirected to the appropriate dashboard.
5. Access is controlled according to the assigned role.

## 11.2 Learner Registration

1. The Programme Officer signs in.
2. The Programme Officer opens learner management.
3. The Programme Officer selects the registration function.
4. Learner information is entered.
5. The application validates the information.
6. The learner record is saved.
7. A learner identification code is maintained.
8. The learner becomes available for relevant programme operations.

## 11.3 Learning Session Management

1. Admin signs in.
2. Admin opens learning session management.
3. Admin creates a new session.
4. Admin selects the centre, teacher, subject and class group.
5. Admin enters the topic and scheduled date.
6. Admin saves the session.
7. The assigned Teacher can access the session.

## 11.4 Attendance Recording

1. Teacher signs in.
2. Teacher opens assigned learning sessions.
3. Teacher selects a session.
4. The application displays the relevant learner register.
5. Teacher records Present or Absent status.
6. Additional absence information can be entered where necessary.
7. The attendance records are saved.

## 11.5 Assessment Recording

1. Teacher opens the assessment section.
2. Teacher selects the appropriate subject and class group.
3. The relevant learners are displayed.
4. Teacher enters assessment scores.
5. The application stores the scores.
6. Score changes can be maintained in assessment history.
7. The application calculates the relevant performance attributes.

## 11.6 Welfare Management

1. Programme Officer opens welfare management.
2. Programme Officer selects the relevant learner.
3. A welfare need is recorded.
4. The appropriate category and description are entered.
5. The record is saved with its status.
6. When support is provided, a separate support record is created.
7. The welfare record remains available for follow-up.

# 12. SYSTEM LIMITATIONS

The current version has the following limitations:

1. The application requires internet connectivity for normal server-based operations.
2. Offline attendance recording and automatic synchronisation are not implemented.
3. The current version is a web application rather than a native mobile application.
4. QR-based attendance is not implemented.
5. The platform does not replace manual programme oversight.
6. The system does not automatically guarantee welfare support.
7. Expansion to all approved centres requires programme-level planning and approval.
8. Production deployment, security hardening, backup and recovery arrangements require separate operational validation.

# 13. TESTING AND ACCEPTANCE

## 13.1 Testing Objectives

Testing is intended to establish that:

- Users can authenticate successfully.
- Role-based access restrictions work.
- Admin operations work correctly.
- Programme Officer workflows work correctly.
- Teacher workflows work correctly.
- Learner records can be created and managed.
- Learning sessions can be created and assigned.
- Attendance can be recorded.
- Assessment results can be entered and calculated.
- Welfare needs and support records can be maintained.
- The application handles invalid inputs appropriately.

## 13.2 Testing Approach

The project team conducted functional manual testing of the implemented workflows.

The reported final testing outcome was that the tested features operated as expected.

Automated feature and unit tests are also included in the project codebase.

This statement does not constitute an independent security audit, production load test or formal field deployment certification.

## 13.3 Acceptance Criteria

The system is considered to have met its current development objectives when:

1. Users can access the system according to their assigned roles.
2. Each role can perform its authorised operations.
3. Learner information can be registered and maintained.
4. Admin can manage users, centres and learning sessions.
5. Teachers can record attendance and assessment scores.
6. Programme Officers can manage welfare and monitor programme information.
7. Assessment calculations produce the expected results.
8. Records are stored and retrieved correctly.
9. The main application workflows operate without critical errors.

# 14. FUTURE ENHANCEMENT: PROGRESSIVE WEB APPLICATION AND OFFLINE FUNCTIONALITY

## 14.1 Overview

A major recommended improvement for future versions of TSANGAYA+ is the development of Progressive Web Application (PWA) functionality.

This enhancement is particularly relevant because some Tsangaya communities may experience unreliable or limited internet connectivity.

A PWA would improve accessibility by allowing authorised users to install the application on supported mobile devices and access selected application resources through an app-like experience.

## 14.2 Proposed Capabilities

Future versions should consider:

1. Installable application functionality.
2. Application icons and web app manifest.
3. Service worker support.
4. Caching of appropriate application resources.
5. Offline access to selected previously available information.
6. Local storage of selected records using browser-based storage such as IndexedDB.
7. Offline attendance capture.
8. Offline learner data entry where approved.
9. Automatic or manual synchronisation when connectivity returns.
10. Clear synchronisation status and error messages.

## 14.3 Proposed Offline Workflow

The proposed offline workflow is:

1. An authorised user opens the installed TSANGAYA+ application.
2. Previously cached application resources are loaded.
3. The user accesses an approved offline-enabled feature.
4. New information is temporarily stored on the device.
5. The application identifies records awaiting synchronisation.
6. When internet connectivity returns, the application submits the pending records to the Laravel backend.
7. The backend validates the submitted information.
8. Successfully synchronised records are stored in the central database.
9. The application updates the local synchronisation status.

## 14.4 Proposed Architecture

Future architecture:

**Installed TSANGAYA+ PWA → Service Worker → IndexedDB / Local Storage → Synchronisation Layer → Laravel Backend → Central Database**

The local storage and synchronisation components are proposed additions and are not part of the current architecture.

## 14.5 Security and Data Integrity Considerations

Before introducing offline functionality, the development team should establish:

- Secure handling of locally stored learner information.
- Appropriate device access restrictions.
- Protection of sensitive records.
- Duplicate submission prevention.
- Synchronisation conflict detection.
- Reliable retry mechanisms.
- Validation of records before central storage.
- Clear handling of failed synchronisation.
- Secure deletion of local information when appropriate.

Offline access should not bypass the application's existing role permissions.

## 14.6 Implementation Recommendation

PWA implementation should be introduced progressively.

The recommended first stage is an installable PWA with application caching and a basic offline experience.

The second stage should introduce carefully selected offline data-entry workflows, beginning with attendance recording.

These features should undergo testing on actual devices and under realistic connectivity conditions before being adopted operationally.

# 15. RECOMMENDATIONS

The following recommendations are proposed for the continued development and sustainability of TSANGAYA+:

1. Develop PWA support and selected offline capabilities.
2. Conduct regular usability testing with Teachers and Programme Officers.
3. Provide training for users before operational deployment.
4. Establish a secure hosting and maintenance arrangement.
5. Implement regular database backup and restoration procedures.
6. Review access permissions periodically.
7. Establish appropriate data retention and child safeguarding policies.
8. Evaluate the initial pilot before expanding to additional centres.
9. Improve reporting capabilities as programme data grows.
10. Maintain updated technical and user documentation.

# 16. CONCLUSION

TSANGAYA+ provides a digital platform for managing structured learning activities, learner attendance, assessment results and welfare records within participating Tsangaya communities.

The developed system provides role-specific functionality for Admin, Programme Officers and Teachers, helping organise programme operations and improve access to relevant information.

Its design recognises the importance of Quranic education and the need to complement existing learning arrangements rather than replace them.

Although the current version provides the core web-based functionality, future improvements should focus on accessibility, reliability and the realities of operating in communities with limited internet connectivity.

The proposed Progressive Web Application and offline synchronisation capabilities represent an important direction for the next development phase.

**TSANGAYA+ is intended to remain a practical, secure and adaptable digital support platform for structured learning and child welfare management in Tsangaya communities.**

---

## DOCUMENT REVIEW AND APPROVAL

| Role                         | Name                    | Review status    |
| ---------------------------- | ----------------------- | ---------------- |
| Project Lead                 | Abduljalil Abdulrahman  | Pending review   |
| Software Development Lead    | Asmau Maharazu          | Prepared         |
| Data Science Lead            | Joel Arinze Jonathan    | Pending review   |
| Entrepreneurship and BD Lead | Habiba Abdulkarim Kwami | Pending review   |
| Head Supervisor              | Bashir Hassan           | Pending approval |
| Co-Supervisor                | Jerry Anjungu           | Pending approval |

