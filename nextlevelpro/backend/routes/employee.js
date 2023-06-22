const express = require('express')
const router = express.Router();

const { newEmployee, getAdminEmployees,  deleteEmployee, updateEmployee} = require('../controllers/employeeController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/admin/employees').get(getAdminEmployees);//admin view all employees


router.route('/admin/employee/new').post(isAuthenticatedUser, authorizeRoles('admin'), newEmployee);//admin add new employee

router.route('/admin/employee/:id')
.put(isAuthenticatedUser, authorizeRoles('admin'), updateEmployee)//admin update existing employee
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteEmployee);//admin delete employee

module.exports = router;