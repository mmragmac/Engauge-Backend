'use strict';

const res = require('express/lib/response');
const firebase = require('../db');
//const User = require('../models/user');
const firestore = firebase.firestore();
const storage = firebase.storage();

var storageRef = storage.ref();
const dpFolderRef = storageRef.child('profilePics');


const addUser = async (req, res, next) => {
    try{
        const data = req.body;
        const id = data.id;
        delete data.id;
        await firestore.collection('users').doc(id).set(data);
        res.send('Record saved successfully');
        console.log(data);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getAllUsers = async(req, res, next) => {
    try {
        const users = await firestore.collection('users').get();
        const data = users.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        res.json(data);
    } catch (error) {
        res.status(400).send(error.message)
    } 
}

const getUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        if (!data.exists){
            res.status(404).send('User with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error){
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const user = await firestore.collection('users').doc(id);
        await user.update(data);
        res.send('User record updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getProfilePicture = async (req, res, next) => {
    try{
        const id = req.params.id;
        const profilePicRef = storageRef.child('profilePics/' + id);
        profilePicRef.getDownloadURL()
            .then((url) => {
                res.send({
                    "url": url
                });
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/object-not-found':
                    // File doesn't exist
                    res.send({
                        "url": ""
                    });
                    break;
                }
            });
    } catch (error){
        res.status(400).send(error.message);
    }
}

const putProfilePicture  = async (req, res, next) => {
    try{
        const id = req.params.id;
        const fileName = id;
        const profilePicRef = dpFolderRef.child(fileName);
        profilePicRef.putString(req.body.file, 'base64').then((snapshot) => {
            console.log('Profile picture updated');
        });
        res.send('Profile picture updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

const updateReminder = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const updatedData = {
            "reminder": false
        }
        await user.update(updatedData);
        //await user.update(data);
        res.send('Reminder flag updated successfully');
    } catch (error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    putProfilePicture,
    getProfilePicture,
    updateReminder
}