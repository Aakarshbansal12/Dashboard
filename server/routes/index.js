var express = require('express');
var router = express.Router();
var users=require('../controller/userController');
var category=require('../controller/categoryController');
var token=require('../middleware/token');
var product=require('../controller/productController');
var booking=require('../controller/bookingsController');
var admin=require('../controller/adminController')

////////// USER CONTROLLER /////////////////
router.post('/addUser',users.addUser);
router.post('/loginUser',users.loginUser);
router.use(token.token);
router.get('/getUser/:id',users.getUser);
router.post('/updateUser/:id',users.updateUser);
router.post('/updateStatus/:id',users.updateStatus);
router.post('/updatePassword',users.updatePassword);
router.delete('/deleteUser/:id', users.deleteUser);
router.get('/getAllUsers',users.getAllUsers);
router.get('/getUserCount',users.getUserCount);


//////////// CATEGORY CONTROLLER ////////////////
router.post('/addCategory',category.addCategory);
router.post('/updateCategory/:id',category.updateCategory);
router.post('/categoryStatus/:id',category.categoryStatus);
router.delete('/deleteCategory/:id',category.deleteCategory);
router.get('/getCategory/:id',category.getCategory);
router.get('/getAllCategory',category.getAllCategory);
router.get('/getCategoryCount',category.getCategoryCount);

////////// PRODUCT CONTROLLER /////////////////
router.post('/addProducts',product.addProducts);
router.get('/productlist',product.productlist);
router.post('/updateProduct/:id',product.updateProduct);
router.post('/deleteProduct/:id',product.deleteProduct);
router.get('/countProduct',product.countProduct);
router.post('/updateProductStatus/:id',product.updateProductStatus);
router.get('/getProduct/:id',product.getProduct);

///////// BOOKINGS CONTROLLER ////////////////
router.post('/addBookings',booking.addBookings);
router.get('/bookingsList',booking.bookingsList);
router.get('/countBooking',booking.countBooking);
router.post('/deleteBookings/:id',booking.deleteBookings);

router.get('/getBooking/:id',booking.getBooking);
router.post('/updateBooking/:id',booking.updateBooking);

///////ADMIN CONTROLLER ////////
router.get('/getAdmin',admin.getAdmin);
router.post('/updateAdminPass',admin.updateAdminPassword);
router.get('/dashboard',admin.dashboard);


module.exports = router;