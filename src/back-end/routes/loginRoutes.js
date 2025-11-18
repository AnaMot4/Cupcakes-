const express = require('express');
const router = express.Router();
const { autenticar } = require('../controllers/loginController');

router.post('/', autenticar);

module.exports = router;
