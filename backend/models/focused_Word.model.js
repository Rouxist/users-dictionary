const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const focusedWordSchema = new Schema({
    userId: { type: String, required: true },
    word: { type: String, required: true },
    meaning: { type: Array, required: true },
    from: { type: String, required: true },
    addedDate: { type: Date, required: true },
});

const FocusedWord = mongoose.model('FocusedWord', focusedWordSchema)
module.exports = FocusedWord;