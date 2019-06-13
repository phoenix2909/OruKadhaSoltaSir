const express = require('express');
const userRouter = express.Router();
const auth = require('./../utils/authMiddleware')


// User Controllers
const signUp = require('./signup');
const login = require('./login');
const deactivate = require('./deactivate');
const update = require('./update');
const getUser = require('./get_user');

//Routes
userRouter.post(`/api/v1/user/signup`,signUp);
userRouter.post(`/api/v1/user/login`,login);
userRouter.get(`/api/v1/user/:id`,getUser);
userRouter.use(auth);
userRouter.put(`/api/v1/user/reset_password`,update);
userRouter.put(`/api/v1/user/deactivate`,deactivate);



module.exports={userRouter};