# TSANGAYA+

## Functional Specification and Use Cases Document

**Project Title:** TSANGAYA+ Structured Learning, Attendance & Child Welfare Platform for Tsangaya Communities  
**Document Type:** Functional Specification and Use Cases  
**Version:** 1.0  
**Date:** 13 November 2026  
**Project:** HCM Foundation Group B Capstone Project

---

## 1. Introduction

### 1.1 Purpose of this Document

This document describes the functional capabilities of the TSANGAYA+ platform and explains how its users interact with the system to perform their assigned responsibilities.

It provides a structured description of the system's features, user roles, use cases, input requirements, expected outputs, and basic workflows.

The document is intended for:

- Project supervisors and assessors.
- System developers and maintainers.
- Administrators of participating Tsangaya centres.
- Programme Officers.
- Teachers and other authorised system users.

### 1.2 System Overview

TSANGAYA+ is a web-based platform designed to support the organisation and monitoring of structured basic literacy, numeracy, and modern education activities within Tsangaya communities.

The platform provides a centralised way to manage:

- User accounts and Tsangaya centres.
- Learner registration and records.
- Learning sessions and schedules.
- Learner attendance.
- Academic assessments and performance records.
- Learner welfare needs and support records.
- User activities and programme monitoring.

The platform complements existing Quranic education and does not replace the role of Mallams, teachers, or traditional Tsangaya learning.

### 1.3 Scope

This document covers the functional features available to the three main user roles:

1. Admin
2. Programme Officer
3. Teacher

It also describes the interactions between these roles and the system.

---

## 2. User Roles and Responsibilities

### 2.1 Admin

The Admin is responsible for the overall administrative management of the platform.

**Main responsibilities:**

- Access the Admin dashboard.
- Create and manage user accounts.
- Register and manage Tsangaya centres.
- Create and manage learning sessions.
- View overall system activities.
- Access administrative information and settings available to the role.

The Admin does not perform routine learner registration, attendance recording, assessment entry, or welfare management.

### 2.2 Programme Officer

The Programme Officer is responsible for learner records and programme-level monitoring.

**Main responsibilities:**

- Register learners.
- View and manage learner information.
- Record and manage learner welfare needs.
- Record relevant welfare support information.
- Monitor programme activities.
- View teacher activities and relevant programme information.

The Programme Officer has monitoring responsibilities but does not edit teachers' attendance or assessment records.

### 2.3 Teacher

The Teacher is responsible for delivering assigned learning sessions and maintaining learner academic participation records.

**Main responsibilities:**

- View assigned learning sessions.
- View relevant session and learner information.
- Record learner attendance.
- Record learner assessment results.
- View relevant academic records.

Teachers should only access the sessions and information assigned or made available to them according to their permissions.

---

## 3. Functional Modules

### 3.1 Authentication and User Access Management

This module controls access to the platform.

**Main functions:**

- User login.
- User logout.
- Authentication of user credentials.
- Role-based access to system pages and features.
- Restriction of unauthorised access.

**Expected system behaviour:**

- The system verifies login credentials.
- Authenticated users are directed to the appropriate dashboard.
- Users can only access features permitted by their assigned roles.
- Unauthenticated users cannot access protected pages.

### 3.2 Admin Dashboard

The Admin dashboard provides an overview of the platform's administrative activities.

**Main functions:**

- Display total learners.
- Display active centres.
- Display staff members.
- Display total learning sessions.
- Provide navigation to administrative modules.

**Expected output:**

The dashboard presents summary figures and links to the relevant management sections.

### 3.3 User Management

This module allows the Admin to manage platform users.

**Main functions:**

- View registered users.
- Create user accounts.
- Update user information.
- Manage user roles and relevant account details.
- Manage user account status where supported.

**Information associated with user accounts may include:**

- Full name.
- Email address.
- Phone number.
- Assigned role.
- Centre association where applicable.
- Account status.
- Optional profile photo.
- Optional gender information.
- Teacher qualification where applicable.

### 3.4 Tsangaya Centre Management

This module allows the Admin to manage participating Tsangaya centres.

**Main functions:**

- View registered centres.
- Add new centres.
- Update centre information.
- View centre-related information.

Centre records provide the organisational structure for learner registration, staff assignment, and learning activities.

### 3.5 Learning Session Management

This module supports the creation and management of structured learning sessions.

The Admin creates and manages learning sessions, while teachers access their assigned sessions.

**Session information includes:**

