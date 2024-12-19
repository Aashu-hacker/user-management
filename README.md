# User Management Application

This project is a complete CRUD (Create, Read, Update, Delete) user management system with a backend RESTful API built using Laravel and a React-based frontend. The application includes a MySQL database for storing user data.

## Prerequisites

- PHP 7.4 or later
- Composer
- Node.js and npm
- MySQL
- Git

---

## Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Aashu-hacker/user-management.git
   cd user-management/backend
   ```

2. **Install Dependencies**
   ```bash
   composer install
   ```

3. **Set Up Environment Variables**
   Copy the `.env.example` file and configure database credentials:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database details:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=user_management
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

4. **Run Migrations**
   Create the database tables:
   ```bash
   php artisan migrate
   ```

5. **Run the Backend Server**
   Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   The backend will run on `http://127.0.0.1:8000`.

---

## Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up API Base URL**
   Edit the `src/services/api.js` file to set the correct API base URL:
   ```javascript
   const api = axios.create({
       baseURL: 'http://127.0.0.1:8000/api',
   });

   export default api;
   ```

4. **Run the Frontend Development Server**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## Database Schema

The following SQL schema is used for the `users` table:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Version Control

1. **Initialize Repository**
   ```bash
   git init
   ```

2. **Create Branches**
   ```bash
   git checkout -b feature/backend
   git checkout -b feature/frontend
   ```

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Initial commit with backend and frontend setup"
   ```

4. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/Aashu-hacker/user-management.git
   git push -u origin main
   ```

5. **Create Pull Requests**
   Use GitHub's Pull Request feature to review and merge branches into `main`.

---

## Features

- Backend API:
  - Endpoints for creating, reading, updating, and deleting users.
- Frontend:
  - View all users.
  - Add new users.
  - Edit existing users.
  - Delete users with confirmation dialogs.

---

## Libraries and Tools Used

### Backend:
- Laravel

### Frontend:
- React
- Axios
- SweetAlert2
- Bootstrap

---

## Contribution Guidelines

- Fork the repository.
- Create a new branch for each feature or bug fix.
- Submit a pull request with a clear description of your changes.

---

## License

This project is licensed under the MIT License.

