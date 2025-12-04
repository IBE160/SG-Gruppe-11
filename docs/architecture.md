# 1 Decision Architecture

## 1.1 Executive Summary

This document outlines the architecture for the `ibe160` project, a new software system for time management. It details the key architectural decisions, technology stack, and implementation patterns to guide the project's development.

## 1.2 Goals and Background Context

### 1.2.1 Goals

*   Successfully develop a working web application using AI tools.
*   Acquire transferable knowledge and skills in AI-driven development.
*   Create a functional and user-friendly product that simplifies time management and reduces stress for users.
*   Achieve high user adoption of Canvas and Google Calendar integrations.
*   Ensure consistent daily/weekly user engagement with the application.
*   Improve user effectiveness in managing academic tasks.
*   Promote active utilization of the "Find Free Time" feature.

### 1.2.2 Background Context

Students balancing full-time work and academic commitments face significant stress and inefficiencies due to fragmented information across multiple platforms (Canvas, personal calendars, work schedules). This leads to missed deadlines and feelings of being overwhelmed. Things+ addresses this by providing a smart, unified task and time management web application that aggregates commitments from academic platforms and personal calendars. Its key differentiator is the intelligent analysis of user schedules to identify and suggest free time for studying, empowering users with proactive control over their time and reducing stress.

## 1.3 Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
|---|---|---|---|---|
| Authentication | Users can sign up and log in with Google account | MVP | 1 | To simplify user onboarding and authentication. |
| Authentication | Guided onboarding process for Canvas and Google Calendar | MVP | 1 | To ensure users connect their external accounts for full functionality. |
| Authentication | Users can skip integration during onboarding | MVP | 1 | To allow users to explore the app before committing to integrations. |
| Canvas Integration | Users can provide Canvas API credentials | MVP | 2 | To establish a connection with the Canvas platform. |
| Canvas Integration | Periodically poll Canvas API for assignment details | MVP | 2 | To keep the application's data in sync with Canvas. |
| Canvas Integration | Manual "Sync with Canvas" button | MVP | 2 | To give users control over data synchronization. |
| Google Calendar | Users can grant read-only access to Google Calendar | MVP | 2 | To display calendar events in the application. |
| Google Calendar | Users can select which Google Calendars to display | MVP | 2 | To give users control over the data displayed in the application. |
| Task Management | Display synchronized Canvas assignments as tasks | MVP | 2 | To provide a unified view of all tasks. |
| Task Management | Users can create, edit, and delete personal tasks | MVP | 1 | To allow users to manage their personal tasks. |
| Task Management | Users can mark tasks as complete | MVP | 1, 2 | To track task completion. |
| Task Management | Users can set a priority level for tasks | MVP | 3 | To help users prioritize their work. |
| Task Management | Users can start and stop a timer for each task | MVP | 3 | To track time spent on tasks. |
| Scheduling & Views | Unified "Agenda" view for all tasks and events | MVP | 2 | To provide a single, chronological view of all commitments. |
| Scheduling & Views | Read-only "Weekly Planner" view | MVP | 2 | To provide a weekly overview of tasks and events. |
| Scheduling & Views | "Today" dashboard for tasks and events due today | MVP | 2 | To provide a focused view of the current day's commitments. |
| Scheduling & Views | Algorithm to identify and suggest free time | MVP | 3 | To help users find time to study. |
| Scheduling & Views | Users can define preferred study times | MVP | 3 | To personalize the "Find Free Time" feature. |
| Scheduling & Views | "Find Free Time" prioritizes preferred study times | MVP | 3 | To provide more relevant suggestions to the user. |
| Scheduling & Views | Learn from time tracking data for more accurate estimates | Post-MVP | 3 | To improve the accuracy of the scheduling suggestions. |
| Scheduling & Views | Suggest schedule adjustments when tasks take longer | Post-MVP | 3 | To help users stay on track with their schedule. |
| Non-Functional | Responsive website for desktop and mobile devices | MVP | 1, 2, 3 | To ensure the application is accessible on all devices. |
| Non-Functional | Compatible with latest versions of major browsers | MVP | 1, 2, 3 | To ensure a consistent user experience across browsers. |
| Non-Functional | Serverless architecture | MVP | 1, 2, 3 | To minimize operational overhead. |
| Non-Functional | End-to-end type safety using TypeScript | MVP | 1, 2, 3 | To improve code quality and reduce bugs. |
| Non-Functional | Operate exclusively within free tiers of all services | MVP | 1, 2, 3 | To adhere to the project's zero-budget constraint. |
| Non-Functional | Secure authentication for user data | MVP | 1 | To protect user privacy and data. |

