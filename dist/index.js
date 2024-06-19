"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Initialize Express app
const app = (0, express_1.default)();
const port = 3000;
// Use bodyParser middleware
app.use(body_parser_1.default.json());
// Path to the JSON file
const dbPath = path_1.default.join(__dirname, '../db.json');
// Endpoint to check server status
app.get('/ping', (req, res) => {
    res.json(true);
});
// Endpoint to submit a new form
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    // Validate input
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    // Read the current submissions from the file
    fs_1.default.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read database.' });
        }
        let submissions = [];
        if (data) {
            submissions = JSON.parse(data);
        }
        // Add the new submission
        submissions.push(newSubmission);
        // Write the updated submissions back to the file
        fs_1.default.writeFile(dbPath, JSON.stringify(submissions, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write to database.' });
            }
            res.status(201).json({ message: 'Submission saved successfully.' });
        });
    });
});
// Endpoint to read a specific submission
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index);
    if (isNaN(index) || index < 0) {
        return res.status(400).json({ error: 'Invalid index.' });
    }
    // Read the current submissions from the file
    fs_1.default.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read database.' });
        }
        let submissions = [];
        if (data) {
            submissions = JSON.parse(data);
        }
        // Check if the requested index exists
        if (index >= submissions.length) {
            return res.status(404).json({ error: 'Submission not found.' });
        }
        res.json(submissions[index]);
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
