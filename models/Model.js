const mongoose = require('mongoose');
const subprojectSchema=require('../models/SubProjectSchema')
require('dotenv').config();

mongoose.connect(process.env.DB_URL)
.then((connect)=>console.log("database successfully connected"))
.catch((err)=>console.log("error in connecting datatbase"))


const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subprojects: [subprojectSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
