const express = require('express');
const homeCont=require('../controllers/home_controllers');
const router = express.Router();

router.get('/',homeCont.home);

/*mount a new router*/
router.use('/category',require('./category'));

module.exports=router;