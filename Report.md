# Project Report: Things+

## 1. Project Overview

**Things+** is a smart, unified task and time management web application designed for students who are also balancing work and other commitments. The primary goal of the application is to reduce stress and increase productivity by aggregating tasks and events from academic platforms (Canvas) and personal calendars (Google Calendar) into a single, intuitive interface. The application's key feature is its ability to intelligently analyze a user's schedule to identify and suggest available "free time" slots for studying and other tasks.

## 2. Key Features Implemented

Based on the project's documentation and codebase, the following key features have been implemented as part of the Minimum Viable Product (MVP):

*   **Authentication:** Secure user sign-up and login via Google Accounts.
*   **Unified Views:**
    *   **Agenda View:** A chronological list of all tasks and calendar events.
    *   **Today View:** A dashboard focused on tasks and events for the current day.
    *   **Weekly Planner:** A read-only view of the entire week's schedule.
*   **Integrations:**
    *   **Canvas Integration:** Synchronization of assignments from Canvas, which appear as tasks within the application.
    *   **Google Calendar Integration:** Read-only synchronization of events from the user's Google Calendar.
*   **Task Management:**
    *   Creation, editing, and deletion of personal tasks.
    *   Ability to mark both personal and synced tasks as complete.
    *   Functionality to track time spent on individual tasks with start/stop timers.
*   **Smart Scheduling:**
    *   **"Find Free Time" Feature:** An intelligent algorithm that identifies and suggests available time slots in the user's schedule.

## 3. Development Summary

The project was developed following a structured plan broken down into three main epics.

### Epic 1: Foundation & Initial Integration
This phase focused on building the core of the application. Key deliverables included setting up the secure Google authentication, implementing manual task management features, and establishing an initial connection to the Canvas API.

### Epic 2: Core Integrations & Unified View
This phase expanded on the foundation by fully integrating the core external services. A one-way synchronization with Canvas was completed to pull in academic assignments, and a read-only integration with Google Calendar was established. The data from these sources was then unified into the Agenda, Today, and Weekly Planner views.

### Epic 3: Smart Scheduling & Productivity Tools
The final phase introduced the "smart" features that define the Things+ experience. The "Find Free Time" algorithm was developed and implemented, and the time-tracking functionality for tasks was completed, providing users with powerful tools to enhance their productivity.

## 4. Technology Stack

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Database ORM:** Prisma

## 5. Project Management

The project followed an agile-like methodology, with development organized into Epics and user stories. Progress was tracked through detailed documentation in the `docs/` and `sprint-artifacts/` directories. The commit history reflects a systematic progression through these planned stories, culminating in the completion of the MVP.

## 6. Conclusion

According to the project's version control history, the development of the Things+ Minimum Viable Product (MVP) has been successfully completed. The application fulfills the core requirements outlined in the Product Requirements Document, delivering a functional and user-friendly tool for time management.
