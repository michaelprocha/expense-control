# expense-control

A full-stack web application for managing personal expenses. Users can register, log in, track purchases, generate simple financial reports, and recover their accounts through a secure password reset system.

---

## ✨ Features

- Add items with product name, value, and date.

- View and delete listed products.

- Access a Reports page to compare spending against saved amount and spending goals.

---

## 🔐 Authentication

- Login uses JWT tokens.

- Reset password uses a JWT link sent by email.

- Passwords are securely hashed using argon2.

---

## 📧 Email System

- nodemailer sends the user a reset-password link containing a short-lived JWT.

- Users access the link to set a new password.

---

## 🚀 Technologies

### Data Base:
- MySQL


### Back-end:
- NodeJS

#### Installed Packages:
- argon2 – password hashing

- dotenv – environment variables

- jsonwebtoken – JWT authentication

- mysql2 – database connection

- nodemailer – email sending

### Front-end:

- HTML

- CSS

- JavaScript

- Tailwind CSS

---

## 📦 How to use

- Clone the repository:
```bash
git clone https://github.com/michaelprocha/expense-control
```

### MySQL:

1. Download [MySQL](https://dev.mysql.com/downloads/installer/)

2. Create a connection in Workbench.

3. Execute the commands in databaseSchema.sql in `./backend/database/`

### Back-end:

1. Run it through a local server [NodeJS](https://nodejs.org/en/download).

2. In the `backend` folder install dependencies: 
- npm install

4. Configure environment variables.
Create a .env file:
```.env
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=yourdatabase
```

5. npm start

### Front-end:

1. In the `frontend` folder install dependencies:
- npm install

2. Run it through a local server (for example, using VS Code Live Server extension).

---

## 👨‍💻 Author

Made by [Michael Rocha](https://github.com/michaelprocha)

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more details.