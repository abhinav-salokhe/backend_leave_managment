# 🏢 Leave Management Backend API

This is the **backend service** for the Leave Management System, built using **Express.js** and **Prisma ORM** with a PostgreSQL database.  
It handles **authentication**, **employee management**, and **leave requests**.

---

## 🚀 Features

- User Authentication (Login / Register)
- Role-based Access Control
- CRUD for Employees
- Leave Request Management
- JWT Authentication
- Prisma ORM Database Access
- CORS configured for frontend integration

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **Prisma ORM** with PostgreSQL
- **JWT** for authentication
- **bcrypt** for password hashing
- **Zod** for schema validation
- **CORS** for secure API access

---

## 📂 Project Structure

backend/
│
├── prisma/ # Prisma schema and migrations
│ ├── schema.prisma
│ └── migrations/
│
├── src/
│ ├── config/ # Prisma client setup
│ ├── controllers/ # Route controllers (auth, employee, leave)
│ ├── middlewares/ # Auth middleware
│ ├── routes/ # API endpoints
│ └── app.js # Express app config
│
├── server.js # App entry point
├── package.json
├── .env # Environment variables (not committed)
└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file in the **backend** root with:

DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_jwt_secret
PORT=5000

---

## 📦 Installation & Setup

### **1️⃣ Clone the repository**
git clone https://github.com/abhinav-salokhe/backend_leave_managment.git
cd backend


### **2️⃣ Install dependencies**

### **3️⃣ Setup Database**
Run Prisma migrations:
npx prisma migrate deploy


(Optional: If running locally for the first time and want to reset DB)
npx prisma migrate dev --name init


### **4️⃣ Start the server**
- **Development (hot-reload)**:

npm run dev
- **Production**:

---

## 🔗 API Endpoints

| Method | Endpoint                | Description                  | Auth Required |
|--------|------------------------|------------------------------|---------------|
| POST   | `/api/auth/register`   | Register new user            | ❌            |
| POST   | `/api/auth/login`      | Login user                   | ❌            |
| GET    | `/api/employee`        | Get all employees            | ✅            |
| POST   | `/api/leave`           | Apply for leave              | ✅            |
| GET    | `/api/leave`           | Get all leave requests       | ✅            |

---

## 🌐 Deployment (Render.com)

1. Push code to GitHub
2. Create a **Web Service** on [Render.com](https://render.com)
3. Set the **Root Directory** to `backend`
4. Build Command:

npm install
5. Start Command:
npm start
6. Add environment variables in Render settings.
7. Add **Pre-Deploy Command**:
npx prisma migrate deploy

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abhinav Salokhe**  
🔗 [GitHub](https://github.com/abhinav-salokhe)
