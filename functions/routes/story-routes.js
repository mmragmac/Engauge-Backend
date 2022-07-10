const express = require('express');
const {addStory, 
       getAllStories, 
       getStory,
       updateStory,
       deleteStory
      } = require('../controllers/storyController');

const router = express.Router();

router.post('/story', addStory);
router.get('/stories', getAllStories);
router.get('/story/:id', getStory);
router.put('/story/:id', updateStory);
router.delete('/story/:id', deleteStory);

module.exports = {
    routes: router
}