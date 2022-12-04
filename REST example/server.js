const express = require('express') // import express framework into express object, access framework thru this obj
const app = express() // start up an express instance - contains all the endpoints we'll define
const port = 3000 // by default port is 80 (occupied by normal http traffic)
                //if you deploy this code on aws or digital ocean, etc. will need it to be 80

// service just event handler that handles incoming requests
// everything in node.js is an object

app.use(express.json()) // for parsing message bodies, particularly application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// event handlers
// this is where the api defn comes in/important 
// if i know my app will need to handle timestamp, form submit, etc. - define endpoints u want for ur app
// post, push, get most common http requests done in rest api
// theres a message type specified in the http message

// ex. uber, on the app ur going to uber.com and requesting avail drivers, will pass in ur location and do a http get req

// define the default error handler
app.use (function (error, request, response, next){
    console.error("WARNING: error detected...")
    console.error(error.stack)
    response.status(500).send("Error handling request: " + error.message)
});

// handler for a receved HTTP GET request
// '/' root domain - home page
// define what the root endpoint is going to be ('/')
app.get('/', (request, response) => {
    console.log('request body:', request.body); // print out message body of the request
    return response.send('Received a GET HTTP request'); // return back the response
});

// handler for a receved HTTP POST request
app.post('/', (request, response) => {
    console.log('request body:', request.body);
    return response.send('Received a POST HTTP request');
});

// handler for a receved HTTP POST request at endpoint /json
// push info up
app.post('/json', (request, response) => {
    console.log('request body:', request.body);
    // echo back the received JSON data
    response.json(request.body)
});

// handler for a receved HTTP GET request at endpoint /json
// requesting json message
// when you go to whatever.com/json, this function is going to execute
// get info back
app.get('/json', (request, response) => {
    console.log('request body:', request.body);
    // create a JSON message to send
    data = {timestamp: Date.now(), message: "Hello world!" }
    response.json(data)
});

// handler for a receved HTTP PUT request
app.put('/', (request, response) => {
    console.log('request body:', request.body)
    return response.send('Received a PUT HTTP request');
});

// handler for a receved HTTP DELETE request
app.delete('/', (request, response) => {
    console.log('request body:', request.body)
    return response.send('Received a DELETE HTTP request');
});

// handler for application start
app.listen(port, () =>
    console.log("Example app listening on port " + port)
);

