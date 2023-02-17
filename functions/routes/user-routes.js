const express = require('express');
const {addUser, 
       getAllUsers, 
       getUser,
       updateUser,
       deleteUser,
       putProfilePicture,
       getProfilePicture,
       updateReminder
      } = require('../controllers/userController');

const router = express.Router();

router.post('/user', addUser);
router.get('/users', getAllUsers)
router.get('/user/:id', getUser);
router.get('/user/:id/get_profile_picture', getProfilePicture);
router.put('/user/:id', updateUser);
router.put('/user/:id/add_profile_picture', putProfilePicture);
router.put('/user/:id/reminder', updateReminder);
router.delete('/user/:id', deleteUser);

module.exports = {
    routes: router
}