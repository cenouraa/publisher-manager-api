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

````
## API Endpoints

### Authentication
| Method | Endpoint          | Description                     | Auth Required |
|--------|-------------------|---------------------------------|---------------|
| POST   | `/sessions`       | User login                     | No            |

### Password Management
| Method | Endpoint               | Description                          | Auth Required |
|--------|------------------------|--------------------------------------|---------------|
| POST   | `/password/forgot`     | Request password reset token         | No            |
| POST   | `/password/reset`      | Reset password using token           | No            |

### Users
| Method | Endpoint          | Description                     | Auth Required |
|--------|-------------------|---------------------------------|---------------|
| GET    | `/users`          | List all users                  | Yes           |
| POST   | `/users`          | Create new user                 | No            |

### Profile
| Method | Endpoint          | Description                     | Auth Required |
|--------|-------------------|---------------------------------|---------------|
| GET    | `/profile`        | Get current user profile        | Yes           |
| PUT    | `/profile`        | Update profile                  | Yes           |

### Authors
| Method | Endpoint               | Description                          | Auth Required |
|--------|------------------------|--------------------------------------|---------------|
| GET    | `/authors`             | List all authors                    | Yes           |
| GET    | `/authors/:id`         | Get specific author                 | Yes           |
| POST   | `/authors`             | Create new author                   | Yes           |
| PUT    | `/authors/:id`         | Update author                       | Yes           |
| DELETE | `/authors/:id`         | Delete author                       | Yes           |
| PATCH  | `/authors/avatar/:id`  | Update author avatar (image upload) | Yes           |

### Articles
| Method | Endpoint                     | Description                          | Auth Required |
|--------|------------------------------|--------------------------------------|---------------|
| GET    | `/articles`                  | List all articles                    | Yes           |
| GET    | `/articles/:id`              | Get specific article                 | Yes           |
| GET    | `/articles/author/:author_id`| List articles by author              | Yes           |
| POST   | `/articles`                  | Create new article                   | Yes           |
| PUT    | `/articles/:id`              | Update article                       | Yes           |
| DELETE | `/articles/:id`              | Delete article                       | Yes           |

### Notes:
1. All authenticated endpoints require JWT token in `Authorization` header
2. Article status values: `draft`, `submitted`, `approved`, `rejected`
3. File upload endpoints accept multipart/form-data
