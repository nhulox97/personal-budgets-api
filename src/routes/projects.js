const projectsRouter = require('express').Router();
const { 
    addProject,
    getProjects
} = require('../controllers/projects');

projectsRouter.route('/')
    .get(getProjects)
    .post(addProject);

module.exports = projectsRouter;
