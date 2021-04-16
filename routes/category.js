const express = require('express');
const categoryCont = require('../controllers/category_controller');
const router = express.Router();


router.get('/',categoryCont.home);
router.get('/create',categoryCont.create);
router.get('/delete/:ctg',categoryCont.deleteCategory);
router.get('/rename',categoryCont.renameCategory);

module.exports = router