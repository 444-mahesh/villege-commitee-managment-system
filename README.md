# 🏘️ Village Committee Management System (VCMS)

A full-stack web application developed to digitally manage village committees, members, complaints, notices, meetings, funds, and user accounts in a centralized system.

The system provides a web-based interface for managing village committee activities and helps organize community-related information in a structured manner.

---

## 📌 Project Overview

The Village Committee Management System (VCMS) is designed to replace manual management of village committee activities with a centralized digital platform.

The application allows users to:

- Register and log in to the system
- Manage users
- Create and manage village committees
- Assign registered users as committee members
- Assign committee-specific roles
- Submit and manage complaints
- Assign complaints to relevant committees
- View committee-specific complaints
- Publish and manage notices
- Schedule and manage meetings
- Manage village funds and transactions
- View information through a centralized dashboard
- Ask VCMS-related questions using the MAHI chatbot

---

## ✨ Features

### 👤 User Management

- User registration
- User login
- User profile information
- User CRUD operations
- Password hashing using BCrypt
- Email uniqueness validation

### 🏛️ Committee Management

- Create committees
- View committees
- Update committee information
- Delete committees
- Store committee name, description, village name, and creation date

### 👥 Member Management

- Assign registered users to committees
- Store member information
- Assign committee-specific roles
- View members belonging to a particular committee
- Update member information
- Remove committee members

Supported committee roles include:

- Committee Member
- President
- Secretary
- Treasurer

### 📝 Complaint Management

- Submit complaints
- Store complaint title and description
- Set complaint priority
- Track complaint status
- Assign complaints to committees
- View complaints assigned to a specific committee
- Update complaints
- Delete complaints

### 📢 Notice Management

- Create notices
- View notices
- Update notices
- Delete notices
- Store notice title, message, author, and creation date

### 📅 Meeting Management

- Create meetings
- Store meeting date and location
- Store meeting agenda
- Store organizer information
- Update meetings
- Delete meetings

### 💰 Fund Management

- Record fund transactions
- Store source and amount
- Store transaction type
- Add transaction descriptions
- Store transaction date
- Update and delete fund records

### 🤖 MAHI Chatbot

The project also includes a chatbot named **MAHI** for answering questions related to the Village Committee Management System.

MAHI is integrated into the frontend and is made available after the user logs into the system.

---

# 🛠️ Technologies Used

## Frontend

- React.js
- JavaScript
- JSX
- CSS
- Vite
- Axios
- React Router

## Backend

- Java
- Spring Boot
- Spring Web / REST APIs
- Spring Data JPA
- Hibernate ORM
- Maven

## Database

- Oracle Database 21c XE
- Oracle JDBC Driver

## Development Tools

- IntelliJ IDEA
- Visual Studio Code
- SQL*Plus
- Git
- GitHub

---

# 🏗️ System Architecture

The application follows a client-server architecture.

```text
                    VCMS
                     │
          ┌──────────┴──────────┐
          │                     │
      Frontend                Backend
          │                     │
      React.js              Spring Boot
          │                     │
        Axios              REST APIs
          │                     │
          └──────────┬──────────┘
                     │
              Spring Data JPA
                     │
                 Hibernate
                     │
                   JDBC
                     │
              Oracle Database
