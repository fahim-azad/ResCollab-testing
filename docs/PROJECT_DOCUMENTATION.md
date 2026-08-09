# ResCollab Project Documentation
**Version:** 1.0
**Date:** August 2026

## 1. Project Overview
**ResCollab** is a comprehensive Software-as-a-Service (SaaS) platform built to unify the fragmented landscape of academic research. It provides researchers, students, and faculty with a single ecosystem to discover literature, find datasets, manage open projects, and collaborate in private workspaces. 

The project consists of a high-performance RESTful API backend (.NET 8) and a premium, responsive Single Page Application frontend (React + Vite).

---

## 2. Technology Stack

### 2.1 Frontend Architecture
*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Routing:** React Router v6
*   **Styling:** Tailwind CSS v4
*   **Icons:** Lucide React
*   **Data Visualization:** Recharts
*   **Design Paradigm:** Premium SaaS aesthetics (glassmorphism, soft shadows, rounded borders, Inter font).

### 2.2 Backend Architecture
*   **Framework:** ASP.NET Core 8.0 Web API
*   **Language:** C# 12
*   **Search Integration Architecture:** Provider Pattern (`IProvider` interface) to concurrently fetch and normalize data from disparate APIs.
*   **Data Serialization:** `System.Text.Json`

---

## 3. Core Features Map

### 3.1 Authentication & User Management
*   **Implementation:** `AuthPages.jsx`, `SettingsPage.jsx`
*   **Features:** Role selection (Student, Faculty, Lab Admin), Profile customization, Security settings.

### 3.2 Unified Search Engine
*   **Implementation:** `SearchDashboard.jsx`, `SearchController.cs`, `SearchManager.cs`
*   **Features:** 
    *   **Papers:** Integrated with Google Scholar, Semantic Scholar, Crossref, Arxiv.
    *   **Datasets:** Integrated with Zenodo, Figshare.
    *   **Source Code:** Integrated with GitHub.
*   **UI:** Tabbed interface with filter pill-tags and rich result cards.

### 3.3 Collaboration Workspaces
*   **Implementation:** `WorkspacePage.jsx`, `MessagesPage.jsx`
*   **Features:** Jira-style Kanban task boards, real-time Slack-style team chat, Notion-style research notes, file management, and milestone tracking.

### 3.4 Marketplaces & Directories
*   **Implementation:** `OpenProjectsPage.jsx`, `ResearchIdeasPage.jsx`, `SupervisorDirectoryPage.jsx`, `ResearcherProfilePage.jsx`, `LabsPage.jsx`
*   **Features:** Find open projects by required skills, upvote research ideas, view verified supervisor availability, and browse university lab facilities.

### 3.5 Community & Analytics
*   **Implementation:** `CommunityPage.jsx`, `AnalyticsPage.jsx`
*   **Features:** Chronological research feed with likes and comments, trending topic tags, interactive charts for team productivity and publication growth.

---

## 4. Backend Code Structure

The backend follows a clean, modular pattern designed for asynchronous operations:
*   **`Controllers/SearchController.cs`**: The entry point for API requests. Handles routing and HTTP responses.
*   **`Providers/IProvider.cs`**: The standard interface for all search modules.
*   **`Providers/SearchManager.cs`**: Orchestrates parallel asynchronous calls to all active providers and merges the results.
*   **`Providers/[Name]Provider.cs`**: Concrete implementations that fetch from specific external APIs (e.g., `GoogleScholarProvider`, `ZenodoProvider`).
*   **`Models/SearchModels.cs`**: Defines the unified `SearchResultItem` data contract to ensure frontend consistency regardless of the data source.

---

## 5. Frontend Code Structure

The frontend is strictly organized by domain:
*   **`src/components/ui/`**: Reusable, highly-styled fundamental blocks (`Card.jsx`, `Button.jsx`, `Input.jsx`).
*   **`src/pages/`**: The massive suite of 16+ core views representing the entire platform's layout.
*   **`src/features/search/`**: Dedicated sub-components for the complex Unified Search logic.
*   **`src/layouts/`**: `MainLayout.jsx` handles the collapsible sidebar, top navigation, and nested routing via `<Outlet />`.
*   **`src/index.css`**: The core Tailwind configuration file, containing custom CSS variables and glassmorphism utilities.

---

## 6. Setup and Installation

### 6.1 Backend Setup
1. Ensure the .NET 8 SDK is installed.
2. Navigate to the `backend_dotnet` folder.
3. Run `dotnet restore` to fetch dependencies.
4. Run `dotnet run --project ResCollab.Api` to start the backend server (typically runs on `localhost:5169`).

### 6.2 Frontend Setup
1. Ensure Node.js (v18+) is installed.
2. Navigate to the `frontend` folder.
3. Run `npm install` to install dependencies (`lucide-react`, `recharts`, `react-router-dom`, etc.).
4. Run `npm run dev` to start the Vite development server.
5. Access the platform at `http://localhost:5173`.
