const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/NotesModel');
const noteRoutes = express.Router();

// Send understandable errors without exposing database details.
function handleError(res, err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).json({ message: err.message });
    }
    console.error('Notes API error:', err.message);
    return res.status(500).json({ message: 'Database operation failed' });
}

function getContent(req) {
    const content = req.body?.content;
    return content && typeof content === 'object' && !Array.isArray(content) ? content : null;
}

// CREATE: POST /notes
noteRoutes.post('/notes', async (req, res) => {
    const content = getContent(req);
    if (!content || Object.keys(content).length === 0) {
        return res.status(400).json({ message: 'Note content can not be empty' });
    }
    try {
        const note = new Note(content);
        const savedNote = await note.save();
        return res.status(201).json(savedNote);
    } catch (err) {
        return handleError(res, err);
    }
});

// READ ALL: GET /notes (no request body is needed)
noteRoutes.get('/notes', async (req, res) => {
    try {
        return res.status(200).json(await Note.find());
    } catch (err) {
        return handleError(res, err);
    }
});

// READ ONE: GET /notes/:noteId
noteRoutes.get('/notes/:noteId', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.noteId)) {
        return res.status(400).json({ message: 'Invalid note ID' });
    }
    try {
        const note = await Note.findById(req.params.noteId);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        return res.status(200).json(note);
    } catch (err) {
        return handleError(res, err);
    }
});

// UPDATE: PUT /notes/:noteId
noteRoutes.put('/notes/:noteId', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.noteId)) {
        return res.status(400).json({ message: 'Invalid note ID' });
    }
    const content = getContent(req);
    if (!content || Object.keys(content).length === 0) {
        return res.status(400).json({ message: 'Note content can not be empty' });
    }
    // Only update fields belonging to the Note model.
    const changes = {};
    for (const field of ['noteTitle', 'noteDescription', 'priority', 'dateUpdated']) {
        if (Object.hasOwn(content, field)) changes[field] = content[field];
    }
    if (Object.keys(changes).length === 0) {
        return res.status(400).json({ message: 'No valid fields supplied for update' });
    }
    changes.dateUpdated ||= new Date().toISOString().slice(0, 10);
    try {
        const note = await Note.findByIdAndUpdate(req.params.noteId, { $set: changes }, {
            new: true, // Return the updated note.
            runValidators: true
        });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        return res.status(200).json(note);
    } catch (err) {
        return handleError(res, err);
    }
});

// DELETE: DELETE /notes/:noteId
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.noteId)) {
        return res.status(400).json({ message: 'Invalid note ID' });
    }
    try {
        const note = await Note.findByIdAndDelete(req.params.noteId);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        return res.status(200).json({ message: 'Note deleted successfully', note });
    } catch (err) {
        return handleError(res, err);
    }
});

module.exports = noteRoutes;
