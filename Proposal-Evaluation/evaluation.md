### Case Title
To-do task manager app called Things+.

### Background
Students conducting the online based bachelor program in logistics at Molde university usually combine school with a full-time job. A lot of people struggle to incorporate everyday tasks with school related requirements.

### Purpose
This app will pull data from primary Canvas to streamline deadlines and other tasks with your preferred calendar. The app will suggest a timeline and allocate a timeslot in your calendar based on data from Canvas, and Your own calendar inputs. Rather having to check multiple apps/websites, Things+ will streamline and gather all task in one place.

### Target Users
Students with fulltime jobs in addition to school, but for everyone using Canvas and the integrated calendar on your phone or laptop for planning purposes.

### Core Functionality

**Must Have (MVP)**
- Connectivity to Canvas (might be a challenge, but maybe we can use a dummy program to simulate dataflow from third-party programs).
- Seamless calendar integration with phone or laptop calendar.
- Timeline for tasks.
- Progress tracking.
- Strong privacy and security protocols.
- Tracking important dates (deadlines, exams).
- Tags for categories such as #IBE160, #household, #routines etc.

**Nice to Have (Optional Extensions)**
- Natural language model for speech to task functionality.
- Photo / screen shot recognition for task identification.
- Rating / Priority of tasks for timeline/time management.
- Summaries of updates since last check-in.

### Data Requirements
- Users: username, email, password.
- Calendar events: title, date/time, description, location, subject, participants.

### User Stories
1. As a full-time student with a full-time job, having just one app with that connects everything school related to my personal calendar is essential.
2. I work in rotations (turnus), and my available time for studying varies from week to week. My biggest challenge is time management.
3. My kids have multiple leisure activities that I need to juggle with work and school.

### Technical Constraints
- Must be able to pull data from the primary calendar in the users OS.
- Third-party data pull (Canvas).

### Success Criteria
- Calendar synchronization must be automatic.
- Trustworthy, the users can rely on the app for providing important information from Canvas.
- Easy to use. Speech to task for when you discover task and are unable to write them down.

---

# Proposal Evaluation

## Overall Grade: C (65/100)

| Criteria | Score | Comment |
|----------|-------|---------|
| Scope Clarity | 10/15 | Clear goals but lacks specific measurables and technical boundaries |
| Scope Appropriateness | 8/15 | Too ambitious for 1.5 months - multiple complex integrations |
| Frontend Specification | 3/7 | Platform mentioned but no technology stack specified |
| Backend Specification | 0/7 | No backend architecture or technology mentioned |
| Database Specification | 3/7 | Data requirements listed but no database type or design |
| AI Integration | 5/7 | AI features mentioned for nice-to-haves with some specifics |
| Platform Type | 5/7 | Mobile/laptop mentioned but deployment strategy unclear |
| User Authentication | 3/5 | Security mentioned but no authentication method specified |
| Payment System | 5/5 | Appropriately excluded - not needed for this project |
| Core Features Definition | 7/10 | Good MVP/nice-to-have split but lacks implementation details |
| Technical Feasibility | 6/8 | Concerns with Canvas API integration and calendar sync complexity |
| Timeline and Milestones | 0/7 | No timeline, milestones, or development phases provided |

**Total: 65/100 - Good - Approved with recommended modifications**

## Summary Assessment

The Things+ proposal addresses a real pain point for working students and demonstrates good problem understanding with clear user stories that effectively communicate the target audience's needs. The proposal shows strength in defining the problem space and distinguishing between MVP and optional features. The core concept of integrating Canvas with calendar functionality is valuable and addresses a genuine need.

However, the proposal suffers from significant gaps in technical specification and planning. There is no mention of technology stack, architecture design, backend infrastructure, database implementation, or development timeline. The scope appears overly ambitious for a 1.5-month timeframe, particularly given the complexity of Canvas API integration, calendar synchronization across multiple platforms, and the inclusion of advanced AI features like natural language processing and image recognition. The proposal would benefit greatly from technical specificity, realistic scope reduction, and a concrete implementation plan with milestones.

