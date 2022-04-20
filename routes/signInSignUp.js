const express = require('express');
const {getUsers, signUp, signIn, signInViaGoogle, logout, newSession} = require('../controllers/signInSignUp.js');

const router = express.Router();

router.get('/users', getUsers);
router.get('/deleteCookie', logout);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signin/google', signInViaGoogle);
router.get('/newSession', newSession);

module.exports = router;