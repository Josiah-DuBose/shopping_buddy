const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/list', userController.list);


module.exports = router;
