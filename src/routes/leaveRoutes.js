const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.post('/', leaveController.applyLeave);
router.post('/:leaveId/approve', leaveController.approveLeave);
router.post('/:leaveId/reject', leaveController.rejectLeave);
// Get all leaves (admin)
router.get('/', leaveController.getAllLeaves);

// Get leaves for one employee
router.get('/employee/:employeeId', leaveController.getLeavesByEmployee);


module.exports = router;
