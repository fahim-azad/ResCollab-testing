# Software Requirements Specification (SRS)
**Project:** ResCollab – Unified Research Discovery & Collaboration Platform
**Version:** 1.0

## 1. Introduction
### 1.1 Purpose
The purpose of this document is to specify the software requirements for ResCollab. It serves as a guide for the development team and a reference for stakeholders.

### 1.2 Scope
ResCollab is an all-in-one platform where researchers can discover research papers, datasets, source code, supervisors, and labs from multiple sources (IEEE, ACM, GitHub, Kaggle, etc.) while collaborating seamlessly in a unified workspace.

## 2. Overall Description
### 2.1 User Classes and Characteristics
*   **Student:** Can search for papers, projects, and supervisors. Can join open projects.
*   **Faculty/Researcher:** Can publish open projects, mentor students, manage research labs, and collaborate on papers.
*   **Lab Admin:** Manages laboratory profiles, members, and internal resources.
*   **University Admin:** Manages university profiles, departments, and oversees institutional analytics.
*   **System Admin:** Maintains the platform, manages global settings, and resolves disputes.

## 3. Functional Requirements
### 3.1 Authentication & Authorization
*   **FR-1.1:** The system shall allow users to register and log in using email/password (JWT) and SSO (OAuth via Google/GitHub).
*   **FR-1.2:** The system shall support Role-Based Access Control (RBAC) to differentiate permissions between user types.

### 3.2 Unified Research Discovery
*   **FR-2.1:** The system shall aggregate search results from IEEE, ACM, arXiv, Google Scholar, OpenAlex, and ResearchGate.
*   **FR-2.2:** The system shall provide dataset discovery from Kaggle, Zenodo, Figshare, and HuggingFace.
*   **FR-2.3:** The system shall integrate source code search from GitHub and Papers with Code.
*   **FR-2.4:** The search engine shall normalize disparate API responses into a unified result format.

### 3.3 Collaboration & Workspaces
*   **FR-3.1:** Users shall be able to create private and public workspaces.
*   **FR-3.2:** Workspaces shall include a Kanban board for task management, shared file storage, and shared notes.
*   **FR-3.3:** The system shall support real-time team chat within workspaces.

### 3.4 Marketplace & Opportunities
*   **FR-4.1:** Users shall be able to post and apply for open research projects and ideas.
*   **FR-4.2:** The system shall facilitate team building and joining existing research initiatives.

### 3.5 AI Features & Recommendations
*   **FR-5.1:** The system shall recommend supervisors to students based on research interests and skills.
*   **FR-5.2:** The system shall recommend similar papers and trending research topics.

### 3.6 Profiles & Portals
*   **FR-6.1:** Users shall have comprehensive profiles detailing publications, skills, interests, and portfolios.
*   **FR-6.2:** The system shall support University and Laboratory portals with their own customizable pages.

## 4. Non-Functional Requirements
### 4.1 Performance & Scalability
*   **NFR-1:** Search queries across multiple providers shall resolve in under 3 seconds using asynchronous fetching and caching (Redis).
*   **NFR-2:** The application shall be scalable horizontally via Docker containers.

### 4.2 Security
*   **NFR-3:** All passwords must be hashed (bcrypt/Argon2). API endpoints must be secured with JWT.
*   **NFR-4:** The system shall prevent SQL Injection and XSS attacks by utilizing ORM features and frontend escaping.
