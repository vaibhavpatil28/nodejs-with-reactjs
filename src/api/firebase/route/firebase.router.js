const express = require('express');
const router = express.Router();
const userRoute = require('./user.router');
const firestoreRoute = require('./firestore.router');

router.use('/user', userRoute);
router.use('/firestore', firestoreRoute);

module.exports = router;