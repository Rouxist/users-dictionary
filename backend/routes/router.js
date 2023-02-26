const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const mongoose = require('mongoose')
require('dotenv').config();
const mongoDB_uri = process.env.MONGODB_URI;

mongoose.connect(mongoDB_uri, { //변화 있음
    useNewUrlParser: true,
    // useCreateIndex: true
    // useUnifiedTopology: true
});

const express = require('express');

const router = express.Router();

router.use(express.json());

const SetModel = require('../models/set.model');
const FocusedWordModel = require('../models/focused_Word.model');

router.put('/fetchWordSet', async (req, res) => {
    const userId = req.body.userId;
    let response = {};
    await SetModel.find({ 'userId': userId }).then((data) => {
        response['wordSet'] = data;
    }).catch((error) => {
        console.log(error.response.data);
    });
    await FocusedWordModel.find({ 'userId': userId }).then((data) => {
        response['focusedWordSet'] = data;
    }).catch((error) => {
        console.log(error.response.data);
    });
    res.json(response);
});

router.put('/fetchFocusedWordSet', async (req, res) => {
    const userId = req.body.userId;
    console.log('bye : ', userId);
    FocusedWordModel.find({ 'userId': userId }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error.response.data);
    })
});

router.put('/fetchWordSetToEdit', async (req, res) => {
    const wordSetId = req.body.id;
    SetModel.findById(wordSetId).then((data) => {
        console.log(data)
        res.json(data);
    }).catch((error) => {
        console.log(error.response.data);
    })
});

router.put('/createWordSet', async (req, res) => {
    const data = req.body.data;
    const session = new SetModel(data);
    try {
        session.save();
        res.send(true);
    } catch (err) {
        console.log(err);
        res.send(false);
    }
});

router.put('/focusWord', async (req, res) => {
    const data = req.body.data;
    const session = new FocusedWordModel(data);
    try {
        session.save();
        res.send(true);
    } catch (err) {
        console.log(err);
        res.send(false);
    }
});

router.put('/unfocusWord', async (req, res) => {
    const idToDelete = req.body.id;

    try {
        FocusedWordModel.findByIdAndRemove(idToDelete).exec();
        res.send(true);
    } catch (err) {
        console.log(err);
        res.send(false);
    }
});

// router.delete!!
router.put('/removeWordSet', async (req, res) => {
    const wordSetId = req.body.data;
    try {
        SetModel.findByIdAndRemove(wordSetId).exec();
        res.send(true);
    } catch (err) {
        console.log(err);
        res.send(false);
    }

});

router.put('/replaceWordSet', async (req, res) => {
    const idToDelete = req.body.idToDelete;
    const newWordSetData = req.body.data;
    const session = new SetModel(newWordSetData);

    try {
        SetModel.findByIdAndRemove(idToDelete).exec();
        session.save();
        res.send(true);
    } catch (err) {
        console.log(err);
        res.send(false);
    }

});

module.exports = router;