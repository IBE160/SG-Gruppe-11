# Product Brief: Things+

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

## Goals and Success Metrics

### Business Objectives (Project Goals)

*   **AI-Driven Development Proficiency:** Successfully develop a working web application primarily using AI tools, demonstrating a strong understanding of AI-driven development methodologies.
*   **Knowledge Transferability:** Acquire practical knowledge and skills during the development process that are transferable to other academic subjects and real-life problem-solving scenarios.
*   **Impactful Creation:** Create a functional and user-friendly product that genuinely simplifies time management and reduces stress for its target users, thereby achieving a sense of impactful creation.

### User Success Metrics

*   **Integration Adoption:** A high percentage of users successfully connect both their Canvas and Google Calendar accounts.
*   **Consistent Engagement:** Users consistently interact with the application on a daily or weekly basis.
*   **Task Management Effectiveness:** Users demonstrate a high rate of completing academic tasks integrated through the application.
*   **Time Management Utilization:** Users actively utilize the "Find Free Time" feature to plan their study and personal time.

### Key Performance Indicators (KPIs)

*   **Integration Rate:** Percentage of active users with both Canvas and Google Calendar integrations enabled.
*   **Active User Count:** Daily Active Users (DAU) or Weekly Active Users (WAU).
*   **Completion Rate:** Average percentage of Canvas-synced tasks marked as complete by users.
*   **Feature Usage:** Average number of times the "Find Free Time" feature is accessed per user per week.

---

## Strategic Alignment and Financial Impact

### Financial Impact (Return on Investment)

*   **For the Project Team:** The primary return on the investment of time and effort is the acquisition of practical skills in AI-driven app development, a deeper understanding of the software development lifecycle, and a valuable portfolio piece that demonstrates real-world problem-solving abilities.
*   **For the Users:** The return for users is the significant reduction in stress and the potential for improved academic performance. This can have long-term positive financial implications, such as better job prospects and higher earning potential.

### Company Objectives Alignment

*   **Academic Goals:** The project directly aligns with the academic goal of learning how to use AI to create a functional application, providing a hands-on, practical learning experience that goes beyond theoretical knowledge.
*   **Personal Development:** It supports the personal development goal of gaining a fundamental understanding of app development, which can be applied to future projects and career opportunities.
*   **User-Centric Value:** The project is strategically aligned with the goal of creating something genuinely useful that can make a positive impact on the lives of its users, providing a sense of accomplishment and real-world impact for the project team.

### Strategic Initiatives

(Included within Company Objectives Alignment)

---

## MVP Scope

### Core Features (Must-Have for MVP)

*   **Canvas Integration:** One-way synchronization of core assignment details (`assignment_id`, `name`, `due_at`, `course_name`, `html_url`) via periodic polling and a manual sync button.
*   **Google Calendar Integration:** Read-only access to view calendar events, allowing users to select which of their calendars to monitor for "busy" times.
*   **Smart Scheduling:** A core algorithm that suggests free time slots for studying based on user-defined availability and task estimations.
*   **Task Management:** The ability to view, prioritize, and manage both synced Canvas tasks and manually created personal tasks.
*   **Unified Timeline View:** A primary "Agenda" list and a secondary read-only "Weekly Planner" to provide a holistic view of all commitments.
*   **Progressive Onboarding:** A frictionless sign-up process that allows users to get started quickly and connect integrations at their own pace.
*   **"Today" Dashboard:** A focused home screen that answers the question, "What should I focus on now?".
*   **Secure Authentication:** "Sign in with Google" as the primary authentication method, with a secure backend implementation.

### Out of Scope for MVP

*   Real-time Canvas updates (Webhooks).
*   Read/Write access to Google Calendar (creating or modifying events).
*   Kanban board view.
*   Recurring tasks.
*   Gamification features (points, streaks).
*   Proactive "smart" suggestions.
*   Collaboration features (sharing task lists).
*   Advanced task details from Canvas (`submission_status`, `assignment_type`).

### MVP Success Criteria

