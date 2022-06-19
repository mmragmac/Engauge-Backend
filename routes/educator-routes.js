const express = require('express');
const {addEducator, 
       getAllEducators, 
       getEducator,
       getEducatorStudentsData,
       updateEducator,
       addEducatorStudentIds,
       deleteEducatorStudentIds,
       deleteEducator,
       getEducatorUploaded,
       addEducatorUploaded,
       deleteEducatorUploaded
      } = require('../controllers/educatorController');

const router = express.Router();

router.post('/educator', addEducator);
router.get('/educators', getAllEducators);
router.get('/educator/:id', getEducator);
router.get('/educator/students/:id', getEducatorStudentsData);
router.get('/educator/stories/:id', getEducatorUploaded);
router.put('/educator/:id', updateEducator);
router.put('/educator/:id/add_students', addEducatorStudentIds);
router.put('/educator/:id/delete_students', deleteEducatorStudentIds);
router.put('/educator/stories/:id', addEducatorUploaded);
router.put('/educator/add_stories/:id', addEducatorUploaded);
router.put('/educator/delete_stories/:id', deleteEducatorUploaded);
router.delete('/educator/:id', deleteEducator);


module.exports = {
    routes: router
}