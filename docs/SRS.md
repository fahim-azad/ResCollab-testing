# Software Requirements Specification (SRS)
**Project Name:** ResCollab - Unified Research Discovery & Collaboration Platform
**Version:** 2.0
**Date:** August 2026

---

## 1. Introduction

### 1.1 Purpose
The purpose of this Software Requirements Specification (SRS) document is to provide a detailed description of the ResCollab platform. It serves to define the system’s scope, outline user interactions, state the functional and non-functional requirements, and act as a reference for all developers, designers, stakeholders, and testers involved in the project.

### 1.2 Scope
ResCollab is a centralized, cloud-based Software-as-a-Service (SaaS) platform built for academia and research and development (R&D) divisions. It aims to solve the fragmentation of research tools by unifying discovery (papers, datasets, source code), professional networking (supervisors, researchers, labs), project management (workspaces, task boards), and community engagement into a single, premium ecosystem.

### 1.3 Definitions and Acronyms
*   **API:** Application Programming Interface
*   **SSO:** Single Sign-On
*   **RBAC:** Role-Based Access Control
*   **JWT:** JSON Web Token
*   **DOI:** Digital Object Identifier

---

## 2. Overall Description

### 2.1 User Classes and Roles
ResCollab employs Role-Based Access Control (RBAC) to tailor the experience and permissions for different entities:
1.  **Student:** Seeks research projects, ideas, papers, and prospective supervisors.
2.  **Researcher/Faculty:** Publishes papers, mentors students, leads projects, and manages workspace deliverables.
3.  **Lab Admin:** Responsible for managing Laboratory profiles, recruiting members, and publishing open projects.
4.  **University Admin:** Manages overarching university portals, directories, and institutional analytics.
5.  **System Administrator:** Maintains the platform, manages integrations, and oversees moderation and platform settings.

### 2.2 Operating Environment
*   **Frontend:** Web application built with React, Vite, and Tailwind CSS.
*   **Backend:** RESTful API built with .NET 8 (C#).
*   **Database:** Relational Database (e.g., PostgreSQL/SQL Server) for structured data, Redis for caching search queries.
*   **Deployment:** Docker containers orchestrated via Kubernetes, hosted on AWS/Azure.

---

## 3. System Features & Functional Requirements

### 3.1 Authentication & Profile Management
*   **FR-1.1 (Registration & Login):** The system shall allow users to register and log in securely via standard email/password or OAuth (Google, GitHub, ORCID).
*   **FR-1.2 (Role Selection):** During onboarding, users must select their primary role (Student, Researcher, Faculty, Lab Admin, University Admin).
*   **FR-1.3 (Profile Configuration):** Users shall have access to a settings dashboard to manage profile details, academic credentials, appearance preferences (Light/Dark mode), and notification settings.

### 3.2 Unified Research Discovery Engine
*   **FR-2.1 (Multi-Provider Search):** The platform shall feature a unified search engine that concurrently queries internal databases and external APIs.
*   **FR-2.2 (Paper Search):** The system shall integrate with providers like Google Scholar, Crossref, and Semantic Scholar to fetch academic publications.
*   **FR-2.3 (Dataset Search):** The system shall fetch datasets from Zenodo, Figshare, Kaggle, and HuggingFace.
*   **FR-2.4 (Code Search):** The system shall integrate with GitHub to retrieve research-related source code and repositories.
*   **FR-2.5 (Search Normalization):** The backend shall map heterogeneous external API responses into a normalized `SearchResultItem` data contract.

### 3.3 Collaboration & Private Workspaces
*   **FR-3.1 (Workspace Creation):** Researchers and Faculty shall be able to create secure, private workspaces for specific research projects.
*   **FR-3.2 (Kanban Task Board):** Workspaces shall include a Jira-style Kanban board for milestone tracking, task assignment, and progress visualization.
*   **FR-3.3 (Team Chat):** Workspaces shall include a real-time, Slack-style messaging module with channel organization (`#general`, `#drafting`) and file attachments.
*   **FR-3.4 (Research Notes):** The system shall provide a rich-text document editor (Notion-style) for drafting papers, storing meeting minutes, and capturing supervisor feedback.

### 3.4 Marketplaces & Networking
*   **FR-4.1 (Supervisor Directory):** The system shall provide a directory of verified faculty members, highlighting their research areas, publications, and availability for supervision.
*   **FR-4.2 (Open Projects):** Lab Admins and Faculty shall be able to post "Open Projects" specifying required skills and timelines, which Students can apply to join.
*   **FR-4.3 (Idea Marketplace):** Users shall be able to pitch early-stage research ideas, upvote proposals, and form impromptu teams.
*   **FR-4.4 (Community Feed):** The platform shall feature a chronological timeline where users can post updates, share papers, and discuss trending academic topics.

### 3.5 Portals & Analytics
*   **FR-5.1 (Laboratory Portals):** The system shall support customizable public pages for Research Labs to showcase active projects, members, and core facilities.
*   **FR-5.2 (Analytics Dashboard):** The system shall generate visual reports (using Recharts) displaying publication trends, citation growth, team productivity, and collaboration heatmaps.
*   **FR-5.3 (Admin Dashboard):** System administrators shall have a dedicated console to monitor total user counts, manage reports/moderation, and adjust platform-wide configurations.

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
*   **NFR-1 (Search Latency):** Unified search queries, despite calling multiple third-party APIs, must resolve and render results in under 3.0 seconds.
*   **NFR-2 (UI Responsiveness):** The frontend application must maintain a steady 60fps framerate during animations and transitions to ensure a premium SaaS feel.

### 4.2 Security Requirements
*   **NFR-3 (Authentication Security):** All passwords shall be hashed using modern algorithms (e.g., Argon2 or BCrypt). API endpoints must be guarded by JWT-based authorization.
*   **NFR-4 (Data Protection):** All network traffic shall be encrypted using TLS 1.2 or higher (HTTPS).

### 4.3 Design & Usability Requirements
*   **NFR-5 (Aesthetics):** The user interface must adhere to a premium, modern design language (soft shadows, rounded corners, Inter typography, glassmorphism) akin to platforms like Stripe, Linear, and Notion.
*   **NFR-6 (Responsiveness):** The platform must be fully responsive, scaling gracefully from 4K desktop monitors down to mobile viewports.

---

## 5. System Architecture
*   **Client Layer:** React SPA interacting with the backend via REST over HTTPS.
*   **API Gateway/Controllers:** ASP.NET Core Controllers routing requests.
*   **Service Layer:** `SearchManager` coordinating concurrent requests to `IProvider` implementations (e.g., `GoogleScholarProvider`, `GitHubProvider`).
*   **Data Access Layer:** Entity Framework Core interacting with the primary SQL database.