## Detailed Checklist Evaluation

### Scope Clarity and Definition (18/30)

- ⚠️ **Scope Clarity (10/15)**: The project goals are understandable (calendar integration with Canvas), but lack specific, measurable success metrics. What does "seamless integration" mean technically? How many tasks should the system handle? What response time is acceptable? The boundaries between core functionality and extensions are defined, but technical boundaries are missing.

- ❌ **Scope Appropriateness (8/15)**: The scope is too ambitious for 1.5 months. The MVP includes: Canvas API integration (potentially complex OAuth flow), bidirectional calendar synchronization (multiple calendar providers), intelligent timeline suggestion algorithm, progress tracking system, and robust security implementation. This is at least 3-4 months of work even with AI assistance. The "nice to have" features (NLP, image recognition) would each be substantial projects on their own.

### Technical Architecture (16/35)

- ❌ **Frontend Specification (3/7)**: The proposal mentions "phone or laptop" but provides no technical details. No mention of: web framework (React, Vue, Angular?), mobile framework (React Native, Flutter, native?), UI/UX approach, responsive design strategy, or whether this is a native app, PWA, or hybrid solution.

- ❌ **Backend Specification (0/7)**: This is a critical omission. No mention of: server architecture, API design, programming language/framework (Node.js, Python, Java?), hosting strategy, how Canvas integration will be handled server-side, or authentication flow. For a system requiring third-party integrations and user data management, backend architecture is essential.

- ⚠️ **Database Specification (3/7)**: Data requirements are listed (users, calendar events) which is good, but there's no specification of: database type (SQL vs NoSQL), schema design, relationships between entities, data persistence strategy, or how Canvas data will be cached/stored locally.

- ⚠️ **AI Integration (5/7)**: AI features are mentioned in the "nice to have" section with reasonable specificity (natural language processing for speech-to-task, image recognition for screenshots). However, there's no mention of which AI services/APIs would be used (OpenAI, Google Cloud, local models?), how they'd be integrated, or cost considerations. The timeline suggestion feature in MVP also implies AI/ML but isn't specified.

- ⚠️ **Platform Type (5/7)**: The proposal mentions both phone and laptop, suggesting cross-platform support, but doesn't specify: mobile OS targets (iOS, Android, both?), desktop OS (Windows, Mac, Linux?), whether it's one codebase or multiple, or deployment strategy (app stores, web deployment?).

### Features and Complexity (15/20)

- ⚠️ **User Authentication (3/5)**: The proposal mentions "strong privacy and security protocols" and includes username/email/password in data requirements, indicating authentication is considered. However, there's no specification of: authentication method (JWT, OAuth, session-based?), password hashing strategy, how Canvas authentication will be handled (OAuth2?), or security standards to be followed.

- ✅ **Payment System (5/5)**: Appropriately excluded. This is a student productivity tool that doesn't require payment processing. This is a good scope decision.

- ⚠️ **Core Features Definition (7/10)**: The proposal does a good job separating MVP from "nice to have" features, showing prioritization. The MVP features are listed clearly. However, each feature lacks implementation details: "Timeline for tasks" - what algorithm determines this? "Progress tracking" - what metrics are tracked? "Calendar integration" - bidirectional sync or read-only? More specificity would strengthen this significantly.

### Feasibility and Planning (6/15)

- ⚠️ **Technical Feasibility (6/8)**: Several feasibility concerns exist:
  - Canvas API integration may be complex and institution-dependent
  - Calendar synchronization across multiple providers (Google, Apple, Outlook) is technically challenging
  - Bidirectional sync creates conflict resolution problems
  - The proposal acknowledges Canvas integration "might be a challenge" and suggests a dummy program workaround, which indicates uncertainty about a core feature
  - However, the technologies needed (APIs, calendar integrations) are proven and achievable with proper scoping

- ❌ **Timeline and Milestones (0/7)**: This is completely absent from the proposal. There is no development timeline, no milestones, no phases, and no breakdown of how the 1.5 months will be allocated. This makes it impossible to assess whether the team understands the development effort required.

## Strengths

