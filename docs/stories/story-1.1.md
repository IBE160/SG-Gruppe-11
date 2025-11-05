**Story 1.1: User Authentication with Google**

As a new user,
I want to sign up and log in using my Google account,
So that I can quickly and securely access the application without needing to create a new password.

**Acceptance Criteria:**
1. A "Sign in with Google" button is present on the login page.
2. Clicking the button initiates the Google OAuth flow.
3. Upon successful authentication, a new user record is created in the database.
4. The user is redirected to the main application page and is in a logged-in state.
5. If the user already exists, they are simply logged in.

**Prerequisites:** None
