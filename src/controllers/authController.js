const prisma = require('../config/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// === Signup (No Zod Validation) ===
exports.signupHr = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username,password,"======")
    // Basic manual null/empty check
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { username, password: hashedPassword }
    });

    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// === Signin (No Zod Validation) ===
exports.signinHr = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic manual null/empty check
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Signin successful", token });

  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
