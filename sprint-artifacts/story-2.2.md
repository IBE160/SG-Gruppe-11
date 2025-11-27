**Story 2.2: Google Calendar Connection**

As a logged-in user,
I want to connect my Google Calendar account,
So that the application can display my personal and work events.

**Acceptance Criteria:**
1. The settings page has an option to "Connect Google Calendar".
2. Clicking this initiates the Google OAuth flow for calendar access (read-only).
3. Upon successful authorization, the application securely stores the necessary tokens.
4. The user receives feedback that the connection was successful.

**Prerequisites:** Story 1.1
