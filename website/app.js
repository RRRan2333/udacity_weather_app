import { response } from "express";

/* Global Variables */
let baseURL = 'api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid=';
let apiKey = '70deec56cd857531f08dd8699518fcb8';
const newZipcode = ''; //doc get Element by ID or sth. 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//Async POST
const postData = async (url = '', data = {}) =>{

    const res = await fetch(url, {
        method: 'POST',
        crodentials: 'same-origin',
        headers: {
            'Content-Type': 'applicaiton/json',
        },
        body: JSON.stringify(data),
    });

    try{
        const newData = await res.json();
        return newData;
    }catch(error){
        console.log('error', error);
    }
};

//Async GET
const retrieveData = async (url='') => {
    const req = await fetch(url); 
    try {
        //transform into JSON
        const allData = await req.json();
    }catch(error){
        console.log('error', error);
    }
}

//Chain async functions to do stuff
// Features
// 1: gather everything from HTML after "generate" (zipcode & feeling).
// 2: GET weather via API with zipcode. 
// 3: PUSH full post (object) to server.js
// 4: GET full post (object) and update to HTML/UI.
updateUI = () => {
    console.log('updateUI function triggered');
    
}