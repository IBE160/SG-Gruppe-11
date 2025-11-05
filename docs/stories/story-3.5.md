**Story 3.5: Proactive Scheduling Suggestions**

As a user,
I want the application to offer suggestions for adjusting my schedule when a task takes significantly longer than estimated,
So that I can stay on track and realistically manage my commitments.

**Acceptance Criteria:**
1. The system compares `timeSpent` with `estimatedTime` for completed tasks.
2. If there is a significant variance, the system learns from this for future estimates.
3. For in-progress tasks, if the timer exceeds the estimate, the system can trigger a notification.
4. The notification suggests finding a new time slot or adjusting the plan for other tasks.

**Prerequisites:** Story 3.2, Story 3.4
