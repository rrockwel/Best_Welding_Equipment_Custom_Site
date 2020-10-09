const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const app = express();
const bodyParser = require('body-parser');




// Set view engine as ejs
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

// Set Up Body Parser
app.use(bodyParser.urlencoded({ extended : true}))

// Set to use routes file for routing
app.use(routes);

// Set static folder
app.use(express.static("public"));



// Declare port
let PORT = process.env.PORT || 3000;


// Start server on port 
app.listen(PORT, ()=>{
	console.log(`Server started on port ${PORT}`)
})

