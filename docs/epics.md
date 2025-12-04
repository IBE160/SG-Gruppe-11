# ibe160 - Epic Breakdown

**Author:** BIP
**Date:** 2025-12-04
**Project Level:** 3
**Target Scale:** unknown

---

## Overview

This document provides the detailed epic breakdown for ibe160, expanding on the high-level epic list in the [PRD](./PRD.md).

Each epic includes:

- Expanded goal and value proposition
- Complete story breakdown with user stories
- Acceptance criteria for each story
- Story sequencing and dependencies

**Epic Sequencing Principles:**

- Epic 0 establishes foundational infrastructure and initial functionality
- Subsequent epics build progressively, each delivering significant end-to-end value
- Stories within epics are vertically sliced and sequentially ordered
- No forward dependencies - each story builds only on previous work

---

## Epic 0: Project Setup & DevOps

**Goal:** Establish the foundational development and deployment environment, ensuring a smooth and efficient workflow for the entire project lifecycle.

**Value Proposition:** This epic ensures that the project has a robust and automated setup for continuous integration, deployment, and clear API communication, minimizing future operational overhead and accelerating feature delivery.

---

**Story 0.1: CI/CD Pipeline Setup**

As a developer,
I want a CI/CD pipeline configured for the project,
So that code changes are automatically tested and deployed, ensuring quality and a fast feedback loop.

**Acceptance Criteria:**
1. A `.github/workflows/main.yml` file (or equivalent) is created.
2. The pipeline triggers on push to `main` and pull requests.
3. The pipeline includes steps for installing dependencies, running tests, and building the application.
4. The pipeline provides clear status feedback (pass/fail).

**Prerequisites:** None

---

**Story 0.2: Deployment Infrastructure Provisioning**

As a developer,
I want the production deployment infrastructure provisioned and configured,
So that the application can be deployed and accessed by users.

**Acceptance Criteria:**
1. Vercel project is linked to the GitHub repository.
2. Environment variables are securely configured in Vercel.
3. Supabase/Neon database instance is created and connected to the application.
4. Initial database migrations are applied to the production database.

**Prerequisites:** Story 0.1

---

**Story 0.3: API Documentation Generation**

As a developer,
I want to generate and publish up-to-date API documentation,
So that the API can be easily understood and consumed by other developers or services.

**Acceptance Criteria:**
1. An API documentation tool (e.g., Swagger/OpenAPI, Postman collection) is integrated into the project.
2. The documentation accurately reflects all defined API endpoints, request/response formats, and authentication requirements.
3. The documentation is accessible (e.g., published to a static site or a dedicated platform).
4. The documentation is automatically updated as part of the CI/CD pipeline or through a clear manual process.

**Prerequisites:** Story 0.1

---

## Epic 1: Foundation & Initial Integration

**Goal:** Get a basic, usable application into the user's hands as quickly as possible, demonstrating initial integration capabilities.

**Value Proposition:** This epic delivers the core value of a functional to-do list and proves the concept of Canvas integration, providing immediate utility and building confidence in the product's vision.

---

**Story 1.1: User Authentication with Google**

As a new user,
I want to sign up and log in using my Google account,
So that I can quickly and securely access the application without needing to create a new password.

**Acceptance Criteria:**
1. A "Sign in with Google" button is present on the login page.
2. Clicking the button initiates the Google OAuth flow.
3. Upon successful authentication, a new user record is created in the database.
4. The user is redirected to the main application page and is in a logged-in state.
5. If the user already exists, they are simply logged in.

**Prerequisites:** None

---

**Story 1.2: Basic Task Creation & Management**

As a logged-in user,
I want to create, view, edit, and delete personal tasks,
So that I can manage my basic to-do list within the application.

**Acceptance Criteria:**
1. The UI provides a clear way to add a new task with a title and due date.
2. All created tasks are displayed in a list.
3. Each task in the list has options to edit its title and due date.
4. Each task can be marked as "complete".
5. Each task has an option to be deleted.

**Prerequisites:** Story 1.1

---

**Story 1.3: Simple Agenda View**

As a logged-in user,
I want to see my tasks in a simple, chronologically sorted list,
So that I can easily understand what I need to work on next.

