
const express=require('express')
const color=require('colors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const db = require('./config/db');
const cors=require('cors');



// config dotenv
dotenv.config();  //if env is in other folder the make there object inside the braces ({path:''})


// rest object
const app =express()
app.use(cors());
app.use(express.urlencoded({extended:false}));
// Middleware
app.use(express.json());//if json data come then perfectly worl\k through this line
app.use(morgan('dev'));//here call morgan ans use dev method
// this morgon give the information that u hit the api as u can see the result in terminal below the text



app.use('/api/v1/student',require("./routes/studentsRoutes"))

app.use('/api/v1/auth', require('./routes/authStudentRoute'));


app.get('/test',(req,res)=>{
    res.status(200).send('<h1>Node js Mysql app</h1>');
})

// when u want to run ur application then define port 
const port=process.env.PORT || 8000 ;//our port number is confidential so when u install env package then u secure through env package.






// conditionally listen
db.query('SELECT 1').then(()=>{  //SELECT 1 is used to start
    // mysql
    console.log('MYsql DB Connected'.bgCyan.white)
    // listen
app.listen(port,()=>{
    console.log(`Server running on port ${process.env.PORT}`.bgYellow.black)
});
}).catch((error)=>{
    console.log(error);
})


