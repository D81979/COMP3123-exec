const mongoose = require('mongoose');

// Each MongoDB document stores one note.
const noteSchema = new mongoose.Schema({
    noteTitle: { type: String, required: true, trim: true },
    noteDescription: { type: String, required: true, trim: true },
    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        uppercase: true,
        default: 'MEDIUM'
    },
    // Strings support the date format used in the professor's sample.
    dateAdded: { type: String, default: () => new Date().toISOString().slice(0, 10) },
    dateUpdated: { type: String, default: () => new Date().toISOString().slice(0, 10) }
});

module.exports = mongoose.model('Note', noteSchema);
