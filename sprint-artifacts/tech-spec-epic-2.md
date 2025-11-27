# Tech Spec for Epic 2: Core Integrations & Unified View

## Overview

This document provides the technical specification for the implementation of Epic 2. The goal of this epic is to integrate external data sources (Canvas and Google Calendar) and provide unified views for tasks and events.

## Stories in this Epic

*   **Story 2.1:** Full Canvas Sync
*   **Story 2.2:** Google Calendar Connection
*   **Story 2.3:** Google Calendar Display
*   **Story 2.4:** Unified Agenda View
*   **Story 2.5:** Weekly Planner View
*   **Story 2.6:** Today Dashboard View

## Technical Implementation Details

### Story 2.1: Full Canvas Sync

*   **Frontend:**
    *   Update the `/pages/settings.tsx` page to include an option to sync all courses at once, potentially as a button labeled "Sync All Canvas Courses".
*   **Backend:**
    *   A new API route `pages/api/canvas/sync-all.ts` will be created.
    *   This route will:
        1.  Retrieve the decrypted Canvas API key for the user.
        2.  Fetch all active courses for the user from the Canvas API.
        3.  For each course, fetch its assignments.
        4.  Create or update `Task` records in the database for each assignment, preventing duplicates.
        5.  This route will need to be robust to handle potential rate limits from the Canvas API (though for a single user, this might not be a major concern).
*   **Database:**
    *   The `User` model (`canvasApiKey` field) and `Task` model will be utilized.

### Story 2.2: Google Calendar Connection

*   **Frontend:**
    *   Update the `/pages/settings.tsx` page to include a button labeled "Connect Google Calendar".
    *   This button will initiate an OAuth flow to request permissions for Google Calendar access.
*   **Backend:**
    *   A new API route, likely `/api/auth/google-calendar-oauth.ts`, will handle the Google Calendar OAuth callback.
    *   It will store the `access_token` and `refresh_token` received from Google Calendar API in the `User` model.
    *   These tokens should be encrypted before storage, similar to the Canvas API key.
*   **Database:**
    *   The `User` model will be updated to include `googleCalendarAccessToken` (String, encrypted) and `googleCalendarRefreshToken` (String, encrypted) fields.

### Story 2.3: Google Calendar Display

*   **Frontend:**
    *   The `/pages/agenda.tsx` page will be modified to also fetch and display Google Calendar events.
*   **Backend:**
    *   A new API route `pages/api/calendar/events.ts` will be created.
    *   This route will:
        1.  Retrieve and decrypt the user's Google Calendar access token.
        2.  Use the Google Calendar API to fetch events for the specified time range.
        3.  Return the events to the frontend.
*   **Database:**
    *   The `CalendarEvent` model in `prisma/schema.prisma` will be used to store cached calendar events to reduce API calls and improve performance.

### Story 2.4: Unified Agenda View

*   **Frontend:**
    *   The `/pages/agenda.tsx` page will be the central component for this.
    *   It will fetch both tasks (personal and Canvas) and Google Calendar events.
    *   All items will be combined into a single array and sorted chronologically by their respective due dates or start times.
    *   Visual distinction will be added to clearly differentiate between personal tasks, Canvas assignments, and Google Calendar events.
*   **Backend:**
    *   The existing `/api/tasks` endpoint and the new `/api/calendar/events` endpoint will provide the necessary data.

### Story 2.5: Weekly Planner View

*   **Frontend:**
    *   A new page `/pages/weekly-planner.tsx` will be created.
    *   This page will display tasks and events for a chosen week.
    *   It will fetch data from `/api/tasks` and `/api/calendar/events`, similar to the Agenda view, but with a weekly scope.
    *   The UI will provide navigation to move between weeks.
*   **Backend:**
    *   The existing `/api/tasks` and `/api/calendar/events` endpoints will be sufficient, possibly requiring additional query parameters for date ranges.

### Story 2.6: Today Dashboard View

*   **Frontend:**
    *   A new page `/pages/today.tsx` will be created.
    *   This page will display tasks and events that are due or occurring on the current day.
    *   It will fetch data from `/api/tasks` and `/api/calendar/events`, filtered for the current day.
*   **Backend:**
    *   The existing `/api/tasks` and `/api/calendar/events` endpoints will be sufficient, possibly requiring additional query parameters for filtering by current day.
