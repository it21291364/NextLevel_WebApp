const Supplier = require('../models/supplier')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

// Create new employee  =>   /api/v1/admin/employee/new
exports.newSupplier = catchAsyncErrors(async (req, res, next) => {

    const supplier = await Supplier.create(req.body);

    res.status(201).json({
        success: true,
        supplier
    })
})

// Get all employees (Admin)  =>   /api/v1/admin/employees
exports.getAdminSuppliers = catchAsyncErrors(async (req, res, next) => {

    const suppliers = await Supplier.find();

    res.status(200).json({
        success: true,
        suppliers
    })

})

// Delete employee   =>   /api/v1/admin/employee/:id
exports.deleteSupplier = catchAsyncErrors(async (req, res, next) => {

    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
        return next(new ErrorHandler('Supplier not found', 404));
    }

    await supplier.remove();

    res.status(200).json({
        success: true,
        message: 'Supplier is deleted.'
    })

})

// Update Employee   =>   /api/v1/admin/employee/:id
exports.updateSupplier = catchAsyncErrors(async (req, res, next) => {

    let supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
        return next(new ErrorHandler('Supplier not found', 404));
    }

    
    supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        supplier
    })

})