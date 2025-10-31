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
  - What is the user flow for connecting a Canvas account? Is it a one-time setup?
  - How do we securely store the user's API token?

---

### 2. Calendar Integration

*The goal is to provide a unified view of academic and personal commitments, and to help users allocate time.*

- **Initial Provider:** We've decided on Google Calendar for the MVP. What are the core interactions?
  - [ ] **Read-only:** Just display existing Google Calendar events in the Things+ timeline to show busy slots.
  - [ ] **Read/Write:** Allow Things+ to create new events in Google Calendar for allocated study time.

- **Event Representation:**
  - How should a "Task" from Things+ appear in Google Calendar?
  - Should it be an all-day event on its due date?
  - Or should the app suggest a specific time block (e.g., a 2-hour "Work on IBE160 Essay" block)?

- **Finding Free Time (The "Timeline" Algorithm):**
  - How do we define "available time"? Is it just any empty slot in the calendar?
  - Should the user be able to define their typical "study hours" (e.g., Mon-Fri 6pm-9pm)?
  - For the MVP, could the algorithm simply be: "Find the next available 2-hour slot before the due date"?

---

### 3. Task Management & Timeline View

*This is the central user interface of the app.*

- **Task Properties:** What information does a user need to see for each task at a glance?
  - [ ] Title
  - [ ] Due Date
  - [ ] Source (Canvas icon vs. manual icon)
  - [ ] Priority Level (color-coded?)
  - [ ] Tags

- **The Timeline View:** What is the most effective way to display this information?
  - **Option A: A simple, sorted list?** (like a traditional to-do list, sorted by date)
  - **Option B: A weekly calendar view?** (showing tasks plotted on the days they are due)
  - **Option C: A "Kanban" style board?** (columns for "To Do", "In Progress", "Done")

- **Manual Tasks:**
  - What's the quickest way for a user to add a non-Canvas task? A floating "+" button?
  - Can we simplify adding recurring tasks (e.g., "Laundry every Sunday")?

---

### 4. User Experience & Onboarding

*The goal is to make the app intuitive and trustworthy from the first launch.*

- **First-Time User Experience:**
  - What's the onboarding process?
  - Step 1: Create a Things+ account.
  - Step 2: Connect to Canvas.
  - Step 3: Connect to Google Calendar.
  - Is this too much to ask upfront? Should we let them use the app with manual tasks first?

- **Dashboard:**
  - What is the very first thing a user should see when they open the app each day?
  - "What's due today"?
  - The full timeline view?
  - A summary of new items from Canvas?

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
