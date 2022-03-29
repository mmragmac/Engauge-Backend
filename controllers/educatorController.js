'use strict';

const res = require('express/lib/response');
const firebase = require('../db');
//const Educator = require('../models/educator');
const firestore = firebase.firestore();

const addEducator = async (req, res, next) => {
    try{
        const data = req.body;
        await firestore.collection('educators').doc().set(data);
        res.send('Record saved successfully');
        console.log(data);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getAllEducators = async(req, res, next) => {
    try {
        const educators = await firestore.collection('educators').get();
        const data = educators.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        res.json(data);
    } catch (error) {
        res.status(400).send(error.message)
    } 
}

const getEducator = async (req, res, next) => {
    try{
        const id = req.params.id;
        const educator = await firestore.collection('educators').doc(id);
        const data = await educator.get();
        if (!data.exists){
            res.status(404).send('Educator with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error){
        res.status(400).send(error.message);
    }
}

const updateEducator = async (req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const educator = await firestore.collection('educators').doc(id);
        await educator.update(data);
        res.send('Educator record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const deleteEducator = async (req, res, next) => {
    try{
        const id = req.params.id;
        await firestore.collection('educators').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addEducator,
    getAllEducators,
    getEducator,
    updateEducator,
    deleteEducator
}