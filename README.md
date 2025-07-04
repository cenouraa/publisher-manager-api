# Article Management API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3.x-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue)

A RESTful API for managing academic articles and authors, developed for the Web Systems Development course.

## Features

### Core Functionalities
- **Article Management**
  - Create, read, update, and delete articles
  - Article status workflow (Draft, Submitted, Approved, Rejected)
  - Search by title or author
  - Automatic submission date tracking

- **Author Management**
  - Author registration and profile management
  - Article-author relationship mapping
  - Validation to prevent duplicate authors

### Technical Implementation
- TypeScript-based architecture
- PostgreSQL database with TypeORM
- RESTful endpoints with proper HTTP status codes
- Input validation using Joi
- Authentication middleware
- Clean code architecture (Repositories, Services, Controllers)

## Database Schema

```mermaid
erDiagram
    AUTHORS ||--o{ ARTICLES : "has"
    AUTHORS {
        string id PK
        string name
        string email
        string institution
        string orcid
        string research_area
        string avatar
        datetime created_at
        datetime updated_at
    }
    ARTICLES {
        string id PK
        string title
        string knowledge_area
        string abstract
        string key_words
        datetime submission_date
        enum status
        string author_id FK
        datetime created_at
        datetime updated_at
    }
