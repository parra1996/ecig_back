require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db.js');


const PORT = process.env.PORT || 5000;

const router = require('./router');

let corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(express.json()); 
app.use(cors(corsOptions)); 
app.use(router);


db.then(()=>{
    app.listen(PORT, ()=> console.log(`Server on port ${PORT}`)); 
})
.catch((err)=> console.log(err.message));   