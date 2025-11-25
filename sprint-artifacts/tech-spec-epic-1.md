# Tech Spec for Epic 1: Foundation & Initial Integration

## Overview

This document provides the technical specification for the implementation of Epic 1. The goal of this epic is to establish the foundational features of the application, including user authentication and basic task management, and to demonstrate initial integration capabilities with Canvas.

## Stories in this Epic

*   **Story 1.1:** User Authentication with Google
*   **Story 1.2:** Manual Task Creation
*   **Story 1.3:** Edit and Delete Personal Tasks
*   **Story 1.4:** Mark Tasks as Complete
*   **Story 1.5:** Micro-integration with Canvas

## Technical Implementation Details

### Story 1.1: User Authentication with Google

*   **Frontend:**
    *   Create a login page at `/pages/login.tsx`.
    *   This page will feature a "Sign in with Google" button.
    *   The button's `onClick` handler will call the `signIn('google')` function from `next-auth/react`.
    *   A loading state will be displayed while authentication is in progress.
*   **Backend:**
    *   The NextAuth.js API route will be located at `/pages/api/auth/[...nextauth].ts`.
    *   It will be configured with the Google provider.
    *   `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` will be sourced from environment variables (`.env.local`).
    *   The Prisma adapter (`@next-auth/prisma-adapter`) will be used to connect NextAuth.js to the database.
*   **Database:**
    *   The `User`, `Account`, `Session`, and `VerificationToken` models in `prisma/schema.prisma` will be used by the Prisma adapter.
    *   On first login, a new `User` record will be automatically created.

### Stories 1.2, 1.3, & 1.4: Task Management (Create, Edit, Delete, Complete)

*   **Frontend:**
    *   A new page will be created at `/pages/tasks.tsx` to display and manage tasks.
    *   This page will fetch tasks from the backend using `useQuery` from `@tanstack/react-query`.
    *   A form component will be created to add new tasks. This form will use `useMutation` from `@tanstack/react-query` to send a `POST` request to the backend.
    *   Each task in the list will have "Edit" and "Delete" buttons, and a checkbox to mark as complete.
    *   Editing will open a modal or inline form to update the task.
    *   Deleting will trigger a `DELETE` request.
    *   The checkbox will trigger a `PUT` request to update the `isCompleted` status.
*   **Backend:**
    *   API routes will be created:
        *   `POST /api/tasks`: Creates a new task. It will expect `title` in the request body.
        *   `PUT /api/tasks/:id`: Updates a task. It can update `title`, `description`, or `isCompleted`.
        *   `DELETE /api/tasks/:id`: Deletes a task.
    *   These API routes will use Prisma Client to perform the corresponding database operations on the `Task` table.
    *   All routes will be protected to ensure only the authenticated user can manage their own tasks.
*   **Database:**
    *   The `Task` model in `prisma/schema.prisma` will be used. The `userId` field will be used to associate tasks with users.

### Story 1.5: Micro-integration with Canvas

*   **Frontend:**
    *   A new settings page will be created at `/pages/settings.tsx`.
    *   This page will have a form to submit a Canvas API key.
    *   The form submission will trigger a `POST` request to `/api/canvas/connect`.
    *   There will also be a "Sync with Canvas" button that triggers a `POST` request to `/api/canvas/sync`.
*   **Backend:**
    *   An API route at `/api/canvas/connect` will receive the Canvas API key.
    *   The key will be encrypted using a library like `crypto` before being saved to the database. The encryption key will be stored in an environment variable.
    *   An API route at `/api/canvas/sync` will:
        1.  Retrieve the encrypted API key for the user from the database.
        2.  Decrypt the key.
        3.  Use the decrypted key to make a request to the Canvas API to fetch assignments from a single, pre-defined course.
        4.  For each assignment, create a new `Task` in the database with `type: 'CANVAS_ASSIGNMENT'`.
*   **Database:**
    *   The `User` model in `prisma/schema.prisma` will be updated to include a `canvasApiKey` field (string, encrypted).
    *   The `Task` model will be used to store the synced assignments.
