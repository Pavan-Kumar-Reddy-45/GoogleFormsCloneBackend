import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

// Define the structure of the submission
interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

// Initialize Express app
const app = express();
const port = 3000;

// Use bodyParser middleware
app.use(bodyParser.json());

// Path to the JSON file
const dbPath = path.join(__dirname, '../db.json');

// Endpoint to check server status
app.get('/ping', (req: Request, res: Response) => {
    res.json(true);
});

// Endpoint to submit a new form
app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    
    // Validate input
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newSubmission: Submission = { name, email, phone, github_link, stopwatch_time };

    // Read the current submissions from the file
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read database.' });
        }

        let submissions: Submission[] = [];
        if (data) {
            submissions = JSON.parse(data);
        }

        // Add the new submission
        submissions.push(newSubmission);

        // Write the updated submissions back to the file
        fs.writeFile(dbPath, JSON.stringify(submissions, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write to database.' });
            }

            res.status(201).json({ message: 'Submission saved successfully.' });
        });
    });
});

// Endpoint to read a specific submission
app.get('/read', (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string);

    if (isNaN(index) || index < 0) {
        return res.status(400).json({ error: 'Invalid index.' });
    }

    // Read the current submissions from the file
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read database.' });
        }

        let submissions: Submission[] = [];
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
