const express = require('express');
const taskCont = require('../controllers/task_controller');
const router = express.Router();


router.post('/create',taskCont.create);

module.exports = router