const express = require('express');
const routerAvatar = express.Router();

const newAvatar = require('../controllers/avatarController');


routerAvatar.post('/', newAvatar);

module.exports = routerAvatar;