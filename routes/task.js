const express = require('express');
const taskCont = require('../controllers/task_controller');
const router = express.Router();


router.post('/create',taskCont.create);
router.get('/:ctg',taskCont.displayCategoryTasks);

module.exports = router