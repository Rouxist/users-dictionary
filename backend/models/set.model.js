const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word : {type: String, required: true},
    meaning : {type: Array, required: true},
    from : {type: String, required: true},
});

const setSchema = new Schema({
    title : {type: String, required: true},
    userId : {type: String, required: true},
    createdDate : {type: Date, required: true},
    wordList: [wordSchema]
});

const Set = mongoose.model('Set', setSchema)
module.exports = Set;