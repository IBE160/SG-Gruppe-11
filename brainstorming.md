# Brainstorming: Things+ Core Functionality

This document is for brainstorming and expanding on the core functionality of the Things+ application.

## Goal
To refine the "what" and "how" of the MVP features, focusing on user experience and technical feasibility. Let's explore each feature in more detail.

---

### 1. Canvas API Integration

*The goal is to seamlessly pull academic tasks into Things+.*

- **Data Points:** What are the absolute essential data points we need from Canvas?

  **Must-Have for MVP:**
  - `assignment_id`: Unique identifier from Canvas. Essential for tracking.
  - `assignment_name`: Becomes the task title in the app.
  - `due_at`: The deadline. The single most critical piece of data for scheduling.
  - `course_name`: Used for automatic tagging and filtering (e.g., `#CS101`).
  - `html_url`: A direct link back to the assignment page in Canvas for easy access.

  **Highly Desirable (Aim for in MVP):**
  - `description`: The assignment details. Useful for context, can be shown in a detail view.
  - `points_possible`: The grade value. Can be used to automatically set task priority (e.g., >50 points = High Priority).
  - `published`: A boolean to ensure we only import assignments that are visible to students.

  **Nice to Have (Future Extensions):**
  - `submission_status`: (e.g., 'submitted', 'unsubmitted', 'graded'). Could be used to automatically mark tasks as complete.
  - `assignment_type`: (e.g., 'assignment', 'quiz', 'discussion'). Could be used for icons or filtering.
  - `course_code`: A stable identifier for the course.

- **Synchronization:**

  **Frequency & Method:**
  - **Periodic Polling (MVP Approach):** The server automatically fetches updates from Canvas every 30-60 minutes. This is reliable and achievable.
  - **Manual Sync Button (MVP Must-Have):** A "Sync Now" button in the UI for on-demand updates. This gives the user control.
  - **Real-time Push (Future Extension)::** Using Canvas Webhooks for instant updates. This is the ideal UX but more complex to implement.

  **Handling Data Changes:**
  - **Source of Truth:** Canvas is the single source of truth for synced fields (`title`, `due_date`, etc.). These fields will be read-only in the Things+ UI.
  - **Update Logic:** On sync, the app uses `assignment_id` to find existing tasks. If details have changed in Canvas, the task is updated in Things+ and the user is notified.
  - **New Items:** New assignments from Canvas are added to Things+ and the user is notified.

  **Handling Special Cases:**
  - **Completed Items:** On first sync, only import active/unsubmitted assignments. On later syncs, if `submission_status` is available, automatically mark completed tasks in Things+.
  - **Deleted Items:** If an assignment is removed from Canvas, don't delete it in Things+. Instead, move it to an "Archived/Cancelled" list and inform the user.

  **Error Handling & Reliability:**
  - **API Failures:** If the Canvas API is down, show a non-intrusive status message in the app and retry later.
  - **Authentication Failures:** If a user's token is invalid, detect the `401 Unauthorized` error and prompt the user to reconnect their account.

  **Notification Strategy:**
  - **Batching:** Group changes from a single sync into one summary notification (e.g., "2 new assignments, 1 due date updated").
  - **In-App Log:** Keep a detailed log of all sync changes in a notification center for user review.
  - **Push Notifications:** Reserve for critical, time-sensitive changes only (e.g., a deadline moving sooner).

- **Canvas Authorization:**

  **1. User Flow for Connecting a Canvas Account (OAuth 2.0):**
  - **Initiate:** User clicks "Connect to Canvas" in Things+.
  - **Redirect:** User is redirected to Canvas's authorization page.
  - **Authorize:** User logs in (if needed) and grants Things+ specific permissions (e.g., "View assignments").
  - **Callback:** Canvas redirects user back to Things+ with an `authorization_code`.
  - **Token Exchange (Backend):** Things+ backend exchanges the `authorization_code` for an `access_token` and a `refresh_token`.
  - **One-Time Setup:** The `refresh_token` allows Things+ to get new `access_token`s automatically without user re-authorization, unless the `refresh_token` itself expires or is revoked.

  **2. Securely Storing the User's API Token:**
  - **Encryption at Rest:** `access_token` and `refresh_token` must be **encrypted** in our database using a strong algorithm (e.g., AES-256). The encryption key must be stored separately and securely.
  - **Encryption in Transit:** All communication between Things+ backend and Canvas API must be over **HTTPS**.
  - **Backend-Only Access:** Tokens are never sent to the frontend; all Canvas API calls are made from the Things+ backend.
  - **Token Refresh Logic:** Backend automatically uses the `refresh_token` to obtain new `access_token`s. If refresh fails, the user is prompted to re-authorize.

