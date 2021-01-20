/** Buscar un registro dentro de una coleccion, es necesario enviar un 
 * Mongoose.Model para poder hacer la busqueda mediante el id de un registro
 * del mismo.
 * @param {any} Model: Mongoose Model para buscar el registro en la coleccion
 * @param {String} id: ID del registro 
 * @returns {Boolean}
 */
exports.findRegisterById = async function(Model, id) {
    const exists  = await Model.findById(id); 
    return exists ? true : false;
}

/** Buscar un registro dentro de una coleccion, es necesario enviar un 
 * Mongoose.Model para poder hacer la busqueda mediante el field y el value 
 * de un registro del mismo.
 * @param {any} Model: Mongoose Model para buscar el registro en la coleccion
 * @param {String} field: field a buscar 
 * @param {String} value: value a buscar 
 * @returns {Boolean}
 */
exports.findRegisterByField = async function(Model, field, value) {
    const exists = await Model.findOne({ [field]: `${value}` });
    return exists ? true : false;
}
