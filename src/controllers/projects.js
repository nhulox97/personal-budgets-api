const Project = require('../models/projects');
const {
    successResponse,
    badResponse,
    notFoundResponse,
    internalServerErrorResponse
} = require('../utils/reponseHandler');
const { validationError } = require('../utils/mongooseErrorsHandler');
const { findRegisterById } = require('../utils/mongooseQueryHandler');

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

/** Actualizar un project, es necesario que en req.body se envie la propiedad
 * project_id, de lo contrario no se podra ejecutar la funcion update
 * @param {Request} req
 * @param {Response} res
 */
exports.updateProject = async function(req, res) {
    const nProject = req.body;
    // Verificar si el req.body contiene las propiedades del project
    if (Object.keys(nProject).length <= 1 || nProject.constructor === {})
        return badResponse(res, { project: { 
            msg: 'No fueron enviados los parametros necesarios' } 
        });
    const { _id } = nProject;
    // Verificar si el id del project fu enviado
    if (!_id)
        return badResponse(res, { _id: {
            msg: 'No se recibio el id del project' 
        } });
    const projectExists = await findRegisterById(Project, _id);
    // Verificar si el project existe
    if (!projectExists)
        return notFoundResponse(res, `Project -> ${_id}`);
    // Adding updating date
    nProject.project_updated_at = new Date();
    Project.findByIdAndUpdate(_id, nProject, { new: true }, (err, result) => {
        if (err)
            return internalServerErrorResponse(res, err);
        // Enviar el project actualizado
        return successResponse(res, result);
    });
}

/** Eliminar un project, es necesario que en req.body se envie la propiedad
 * project_id, de lo contrario no se podra ejecutar la funcion delete.
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteProject = async function(req, res) {
    const project = req.body;
    const { _id } = project;
    // Verificar si el id del project fu enviado
    if (!_id)
        return badResponse(res, { _id: { msg: 'No se recibio el id del project' } });
    const projectExists = await findRegisterById(Project, _id);
    // Verificar si el project existe
    if (!projectExists)
        return notFoundResponse(res, `Project -> ${_id}`);
    project.project_status = false;
    Project.findByIdAndUpdate(_id, project, { new: true }, (err, result) => {
        if (err)
            return internalServerErrorResponse(res, err);
        console.log(result);
        // Enviar el project se ha eliminado
        return successResponse(res, result);
    });
}
