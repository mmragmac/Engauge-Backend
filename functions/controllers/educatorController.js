'use strict';

const res = require('express/lib/response');
const firebase = require('../db');
//const Educator = require('../models/educator');
const firestore = firebase.firestore();

const addEducator = async (req, res, next) => {
    try{
        const data = req.body;
        const id = data.userId;
        delete data.userId;
        await firestore.collection('educators').doc(id).set(data);
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
// This function does not work (yet?)
const getEducatorStudentsData = async (req, res, next) => {
    try{
        const id = req.params.id;
        const educator = await firestore.collection('educators').doc(id);
        const data = await educator.get();
        const students = data.data().studentIds;
        var studentJson = [];
        console.log(students);
        students.forEach(async(student) => {
            const snapshot = await firestore.collection("students").where("userId", "==", student).get();
            snapshot.forEach((doc) => {
                studentJson.push(doc.data());
                console.log(studentJson);
            });
        });
        res.send(studentJson);
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

const addEducatorStudentIds = async (req, res, next) => {
    try{
        //res.send(data.data());
        const id = req.params.id;
        const newData = req.body;
        const educator = await firestore.collection('educators').doc(id);
        const existingData = await educator.get();
        //console.log(existingData.data());
        const newStudentIds = existingData.data().studentIds.concat(newData.studentIds);
        const updatedData = {
            "studentIds": newStudentIds
        }
        console.log(updatedData);
        await educator.update(updatedData);
        res.send('Educator record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const deleteEducatorStudentIds = async (req, res, next) => {
    try{
        const id = req.params.id;
        const removeData = req.body;
        const educator = await firestore.collection('educators').doc(id);
        const existingData = await educator.get();
        const existingDataArray = existingData.data().studentIds;
        removeData.studentIds.forEach((item) => { 
            existingDataArray.splice(existingDataArray.indexOf(item), 1)
        })
        const newStudentIds = existingDataArray;
        const updatedData = {
            "studentIds": newStudentIds
        }
        console.log(newStudentIds);
        console.log(updatedData);
        await educator.update(updatedData);
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

const getEducatorUploaded = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const educator = await firestore.collection('educators').doc(id);
        const data = await educator.get();
        if (!data.exists){
            res.status(404).send('Educator with the given ID not found');
        }else {
            res.send(data.data().canWatch);
        }
    } catch (error){
        res.status(400).send(error.message);
    }
    
}

const addEducatorUploaded = async (req, res, next) => {
    try{
        const id = req.params.id;
        const newData = req.body;
        const educator = await firestore.collection('educators').doc(id);
        const existingData = await educator.get();
        console.log(existingData.data());
        const newStories = existingData.data().storiesUploaded.concat(newData.storiesUploaded);
        const updatedData = {
            "storiesUploaded": newStories
        }
        console.log(updatedData);
        await educator.update(updatedData);
        res.send('Educator record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const deleteEducatorUploaded = async (req, res, next) => {
    try{
        const id = req.params.id;
        const removeData = req.body;
        const educator = await firestore.collection('educators').doc(id);
        const existingData = await educator.get();
        const existingDataArray = existingData.data().storiesUploaded;
        removeData.storiesUploaded.forEach((item) => { 
            existingDataArray.splice(existingDataArray.indexOf(item), 1)
        })
        const newStories = existingDataArray;
        const updatedData = {
            "storiesUploaded": newStories
        }
        console.log(newStories);
        console.log(updatedData);
        await educator.update(updatedData);
        res.send('Educator record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addEducator,
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
}