1. **Clear Problem Definition**: The background and purpose sections effectively articulate the problem space. Working students combining full-time jobs with online studies is a well-defined target audience with genuine needs.

2. **Strong User Stories**: The three user stories provide concrete, relatable scenarios that demonstrate understanding of user needs (rotation work schedules, family obligations, time management challenges).

3. **Good Feature Prioritization**: The distinction between "Must Have (MVP)" and "Nice to Have" shows awareness of prioritization and scope management principles.

4. **Realistic Acknowledgment of Challenges**: The proposal acknowledges that Canvas connectivity "might be a challenge" and suggests a fallback (dummy program), showing some risk awareness.

5. **Focused Success Criteria**: The success criteria (automatic synchronization, trustworthiness, ease of use) are user-centered and align well with the stated purpose.

6. **Data Requirements Identified**: Including specific data fields for users and calendar events shows initial thinking about data modeling.

## Areas for Improvement

### Critical Issues (Must Address)

1. **Missing Backend Architecture**: The proposal completely omits backend specification, which is critical for this type of application. You need to specify:
   - Backend framework and language (e.g., Node.js with Express, Python with FastAPI, etc.)
   - API architecture (RESTful, GraphQL?)
   - How Canvas API integration will be handled server-side
   - Authentication/authorization architecture
   - Hosting/deployment strategy (AWS, Azure, Heroku, etc.)

2. **No Technology Stack Defined**: Specify your complete technology stack:
   - Frontend: Framework (React, Vue, React Native, Flutter?)
   - Backend: Language and framework
   - Database: Type (PostgreSQL, MongoDB?) and ORM/ODM
   - Third-party services: Which calendar APIs? Which AI services for nice-to-haves?

3. **Missing Timeline**: Add a detailed week-by-week timeline:
   - Week 1-2: Backend setup, authentication, basic database schema
   - Week 3-4: Canvas integration (or dummy alternative), core task management
   - Week 5: Calendar integration
   - Week 6: Testing, bug fixes, documentation
   - Be realistic about what can be achieved in 1.5 months

4. **Scope Too Ambitious - Needs Reduction**: The current MVP is too large. Consider:
   - Start with ONE calendar provider (e.g., Google Calendar only)
   - Make Canvas integration read-only initially (no bidirectional sync)
   - Remove "strong privacy and security protocols" from MVP (implement basic secure authentication instead)
   - Consider limiting to web-only (not both mobile and desktop) for MVP
   - Move "progress tracking" to nice-to-have unless it's simple completion checkboxes

### Major Improvements (Strongly Recommended)

1. **Database Design Specification**: Expand the data requirements into a proper schema:
   - Users table: authentication fields, preferences, Canvas credentials (encrypted)
   - Tasks table: title, description, due_date, source (Canvas/manual), priority, completion_status
   - Calendar_events table: mapping to external calendar providers
   - Define relationships and foreign keys

2. **Canvas API Integration Plan**: Research and document:
   - Canvas API documentation review
   - Authentication flow (OAuth2 typically required)
   - Which Canvas endpoints you'll use (assignments, calendar events, courses?)
   - Rate limiting and error handling strategy
   - Fallback plan: clarify what the "dummy program" means - perhaps a mock Canvas API for development/testing?

3. **Calendar Integration Specificity**: Specify:
   - Which calendar provider(s) for MVP (recommend starting with just one)
   - Read-only or bidirectional sync? (recommend read-only for MVP)
   - Sync frequency (real-time, hourly, on-demand?)
   - Conflict resolution strategy if bidirectional
   - OAuth implementation for calendar access

4. **Platform Decision**: Make a clear choice:
   - Option A: Web application first (React/Vue), mobile later
   - Option B: Mobile-first (React Native/Flutter), cross-platform from start
   - Option C: Progressive Web App (works on all devices, installable)
   - Recommendation: PWA or web app for MVP to avoid platform-specific complications

