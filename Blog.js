/* const mongoose = require('./db');

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    startDate: Date,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;*/

const mongoose = require('./db');

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;


