const express = require('express');
const {addEducator, 
       getAllEducators, 
       getEducator,
       updateEducator,
       deleteEducator
      } = require('../controllers/educatorController');

const router = express.Router();

router.post('/educator', addEducator);
router.get('/educators', getAllEducators)
router.get('/educator/:id', getEducator);
router.put('/educator/:id', updateEducator);
router.delete('/educator/:id', deleteEducator);

module.exports = {
    routes: router
}