const express = require('express')
const router = express.Router();

const { newSupplier, getAdminSuppliers,  deleteSupplier, updateSupplier} = require('../controllers/supplierController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/admin/suppliers').get(getAdminSuppliers);


router.route('/admin/supplier/new').post(isAuthenticatedUser, authorizeRoles('admin'), newSupplier);

router.route('/admin/supplier/:id')
.put(isAuthenticatedUser, authorizeRoles('admin'), updateSupplier)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSupplier);

module.exports = router;