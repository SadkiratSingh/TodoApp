const express = require('express');
const taskCont = require('../controllers/task_controller');
const router = express.Router();

router.get('/:ctg',taskCont.displayCategoryTasks);
router.post('/create',taskCont.create);
router.post('/delete',taskCont.taskDelete);
router.post('/update',taskCont.taskUpdate);

module.exports = router