*   The MVP successfully validates the core hypothesis: that a unified view of academic and personal commitments, combined with smart scheduling suggestions, can significantly reduce stress and improve time management for working students.
*   The MVP achieves high user adoption of the core integrations (Canvas and Google Calendar).
*   The MVP demonstrates consistent daily or weekly user engagement.
*   The MVP is stable, reliable, and provides a positive user experience, even with a limited feature set.

---

## Post-MVP Vision

### Phase 2 Features

*   **Real-time Canvas Updates:** Implement Canvas Webhooks for instant notifications and updates on assignments.
*   **Calendar Read/Write Access:** Allow users to create and modify Google Calendar events directly within Things+.
*   **Kanban Board View:** Introduce a Kanban-style board for visual task workflow management (e.g., "To Do," "In Progress," "Done").
*   **Recurring Tasks:** Enable users to set up tasks that repeat on a defined schedule.

### Long-term Vision

*   To evolve Things+ into a comprehensive, intelligent personal assistant for students, proactively managing their academic and personal lives.
*   To become the indispensable tool that significantly reduces student stress and maximizes their academic potential by optimizing their time.

### Expansion Opportunities

*   **Gamification:** Introduce elements like points, streaks, or badges to motivate users and enhance engagement.
*   **Smart Suggestions:** Develop advanced AI-driven suggestions for personalized study plans, optimal time allocation, and proactive reminders.
*   **Focus Mode:** Integrate a dedicated "Focus Mode" (e.g., Pomodoro timer) to help users concentrate on tasks.
*   **Collaboration Features:** Explore options for sharing task lists or project boards with study groups or collaborators.
*   **Additional Academic Integrations:** Expand integration to other popular Learning Management Systems beyond Canvas.

---

## Technical Considerations

### Platform Requirements

*   **Target Platform:** A responsive website that works seamlessly on both desktop and mobile devices.
*   **Supported Browsers:** The latest versions of modern browsers (Chrome, Firefox, Safari, Edge).
*   **Supported Operating Systems:** The latest versions of major operating systems (Windows, macOS, Android, iOS).

### Technology Preferences

*   **Frontend:**
    *   **Framework:** Next.js (React + TypeScript)
    *   **Styling:** Tailwind CSS + shadcn/ui
    *   **State Management:** React Query (for async data) + Zustand (for light global state)
    *   **Validation:** Zod + React Hook Form
    *   **Testing:** Jest/RTL + Playwright (local, no paid services)
*   **Backend:**
    *   **Runtime/Framework:** Node.js on Vercel (Serverless) using Next.js API Routes.
    *   **Authentication:** Auth.js (NextAuth) for Google OAuth.
    *   **Database Access:** Prisma ORM.
    *   **Validation:** Zod (shared between frontend and backend).
    *   **HTTP Client:** `undici` or `axios` for communicating with Canvas and Google APIs.
*   **Database:**
    *   **Type:** Relational (PostgreSQL).
    *   **Hosting:** Supabase Free or Neon Free.
*   **Infrastructure:**
    *   **Hosting:** Vercel Free (EU region).
    *   **API Style:** Serverless API Routes (Node.js runtime).
    *   **Background Jobs:** Vercel Cron for nightly syncs.
    *   **Secrets Management:** Vercel environment variables.
    *   **Backups:** GitHub Actions for creating encrypted database dumps.

### Architecture Considerations

*   **Monorepo:** A single codebase for both frontend and backend, simplifying development and deployment.
*   **Serverless:** A fully serverless architecture to minimize operational overhead and leverage free-tier services.
*   **End-to-End Type Safety:** Use TypeScript across the entire stack to ensure type safety and improve developer experience.
*   **Cost-Effectiveness:** A strong focus on using free-tier services to eliminate infrastructure costs.

---

## Constraints and Assumptions

### Constraints

*   **Time/Timeline:**
    *   Project completion is mandated by the end of the current academic semester.
    *   Key milestones include: Core setup (Weeks 1-2), Frontend views (Weeks 3-4), and Testing/Presentation prep (Week 5).
    *   The deliverable goal is a working MVP demo ready for presentation and submission.