5. **"Timeline for Tasks" Algorithm Definition**: The timeline suggestion feature is core but undefined. Specify:
   - What inputs does it use? (due date, estimated effort, available time slots, priority?)
   - What algorithm? (simple heuristic, or ML-based?)
   - How does it integrate with calendar availability?
   - Recommendation for MVP: Simple rule-based allocation rather than AI-driven initially

6. **Security Specification**: Replace "strong privacy and security protocols" with specific practices:
   - Password hashing (bcrypt/argon2)
   - HTTPS enforcement
   - JWT or session-based authentication
   - Secure storage of Canvas API tokens
   - GDPR/privacy considerations for student data

### Minor Enhancements (Optional)

1. **Success Metrics**: Add quantifiable success metrics:
   - "Users can add a Canvas assignment to their calendar in < 10 seconds"
   - "System syncs with Canvas within 5 minutes of new assignment posting"
   - "95% uptime for calendar synchronization"

2. **Error Handling Strategy**: Document how the system handles:
   - Canvas API downtime
   - Calendar provider API failures
   - Network connectivity issues
   - Invalid user inputs

3. **Testing Strategy**: Briefly outline:
   - Unit testing approach
   - Integration testing for third-party APIs
   - User acceptance testing with target users

4. **Competitive Analysis**: Mention existing solutions and what makes Things+ different:
   - How does it differ from Canvas calendar + Google Calendar?
   - What unique value does the timeline suggestion provide?

5. **UI/UX Considerations**: Add a section on:
   - Key user flows (onboarding, adding tasks, viewing timeline)
   - Accessibility requirements
   - Mobile vs desktop UI differences

## Recommendations Summary

**Immediate Actions (Before Starting Development)**:
1. Define complete technology stack (frontend framework, backend framework, database type)
2. Create a realistic week-by-week timeline with specific milestones
3. Reduce MVP scope - remove at least 2-3 features to make it achievable in 1.5 months
4. Specify backend architecture and API design
5. Research Canvas API and document integration approach with specific endpoints
6. Choose ONE calendar provider for MVP (not "phone or laptop calendar" generically)
7. Decide on single platform for MVP (web app recommended)

**Before Final Submission**:
8. Expand data requirements into full database schema with relationships
9. Specify authentication and security approach with concrete technologies
10. Define the "timeline suggestion" algorithm at least conceptually
11. Add risk mitigation strategies for technical challenges
12. Include mockups or wireframes if possible to visualize the UX

**For Scope Reduction (Choose 2-3)**:
- Limit to web application only (not mobile)
- Start with read-only Canvas integration
- Support only Google Calendar initially
- Move "progress tracking" to Phase 2
- Simplify "timeline for tasks" to manual time allocation in MVP
- Remove speech-to-text and image recognition from project scope entirely (too ambitious)

## Evaluator Notes

**Positive Observations**:
The team clearly understands their target users and has identified a genuine problem worth solving. The user-centered approach and clear problem articulation are commendable. The feature prioritization shows maturity in thinking about MVP vs. extensions.

**Primary Concerns**:
The main weakness is the lack of technical planning. This reads more like a product vision document than a technical project proposal. For a programming course, the emphasis should shift significantly toward technical architecture and implementation details. The absence of any timeline is particularly concerning - it suggests the team may not have considered the implementation effort required.

**Recommendation for Instructors**:
This proposal should be approved conditionally, requiring the team to submit an addendum addressing the critical issues above (technology stack, timeline, scope reduction) before proceeding with implementation. Consider requiring a technical architecture document as a follow-up deliverable within the first week of the project.

**Risk Assessment**:
HIGH RISK of project incompletion if pursued as-is. The combination of Canvas integration complexity, multi-platform support, calendar synchronization, and intelligent timeline features is far too ambitious for 1.5 months. With significant scope reduction and technical planning, this could become a successful and valuable project.

**Alternative Simplified Scope Suggestion**:
Consider this minimized MVP: A web application that allows users to manually input tasks from Canvas (no API integration initially), displays them in a unified view alongside their Google Calendar events (read-only), and allows them to manually allocate time slots for task completion. This would demonstrate the core value proposition while being achievable in 1.5 months, with API integrations and advanced features as Phase 2. 