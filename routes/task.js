const express = require('express');
const taskCont = require('../controllers/task_controller');
const router = express.Router();


router.get('/create',taskCont.create);

module.exports = router