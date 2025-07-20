
const express=require('express')
const color=require('colors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const db = require('./config/db');
const cors=require('cors');
const ejsLayouts = require('express-ejs-layouts');

 // Set default layout




// config dotenv
dotenv.config();  //if env is in other folder the make there object inside the braces ({path:''})


// rest object
const app =express();
app.set('view engine', 'ejs');
const path = require('path');
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs'); //set the view engine to ejs
path.join(__dirname, 'views')
app.use(express.json());//if json data come then perfectly worl\k through this line
app.use(morgan('dev'));//here call morgan ans use dev method
// this morgon give the information that u hit the api as u can see the result in terminal below the text
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/api/v1/student',require("./routes/studentsRoutes"))

app.use('/api/v1/auth', require('./routes/authStudentRoute'));


app.get('/test',(req,res)=>{
    
})

// when u want to run ur application then define port 
const port=process.env.PORT || 8000 ;//our port number is confidential so when u install env package then u secure through env package.






// conditionally listen
app.listen(port,()=>{
    console.log(`Server running on port ${process.env.PORT}`.bgYellow.black)
});


