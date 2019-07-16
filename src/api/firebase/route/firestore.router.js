const firebaseDB = require('../firebase-database');
const express = require('express');

const app = express();
const router = express.Router();

router.post('/personalInfo', (req, res, next) => {
    const { address, fullName, dateOfBirth } = { ...req.body };
    const personalInfoRef = firebaseDB.firestore.collection('users');
    personalInfoRef.add({
        date_of_birth: dateOfBirth,
        full_name: fullName,
        address: address
    }).then(value => {
        res.status(200).json({ 'message': 'User\'s info saved successfully in cloud.' })
    })
});

module.exports = router