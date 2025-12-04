# Product Brief: Things+ (Executive Summary)

**Date:** 2025-12-04
**Author:** BIP
**Status:** Draft for PM Review

---

## Executive Summary

Things+ is a smart, unified task and time management web application designed to alleviate the significant stress and inefficiencies faced by students balancing full-time work and academic commitments. The primary problem it solves is the pervasive information fragmentation and overload that leads to missed deadlines, heightened anxiety, and suboptimal time management. Its target market is a diverse demographic of students, from recent high school graduates to those in their 40s and 50s with families and careers, all striving to excel in their studies while managing demanding lives. The core value proposition of Things+ lies in providing a single, personalized view of all academic, work, and personal commitments, intelligently identifying "white space" in their schedules for focused study, thereby enabling proactive control over their time and significantly reducing stress.

---

## Problem Statement

Students who are also working full-time are struggling to manage their time and commitments effectively due to information fragmentation. They are forced to monitor multiple platforms (Canvas, personal calendars, work schedules), leading to a high cognitive load and a significant risk of missing crucial information, such as deadlines posted in inconsistent locations.

Existing solutions are inadequate because they either focus solely on academic tasks without integrating personal and work commitments, or they are generic task managers that lack deep integration with academic platforms like Canvas. This forces students into a constant, stressful cycle of manually consolidating information, which is inefficient and often leads to missed deadlines and a feeling of being perpetually overwhelmed.

---

## Proposed Solution

Things+ will be a smart, unified task and time management application designed specifically for students balancing work and studies. It will provide a single, personalized view of all commitments by automatically syncing with both academic platforms (starting with Canvas) and personal calendars (starting with Google Calendar).

The key differentiator will be its ability to not only aggregate tasks and events, but to intelligently analyze the user's schedule to identify and suggest blocks of free time ("white space") for studying or personal activities. This will be presented in a clear, at-a-glance 'Agenda' and 'Weekly Planner' view, with a 'Today' focused dashboard that helps users prioritize their immediate tasks.

By providing a holistic view of their time and intelligently suggesting when to work and when to rest, Things+ will empower students to move from a state of reactive stress to proactive control over their schedule.

---

## Target Users

### Primary User Segment

**"The Juggler"**
*   **Profile:** A student in their 30s or 40s, balancing a demanding full-time job, family life (e.g., kids' schedules), and their studies.
*   **Core Need:** To reduce stress and the mental effort of constantly switching between contexts. They need a tool that automates as much as possible and gives them a single, clear view of their packed life. Their main goal is to survive the semester without burning out.

### Secondary User Segment

**"The Ambitious Starter"**
*   **Profile:** A younger student in their 20s, working full-time to support themselves while studying. They are highly motivated to excel in both their career and their studies.
*   **Core Need:** To be as efficient and productive as possible. They are frustrated by the "information jungle" and want a powerful tool that helps them feel in control and on top of their game. Their main goal is to optimize their time to achieve top grades and career growth.

---

## MVP Scope (Core Features)

*   **Canvas Integration:** One-way synchronization of core assignment details (`assignment_id`, `name`, `due_at`, `course_name`, `html_url`) via periodic polling and a manual sync button.
*   **Google Calendar Integration:** Read-only access to view calendar events, allowing users to select which of their calendars to monitor for "busy" times.
*   **Smart Scheduling:** A core algorithm that suggests free time slots for studying based on user-defined availability and task estimations.
*   **Task Management:** The ability to view, prioritize, and manage both synced Canvas tasks and manually created personal tasks.
*   **Unified Timeline View:** A primary "Agenda" list and a secondary read-only "Weekly Planner" to provide a holistic view of all commitments.
*   **Progressive Onboarding:** A frictionless sign-up process that allows users to get started quickly and connect integrations at their own pace.
*   **"Today" Dashboard:** A focused home screen that answers the question, "What should I focus on now?".
*   **Secure Authentication:** "Sign in with Google" as the primary authentication method, with a secure backend implementation.

---

## Strategic Alignment and Financial Impact

### Financial Impact (Return on Investment)

*   **For the Project Team:** The primary return on the investment of time and effort is the acquisition of practical skills in AI-driven app development, a deeper understanding of the software development lifecycle, and a valuable portfolio piece that demonstrates real-world problem-solving abilities.
*   **For the Users:** The return for users is the significant reduction in stress and the potential for improved academic performance. This can have long-term positive financial implications, such as better job prospects and higher earning potential.

### Company Objectives Alignment

*   **Academic Goals:** The project directly aligns with the academic goal of learning how to use AI to create a functional application, providing a hands-on, practical learning experience that goes beyond theoretical knowledge.
*   **Personal Development:** It supports the personal development goal of gaining a fundamental understanding of app development, which can be applied to future projects and career opportunities.
*   **User-Centric Value:** The project is strategically aligned with the goal of creating something genuinely useful that can make a positive impact on the lives of its users, providing a sense of accomplishment and real-world impact for the project team.
