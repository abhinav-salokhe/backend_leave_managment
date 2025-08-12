const prisma = require('../config/prismaClient');

// Apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, reason } = req.body;


    const employee = await prisma.employee.findUnique({ where: { id:  parseInt(employeeId) } });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    // Validations
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    if (eDate < sDate) return res.status(400).json({ error: 'Invalid date range' });
    if (sDate < employee.joiningDate) return res.status(400).json({ error: 'Leave before joining date not allowed' });

    const daysRequested = Math.ceil((eDate - sDate) / (1000 * 60 * 60 * 24)) + 1;
    if (daysRequested > employee.leaveBalance)
      return res.status(400).json({ error: 'Not enough leave balance' });

    const overlapping = await prisma.leave.findFirst({
      where: {
        employeeId: parseInt(employeeId),
        status: { in: ['PENDING', 'APPROVED'] },
        OR: [
          { startDate: { lte: eDate }, endDate: { gte: sDate } },
        ],
      },
    });
    if (overlapping) return res.status(400).json({ error: 'Overlapping leave request exists' });

    const leave = await prisma.leave.create({
      data: { employeeId: parseInt(employeeId), startDate: sDate, endDate: eDate, reason },
    });

    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve leave
exports.approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;

    const leave = await prisma.leave.update({
      where: { id: parseInt(leaveId) },
      data: { status: 'APPROVED' },
    });

    const days = Math.ceil((leave.endDate - leave.startDate) / (1000 * 60 * 60 * 24)) + 1;
    await prisma.employee.update({
      where: { id: leave.employeeId },
      data: { leaveBalance: { decrement: days } },
    });

    res.json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Reject leave
exports.rejectLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const leave = await prisma.leave.update({
      where: { id: parseInt(leaveId) },
      data: { status: 'REJECTED' },
    });
    res.json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get leaves list for employee
exports.getLeavesByEmployee = async (req, res) => {
    try {
    const employees = await prisma.employee.findMany(); // No filter, fetch all
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all leaves (admin view)
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await prisma.leave.findMany({
      include: {
        employee: true   // so you can see employee details if needed
      },
      orderBy: { startDate: "desc" }
    });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all leaves of specific employee
exports.getLeavesByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const leaves = await prisma.leave.findMany({
      where: { employeeId: parseInt(employeeId) },
      orderBy: { startDate: "desc" }
    });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};