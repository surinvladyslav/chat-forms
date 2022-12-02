const express = require('express');
const formController = require('../controllers/index');

const router = express.Router();

router.post('/', formController.create);
router.post('/:id', formController.submit)
router.get('/:id', formController.findOne);

module.exports = router;
