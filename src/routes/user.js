const express = require('express');
const route = express.Router();
const userController = require('../controller/users');

route.post('/login', userController.loginUser) // done
route.get('/get', userController.getAllUsers) // done
route.post('/register', userController.addUser) // done

module.exports = route