- Centre.
- Assigned teacher.
- Subject.
- Class group.
- Topic.
- Session date.
- Session status.

**Available subjects:**

- Literacy.
- Numeracy.
- Basic Modern Education.

**Class groups:**

- Class A.
- Class B.

**Session statuses:**

- Scheduled.
- Delivered.
- Cancelled.
- Rescheduled.

**Expected system behaviour:**

- The system stores session information.
- Teachers can view their assigned sessions.
- Session information is available for attendance and related academic activities.
- Session status reflects the recorded state of the session.

### 3.6 Learner Management

This module is managed by the Programme Officer.

**Main functions:**

- Register new learners.
- View learner records.
- Update learner information.
- Associate learners with their relevant centre and class information.
- Maintain learner consent information.

**Learner information may include:**

- Learner full name.
- Learner identification code.
- Centre.
- Class group.
- Relevant registration details.
- Consent status.
- Consent date.
- Staff member who recorded consent.

The system uses learner identification codes to support the identification and organisation of learner records.

### 3.7 Attendance Management

This module allows teachers to record learner attendance for assigned learning sessions.

**Main functions:**

- Open a learning session.
- View the relevant learner list.
- Record attendance.
- Record absence reasons where applicable.
- Add attendance notes where necessary.
- Review recorded attendance information.

**Attendance information includes:**

- Learner.
- Learning session.
- Attendance status.
- Absence reason where applicable.
- Notes where applicable.

**Expected system behaviour:**

- Attendance records are associated with the relevant learner and session.
- The system saves submitted attendance information.
- Recorded information can be reviewed through the relevant session records.
- The Programme Officer may monitor relevant activities but does not edit teacher attendance records.

### 3.8 Assessment Management

This module allows teachers to record and review learner academic performance.

Assessments are organised by subject and class group.

**Assessment stages:**

- Baseline assessment.
- Midline assessment.
- Endline assessment.

**Main functions:**

- Access relevant assessment records.
- Record baseline scores.
- Record midline scores.
- Record endline scores.
- View learner performance information.
- Maintain assessment score history.
- Display final performance information after endline assessment where applicable.

**Assessment information may include:**

- Learner.
- Subject.
- Class group.
- Baseline score.
- Midline score.
- Endline score.
- Final percentage.
- Grade or performance classification where applicable.

The assessment score history supports the tracking of changes in learner performance over time.

### 3.9 Learner Welfare Management

This module allows the Programme Officer to document and monitor learner welfare concerns.

**Main functions:**

- Record a learner welfare need.
- Select the relevant welfare category.
- Add descriptions or notes.
- View recorded welfare needs.
- Update relevant welfare information.
- Record support provided where supported by the system.

**Welfare categories:**

1. Clothing.
2. Health.
3. Learning Materials.
4. Other Concerns.

The module helps programme staff document concerns that may affect learners' participation and general wellbeing.

### 3.10 Activity Monitoring

The platform provides activity information to support administrative oversight and programme monitoring.

**Admin monitoring:**

- View overall system activities.

**Programme Officer monitoring:**

- View relevant teacher activities.
- Monitor programme-related information.

Monitoring permissions do not automatically grant permission to modify another user's records.

---

## 4. Detailed Use Cases

### UC-01: User Login

**Primary Actor:** Admin, Programme Officer, Teacher  
**Objective:** To access the platform securely.

**Preconditions:**

- The user has an account.
- The user has valid login credentials.

**Main Flow:**

1. The user opens the TSANGAYA+ login page.
2. The user enters their login credentials.
3. The user submits the login form.
4. The system validates the credentials.
5. The system authenticates the user.
6. The system directs the user to the appropriate dashboard based on their role.

**Alternative Flow:**

- If the credentials are incorrect, the system displays an error message.
- If required information is missing, the system requests the necessary information.

**Postcondition:** The user is authenticated and can access permitted features.

### UC-02: Create a User Account

**Primary Actor:** Admin  
**Objective:** To create an account for a staff member.

**Preconditions:**

- The Admin is logged in.
- The Admin has access to user management.

**Main Flow:**

1. The Admin opens the user management section.
2. The Admin selects the option to add a user.
3. The system displays the user registration form.
4. The Admin enters the required user information.
5. The Admin assigns the appropriate role.
6. The Admin submits the form.
7. The system validates the information.
8. The system saves the user record.
9. The system displays a success response.

**Alternative Flow:**

- If required fields are missing, validation messages are displayed.
- If an email address conflicts with an existing account, the system rejects the duplicate entry.

