# Form Submission Backend Server

## Overview
This project is a backend server for handling form submissions. It is built with Express and TypeScript and uses a JSON file as a database. The server supports endpoints for saving and retrieving submissions.

## Endpoints
- **GET /ping:** Checks if the server is running.
- **POST /submit:** Submits a new form. Requires `name`, `email`, `phone`, `github_link`, and `stopwatch_time` in the body.
- **GET /read:** Retrieves a specific submission by index. Requires `index` as a query parameter.

## Requirements
- Node.js
- npm

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Pavan-Kumar-Reddy-45/GoogleFormsCloneBackend
    cd your-repo-name 
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

## Running the Server
To start the server in development mode:
```bash
npm start

## To build and run the server:
```bash
npm run build
npm run serve

## License
This project is licensed under the MIT License.

## Author
Bhavanam Pavan Kumar Reddy

