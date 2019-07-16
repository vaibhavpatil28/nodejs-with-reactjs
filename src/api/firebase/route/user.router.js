const firebaseDB = require('../firebase-database');
const express = require('express');

const app = express();
const router = express.Router();

const ref = firebaseDB.db.ref('server/saving-data/fireblog');
const usersCF = firebaseDB.db.ref('/users');

router.post('/saveUser', (req, res, next) => {
  console.log('req.body', req.body);
  const { userName, fullName, dateOfBirth } = { ...req.body };
  console.log('userName, fullName, dateOfBirth', userName, fullName, dateOfBirth);
  const usersRef = ref.child('users');
  usersRef.set({
    [userName]: {
      date_of_birth: dateOfBirth,
      full_name: fullName
    }
  }).then((value) => {
    res.status(200).json({ 'message': 'User saved successfully.' })
  });
});

router.post('/personalInfo', (req, res, next) => {
  const { address, fullName, dateOfBirth } = { ...req.body };
  const personalInfoRef = usersCF.child('/personalInfo');
  personalInfoRef.set({
    date_of_birth: dateOfBirth,
    full_name: fullName,
    address: address
  }).then(value => {
    res.status(200).json({'message': 'User\'s info saved successfully.'})
  })
})

module.exports = router;