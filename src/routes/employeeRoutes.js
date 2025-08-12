const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.addEmployee);
router.get('/', employeeController.getAllEmployee);
router.get('/:id', employeeController.getEmployee);
router.get('/:id/leave-balance', employeeController.getLeaveBalance);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
router.get('/search/query', employeeController.searchEmployees);

module.exports = router;