**Postcondition:** The new user account is stored in the system.

### UC-03: Register a Tsangaya Centre

**Primary Actor:** Admin  
**Objective:** To add a participating Tsangaya centre.

**Preconditions:**

- The Admin is logged in.
- The Admin can access centre management.

**Main Flow:**

1. The Admin opens centre management.
2. The Admin selects the option to add a centre.
3. The system displays the centre form.
4. The Admin enters the centre information.
5. The Admin submits the form.
6. The system validates the information.
7. The system saves the centre.
8. The system displays the updated centre information.

**Postcondition:** The centre is available for relevant system operations.

### UC-04: Create a Learning Session

**Primary Actor:** Admin  
**Objective:** To schedule a structured learning session.

**Preconditions:**

- The Admin is logged in.
- Relevant centre, teacher, and subject records are available.

**Main Flow:**

1. The Admin opens learning session management.
2. The Admin selects the option to create a session.
3. The system displays the session form.
4. The Admin selects the centre.
5. The Admin assigns a teacher.
6. The Admin selects the subject.
7. The Admin selects Class A or Class B.
8. The Admin enters the topic and session date.
9. The Admin selects or confirms the session status.
10. The Admin submits the form.
11. The system validates and stores the session.
12. The session becomes available to the assigned teacher.

**Postcondition:** The learning session is stored and associated with the assigned teacher.

### UC-05: View Assigned Learning Sessions

**Primary Actor:** Teacher  
**Objective:** To view scheduled and relevant learning sessions.

**Preconditions:**

- The Teacher is logged in.
- The Teacher has assigned sessions.

**Main Flow:**

1. The Teacher opens the dashboard or session section.
2. The system retrieves the Teacher's assigned sessions.
3. The system displays the available session information.
4. The Teacher selects a session to view its details.

**Postcondition:** The Teacher can view the details of the selected assigned session.

### UC-06: Register a Learner

**Primary Actor:** Programme Officer  
**Objective:** To add a learner to the platform.

**Preconditions:**

- The Programme Officer is logged in.
- The relevant centre is available.

**Main Flow:**

1. The Programme Officer opens learner management.
2. The Programme Officer selects the option to register a learner.
3. The system displays the learner registration form.
4. The Programme Officer enters the learner's required details.
5. The Programme Officer selects the relevant centre and class information.
6. The Programme Officer records the required consent information.
7. The Programme Officer submits the form.
8. The system validates the information.
9. The system stores the learner record.
10. The system displays the saved learner information.

**Alternative Flow:**

- If required information is missing, the system displays validation messages.
- If submitted information is invalid, the system requests correction.

**Postcondition:** The learner is registered and can be associated with relevant programme activities.

### UC-07: Record Learner Attendance

**Primary Actor:** Teacher  
**Objective:** To record attendance for a learning session.

**Preconditions:**

- The Teacher is logged in.
- The session is assigned to the Teacher.
- Learners are available for the relevant session.

**Main Flow:**

1. The Teacher opens the assigned learning session.
2. The Teacher navigates to attendance.
3. The system displays the relevant learner list.
4. The Teacher records each learner's attendance status.
5. The Teacher provides an absence reason where applicable.
6. The Teacher adds notes where necessary.
7. The Teacher submits the attendance information.
8. The system validates the submission.
9. The system saves the attendance records.
10. The system displays the updated attendance information.

**Alternative Flow:**

- If attendance information is incomplete, the system displays relevant validation messages.
- If submission fails, the system informs the user.

**Postcondition:** Attendance information is stored against the relevant session and learners.

### UC-08: Record Learner Assessment Results

**Primary Actor:** Teacher  
**Objective:** To record and monitor learner academic performance.

**Preconditions:**

- The Teacher is logged in.
- The relevant learner and assessment information is available.

**Main Flow:**

1. The Teacher opens the assessment section.
2. The Teacher selects the relevant subject and class group.
3. The system displays the relevant assessment records.
4. The Teacher selects the learner or record to update.
5. The Teacher enters the appropriate assessment score.
6. The Teacher submits the information.
7. The system validates the score.
8. The system saves the assessment information.
9. The system updates the relevant performance record and score history where applicable.
10. The Teacher reviews the updated record.

**Alternative Flow:**

- If the score is outside the accepted range, the system displays a validation message.
- If required information is missing, the system requests correction.

**Postcondition:** The learner's assessment information is stored and available for performance monitoring.

### UC-09: Record a Learner Welfare Need

