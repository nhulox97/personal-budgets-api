const Project = require('../models/projects');
const {
    successResponse,
    badResponse,
    notFoundResponse,
    internalServerErrorResponse
} = require('../utils/reponseHandler');
const { validationError } = require('../utils/mongooseErrorsHandler');

/** Obtener todas los projects
 * @param {Request} req
 * @param {Response} res
 */
exports.getProjects = function(req, res) {
    Project.find({ project_status: { $ne: false } }, (err, projects) => {
        if (err)
            return internalServerErrorResponse(res, err);
        if (projects.length < 1)
            return notFoundResponse(res, 'Projects');
        return successResponse(res, projects);
    });
}

/** Para agregar un project se reciben las propiedades
 * de este atraves del body.
 * @param {Request} req
 * @param {Response} res
 */
exports.addProject = function(req, res) {
    const project = req.body;
    Project.create(project, (err, nProject) => {
        if (err) {
            const error = validationError(err);
            return badResponse(res, error);
        }
        return successResponse(res, nProject);
    }) 
}
