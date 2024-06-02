const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectrouter=require('./controllers/projects')
const app = express();
const port=8080;

app.use(cors());



app.use(bodyParser.json());
app.use(cors());


app.use('/projects',projectrouter)

app.listen(port,()=>{console.log("listening on port 3000")})