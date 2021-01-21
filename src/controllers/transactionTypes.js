const TransactionType = require('../models/transactionTypes');
const {
    successResponse,
    badResponse,
    notFoundResponse,
    internalServerErrorResponse
} = require('../utils/reponseHandler');
const { validationError } = require('../utils/mongooseErrorsHandler');

/** Obtener todas los transacciones
 * @param {Request} req
 * @param {Response} res
 */
exports.getTransactionTypes = function(req, res) {
    TransactionType.find((err, transactionTypes) => {
        if (err)
            return internalServerErrorResponse(res, err);
        if (transactionTypes.length < 1)
            return notFoundResponse(res, 'TransactionTypes');
        return successResponse(res, transactionTypes);
    });
}

/** Para agregar un tipo de transaccion se reciben las propiedades
 * de este atraves del body.
 * @param {Request} req
 * @param {Response} res
 */
exports.addTransactionType = function(req, res) {
    const transactionType = req.body;
    TransactionType.create(transactionType, (err, nTransactionType) => {
        if (err) {
            const error = validationError(err);
            return badResponse(res, error);
        }
        return successResponse(res, nTransactionType);
    }) 
}
