// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
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
app.get('/all', (req, res) => {
    res.send(projectData);
});

//POST route - my method
// app.post('/add', (req, res) => {
    
//     projectData = {
//         temperature: req.body.temp,
//         date: req.body.date,
//         userInput: req.body.userInput
//     };

//     res.send(projectData);
//     console.log(projectData);
// })

//POST route - mentor method
app.post('/add', (req, res) => {

    console.log(req.body)
    projectData = {
        temp: req.body.temperature,
        date: req.body.date,
        userInput: req.body.userInput 
    };
    console.log(projectData);
    res.send(projectData);
    })

app.get('/test', (req,res)=>{
    res.send("Hi, the server is working 21:24")
})