## 1.4 Project Structure

```
{{project_root}}/
/
├── .github/
│   └── workflows/
│       └── backup.yml
├── .vscode/
├── node_modules/
├── prisma/
│   └── schema.prisma
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── ...
│   │   ├── (main)/
│   │   │   ├── dashboard/
│   │   │   ├── planner/
│   │   │   └── ...
│   │   └── layout.tsx
│   ├── components/
│   │   └── ui/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   └── ...
│   ├── pages/
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth].ts
│   │       └── ...
│   └── styles/
│       └── globals.css
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 1.5 Epic to Architecture Mapping

| Epic | Goal | Key Functional Requirements | Architectural Components |
|---|---|---|---|
| **Epic 1: Foundation & Initial Integration** | Get a basic, usable application into the user's hands as quickly as possible, demonstrating initial integration capabilities. | FR001, FR002, FR003 (Authentication & Onboarding), FR010, FR011 (Task Management - personal tasks), FR004, FR005, FR006 (Canvas Integration - micro-integration) | Authentication Module, Task Management Module, Canvas Integration Module, Frontend UI (Agenda View) |
| **Epic 2: Core Integrations & Unified View** | Integrate Canvas and Google Calendar to provide the unified view. | FR004, FR005, FR006 (Canvas Integration - full sync), FR007, FR008 (Google Calendar Integration), FR009 (Task Management - Canvas tasks), FR014, FR015, FR016 (Scheduling & Views - unified views) | Canvas Integration Module, Google Calendar Integration Module, Data Synchronization Service, Frontend UI (Agenda, Weekly Planner, Today Views) |
| **Epic 3: Smart Scheduling & Productivity Tools** | Implement the "smart" features that differentiate the product. | FR012, FR013 (Task Management - priority, timer), FR017, FR018, FR019, FR020, FR021 (Scheduling & Views - smart scheduling) | Scheduling Algorithm Service, User Preference Management, Time Tracking Module, Frontend UI (Smart Scheduling features) |

## 1.6 Technology Stack Details

_All versions verified on 2025-12-04. The strategy is to use the latest stable or Long-Term Support (LTS) versions to ensure both stability and access to modern features. The chosen versions are believed to be fully compatible._

### 1.6.1 Core Technologies

### 1.6.2 Frontend
*   **Framework:** Next.js v16.0.1 (React v19.2.0 + TypeScript v5.9.3)
*   **Styling:** Tailwind CSS v4.1.16 + shadcn/ui v3.5.0
*   **State Management:** React Query v5.90.6 (for async data), Zustand v5.0.8 (for light global state)
*   **Validation:** Zod v4.1.12, React Hook Form v7.66.0
*   **Testing:** Jest v30.2.0, React Testing Library v16.3.0, Playwright v1.53

### 1.6.3 Backend
*   **Runtime/Framework:** Node.js v24.11.0 (LTS) on Vercel (Serverless) using Next.js v16.0.1 API Routes
*   **Authentication:** Auth.js (NextAuth) v4.24.13 for Google OAuth
*   **Database Access:** Prisma ORM v6.19.0
*   **Validation:** Zod v4.1.12 (shared between frontend and backend)
*   **HTTP Client:** `axios` v1.13.2

### 1.6.4 Database
*   **Type:** Relational (PostgreSQL v18)
*   **Hosting:** Supabase (Client v2.78.0) or Neon (supports PostgreSQL v17)

### 1.6.5 Integration Points

### 1.6.6 Canvas Integration
*   **Authentication:** Users provide Canvas API credentials.
*   **Synchronization:** Periodic polling of Canvas API for assignment details (ID, name, due date, course name, URL).
*   **Manual Sync:** "Sync with Canvas" button for immediate synchronization.

### 1.6.7 Google Calendar Integration
*   **Authentication:** Users grant read-only access to their Google Calendar.
*   **Selection:** Users can select specific Google Calendars to display.

## 1.7 Starter Template Integration

The project is initialized using the standard `create-next-app` command, which serves as the starter template.

### 1.7.1 Decisions Provided by Starter (`create-next-app`)
*   **Framework:** Next.js with React and TypeScript. (PROVIDED BY STARTER)
*   **Project Structure:** Initial file and folder structure (`app/`, `public/`, `package.json`, `tsconfig.json`, etc.). (PROVIDED BY STARTER)
*   **Build System:** Integrated build and development server. (PROVIDED BY STARTER)
*   **Routing:** App Router for file-based routing. (PROVIDED BY STARTER)

### 1.7.2 Remaining Decisions (Not Covered by Starter)
*   **Styling:** Decision to use Tailwind CSS and shadcn/ui.
*   **State Management:** Decision to use React Query and Zustand.
*   **Authentication:** Decision to use Auth.js for Google OAuth.
*   **Database:** Decision to use Prisma with PostgreSQL (Supabase/Neon).
*   **Testing:** Decision to use Jest, RTL, and Playwright.
*   **All other specific implementation patterns and consistency rules.**

## 1.8 Novel Pattern Designs

### 1.8.1 Finding Free Time (The "Timeline" Algorithm)

This algorithm is the core intelligence of the application, designed to intelligently identify and suggest free time slots for studying.

1.  **User Defines Study Hours:** During onboarding, users specify their general availability for studying (e.g., "Weekdays 6 PM - 10 PM").
2.  **User Estimates Task Duration:** Each task includes an "Estimated Time" field.
3.  **The Algorithm Runs:** For a given task, the system will:
    *   Analyze the user's defined Study Hours between the present and the task's due date.
    *   Cross-reference with integrated Google Calendar events to pinpoint actual "free time."
    *   Identify sufficient free time blocks to match the task's estimated duration.
    *   **Suggest these optimal time slots directly within the Things+ user interface.**

#### 1.8.1.1 Edge Cases and Failure Modes
*   **No Study Hours Defined:** The algorithm will prompt the user to define their study hours.
*   **Task Has No Estimated Time:** The algorithm will prompt the user to add an estimated time to the task.
*   **Task is Past Due:** The algorithm will not run and will display a "Past Due" message.
*   **No Free Time Available:** The algorithm will inform the user that no suitable time slots were found and may suggest breaking the task into smaller parts.
*   **Google Calendar API Failure:** The system will gracefully handle the error, notify the user that calendar data could not be fetched, and suggest proceeding without it or retrying later.

#### 1.8.1.2 States and Transitions
*   **IDLE:** The initial state before the user interacts with the feature.
*   `selects task` -> **CALCULATING:** The algorithm is actively fetching calendar data and searching for time slots.
*   `free time found` -> **SUGGESTIONS_READY:** The algorithm has found one or more suitable time slots to present to the user.
*   `no free time found` -> **NO_SUGGESTIONS:** The algorithm could not find any suitable time slots.
*   `API error or other failure` -> **ERROR:** The algorithm encountered an error and displays an appropriate message.

## 1.9 Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

*   **Modular Design:** Implement features as independent modules (e.g., Authentication, Canvas Integration, Google Calendar Integration, Task Management, Scheduling) to promote maintainability and scalability. For example, all authentication logic resides in `src/features/auth`.
*   **Component-Based UI:** Utilize a component-based architecture (e.g., React components with Next.js) for building the user interface, ensuring reusability and consistency. For example, a reusable `Button` component is defined in `src/components/ui/Button.tsx`.
*   **API-First Approach:** Design and implement clear API contracts between frontend and backend services to facilitate independent development and integration. For example, the API for tasks is defined in `src/pages/api/tasks/[id].ts` before the UI is built.
*   **UI State Management:** Components should explicitly handle loading, empty, and error states to provide a clear user experience.
    *   **Loading State:** Display a skeleton loader or spinner while data is being fetched. Example: `if (isLoading) return <Spinner />;`
    *   **Empty State:** When a list or table has no data, display a message and a call-to-action. Example: `if (data.length === 0) return <EmptyState message="No tasks found" action={<CreateTaskButton />} />;`
    *   **Error State:** If an error occurs, display a user-friendly error message. Example: `if (isError) return <ErrorMessage message="Failed to load tasks" />;`

## 1.10 Testing Patterns

To ensure code quality and application stability, the following testing patterns will be implemented:

*   **Unit Tests:**
    *   **Technology:** Jest, React Testing Library.
    *   **Scope:** Individual functions, React components in isolation, and utility functions.
    *   **Goal:** Verify that each unit of code works as expected.
    *   **Location:** Test files will be co-located with the source code they are testing (e.g., `my-component.tsx` and `my-component.test.tsx` will be in the same folder).
*   **Integration Tests:**
    *   **Technology:** Jest, React Testing Library.
    *   **Scope:** Combinations of components and services to test their interactions (e.g., a form component interacting with a validation hook).
    *   **Goal:** Ensure that different parts of the application work together correctly.
*   **End-to-End (E2E) Tests:**
    *   **Technology:** Playwright.
    *   **Scope:** Full user workflows from the browser's perspective (e.g., logging in, creating a task, syncing with Canvas).
    *   **Goal:** Validate the complete application flow and user experience.

## 1.11 Consistency Rules

### 1.11.1 Naming Conventions

*   **Files and Folders:** `kebab-case` (e.g., `my-component.tsx`, `my-module/my-feature`).
*   **React Components:** `PascalCase` (e.g., `MyComponent`, `UserProfile`).
*   **TypeScript Interfaces and Types:** `PascalCase` (e.g., `User`, `TaskItem`).
*   **Variables and Functions:** `camelCase` (e.g., `userName`, `fetchData`).
*   **Constants:** `SCREAMING_SNAKE_CASE` (e.g., `API_BASE_URL`, `MAX_RETRIES`).
*   **CSS Classes (Tailwind CSS):** Use Tailwind's utility-first classes. For custom classes, use `kebab-case`.
*   **Database Tables:** `snake_case` (e.g., `users`, `user_tasks`).
*   **Database Columns:** `snake_case` (e.g., `user_id`, `created_at`).

### 1.11.2 Code Organization

*   **Feature-Sliced Design:** Organize code by feature rather than by type (e.g., `src/features/auth`, `src/features/tasks`). This promotes modularity and reduces coupling.
*   **Atomic Design Principles:** For UI components, organize them into atoms, molecules, organisms, templates, and pages. This helps in building a scalable and maintainable UI.
*   **Separation of Concerns:** Clearly separate UI components, business logic, data fetching, and utility functions into distinct layers or directories.
*   **`lib/` for Utilities and Hooks:** Place reusable utility functions, custom hooks, and shared configurations in a `lib/` directory.
*   **`components/` for UI Components:** Store generic, reusable UI components in a `components/` directory.
*   **`app/` for Pages and Layouts (Next.js):** Follow Next.js conventions for organizing pages, layouts, and API routes within the `app/` directory.
*   **`prisma/` for Database Schema:** Keep the Prisma schema and migrations within the `prisma/` directory.
*   **Configuration Files:** Centralize configuration files (e.g., `tailwind.config.js`, `next.config.js`, `tsconfig.json`) at the project root.

### 1.11.3 Date and Time Handling
*   **API Format:** All dates and times exchanged between the frontend and backend (via API) must be in **ISO 8601 format** (e.g., `2025-11-05T14:48:00.000Z`).
*   **UI Format:** For display in the user interface, dates and times should be formatted in a user-friendly, consistent manner using a library like `date-fns`. Example: "November 5, 2025" or "2:48 PM".

### 1.11.4 Error Handling

*   **Centralized Error Logging:** Implement a centralized logging mechanism (e.g., using a dedicated logging library or a cloud-based logging service if within free tier limits) to capture and store application errors.
*   **User-Friendly Error Messages:** Provide clear, concise, and actionable error messages to the user, avoiding technical jargon.
*   **Graceful Degradation:** Design the application to degrade gracefully in the event of errors, preventing crashes and maintaining a usable state where possible.
*   **API Error Handling:** Implement specific error handling for API calls, including retries for transient errors, circuit breakers for persistent failures, and clear feedback to the user.
*   **Frontend Error Boundaries:** Utilize React Error Boundaries to catch and display fallback UI for errors in UI components, preventing the entire application from crashing.
*   **Backend Error Middleware:** Implement global error handling middleware in the backend to catch unhandled exceptions and return consistent error responses.
*   **Type-Safe Error Handling:** Leverage TypeScript to define custom error types and ensure type safety in error handling logic.
*   **Monitoring and Alerting:** Set up monitoring and alerting for critical errors in production to enable prompt detection and resolution.

### 1.11.5 Logging Strategy

*   **Structured Logging:** Implement structured logging (e.g., JSON format) to make logs easily parsable and queryable by logging tools.
*   **Contextual Logging:** Include relevant context in log messages (e.g., user ID, request ID, module name, function name) to aid in debugging and troubleshooting.
*   **Log Levels:** Utilize standard log levels (e.g., `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL`) to categorize log messages and control verbosity.
*   **Centralized Log Management:** Integrate with a centralized log management system (e.g., Vercel's built-in logging, or a third-party service if within free tier limits) for aggregation, storage, and analysis of logs.
*   **Asynchronous Logging:** Implement asynchronous logging to minimize the impact of logging operations on application performance.
*   **Security Considerations:** Ensure that sensitive information (e.g., passwords, API keys) is never logged.
*   **Development vs. Production Logging:** Configure different logging behaviors for development and production environments (e.g., more verbose logging in development, less verbose but more critical logging in production).

## 1.12 Data Architecture

### 1.12.1 Core Data Models

#### 1.12.1.1 User
*   `id`: Primary Key, UUID
*   `googleId`: String, Unique (for Google OAuth)
*   `email`: String, Unique
*   `name`: String
*   `canvasAccessToken`: String (encrypted)
*   `canvasRefreshToken`: String (encrypted)
*   `googleCalendarAccessToken`: String (encrypted)
*   `googleCalendarRefreshToken`: String (encrypted)
*   `preferredStudyTimes`: JSON (e.g., `{ "days": ["Mon", "Wed"], "start": "18:00", "end": "22:00" }`)
*   `createdAt`: DateTime
*   `updatedAt`: DateTime

#### 1.12.1.2 Task
*   `id`: Primary Key, UUID
*   `userId`: Foreign Key to User.id
*   `type`: Enum (`CANVAS_ASSIGNMENT`, `PERSONAL`)
*   `canvasAssignmentId`: String, Nullable (if type is CANVAS_ASSIGNMENT)
*   `title`: String
*   `description`: String, Nullable
*   `dueDate`: DateTime, Nullable
*   `courseName`: String, Nullable (if type is CANVAS_ASSIGNMENT)
*   `canvasHtmlUrl`: String, Nullable (if type is CANVAS_ASSIGNMENT)
*   `isCompleted`: Boolean, Default false
*   `priority`: Enum (`LOW`, `MEDIUM`, `HIGH`), Default `MEDIUM`
*   `estimatedTime`: Int, Nullable (in minutes)
*   `timeSpent`: Int, Default 0 (in minutes)
*   `createdAt`: DateTime
*   `updatedAt`: DateTime

#### 1.12.1.3 CalendarEvent
*   `id`: Primary Key, UUID
*   `userId`: Foreign Key to User.id
*   `googleEventId`: String, Unique (from Google Calendar)
*   `calendarId`: String (from Google Calendar)
*   `title`: String
*   `description`: String, Nullable
*   `startTime`: DateTime
*   `endTime`: DateTime
*   `isAllDay`: Boolean, Default false
*   `createdAt`: DateTime
*   `updatedAt`: DateTime

### 1.12.2 Relationships

*   **User to Task:** One-to-Many (A User can have many Tasks)
*   **User to CalendarEvent:** One-to-Many (A User can have many CalendarEvents)

## 1.13 API Contracts

### 1.13.1 High-Level API Endpoints

The application will expose a RESTful API primarily through Next.js API Routes.

### 1.13.2 API Versioning

The API will be versioned using a URI path prefix. All API routes will be prefixed with `/api/v1`. This allows for future versions of the API to be introduced without breaking existing clients.

**Example:** `GET /api/v1/tasks`

If a breaking change is required in the future, a new version will be introduced (e.g., `/api/v2`).

#### 1.13.2.1 Authentication
*   `POST /api/v1/auth/login`: User login (handled by Auth.js).
*   `GET /api/v1/auth/session`: Get current user session.
*   `GET /api/v1/auth/csrf`: Get CSRF token.

#### 1.13.2.2 User Management
*   `GET /api/v1/user`: Get current user profile.
*   `PUT /api/v1/user`: Update user profile (e.g., preferred study times).
*   `POST /api/v1/user/canvas/connect`: Connect Canvas account.
*   `POST /api/v1/user/google-calendar/connect`: Connect Google Calendar account.

#### 1.13.2.3 Task Management
*   `GET /api/v1/tasks`: Get all tasks for the current user.
*   `GET /api/v1/tasks/:id`: Get a specific task.
*   `POST /api/v1/tasks`: Create a new personal task.
*   `PUT /api/v1/tasks/:id`: Update an existing task.
*   `DELETE /api/v1/tasks/:id`: Delete a personal task.
*   `POST /api/v1/tasks/canvas/sync`: Manually trigger Canvas sync.

#### 1.13.2.4 Calendar Events
*   `GET /api/v1/calendar-events`: Get all calendar events for the current user.
*   `PUT /api/v1/calendar-events/select-calendars`: Select which Google Calendars to display.

#### 1.13.2.5 Scheduling
*   `GET /api/v1/schedule/free-time`: Get suggested free time slots for a given task.

## 1.14 Security Architecture

### 1.14.1 Authentication and Authorization
*   **Google OAuth:** Primary authentication method using "Sign in with Google" for simplified user experience and leveraging Google's robust security.
*   **Auth.js (NextAuth):** Utilize Auth.js for managing authentication flows, session management, and secure handling of OAuth tokens.
*   **Session Management:** JSON Web Tokens (JWT) will be used for stateless session management, with tokens securely transmitted and validated for each API request.

### 1.14.2 Data Security
*   **Encryption at Rest:** Sensitive user data, including Canvas and Google Calendar access tokens, will be encrypted at rest in the database using strong encryption algorithms (e.g., AES-256). Encryption keys will be managed securely and separately.
*   **Encryption in Transit:** All communication between the client, server, and external APIs will be enforced over HTTPS to ensure data confidentiality and integrity.
*   **Backend-Only Access to Tokens:** Access tokens for external services (Canvas, Google Calendar) will be stored and used exclusively on the backend, never exposed to the frontend.

### 1.14.3 API Security
*   **JWT Protection:** All API endpoints handling user data will be protected and require a valid JWT for authorization.
*   **Input Validation:** Implement robust input validation on all API endpoints to prevent common vulnerabilities such as injection attacks.
*   **Rate Limiting:** Implement rate limiting on API endpoints to mitigate brute-force attacks and denial-of-service attempts.

### 1.14.4 General Security Practices
*   **Principle of Least Privilege:** Grant only the necessary permissions to users and system components.
*   **Regular Security Audits:** Conduct regular security audits and vulnerability assessments (if feasible within project constraints) to identify and address potential weaknesses.
*   **Dependency Security:** Regularly update and monitor third-party dependencies for known security vulnerabilities.

## 1.15 Performance Considerations

*   **Serverless Architecture:** Leverage serverless functions (Next.js API Routes) for automatic scaling and cost-efficiency, ensuring performance under varying load.
*   **Optimized Data Fetching:** Implement efficient data fetching strategies, such as server-side rendering (SSR) or static site generation (SSG) where appropriate, and use React Query for client-side caching and data synchronization.
*   **Database Indexing:** Optimize database queries with appropriate indexing to ensure fast data retrieval.
*   **Lazy Loading:** Implement lazy loading for UI components and routes to reduce initial bundle size and improve page load times.
*   **Image Optimization:** Optimize images for web delivery (e.g., compression, responsive images) to minimize bandwidth usage.
*   **Caching:** Utilize caching mechanisms at various layers (CDN, server-side, client-side) to reduce latency and server load.
*   **Efficient API Design:** Design APIs to be lean and efficient, returning only necessary data to minimize payload size.
*   **External API Rate Limiting and Caching:** Implement strategies to handle rate limits and cache responses from external APIs (Canvas, Google Calendar) to avoid unnecessary calls and improve responsiveness.
*   **Monitoring and Profiling:** Continuously monitor application performance and use profiling tools to identify and address bottlenecks.

## 1.16 Deployment Architecture

*   **Platform:** Vercel (leveraging its free tier) for hosting the Next.js application, including both frontend and Next.js API Routes (serverless functions).
*   **Region:** EU region for Vercel deployment to comply with data residency requirements if applicable.
*   **Continuous Deployment (CD):** Implement automated deployments triggered by Git pushes to the main branch (e.g., via Vercel's Git integration).
*   **Serverless Functions:** Backend logic deployed as serverless functions, scaling automatically based on demand and minimizing operational overhead.
*   **Database Deployment:** PostgreSQL database hosted on Supabase Free or Neon Free, managed independently but integrated with the Vercel deployment.
*   **Environment Variables:** Securely manage environment variables (e.g., API keys, database credentials) using Vercel's environment variable management system.
*   **Background Jobs:** Utilize Vercel Cron for scheduling background tasks, suchs as nightly Canvas synchronization.
*   **Monitoring:** Leverage Vercel's built-in monitoring and logging capabilities for deployed applications.

## 1.17 Development Environment

### 1.17.1 Prerequisites

*   **Node.js:** v24.11.0 (LTS)
*   **npm/Yarn/pnpm:** A package manager (npm is typically bundled with Node.js)
*   **Git:** Version control system
*   **TypeScript:** v5.9.3 (Bundled with Next.js, but good to have globally or via VSCode extensions)
*   **Docker (Optional):** For local database setup (e.g., PostgreSQL via Docker Compose)
*   **VS Code:** Recommended IDE with relevant extensions (ESLint, Prettier, TypeScript, Tailwind CSS)
*   **Vercel CLI:** For local development and deployment to Vercel
*   **GitHub Account:** For source code management and CI/CD integration
*   **Google Account:** For Google OAuth development and testing
*   **Canvas Account:** For Canvas API integration development and testing

### 1.17.2 Setup Commands

```bash
# 1. Create the Next.js application
# Command search term: "create next app with typescript and tailwind"
npx create-next-app@16.0.1 my-app --typescript --tailwind --eslint

