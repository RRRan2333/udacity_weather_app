// import { response } from "express";

/* Global Variables */
let baseURL1 = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let baseURL2 = ',us&units=metric&appid=';
let apiKey = '70deec56cd857531f08dd8699518fcb8';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//Async POST to local server
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
        console.log(newData);
        console.log('postData() run till completion (probably)');
        return newData;
    }catch(error){
        console.log('error', error);
    }
};

//Async GET weather from Openweathermap API
const getWeather = async (url = '') => {
    console.log('getWeather triggered');

    const res = await fetch(url)
    try{
        const data = await res.json();
        console.log(` data: ${data}, ${data.main.temp}`);
        return data;
    }catch(error){
        console.log('error',error);
    }
};

const updateUI = async () => {
    // fetch data saved on server.js, 'projectData' 
    const req = await fetch('/all');
    try{
        const allData = await req.json();
        console.log(allData);
        //update UI
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('content').innerHTML = allData[0].userInput;
        
        console.log('updateUI completed');
    }catch(error){
        console.log("error", error)
    }
}

//Chain async functions to do stuff
// Features
// 1: gather everything from HTML after "generate" (zipcode & feeling)
// 2: GET weather via API with zipcode
// 3: PUSH full post (object) to server.js
// 4: GET full post (object) & Update HTML/UI
const runApp = () => {
    // console.log('runApp function triggered');
    //1. gather user text input
    const newZipcode = document.getElementById('zip').value;
    const newFeeling = document.getElementById('feelings').value;
    // console.log(newZipcode);
    // console.log(newFeeling);

    //2. get weather from API
    let apiLink = baseURL1 + newZipcode + baseURL2 + apiKey;
    console.log(apiLink);

    getWeather(apiLink)
    //3. PUSH full post to server.js
    .then(data => {
        console.log(`received data from getWeather(). Temperature is ${data.main.temp} C`);
        const newEntry = {
            temperature: data.main.temp, 
            date: newDate,
            userInput: newFeeling
        };
        postData('/add', newEntry);
    })
    .then(updateUI());
}

document.getElementById('generate').addEventListener('click', runApp);