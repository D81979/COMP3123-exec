const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read your private .env file (Node.js 22+). Never upload .env to GitHub.
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    process.loadEnvFile(envPath);
}

const noteRoutes = require('./routes/NoteRoutes');
const DB_URL = process.env.DB_URL;
const PORT = Number(process.env.PORT || 5050);

const app = express();
app.use(express.json()); // Let Express read JSON sent from Postman.
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Note taking application - Week06 Exercise</h1>');
});

app.use('/', noteRoutes); // Connect all five /notes endpoints.

// Show useful errors for invalid JSON and unknown URLs.
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON request body' });
    }
    console.error('Request error:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
});
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Connect first; start listening only after MongoDB is ready.
if (!DB_URL || !/^mongodb(\+srv)?:\/\//.test(DB_URL)) {
    console.error('DB_URL is missing or invalid. Check Exercise06/.env.');
    process.exit(1);
}
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    console.error('PORT must be a number from 1 to 65535.');
    process.exit(1);
}

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Could not connect to MongoDB:', err.message);
        process.exit(1);
    });
