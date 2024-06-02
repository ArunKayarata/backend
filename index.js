const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectrouter=require('../Backend/controllers/projects')


const app = express();


app.use(bodyParser.json());
app.use(cors());


app.use('/projects',projectrouter)

app.listen(3000,()=>{console.log("listening on port 3000")})