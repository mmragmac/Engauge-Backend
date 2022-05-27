const express = require('express');
const {addStudent, 
       getAllStudents, 
       getStudent,
       getStudentCanWatch,
       getStudentRecentlyWatched,
       updateStudent,
       deleteStudent
      } = require('../controllers/studentController');

const router = express.Router();

router.post('/student', addStudent);
router.get('/students', getAllStudents)
router.get('/student/:id', getStudent);
router.get('/student/:id/can_watch', getStudentCanWatch);
router.get('/student/:id/recently_watched', getStudentRecentlyWatched);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

module.exports = {
    routes: router
}