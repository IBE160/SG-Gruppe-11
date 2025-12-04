# ibe160 Product Requirements Document (PRD)

**Author:** BIP
**Date:** 2025-12-04
**Project Level:** unknown
**Target Scale:** unknown

---

## Goals and Background Context

### Goals

*   Successfully develop a working web application using AI tools.
*   Acquire transferable knowledge and skills in AI-driven development.
*   Create a functional and user-friendly product that simplifies time management and reduces stress for users.
*   Achieve high user adoption of Canvas and Google Calendar integrations.
*   Ensure consistent daily/weekly user engagement with the application.
*   Improve user effectiveness in managing academic tasks.
*   Promote active utilization of the "Find Free Time" feature.

### Background Context

Students balancing full-time work and academic commitments face significant stress and inefficiencies due to fragmented information across multiple platforms (Canvas, personal calendars, work schedules). This leads to missed deadlines and feelings of being overwhelmed. Things+ addresses this by providing a smart, unified task and time management web application that aggregates commitments from academic platforms and personal calendars. Its key differentiator is the intelligent analysis of user schedules to identify and suggest free time for studying, empowering users with proactive control over their time and reducing stress.

---

## Requirements

### Functional Requirements

### Functional Requirements

*   **Authentication & Onboarding**
    *   FR001: Users shall be able to sign up and log in to the application using their Google account.
    *   FR002: The system shall provide a guided onboarding process that allows users to connect their Canvas and Google Calendar accounts.
    *   FR003: Users shall be able to skip the integration step during onboarding and complete it later.
*   **Canvas Integration**
    *   FR004: The system shall allow users to provide their Canvas API credentials to establish a connection.
    *   FR005: The system shall periodically poll the Canvas API to synchronize assignment details (ID, name, due date, course name, URL).
    *   FR006: The system shall provide a manual "Sync with Canvas" button to trigger immediate synchronization.
*   **Google Calendar Integration**
    *   FR007: The system shall allow users to grant read-only access to their Google Calendar.
    *   FR008: The system shall allow users to select which of their Google Calendars to display in the application.
*   **Task Management**
    *   FR009: The system shall display synchronized Canvas assignments as tasks.
    *   FR010: Users shall be able to create, edit, and delete personal tasks.
    *   FR011: Users shall be able to mark tasks (both Canvas and personal) as complete.
    *   FR012: Users shall be able to set a priority level (e.g., high, medium, low) for tasks.
    *   FR013: Users shall be able to start and stop a timer for each task to track actual time spent.
*   **Scheduling & Views**
    *   FR014: The system shall display all tasks and calendar events in a unified "Agenda" view, sorted chronologically.
    *   FR015: The system shall display a read-only "Weekly Planner" view showing tasks and events for the selected week.
    *   FR016: The system shall display a "Today" dashboard showing tasks and events due on the current day.
    *   FR017: The system shall have an algorithm to identify and suggest available "white space" (free time slots) for studying based on calendar events and user-defined availability.
    *   FR018: Users shall be able to define their preferred study times (e.g., "early mornings," "evenings").
    *   FR019: The "Find Free Time" feature shall prioritize suggesting time slots that align with the user's preferred study times.
    *   FR020: The system shall learn from the user's time tracking data to suggest more accurate time estimates for future tasks.
    *   FR021: When a task takes significantly longer than estimated, the system shall suggest adjustments to the user's schedule.

### Non-Functional Requirements

### Non-Functional Requirements

*   NFR001: The system shall be accessible as a responsive website on desktop and mobile devices.
*   NFR002: The system shall be compatible with the latest versions of Chrome, Firefox, Safari, and Edge browsers.
*   NFR003: The system shall be built using a serverless architecture to minimize operational overhead.
*   NFR004: The system shall maintain end-to-end type safety using TypeScript.
*   NFR005: The system shall operate exclusively within the free tiers of all utilized services and tools.
*   NFR006: The system shall provide secure authentication for user data.

---

## User Journeys

### User Journey 1: "The Juggler" - Managing a New Canvas Assignment and Finding Study Time

*   **Persona:** The Juggler (student in their 30s/40s, balancing work, family, studies)
*   **Goal:** To efficiently integrate a new Canvas assignment into their schedule and find dedicated study time without disrupting other commitments.

