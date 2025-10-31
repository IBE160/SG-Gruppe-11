# Brainstorming: Things+ Core Functionality

This document is for brainstorming and expanding on the core functionality of the Things+ application.

## Goal
To refine the "what" and "how" of the MVP features, focusing on user experience and technical feasibility. Let's explore each feature in more detail.

---

### 1. Canvas API Integration

*The goal is to seamlessly pull academic tasks into Things+.*

- **Data Points:** What are the absolute essential data points we need from Canvas?
  - [ ] Assignment Name
  - [ ] Due Date & Time
  - [ ] Course Name (for tagging/categorization)
  - [ ] Link back to the assignment on Canvas?
  - [ ] Assignment description/details?
  - [ ] Points/Grade value? (for prioritization)

- **Synchronization:**
  - How often should we sync? Real-time (push notifications from Canvas, if possible) or periodic polling (e.g., every 15 minutes)?
  - What happens when a due date is changed in Canvas? How do we reflect that change?
  - How do we handle items that are already completed in Canvas? Do we import them?

- **Authentication:**
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

### 5. Wildcard Ideas (Post-MVP or for inspiration)

*A place for ideas that are outside the current MVP scope but could be interesting.*

- **Gamification:** Points for completing tasks on time? Streaks for daily usage?
- **Smart Suggestions:** "It looks like you have a big essay due in 2 weeks. Should I block out 3 study sessions for you?"
- **Focus Mode:** A timer feature (like Pomodoro) integrated with a task.
- **Collaboration:** Sharing a task list with a study group? (Probably out of scope for this project's core idea).
