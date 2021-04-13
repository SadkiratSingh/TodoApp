const express = require('express');
const categoryCont = require('../controllers/category_controller');
const router = express.Router();


router.get('/',categoryCont.categoryHome);

module.exports = router