**Acceptance Criteria:**
1. A dedicated "Agenda" view exists.
2. The view displays all personal tasks created by the user.
3. Tasks are sorted by their due date, with the soonest at the top.
4. Completed tasks are visually distinct from incomplete tasks.

**Prerequisites:** Story 1.2

---

**Story 1.4: Canvas API Connection**

As a logged-in user,
I want to securely connect my Canvas account using an API key,
So that the application can prepare to sync my assignment data.

**Acceptance Criteria:**
1. A settings page exists where I can manage integrations.
2. The settings page has a form to input my Canvas URL and API Key.
3. The application securely stores these credentials for my user account.
4. The application provides feedback on whether the connection was successful or not.

**Prerequisites:** Story 1.1

---

**Story 1.5: Sync a Single Canvas Course**

As a logged-in user with a Canvas connection,
I want to sync assignments from a single Canvas course,
So that I can see my academic tasks alongside my personal tasks in the Agenda view.

**Acceptance Criteria:**
1. After connecting to Canvas, the user can select one of their courses to sync.
2. The application fetches assignments (name, due date, course name) from the selected course.
3. Fetched assignments are displayed in the "Agenda" view, alongside personal tasks.
4. Canvas assignments are clearly identifiable as such (e.g., with a specific icon or label).

**Prerequisites:** Story 1.3, Story 1.4

---

## Epic 2: Core Integrations & Unified View

**Goal:** Fully integrate with Canvas and Google Calendar to provide a truly unified view of all user commitments.

**Value Proposition:** This epic delivers the core promise of the application: a single place to see everything. This eliminates the need for users to check multiple platforms, reducing cognitive load and saving time.

---

**Story 2.1: Full Canvas Sync**

As a logged-in user with a Canvas connection,
I want the application to automatically sync all my courses and assignments,
So that my agenda is always up-to-date with my academic workload without manual intervention.

**Acceptance Criteria:**
1. The application automatically fetches all active courses from the user's Canvas account.
2. It then fetches all upcoming assignments from those courses.
3. This synchronization happens periodically (e.g., every few hours) and can also be triggered manually.
4. New, updated, and deleted assignments in Canvas are reflected in the application after a sync.

**Prerequisites:** Story 1.5

---

**Story 2.2: Google Calendar Connection**

As a logged-in user,
I want to connect my Google Calendar account,
So that the application can display my personal and work events.

**Acceptance Criteria:**
1. The settings page has an option to "Connect Google Calendar".
2. Clicking this initiates the Google OAuth flow for calendar access (read-only).
3. Upon successful authorization, the application securely stores the necessary tokens.
4. The user receives feedback that the connection was successful.

**Prerequisites:** Story 1.1

---

**Story 2.3: Select Google Calendars**

As a logged-in user with a Google Calendar connection,
I want to choose which of my Google Calendars are displayed,
So that I can control the information shown and avoid clutter from irrelevant calendars.

**Acceptance Criteria:**
1. After connecting, the user is presented with a list of their available Google Calendars.
2. The user can select/deselect calendars from this list.
3. Only events from the selected calendars are fetched and displayed.
4. The user can change their selection at any time in the settings.

**Prerequisites:** Story 2.2

---

**Story 2.4: Unified Agenda View**

As a logged-in user,
I want to see my Canvas assignments, personal tasks, and Google Calendar events in a single, unified agenda,
So that I have a complete and holistic overview of all my commitments.

**Acceptance Criteria:**
1. The "Agenda" view now includes events from the user's selected Google Calendars.
2. All items (tasks, assignments, events) are sorted chronologically.
3. Each item type is visually distinct.
4. The view is performant and easy to read, even with many items.

**Prerequisites:** Story 2.1, Story 2.3

---

**Story 2.5: Weekly Planner View**

As a logged-in user,
I want a weekly planner view of all my tasks and events,
So that I can effectively plan my week ahead.

**Acceptance Criteria:**
1. A new "Weekly" view is available.
2. It displays a 7-day layout (e.g., Monday to Sunday).
3. All tasks, assignments, and events for that week are displayed in their respective day columns.
4. The user can navigate to the next and previous weeks.