# 2. Navigate into the project directory
cd my-app

# 3. Install additional dependencies
npm install @tanstack/react-query@5.90.6 zustand@5.0.8 zod@4.1.12 react-hook-form@7.66.0 jest@30.2.0 @testing-library/react@16.3.0 @playwright/test@1.53 @auth/core@4.24.13 prisma@6.19.0 axios@1.13.2

# 4. Set up environment variables
# Create a .env.local file based on .env.example and fill in necessary values
cp .env.example .env.local

# 5. Initialize Prisma
npx prisma migrate dev --name init

# 6. Start the development server
npm run dev
```

## 1.18 Architecture Decision Records (ADRs)


*   **Project Level 3 (Complex Greenfield System):** Decision to maintain the project at Level 3 due to its inherent complexity, multiple integrations, and need for robust architectural planning, rather than simplifying to a lower level.
*   **Serverless-First Architecture:** Adoption of a serverless approach using Next.js API Routes and Vercel to minimize operational overhead, optimize for cost-efficiency (free tiers), and enable automatic scaling.
*   **Monorepo for Frontend and Backend:** Choice of a monorepo structure to streamline development, improve code sharing, and simplify deployment processes for both client and server components.
*   **TypeScript for End-to-End Type Safety:** Mandate TypeScript across the entire stack to enhance code quality, reduce runtime errors, and improve developer experience.
*   **Google OAuth as Primary Authentication:** Leveraging Google OAuth via Auth.js for secure, simplified user authentication and seamless integration with Google services.
*   **Prisma ORM with PostgreSQL:** Selection of Prisma as the ORM and PostgreSQL as the relational database for robust data management, type safety, and scalability.
*   **"Find Free Time" Algorithm as Core Intelligence:** Prioritization and detailed design of the unique "Timeline" algorithm for intelligent scheduling, serving as a key differentiator for the application.
*   **Modular and Component-Based Design:** Implementation of a modular architecture with a component-based UI (React/Next.js) to ensure maintainability, reusability, and scalability of the codebase.

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-12-04_
_For: BIP_