**Primary Actor:** Programme Officer  
**Objective:** To document a learner welfare concern.

**Preconditions:**

- The Programme Officer is logged in.
- The learner has been registered.

**Main Flow:**

1. The Programme Officer opens the welfare management section.
2. The Programme Officer selects the option to record a welfare need.
3. The system displays the welfare form.
4. The Programme Officer selects the relevant learner.
5. The Programme Officer selects a welfare category.
6. The Programme Officer enters the concern description and other required details.
7. The Programme Officer submits the form.
8. The system validates the information.
9. The system saves the welfare record.
10. The system displays the recorded welfare information.

**Available categories:**

- Clothing.
- Health.
- Learning Materials.
- Other Concerns.

**Postcondition:** The welfare concern is documented and available for programme monitoring.

### UC-10: Record Welfare Support

**Primary Actor:** Programme Officer  
**Objective:** To document support provided in response to a learner welfare need.

**Preconditions:**

- The Programme Officer is logged in.
- The relevant learner welfare record exists.

**Main Flow:**

1. The Programme Officer opens the welfare section.
2. The Programme Officer locates the relevant welfare record.
3. The Programme Officer accesses the available support-recording function.
4. The Programme Officer enters the required support information.
5. The Programme Officer submits the information.
6. The system validates and stores the record.
7. The system displays the updated information.

**Postcondition:** The support information is associated with the relevant welfare record.

### UC-11: Monitor Teacher Activities

**Primary Actor:** Programme Officer  
**Objective:** To monitor relevant teacher activities.

**Preconditions:**

- The Programme Officer is logged in.
- Relevant activity information exists.

**Main Flow:**

1. The Programme Officer opens the monitoring section.
2. The system retrieves relevant teacher activity information.
3. The system displays the available records.
4. The Programme Officer reviews the information.

**Postcondition:** The Programme Officer can review relevant teacher activities without editing teacher attendance or assessment records.

### UC-12: View Overall System Activities

**Primary Actor:** Admin  
**Objective:** To review overall system activity information.

**Preconditions:**

- The Admin is logged in.
- Activity information is available.

**Main Flow:**

1. The Admin opens the activity section.
2. The system retrieves available activity records.
3. The system displays the relevant information.
4. The Admin reviews the records.

**Postcondition:** The Admin has access to an overview of recorded system activities.

### UC-13: Logout

**Primary Actor:** Admin, Programme Officer, Teacher  
**Objective:** To securely end an authenticated session.

**Main Flow:**

1. The user selects the logout option.
2. The system ends the authenticated session.
3. The system redirects the user away from protected pages.
4. The user must authenticate again to access protected features.

**Postcondition:** The user's authenticated session is ended.

---

## 5. Role-to-Feature Access Matrix

| System Feature                 | Admin                                    | Programme Officer          | Teacher              |
| ------------------------------ | ---------------------------------------- | -------------------------- | -------------------- |
| Login and logout               | Yes                                      | Yes                        | Yes                  |
| View role dashboard            | Yes                                      | Yes                        | Yes                  |
| Manage users                   | Yes                                      | No                         | No                   |
| Manage centres                 | Yes                                      | No                         | No                   |
| Manage learning sessions       | Yes                                      | No                         | No                   |
| View assigned sessions         | No                                       | Monitoring where available | Yes                  |
| Register learners              | No                                       | Yes                        | No                   |
| Manage learner records         | No                                       | Yes                        | No                   |
| Record attendance              | No                                       | No                         | Yes                  |
| View attendance for monitoring | Overall system oversight                 | Monitoring where available | Own relevant records |
| Record assessments             | No                                       | No                         | Yes                  |
| View assessment information    | Administrative oversight where available | Monitoring where available | Relevant records     |
| Manage welfare needs           | No                                       | Yes                        | No                   |
| Record welfare support         | No                                       | Yes                        | No                   |
| Monitor teacher activities     | Overall activities                       | Yes                        | No                   |
| View overall activities        | Yes                                      | No                         | No                   |

**Note:** The matrix describes the intended role boundaries and documented responsibilities. Access to individual screens and records should always follow the actual permissions implemented in the application.

---

## 6. Main System Workflows

### 6.1 User Access Workflow

1. A user opens the platform.
2. The user submits login credentials.
3. The system authenticates the user.
4. The system identifies the user's role.
5. The user is directed to the appropriate dashboard.
6. The user accesses permitted functions.

### 6.2 Learner Registration Workflow

