const express = require('express');
const app = express();
const port = 5000;

//allow cors
const cors = require('cors');
app.use(cors());

app.use(express.json());    //This need to be above any routes that will use req.body

require('dotenv').config();
const Project = require('./Project');
const Blog = require('./Blog');

app.get('/', (req, res) => {
    res.send('Hello, World from Shehan!');
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/blogs', async (req, res) => { 
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//create an endpoint for creating a new project
app.post('/projects', async (req, res) => {
    
    console.log(req.body);  //This will print the request body in the console   
    //res.send('Received the request, Creating a porject');
    
    const project = new Project({
        name: req.body.name,
        description: req.body.description,      
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Give a sample requset JSON for creating a project
/*project = {
    "name": "AI research project",
    "description": "This is a AI and ML project"
};*/

//create a end point for updataing project by id using PATCH method
app.patch('/projects/:id', async (req, res) => {
    //console.log(req.params.id);  //This will print the request body in the console  
    try {
        const project = await Project.findById(req.params.id);
        if (req.body.name) {
            project.name = req.body.name;
        }
        if (req.body.description) {
            project.description = req.body.description;
        }
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (err) {
        res.status(404).json({ message: err.message });
    } 
});

//Delete a project by id

app.delete('/projects/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
