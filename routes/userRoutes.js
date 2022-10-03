const express = require('express');
const { Router } = require('express');
const { createUser, login, profile }  = require('../controllers/usersController');
const checkAuth = require ('../middleware/checkAuth.js');
const router = Router();

router.post('/', createUser); 
router.post('/login', login);
router.get("/profile", checkAuth, profile);
module.exports = router;