**Prerequisites:** Story 2.4

---

**Story 2.6: Today Dashboard**

As a logged-in user,
I want a "Today" dashboard view,
So that I can focus on the tasks and events that are most immediately relevant.

**Acceptance Criteria:**
1. A "Today" view is available, possibly as the default landing page.
2. It displays only the tasks, assignments, and events scheduled for the current day.
3. The view is clean, focused, and helps the user prioritize their day.

**Prerequisites:** Story 2.4

---

## Epic 3: Smart Scheduling & Productivity Tools

**Goal:** Implement the "smart" features that differentiate the product and actively help users manage their time.

**Value Proposition:** This epic moves the application from a passive information aggregator to an active, intelligent assistant. It provides the "wow" factor and delivers on the promise of reducing stress by proactively helping users find time to get things done.

---

**Story 3.1: Task Prioritization**

As a logged-in user,
I want to set a priority level (e.g., high, medium, low) for my tasks,
So that I can visually distinguish and focus on what is most important.

**Acceptance Criteria:**
1. Users can assign a priority level when creating or editing a task.
2. The priority level is visually represented in all task views (Agenda, Weekly, Today).
3. Users can filter or sort tasks by priority.

**Prerequisites:** Story 1.2

---

**Story 3.2: Time Tracking**

As a logged-in user,
I want to track the time I spend on each task,
So that I can understand my work patterns and improve my future time estimates.

**Acceptance Criteria:**
1. Each task has a "Start Timer" button.
2. When the timer is running, it is clearly visible.
3. The user can stop the timer, and the elapsed time is saved to the task.
4. The total time spent is displayed on the task details.

**Prerequisites:** Story 1.2

---

**Story 3.3: Define Preferred Study Times**

As a logged-in user,
I want to define my preferred study times (e.g., "early mornings," "evenings"),
So that the application can make more relevant suggestions for scheduling study sessions.

**Acceptance Criteria:**
1. A setting is available for users to specify their general availability and preferences for studying (e.g., days of the week, time ranges).
2. This information is saved to the user's profile.
3. The "Find Free Time" feature will use this information to rank its suggestions.

**Prerequisites:** Story 1.1

---

**Story 3.4: "Find Free Time" Algorithm**

As a busy user,
I want the application to analyze my schedule and suggest available time slots for a specific task,
So that I can efficiently find and dedicate time for studying without manually scanning my calendar.

**Acceptance Criteria:**
1. A "Find Free Time" button is available for each task.
2. When clicked, the system analyzes the user's calendar events and existing tasks.
3. It identifies and presents a list of "white space" slots that are large enough for the task (based on an estimated duration).
4. The suggestions are ranked based on the user's preferred study times.
5. The user can select a slot to schedule the task.

**Prerequisites:** Story 2.4, Story 3.3

---

**Story 3.5: Proactive Scheduling Suggestions**

As a user,
I want the application to offer suggestions for adjusting my schedule when a task takes significantly longer than estimated,
So that I can stay on track and realistically manage my commitments.

**Acceptance Criteria:**
1. The system compares `timeSpent` with `estimatedTime` for completed tasks.
2. If there is a significant variance, the system learns from this for future estimates.
3. For in-progress tasks, if the timer exceeds the estimate, the system can trigger a notification.
4. The notification suggests finding a new time slot or adjusting the plan for other tasks.

**Prerequisites:** Story 3.2, Story 3.4

---

## Story Guidelines Reference

**Story Format:**

```
**Story [EPIC.N]: [Story Title]**

As a [user type],
I want [goal/desire],
So that [benefit/value].

**Acceptance Criteria:**
1. [Specific testable criterion]
2. [Another specific criterion]
3. [etc.]

**Prerequisites:** [Dependencies on previous stories, if any]
```

**Story Requirements:**

- **Vertical slices** - Each story delivers complete, testable functionality
- **Sequential ordering** - Logical progression within epic
- **No forward dependencies** - Only depend on previous work
- **AI-agent sized** - Completable in 2-4 hour focused session
- **Value-focused** - Integrate technical enablers into value-delivering stories

---

**For implementation:** Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown.