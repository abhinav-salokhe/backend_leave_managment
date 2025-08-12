const prisma = require('../config/prismaClient');

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, joiningDate, leaveBalance = 20 } = req.body;

    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        department,
        joiningDate: new Date(joiningDate),
        leaveBalance
      },
    });

    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get leave balance
exports.getLeaveBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
      select: { leaveBalance: true },
    });

    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json({ leaveBalance: employee.leaveBalance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get employee details
exports.getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
    });

    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all employees
exports.getAllEmployee = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { id: "asc" } 
    });

    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, joiningDate, leaveBalance } = req.body;

    const updatedEmployee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        department,
        joiningDate: joiningDate ? new Date(joiningDate) : undefined,
        leaveBalance
      },
    });

    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search employees by name or email
exports.searchEmployees = async (req, res) => {
  try {
    const { query } = req.query;

    const employees = await prisma.employee.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } }
        ]
      }
    });

    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