---

### 2. Calendar Integration

*The goal is to provide a unified view of academic and personal commitments, and to help users allocate time.*

- **Initial Provider & Core Interactions:**
  - **Provider:** Google Calendar is the target for the MVP due to its robust API.
  - **Read-Only (MVP Must-Have):** The app will ask for permission to *view* calendar events. This is essential to identify when a user is busy and find free time for studying.
  - **Read/Write (Post-MVP):** The ability to *create and modify* events in the user's calendar (e.g., booking study blocks) is a powerful future extension but adds significant complexity. The MVP will focus on a flawless read-only experience first.

- **Handling Multiple Calendars & Special Events:**
  - **Calendar Selection:** After authorization, the app will show the user a list of their Google Calendars (e.g., "Personal", "Work") and let them check which ones should be considered for busy time.
  - **Event Status:** The app will only consider events as "busy" if the user's status is "Accepted" or "Busy". Events marked as "Maybe", "Declined", or "Free" will be ignored.
  - **All-Day Events:** By default, all-day events will block out the entire day for scheduling, but this should be a user-configurable setting.

- **Sync Strategy:**
  - **Sync on Load:** A fresh sync will be triggered every time the user opens the app.
  - **Periodic Polling:** A background sync every 30-60 minutes.
  - **Manual Sync:** A "Sync Now" button will always be available.

- **Permissions & User Trust:**
  - **Clear Justification:** Before requesting permission, the app will clearly explain *why* it needs access (e.g., "To find free time in your schedule, Things+ needs to see when you're busy.").
  - **Minimal Scope:** For the MVP, the app will only request `calendar.readonly` permission to build user trust, making it clear that it cannot modify or delete any events.

- **Finding Free Time (The "Timeline" Algorithm):**
  - This is the core intelligence of the app. The MVP algorithm will work as follows:
  - **1. User Defines Study Hours:** During onboarding, the user specifies their general availability for studying (e.g., "Weekdays 6 PM - 10 PM").
  - **2. User Estimates Task Duration:** Each task will have an "Estimated Time" field.
  - **3. The Algorithm Runs:** For a given task, the app will:
    - Look at the user's defined Study Hours between now and the task's due date.
    - Cross-reference this with events from their Google Calendar to find true "free time".
    - Find enough free time blocks to match the task's estimated duration.
    - **Suggest these time slots to the user within the Things+ UI.**

---

### 3. Task Management & Timeline View

*This is the central user interface of the app.*

- **Task Properties: What information does a user need to see at a glance?**

  **1. Main List View Properties (The "At-a-Glance" View):**
  - **Title:** Max 2 lines, then truncate with an ellipsis (...).
  - **Due Date:** Use relative language (e.g., "Due Tomorrow at 5 PM"). Overdue dates should be clearly marked (e.g., red text).
  - **Completion Checkbox:** On check, the task should animate with a strikethrough and move to a collapsible "Completed" section.
  - **Source Indicator:** A simple icon (e.g., Canvas logo vs. generic icon) for immediate context.
  - **Priority Indicator:** A subtle, colored vertical bar on the left edge of the task item.
  - **Tags:** Displayed as small "pills" or "badges". Show the first 2-3, then a "+1" indicator for overflow.

  **2. Detail View Properties (The "Source of Truth" View):**
  - This view should appear as a slide-in side panel on click.
  - **Read-Only Fields (for Canvas-synced tasks):**
    - `Title`, `Due Date`, `Description` (full text).
    - A clickable link/button to the assignment on Canvas.
  - **User-Editable Fields:**
    - **Priority:** A simple dropdown selector ("Low", "Medium", "High").
    - **Estimated Time:** A user-input field for scheduling (e.g., "2 hours").
    - **Tags:** An interface to add/remove tags.
    - **Progress Notes:** A multi-line text area for the user's personal notes.

