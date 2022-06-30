'use strict';

const res = require('express/lib/response');
const firebase = require('../db');
//const Story = require('../models/story');
const firestore = firebase.firestore();

const addStory = async (req, res, next) => {
    try{
        const data = req.body;
        await firestore.collection('stories').add(data)
        .then((docRef) => {
          const id = docRef.id;
          res.json(id);
        });
        res.send('Record saved successfully');
        console.log(data);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getAllStories = async(req, res, next) => {
    try {
        const stories = await firestore.collection('stories').get();
        const data = stories.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        res.json(data);
    } catch (error) {
        res.status(400).send(error.message)
    } 
}

const getStory = async (req, res, next) => {
    try{
        const id = req.params.id;
        const story = await firestore.collection('stories').doc(id);
        const data = await story.get();
        if (!data.exists){
            res.status(404).send('Story with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error){
        res.status(400).send(error.message);
    }
}

const updateStory = async (req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const story = await firestore.collection('stories').doc(id);
        await story.update(data);
        res.send('Story record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const deleteStory = async (req, res, next) => {
    try{
        const id = req.params.id;
        await firestore.collection('stories').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addStory,
    getAllStories,
    getStory,
    updateStory,
    deleteStory
}