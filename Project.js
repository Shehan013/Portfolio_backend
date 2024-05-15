const mongoose = require('./db');

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    startDate: Date,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