*   **Team Size/Expertise:**
    *   A small team of 4 individuals with very limited formal background in programming or app development.
    *   This constraint is mitigated by leveraging AI-assisted tools (e.g., ChatGPT, GitHub Copilot) and template-driven frameworks (Next.js + Supabase).
    *   The priority is on learning, simplicity, and clear documentation, rather than complex architectural patterns.
    *   Design and UI will adopt a minimalist approach, utilizing ready-made UI libraries (Tailwind CSS + shadcn/ui).
    *   Backend operations are streamlined via serverless functions, eliminating the need for dedicated DevOps expertise.
*   **Budget/Resources:**
    *   Strict zero-budget policy (0 NOK / $0).
    *   All tools and services must operate exclusively on free tiers, including hosting (Vercel), database (Supabase or Neon), source control (GitHub), integrations (Google OAuth + Canvas API), and CI/CD/Cron Jobs (GitHub Actions + Vercel Cron).
    *   No paid licenses, cloud plans, or external APIs are permitted.
    *   The MVP must remain fully deployable and functional without requiring paid upgrades.

### Key Assumptions

*   **User Behavior:**
    *   Users will be willing to grant the necessary access permissions to their Canvas and Google Calendar accounts.
    *   Users will perceive the "smart scheduling" suggestions as valuable and will integrate them into their time management practices.
    *   The unified schedule view provided by Things+ will effectively contribute to a reduction in user stress.
*   **Technical Feasibility:**
    *   The Canvas and Google Calendar APIs will consistently provide the required data in a reliable manner.
    *   The entire application can be successfully built, deployed, and operated within the free tiers of the chosen services without encountering critical limitations.
*   **Market Conditions:**
    *   No existing tool adequately addresses this specific problem for the target audience.

---

## Risks and Open Questions

### Key Risks

*   **Technical Risks:**
    *   **External API Integration:** Potential for delays or partial functionality due to rate limits, authentication complexities, and data structure differences in the Canvas and Google Calendar APIs.
    *   **Free-Tier Limitations:** Risk of hitting usage limits on free-tier services like Vercel and Supabase, which could cause downtime or reduced performance.
    *   **AI Tool Dependency:** AI-generated code may be inconsistent or non-optimized, requiring manual debugging and testing that could be challenging for a non-technical team.
*   **Project Management Risks:**
    *   **Scope Creep:** The temptation to add features beyond the defined MVP scope, which could delay delivery and compromise the project timeline.
    *   **Time Management:** The challenge of coordinating a small team that is learning new technologies simultaneously, which could lead to schedule slippage without strict milestones and accountability.
*   **User Adoption and Privacy Risks:**
    *   **User Trust:** Students may be hesitant to grant access to their academic and personal data without strong trust signals, clear privacy policies, and institutional backing.
    *   **Value Proposition:** The MVP may not offer enough immediate value to encourage continued use if it is too minimal or lacks key scheduling features.

### Open Questions

*   **API Integration & Debugging:** How will the team, with limited technical experience, effectively handle potential API integration issues and debugging challenges? This includes defining a clear process for testing, troubleshooting, and validating API connections, and deciding on strategies like allocating extra time for trial and error, seeking external feedback, or relying on automated testing.
*   **Scope Control & Time Management:** What specific strategies will be implemented to prevent scope creep and ensure timely delivery within the tight semester timeline? This involves deciding on progress tracking methods (e.g., weekly goals, task boards, check-ins), assigning responsibility for task prioritization, and approving new ideas.
*   **User Trust & Privacy:** How will the application build user trust, particularly regarding privacy and data security? This requires clear communication about data access, storage, and revocation of access, both within the app's interface and during onboarding.
*   **MVP Value Proposition:** How will the team define the minimum viable set of features that will deliver real value to users and encourage continued use beyond their first try? This involves balancing simplicity with enough functionality to demonstrate clear, everyday value to students.

---

## Appendices

### A. Research Summary

{{research_summary}}

### B. Stakeholder Input

{{stakeholder_input}}

### C. References

{{references}}

---

_This Product Brief serves as the foundational input for Product Requirements Document (PRD) creation._

_Next Steps: Handoff to Product Manager for PRD development using the `workflow prd` command._