1. The Programme Officer logs in.
2. The Programme Officer opens learner management.
3. The Programme Officer enters learner information.
4. The Programme Officer records consent information.
5. The system validates and saves the learner.
6. The learner becomes available for relevant programme activities.

### 6.3 Learning and Attendance Workflow

1. The Admin creates a learning session.
2. The session is assigned to a teacher.
3. The Teacher opens the assigned session.
4. The Teacher views the relevant learners.
5. The Teacher records attendance.
6. The system saves the attendance information.
7. Relevant programme staff can monitor available information.

### 6.4 Assessment Workflow

1. The Teacher opens the assessment section.
2. The Teacher selects the subject and class group.
3. The Teacher records the appropriate assessment result.
4. The system validates and saves the result.
5. Assessment history supports tracking of learner progress.
6. Final performance information can be reviewed after the endline stage where applicable.

### 6.5 Welfare Workflow

1. The Programme Officer opens welfare management.
2. The Programme Officer selects a learner.
3. The Programme Officer records the welfare concern.
4. The system stores the welfare record.
5. Relevant support information can be documented.
6. The Programme Officer monitors the recorded information.

---

## 7. Business Rules

The following rules guide the operation of the platform:

1. Every user must authenticate before accessing protected system functions.
2. Users must only access features permitted by their assigned roles.
3. The role name must be recorded as **Admin**.
4. Learner registration and routine learner management are Programme Officer responsibilities.
5. Attendance recording is a Teacher responsibility.
6. Assessment recording is a Teacher responsibility.
7. Teachers access their assigned learning sessions.
8. Learning sessions must be associated with relevant centre, teacher, subject, class group, topic, and date information.
9. Class groups are Class A and Class B.
10. The supported learning subjects are Literacy, Numeracy, and Basic Modern Education.
11. Assessment stages are baseline, midline, and endline.
12. Final performance information is relevant after the endline assessment.
13. Attendance records should be associated with the relevant learner and learning session.
14. Welfare records must be associated with the relevant learner.
15. The welfare categories are Clothing, Health, Learning Materials, and Other Concerns.
16. Programme Officers may monitor teacher activities but must not edit teacher attendance or assessment records.
17. The platform supports and complements traditional Quranic education rather than replacing it.

---

## 8. Expected System Outputs

The system provides the following outputs to support programme operations:

- Role-specific dashboards.
- User account records.
- Tsangaya centre records.
- Learning session records.
- Learner registration records.
- Learner attendance records.
- Assessment results and performance information.
- Assessment score history.
- Learner welfare records.
- Welfare support records.
- Activity monitoring information.

These outputs provide structured information for programme administration, learning coordination, learner monitoring, and decision-making.

---

## 9. Error Handling and Validation

The system uses validation and feedback to guide users when submitting information.

Expected validation scenarios include:

- Missing required fields.
- Invalid email addresses.
- Duplicate account information where uniqueness is required.
- Invalid assessment scores.
- Missing learner or session associations.
- Invalid or incomplete form submissions.
- Unauthorised access attempts.

The system should display appropriate feedback so users can correct errors or understand why an action cannot be completed.

---

## 10. Functional Limitations and Future Enhancements

The current TSANGAYA+ implementation is a web-based application that relies on server connectivity for normal live operations.

The following capabilities are recommended for future development and should not be interpreted as already implemented:

### 10.1 Progressive Web Application (PWA)

A future version may support installation on compatible mobile devices through PWA functionality.

### 10.2 Offline Data Capture

Offline attendance recording and other carefully selected data-entry functions may be introduced for centres with unreliable internet connectivity.

### 10.3 Automatic Synchronisation

A future synchronisation mechanism may upload locally stored records when internet connectivity returns. This should include conflict detection and data integrity checks.

### 10.4 Advanced Reporting

Future versions may include downloadable reports, attendance trends, assessment comparisons, and centre-level performance summaries.

### 10.5 Notifications

Notifications may be introduced to alert authorised users about upcoming sessions, outstanding records, and relevant programme activities.

---

## 11. Conclusion

The TSANGAYA+ Functional Specification and Use Cases document describes how the platform supports the administration of Tsangaya centres, learner registration, structured learning sessions, attendance, assessments, and learner welfare monitoring.

By assigning responsibilities to Admins, Programme Officers, and Teachers, the platform provides a structured approach to managing educational activities while maintaining clear role boundaries.

The system is designed to complement existing Tsangaya learning practices and support the integration and monitoring of basic literacy, numeracy, and modern education activities within participating communities.
