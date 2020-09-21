const express = require('express');
const path = require('path');
const routes = require('./routes/index')

const app = express();

// Set view engine as ejs
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

// Set static folder
app.use(express.static(path.join(__dirname,"public")));

// Set to use routes file for routing
app.use(routes);

// Declare port
let PORT = 3000;


// Start server on port 
app.listen(PORT, ()=>{
	console.log(`Server started on port ${PORT}`)
})