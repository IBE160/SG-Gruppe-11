# Revised Project Proposal: Things+

This document is a revised version of the original proposal, updated to incorporate feedback from the project evaluation. It includes a more detailed technical specification, a realistic scope, and a project timeline.

### Case Title
To-do task manager app called Things+.

### Background
Students conducting the online based bachelor program in logistics at Molde university usually combine school with a full-time job. A lot of people struggle to incorporate everyday tasks with school related requirements.

### Purpose
This app will pull data from primary Canvas to streamline deadlines and other tasks with your preferred calendar. The app will suggest a timeline and allocate a timeslot in your calendar based on data from Canvas, and Your own calendar inputs. Rather having to check multiple apps/websites, Things+ will streamline and gather all task in one place.

### Target Users
Students with fulltime jobs in addition to school, but for everyone using Canvas and the integrated calendar on your phone or laptop for planning purposes.

### User Stories
1. As a full-time student with a full-time job, having just one app with that connects everything school related to my personal calendar is essential.
2. I work in rotations (turnus), and my available time for studying varies from week to week. My biggest challenge is time management.
3. My kids have multiple leisure activities that I need to juggle with work and school.

---

## Core Functionality (Revised Scope)

Based on the evaluation, the scope has been revised to ensure feasibility within a 1.5-month timeframe.

**Must Have (MVP - 6 Weeks)**
- **Platform:** A web application (Progressive Web App) to ensure cross-platform access on desktop and mobile from a single codebase.
- **User Authentication:** Secure user registration and login using email/password.
- **Manual Task Management:** Users can manually create, edit, delete, and view tasks.
- **Tagging System:** Users can create and assign tags to tasks for categorization (e.g., `#IBE160`, `#household`).
- **Full Canvas API Integration:** Implement full, bidirectional data sync with the official Canvas API.
- **Read-Only Calendar Integration:** Initial support for one calendar provider (Google Calendar) to display existing events in a read-only view, helping users see their availability.
- **Basic Timeline View:** A simple chronological view of tasks and deadlines.

**Future Extensions (Post-MVP)**

- **Full Calendar Integration:** Add support for bidirectional sync (creating/editing events) and more providers (Outlook, Apple Calendar).
- **Intelligent Timeline:** Develop an algorithm to suggest a timeline and allocate time slots in the user's calendar.
- **Progress Tracking:** A system for users to track and visualize their progress on tasks and courses.
- **Native Mobile Apps:** Develop dedicated iOS and Android applications.
- **Advanced Features:** Natural language processing for speech-to-task and photo recognition for task creation.

---

## Technical Architecture

### Technology Stack
- **Frontend:** React (using Create React App), with Material-UI for components and styling. Developed as a Progressive Web App (PWA) for installability and offline capabilities.
- **Backend:** Node.js with the Express.js framework for creating a RESTful API.
- **Database:** PostgreSQL, a robust relational database to manage users, tasks, and their relationships.
- **Authentication:** JSON Web Tokens (JWT) for stateless, secure authentication between the frontend and backend.
- **Deployment:** Vercel for the frontend and Heroku for the backend and database, providing a streamlined CI/CD workflow.

### Database Specification
The following SQL schema will be implemented to structure the application's data.

```sql
-- Table: Users
-- Stores user authentication details, Canvas credentials, and preferences.
CREATE TABLE Users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    canvas_access_token TEXT, -- Encrypted
    canvas_refresh_token TEXT, -- Encrypted
    canvas_token_expires_at TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Tasks
-- Represents the core tasks managed by the application.
CREATE TABLE Tasks (
    task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    start_date TIMESTAMP WITH TIME ZONE,
    source VARCHAR(50) NOT NULL DEFAULT 'Manual', -- 'Canvas', 'Manual'
    priority VARCHAR(20) DEFAULT 'Medium', -- 'High', 'Medium', 'Low'
    completion_status VARCHAR(20) DEFAULT 'Pending', -- 'Pending', 'In Progress', 'Completed'
    progress_notes TEXT,
    canvas_assignment_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Tags
-- Stores categories or labels that can be applied to tasks.
CREATE TABLE Tags (
    tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES Users(user_id) ON DELETE CASCADE,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Junction Table: TaskTags
-- Manages the Many-to-Many relationship between Tasks and Tags.
CREATE TABLE TaskTags (
    task_id UUID NOT NULL REFERENCES Tasks(task_id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES Tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, tag_id)
);

-- Table: ExternalCalendarSync
-- Manages synchronization with external calendars.
CREATE TABLE ExternalCalendarSync (
    sync_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    task_id UUID REFERENCES Tasks(task_id) ON DELETE CASCADE,
    external_event_id VARCHAR(255) NOT NULL,
    calendar_provider VARCHAR(50) NOT NULL, -- 'Google Calendar', 'Outlook Calendar'
    calendar_id VARCHAR(255),
    sync_status VARCHAR(50) DEFAULT 'Synced',
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    event_title VARCHAR(255),
    event_description TEXT,
    event_start_time TIMESTAMP WITH TIME ZONE,
    event_end_time TIMESTAMP WITH TIME ZONE,
    event_location VARCHAR(255),
    event_participants TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, calendar_provider, external_event_id)
);
```

### Security Specification
- **Authentication:** User passwords will be hashed using `bcrypt`.
- **API Security:** Communication between the client and server will be secured using JWTs and enforced HTTPS.
- **Credential Storage:** All third-party credentials (e.g., Canvas tokens) will be encrypted in the database.

---

## Timeline and Milestones (6 Weeks)

- **Week 1: Project Setup & Backend Foundation**
  - Initialize Git repository and project structure.
  - Set up Node.js/Express backend boilerplate.
  - Implement `Users` database model and secure authentication endpoints (register, login).

- **Week 2: Database & Task Management API**
  - Implement the full database schema in PostgreSQL.
  - Create RESTful API endpoints (CRUD) for `Tasks` and `Tags`.
  - Write unit tests for API endpoints.

- **Week 3: Frontend Foundation & Task UI**
  - Set up React PWA.
  - Implement user authentication flow (login, registration pages).
  - Build UI components for creating, viewing, editing, and deleting tasks and tags.

- **Week 4: Mock Canvas & Calendar Integration**
  - Develop a simple mock API to simulate fetching Canvas assignments.
  - Implement Google Calendar API integration (OAuth2) for read-only display of events.
  - Connect frontend to display data from both sources.

- **Week 5: Timeline View & UI Polish**
  - Develop the main timeline view, combining tasks and calendar events.
  - Refine the user interface and user experience.
  - Ensure the application is responsive and works well on mobile and desktop browsers.

- **Week 6: Testing, Deployment & Documentation**
  - Conduct end-to-end testing.
  - Deploy the frontend to Vercel and the backend/database to Heroku.
  - Finalize `README.md` with setup and usage instructions.

---

### Success Criteria (Revised)
- **Functionality:** All MVP features are implemented and functional.
- **Synchronization:** Calendar synchronization is automatic and updates within 5 minutes.
- **Usability:** A new user can connect their calendar and create a task in under 2 minutes.
- **Reliability:** The application achieves 95% uptime during the final week of testing.
- **Trustworthiness:** The app provides reliable information from connected services (mock Canvas and Google Calendar).
