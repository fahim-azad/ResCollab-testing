# Entity-Relationship (ER) Diagram
**Project:** ResCollab – Unified Research Discovery & Collaboration Platform

This diagram outlines the core relational database schema for ResCollab. It uses Mermaid.js syntax to define the relationships between entities.

```mermaid
erDiagram
    USER ||--o| USER_PROFILE : "has"
    USER ||--o{ WORKSPACE_MEMBER : "joins"
    USER ||--o{ PROJECT : "creates/owns"
    USER ||--o{ MESSAGE : "sends"
    USER ||--o{ PUBLICATION : "authors"
    
    UNIVERSITY ||--o{ USER : "employs/enrolls"
    UNIVERSITY ||--o{ LABORATORY : "hosts"
    
    LABORATORY ||--o{ USER : "members"
    
    WORKSPACE ||--o{ WORKSPACE_MEMBER : "contains"
    WORKSPACE ||--o{ TASK : "has"
    WORKSPACE ||--o{ MESSAGE : "contains chat"
    WORKSPACE ||--o{ FILE : "stores"
    
    PROJECT ||--o{ PROJECT_APPLICATION : "receives"
    USER ||--o{ PROJECT_APPLICATION : "applies"
    
    USER {
        uuid id PK
        string email
        string password_hash
        string role "Student, Faculty, etc."
        datetime created_at
    }

    USER_PROFILE {
        uuid id PK
        uuid user_id FK
        string full_name
        string bio
        string[] skills
        string[] interests
    }

    UNIVERSITY {
        uuid id PK
        string name
        string domain
        string location
    }

    LABORATORY {
        uuid id PK
        uuid university_id FK
        string name
        string description
    }

    WORKSPACE {
        uuid id PK
        string name
        string description
        boolean is_private
    }

    WORKSPACE_MEMBER {
        uuid id PK
        uuid workspace_id FK
        uuid user_id FK
        string role "Admin, Member, Viewer"
    }

    TASK {
        uuid id PK
        uuid workspace_id FK
        uuid assigned_to FK
        string title
        string description
        string status "To Do, In Progress, Done"
        datetime due_date
    }

    MESSAGE {
        uuid id PK
        uuid workspace_id FK
        uuid sender_id FK
        text content
        datetime timestamp
    }

    PROJECT {
        uuid id PK
        uuid owner_id FK
        string title
        string description
        string status "Open, Closed"
    }

    PROJECT_APPLICATION {
        uuid id PK
        uuid project_id FK
        uuid applicant_id FK
        string status "Pending, Accepted, Rejected"
    }
```

## Design Notes:
1.  **Normalization:** The schema separates core `USER` authentication data from `USER_PROFILE` data.
2.  **RBAC:** User roles are defined at the `USER` level, but also on a per-workspace level (`WORKSPACE_MEMBER`).
3.  **Extensibility:** The `PROJECT` and `WORKSPACE` entities are decoupled to allow a user to have a workspace without an open marketplace project, and vice-versa.
