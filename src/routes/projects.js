const projectsRouter = require('express').Router();
const { 
    addProject,
    getProjects,
    updateProject,
    deleteProject
} = require('../controllers/projects');

projectsRouter.route('/')
    .get(getProjects)
    .post(addProject)
    .put(updateProject)
    .delete(deleteProject);

module.exports = projectsRouter;
