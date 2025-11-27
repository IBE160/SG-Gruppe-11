# Tech Spec for Epic 3: Smart Scheduling & Productivity Tools

## Overview

This document provides the technical specification for the implementation of Epic 3. The goal of this epic is to implement the "smart" features that differentiate the product, focusing on the "Find Free Time" algorithm and productivity tools.

## Stories in this Epic

*   **Story 3.1:** Task Prioritization
*   **Story 3.2:** Time Tracking for Tasks
*   **Story 3.3:** Define Preferred Study Times
*   **Story 3.4:** "Find Free Time" Algorithm (MVP)
*   **Story 3.5:** Integrate "Find Free Time" in UI

## Technical Implementation Details

### Story 3.1: Task Prioritization

*   **Frontend:**
    *   Update the task creation/editing UI (e.g., in `/pages/tasks.tsx` or a task detail modal) to include a dropdown or radio buttons for selecting priority (LOW, MEDIUM, HIGH).
    *   Visually represent the priority level in task lists (e.g., color-coding, icons).
*   **Backend:**
    *   The existing `/api/tasks` (POST and PUT) endpoints will be updated to accept and store the `priority` field for tasks.
*   **Database:**
    *   The `Task` model in `prisma/schema.prisma` already has a `priority` field.

### Story 3.2: Time Tracking for Tasks

*   **Frontend:**
    *   Update the task display in `/pages/tasks.tsx` and potentially other views to include "Start Timer" and "Stop Timer" buttons or a simple timer display.
    *   The UI will display the `timeSpent` for a task.
*   **Backend:**
    *   New API endpoints will be needed, e.g., `POST /api/tasks/:id/start-timer` and `POST /api/tasks/:id/stop-timer`.
    *   These endpoints will update the `timeSpent` field in the `Task` model.
*   **Database:**
    *   The `Task` model in `prisma/schema.prisma` already has a `timeSpent` field.

### Story 3.3: Define Preferred Study Times

*   **Frontend:**
    *   Update the `/pages/settings.tsx` page to include a new section for "Preferred Study Times".
    *   This UI will allow users to define days of the week and time ranges (e.g., "Mon-Fri, 18:00-22:00").
    *   A "Save" button will trigger an API call to store these preferences.
*   **Backend:**
    *   A new API endpoint `PUT /api/user/preferences` will be created to update the user's `preferredStudyTimes`.
    *   The `preferredStudyTimes` will be stored as JSON in the `User` model.
*   **Database:**
    *   The `User` model in `prisma/schema.prisma` already has a `preferredStudyTimes Json?` field.

### Story 3.4: "Find Free Time" Algorithm (MVP)

*   **Backend:**
    *   A new API route `pages/api/schedule/free-time.ts` will be created.
    *   This API will:
        1.  Fetch the user's `preferredStudyTimes`.
        2.  Fetch all active tasks and Google Calendar events within a specified timeframe (e.g., next 2 weeks).
        3.  Implement the core "Timeline" algorithm logic (as described in `architecture.md`) to identify available time slots that align with preferred study times and avoid conflicts.
        4.  Return a list of suggested free time slots.
*   **Database:**
    *   Utilizes `User` (for `preferredStudyTimes`, Google Calendar tokens) and `Task` and `CalendarEvent` models.

### Story 3.5: Integrate "Find Free Time" in UI

*   **Frontend:**
    *   Add a "Find Free Time" button/feature to relevant UI sections (e.g., `/pages/tasks.tsx`, `/pages/agenda.tsx`).
    *   When clicked, this will trigger a call to the `/api/schedule/free-time` endpoint.
    *   The results (suggested time slots) will be displayed in a user-friendly manner, possibly allowing the user to select a suggestion and create a new task or event for it.
*   **Backend:**
    *   No new backend changes required, as `/api/schedule/free-time.ts` will provide the data.

---
