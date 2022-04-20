const express = require('express');
const getMain = require('../controllers/mainControllers.js');

const router = express.Router();

router.get('/', getMain);

module.exports = router;