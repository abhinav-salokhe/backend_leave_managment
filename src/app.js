const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const authRoutes = require('./routes/authRoutes');
const { userMiddleware } = require('./middlewares/authMiddleware');
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // allow only your frontend
  credentials: true // if you need cookies / auth headers
}));


app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/employee',userMiddleware, employeeRoutes);
app.use('/api/leave', userMiddleware,leaveRoutes);
// app.use('/api/employee', employeeRoutes);
// app.use('/api/leave', leaveRoutes);



app.get('/', (req, res) => {
  res.send('Leave Management API is running...');
});

module.exports = app;
