# Project Handover: Things+

## 1. Project Overview

**Things+** is a smart, unified task and time management web application designed for students balancing work and academic commitments. It aggregates tasks and events from academic platforms (Canvas) and personal calendars (Google Calendar) into a single, intuitive interface. Its key feature is the intelligent analysis of user schedules to identify and suggest free time for studying, empowering users with proactive control over their time and reducing stress.

This document serves as the official handover for the MVP of the Things+ project. The MVP is functionally complete and meets the core requirements outlined in the Product Requirements Document (PRD).

## 2. Architecture & Technology Stack

The application is built on a modern, serverless architecture using the following technologies:

*   **Frontend:**
    *   **Framework:** Next.js with React
    *   **Language:** TypeScript
    *   **Styling:** Tailwind CSS with DaisyUI
    *   **State Management:** React Query for async data, Zustand for global state.

*   **Backend:**
    *   **Runtime/Framework:** Node.js on Vercel (Serverless) using Next.js API Routes.
    *   **Authentication:** NextAuth.js for Google OAuth.
    *   **Database Access:** Prisma ORM.

*   **Database:**
    *   **Type:** PostgreSQL (hosted on a service like Supabase or Neon).

*   **Key Architectural Patterns:**
    *   **Serverless-First:** Minimizes operational overhead and cost.
    *   **End-to-End Type Safety:** Improves code quality and reduces bugs.
    *   **Modular Design:** Features are implemented as independent modules.

## 3. Getting Started

### Prerequisites

*   Node.js (v24.x or later)
*   npm or yarn
*   A PostgreSQL database
*   Google Cloud Platform project with OAuth credentials (for both login and Calendar API)
*   Canvas API Key

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    *   Create a `.env.local` file in the root directory by copying `.env.example` (if it exists) or creating a new one.
    *   Fill in the required environment variables:
        ```
        # Database
        DATABASE_URL="postgresql://user:password@host:port/database"

        # NextAuth.js
        NEXTAUTH_URL="http://localhost:3000"
        NEXTAUTH_SECRET="a-long-random-string-for-production"
        GOOGLE_CLIENT_ID="your-google-client-id-for-login"
        GOOGLE_CLIENT_SECRET="your-google-client-secret-for-login"

        # Google Calendar
        GOOGLE_CALENDAR_CLIENT_ID="your-google-calendar-client-id"
        GOOGLE_CALENDAR_CLIENT_SECRET="your-google-calendar-client-secret"

        # Canvas
        CANVAS_BASE_URL="https://canvas.instructure.com" # Or your institution's URL

        # Crypto for encrypting API keys
        CRYPTO_SECRET="a-super-secret-key-for-encryption-32-bytes"
        ```

4.  **Initialize the database:**
    *   Run the Prisma migration to create the database schema:
        ```bash
        npx prisma migrate dev --name init
        ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 4. Project Structure

*   `pages/`: Contains the application's pages and UI components.
*   `pages/api/`: Contains all backend API routes.
*   `prisma/`: Contains the `schema.prisma` file defining the database schema.
*   `lib/`: Contains shared utility functions (e.g., `crypto.ts`).
*   `styles/`: Contains global CSS files.
*   `docs/`: Contains all project documentation (PRD, architecture, sprint plans, etc.).
*   `sprint-artifacts/`: Contains detailed technical specifications for each epic and story.

## 5. Next Steps & Recommendations

The MVP is complete, but there are several areas for future improvement:

1.  **[MEDIUM] Add UI for Task Filtering/Sorting:** Implement UI controls to allow users to filter and sort their tasks by priority.
2.  **[LOW] Improve Crypto Utility:** Refactor the `lib/crypto.ts` utility to generate and store a unique Initialization Vector (IV) for each encryption operation. This is a critical security improvement for production.
3.  **Enhance "Find Free Time" Algorithm:** Make the algorithm more sophisticated by considering task deadlines, user-defined constraints (e.g., "no more than 2 hours of study at a time"), and learning from user behavior.
4.  **Periodic Sync:** Implement a cron job (e.g., using Vercel Cron) to automatically sync Canvas and Google Calendar data periodically in the background.
5.  **Testing:** The current test coverage is minimal. A comprehensive testing suite (unit, integration, and end-to-end) should be developed.

This concludes the handover of the Things+ project.