- **The Timeline View: What is the most effective way to display this information?**

  **MVP Recommendation: Hybrid Approach**

  **1. Primary View: The "Agenda" List**
  - **Layout:** A single, scrollable vertical list, grouped into logical sections: "Overdue", "Today", "Tomorrow", "This Week", and "Later".
  - **Functionality:** Each item uses the detailed "Task Properties". Quick filter buttons at the top should allow users to filter by tags or source.

  **2. Secondary View: The "Weekly Planner"**
  - **Layout:** A 7-day weekly calendar grid.
  - **Content Display:**
    - **Google Calendar Events:** Displayed as solid, colored blocks marking "busy" time.
    - **Things+ Tasks:** Displayed as small "cards" or "pills" under the heading for the day they are due.
  - **Interaction (MVP):** This view is read-only. Clicking a task opens its detail view. There will be no drag-and-drop scheduling in the MVP.

  **Future Extension:**
  - **Kanban Board:** For workflow management (e.g., "To Do", "In Progress", "Done").

- **Manual Tasks: How do users add non-Canvas tasks?**

  **1. The Entry Point:**
  - A prominent, always-accessible "+ New Task" button (e.g., a floating action button on mobile, a header button on desktop).

  **2. The Form (A Two-Step Approach):**
  - **Quick Add (for speed):** Clicking the button opens a simple, single-line input for the `Title`. The user hits Enter, and the task is created instantly with no due date. This is for quickly capturing thoughts.
  - **Full Add (for details):** From the Quick Add bar, an "Add Details" button should be available to open a full form where the user can set the `Due Date`, `Description`, `Estimated Time`, `Tags`, and `Priority`.

  **3. Recurring Tasks (Future Extension):**
  - The ability to set tasks that repeat on a schedule (e.g., "Submit weekly report every Friday") is a powerful feature but adds significant complexity. This should be deferred past the MVP.

---

### 4. User Experience & Onboarding

*The goal is to make the app intuitive and trustworthy from the first launch.*

**1. First-Time User Experience (Progressive Onboarding):**

- **The Problem:** A long, forced setup process (Account -> Canvas -> Calendar) creates high friction and causes user drop-off.
- **The Solution: Progressive Onboarding**
  - **Step 1: Account Creation.** The only mandatory step. "Sign in with Google" makes this a single click.
  - **Step 2: Instant App Access.** Immediately drop the user into the app with a welcome message and maybe a sample task. The app is fully functional for manual tasks at this point.
  - **Step 3: Contextual Prompts.** Use clear, non-blocking banners within the UI to encourage connections, e.g., "Connect to Canvas to automatically import your assignments."
- **Optional Tour:** A brief, 3-step, dismissible tour on first launch to point out the timeline, the add task button, and the connection settings.

**2. The Dashboard / Home Screen:**

- **The Goal:** Answer the user's question: "What should I focus on *now*?"
- **The Solution: A "Today" Focused View**
  - The main "Agenda" list should have a visually distinct **"Today"** section at the very top.
  - This section acts as a mini-dashboard, showing:
    - All tasks due today.
    - All of today's remaining calendar events.
    - A small, dismissible "What's New" summary (e.g., "Since your last visit, 2 new assignments were added from Canvas.").

---

### 5. User Authentication and Security

*This section covers how users sign up, log in, and how we keep their accounts secure.*

**1. The User's Experience (The "What")**

*   **Registration & Login:**
    *   **Standard Email/Password:** A standard registration form with `Email`, `Password`, and `Confirm Password`.
    *   **"Sign in with Google" (Highly Recommended for MVP):** A one-click option to sign up or log in. This is a huge UX win and simplifies the Google Calendar permission flow later.
*   **Password Reset:**
    *   A must-have for email/password accounts. A standard "Forgot Password" flow that sends a secure reset link to the user's email.

**2. The Backend Implementation (The "How")**

*   **Password Storage:**
    *   Passwords will **never** be stored in plain text. They will be salted and hashed using a strong algorithm like **bcrypt**.
*   **Session Management (JWT):**
    *   We will use **JSON Web Tokens (JWT)** to manage user sessions in a stateless way.
    *   **Flow:** A user logs in -> the server provides a signed JWT -> the browser attaches the JWT to all future requests -> the server verifies the JWT to identify the user.
*   **API Security:**
    *   All API endpoints handling user data will be protected and require a valid JWT.
    *   **HTTPS** will be enforced across the entire application to encrypt all communication.

---

### 6. Wildcard Ideas (Post-MVP or for inspiration)

*A place for ideas that are outside the current MVP scope but could be interesting.*

- **Gamification:** Points for completing tasks on time? Streaks for daily usage?
- **Smart Suggestions:** "It looks like you have a big essay due in 2 weeks. Should I block out 3 study sessions for you?"
- **Focus Mode:** A timer feature (like Pomodoro) integrated with a task.
- **Collaboration:** Sharing a task list with a study group? (Probably out of scope for this project's core idea).