1.  **Trigger:** The Juggler receives a notification (or manually syncs) about a new Canvas assignment in Things+.
2.  **Action:** The Juggler opens Things+ and sees the new assignment on their "Today" dashboard or "Agenda" view.
3.  **Action:** The Juggler reviews the assignment details (due date, course, description).
4.  **Action:** The Juggler estimates the time needed for the assignment (e.g., 3 hours) and sets a priority.
5.  **Action:** The Juggler uses the "Find Free Time" feature.
6.  **System:** Things+ analyzes the Juggler's integrated Google Calendars (work, family, personal) and existing tasks.
7.  **System:** Things+ suggests several "white space" blocks (e.g., "Tuesday 8 PM - 9:30 PM", "Wednesday 6 AM - 7:30 AM").
8.  **Decision Point:** The Juggler chooses the most suitable time block (e.g., Wednesday morning, as it's less likely to be interrupted).
9.  **Action:** The Juggler confirms the study block, and Things+ adds a personal task/event to their internal schedule (and optionally to Google Calendar if that feature is implemented later).
10. **Outcome:** The Juggler feels confident that the assignment is accounted for and has a dedicated, protected time slot for focused work, reducing anxiety.

### User Journey 2: "The Ambitious Starter" - Prioritizing Tasks and Optimizing Weekly Schedule

*   **Persona:** The Ambitious Starter (younger student in their 20s, working full-time, highly motivated)
*   **Goal:** To optimize their weekly schedule to ensure all high-priority academic and work tasks are completed, maximizing productivity.

1.  **Trigger:** The Ambitious Starter starts their week and opens Things+ to plan.
2.  **Action:** The Ambitious Starter reviews their "Weekly Planner" view, seeing all Canvas assignments, personal tasks, and calendar events.
3.  **Action:** The Ambitious Starter identifies high-priority tasks (e.g., a major project due Friday, an important work meeting).
4.  **Action:** The Ambitious Starter uses the task prioritization feature to mark these tasks as "High Priority."
5.  **Action:** The Ambitious Starter notices a potential conflict or a busy day. They use the "Find Free Time" feature to proactively schedule study blocks for upcoming assignments.
6.  **System:** Things+ highlights potential conflicts and suggests re-prioritizing or rescheduling less critical tasks.
7.  **Decision Point:** The Ambitious Starter adjusts their schedule, perhaps moving a personal task to a less busy day or breaking down a large study block into smaller, more manageable chunks.
8.  **Outcome:** The Ambitious Starter has a clear, optimized weekly plan, feels in control of their time, and is confident they can meet all their commitments.

---

## UX Design Principles

## UX Design Principles

*   **Clarity & Simplicity:** The interface will be clean, uncluttered, and easy to understand, minimizing cognitive load. The primary view will be a weekly plan, with a clear option to drill down to a daily view.
*   **Empowerment & Control:** Users will feel in control of their schedule and tasks, with clear actions and feedback. The system will proactively suggest "focus blocks" for high-priority tasks.
*   **Efficiency & Automation:** Streamline workflows and automate repetitive tasks. The system will automatically highlight tasks with approaching deadlines, reducing the need for manual prioritization.
*   **Personalization & Well-being:** Provide a tailored experience based on user integrations and preferences. The "white space" finder will also be used to suggest time for personal activities and rest, promoting a healthy work-life-study balance.
*   **Engagement & Motivation:** Encourage consistent use of key features through positive reinforcement, such as "streaks" for completing tasks or using the "Find Free Time" feature.

---

## User Interface Design Goals

*   **Weekly Plan as Landing Page (Highlighted):** The application will open to a visual weekly timeline (Monday-Sunday) as the primary planning view, with a strong visual emphasis to highlight its importance.
*   **Focused Daily View:** A dedicated "Today" view will provide a focused overview of the current day's tasks and events.
*   **Dedicated Task Management:** A separate, comprehensive "Tasks" section will allow for detailed task management.
*   **Intuitive Navigation:** Clear and consistent navigation will be provided to switch between "Plan," "Today," "Tasks," and "Settings."
*   **Visual Timeline View:** The primary planning view will be a visual timeline, providing an intuitive at-a-glance understanding of the user's commitments.
*   **Gamification Elements:** The UI will incorporate subtle gamification elements, such as "streaks," to motivate users and enhance engagement.
*   **Proactive Suggestions:** The system will proactively suggest "focus blocks" and highlight high-priority tasks directly within the UI.
*   **Minimalist Aesthetic:** The UI will adhere to a clean, functional, and minimalist aesthetic, utilizing Tailwind CSS and shadcn/ui for a modern and consistent look and feel.

---

## Epic List

## Epic List

### Epic 1: Foundation & Initial Integration

*   **Goal:** Get a basic, usable application into the user's hands as quickly as possible, demonstrating initial integration capabilities.
*   **Scope:** Secure user authentication, a simple "Agenda" view, the ability to manually create, edit, and delete personal tasks, AND a micro-integration allowing the user to sync a single course from Canvas.
*   **Potential Risks:**
    *   **Technical Risk:** Setting up the initial infrastructure and the micro-integration could be more complex than anticipated.
    *   **UI/UX Risk:** The initial UI for manual task management might need significant refactoring to accommodate full synced tasks later.

### Epic 2: Core Integrations & Unified View

*   **Goal:** Integrate Canvas and Google Calendar to provide the unified view.
*   **Scope:** One-way Canvas sync, read-only Google Calendar sync, and display of synced data in the planning views.
*   **Potential Risks:**
    *   **External Dependency Risk:** The Canvas and Google Calendar APIs could have unexpected issues.
    *   **Data Handling Risk:** Merging and displaying data from multiple sources can be complex.

### Epic 3: Smart Scheduling & Productivity Tools

*   **Goal:** Implement the "smart" features that differentiate the product.
*   **Scope:** "White space" finder, preferred study times, time tracking, and proactive suggestions.
*   **Potential Risks:**
    *   **Algorithm Risk:** The "white space" finding algorithm might not be as "smart" as intended.
    *   **User Adoption Risk:** Users might not trust or adopt the proactive scheduling suggestions.
    *   **Scope Creep Risk:** The "smart" features could be a source of significant scope creep.

> **Note:** Detailed epic breakdown with full story specifications is available in [epics.md](./epics.md)

---

## Out of Scope

## Out of Scope

*   Real-time Canvas updates via webhooks.
*   Read/write access to Google Calendar (creating or modifying events).
*   Kanban board view for task management.
*   Recurring tasks functionality.
*   Advanced gamification features (e.g., points, streaks, badges beyond simple visual indicators).
*   Proactive "smart" suggestions beyond identifying "white space" and suggesting focus blocks.
*   Collaboration features (e.g., sharing task lists or project boards).
*   Advanced task details from Canvas (e.g., `submission_status`, `assignment_type`).
*   Full integration with all Canvas features beyond basic assignment details.
*   Integration with other academic platforms beyond Canvas.
*   Integration with other calendar services beyond Google Calendar.
*   Complex analytics or reporting features.
