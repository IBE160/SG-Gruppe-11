**Story 3.5: Integrate "Find Free Time" in UI**

As a logged-in user,
I want to easily access and utilize the "Find Free Time" feature within the application,
So that I can quickly schedule study blocks based on the system's suggestions.

**Acceptance Criteria:**
1. A "Find Free Time" button is available on the tasks page (e.g., next to each task).
2. Clicking the button opens a modal or section displaying suggested free time slots.
3. The suggested slots are fetched from the `/api/schedule/free-time` endpoint for the selected task.
4. The UI allows the user to select a suggested time slot and create a new task/event based on it.

**Prerequisites:** Story 3.1, Story 3.4
