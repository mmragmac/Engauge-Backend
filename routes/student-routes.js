const express = require('express');
const { route } = require('express/lib/application');
const {addStudent,
       addStudentData, 
       getAllStudents, 
       getStudent,
       getStudentCanWatch,
       addStudentCanWatch,
       deleteStudentCanWatch,
       getStudentRecentlyWatched,
       addStudentRecentlyWatched,
       deleteStudentRecentlyWatched,
       updateStudent,
       deleteStudent
      } = require('../controllers/studentController');

const router = express.Router();

router.post('/student', addStudent);
router.put('/student/:id/add_student_data', addStudentData);
router.get('/students', getAllStudents)
router.get('/student/:id', getStudent);
router.get('/student/:id/can_watch', getStudentCanWatch);
router.get('/student/:id/recently_watched', getStudentRecentlyWatched);
router.put('/student/:id/add_recently_watched', addStudentRecentlyWatched);
router.put('/student/:id/delete_recently_watched', deleteStudentRecentlyWatched);
router.put('/student/:id', updateStudent);
router.put('/student/:id/add_can_watch', addStudentCanWatch);
router.put('/student/:id/delete_can_watch', deleteStudentCanWatch);
router.delete('/student/:id', deleteStudent);

module.exports = {
    routes: router
}