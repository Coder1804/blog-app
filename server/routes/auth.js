const express = require('express');
const router = express.Router();

const {login,logout,register} = require('../controllers/auth');

router.post('/login' , login)
router.post('/register' , register)
router.post('/logout' , logout)

module.exports = router;