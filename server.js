// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port,() => {
    console.log(`running on localhost: ${port}`);
});

// GET route
app.get('/receive', (req, res) => {
    res.send(projectData);
});

//POST route
app.post('/add', (req, res) => {
    res.send('POST received');
})

// POST and update
const data = [];
app.post('/update', (req, res) => {
    data.push(req.body);
})