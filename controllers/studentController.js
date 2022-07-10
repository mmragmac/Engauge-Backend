'use strict';

const res = require('express/lib/response');
const firebase = require('../db');
//const Student = require('../models/student');
const firestore = firebase.firestore();

const addStudent = async (req, res, next) => {
    try{
        const data = req.body;
        const id = data.userId;
        delete data.userId;
        await firestore.collection('students').doc(id).set(data);
        res.send('Record saved successfully');
        console.log(data);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const addStudentData = async (req, res, next) => {
    try{
        const id = req.params.id;
        const newData = req.body;
        const student = await firestore.collection('students').doc(id);
        const existingData = await student.get();
        var updatedData = existingData.data();

        const storyId = newData.storyId;
        delete newData.storyId;

        if (!("storyData" in updatedData)){
            updatedData = {
                "storyData": {}
            }
        }

        if(storyId in updatedData.storyData){
            updatedData.storyData[storyId].push(newData);
        }else{
            updatedData.storyData[storyId] = [newData];
        }

        console.log(updatedData);
        await student.update(updatedData);
        res.send('Student record updated successfully');

    } catch (error){
        res.status(400).send(error.message);
    }
}

const getAllStudents = async(req, res, next) => {
    try {
        const students = await firestore.collection('students').get();
        const data = students.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        res.json(data);
    } catch (error) {
        res.status(400).send(error.message)
    } 
}

const getStudent = async (req, res, next) => {
    try{
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if (!data.exists){
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getStudentCanWatch = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if (!data.exists){
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data().canWatch);
        }
    } catch (error){
        res.status(400).send(error.message);
    }
    
}

const addStudentCanWatch = async (req, res, next) => {
    try{
        const id = req.params.id;
        const newData = req.body;
        const student = await firestore.collection('students').doc(id);
        const existingData = await student.get();
        console.log(existingData.data());
        const newStories = existingData.data().canWatch.concat(newData.canWatch);
        const updatedData = {
            "canWatch": newStories
        }
        console.log(updatedData);
        await student.update(updatedData);
        res.send('Student record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const deleteStudentCanWatch = async (req, res, next) => {
    try{
        const id = req.params.id;
        const removeData = req.body;
        const student = await firestore.collection('students').doc(id);
        const existingData = await student.get();
        const existingDataArray = existingData.data().canWatch;
        removeData.canWatch.forEach((item) => { 
            existingDataArray.splice(existingDataArray.indexOf(item), 1)
        })
        const newStories = existingDataArray;
        const updatedData = {
            "canWatch": newStories
        }
        console.log(newStories);
        console.log(updatedData);
        await student.update(updatedData);
        res.send('Student record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getStudentRecentlyWatched = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if (!data.exists){
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data().recentlyWatched);
        }
    } catch (error){
        res.status(400).send(error.message);
    }
    
}

const addStudentRecentlyWatched = async (req, res, next) => {
    try{
        const id = req.params.id;
        const newData = req.body;
        const student = await firestore.collection('students').doc(id);
        const existingData = await student.get();
        console.log(existingData.data());
        const newStories = existingData.data().recentlyWatched.concat(newData.recentlyWatched);
        const updatedData = {
            "recentlyWatched": newStories
        }
        console.log(updatedData);
        if (updatedData.recentlyWatched.length > 3){
            console.log(updatedData.recentlyWatched)
            while ( updatedData.recentlyWatched.length > 3){
                updatedData.recentlyWatched.shift();
            }
        }
        await student.update(updatedData);
        res.send('Student record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const deleteStudentRecentlyWatched = async (req, res, next) => {
    try{
        const id = req.params.id;
        const removeData = req.body;
        const student = await firestore.collection('students').doc(id);
        const existingData = await student.get();
        const existingDataArray = existingData.data().recentlyWatched;
        removeData.recentlyWatched.forEach((item) => { 
            existingDataArray.splice(existingDataArray.indexOf(item), 1)
        })
        const newStories = existingDataArray;
        const updatedData = {
            "recentlyWatched": newStories
        }
        console.log(newStories);
        console.log(updatedData);
        await student.update(updatedData);
        res.send('Student record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const updateStudent = async (req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const student = await firestore.collection('students').doc(id);
        await student.update(data);
        res.send('Student record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res, next) => {
    try{
        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addStudent,
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
}