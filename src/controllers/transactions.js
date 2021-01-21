const Transaction = require("../models/transactions");
const {
    successResponse,
    badResponse,
    notFoundResponse,
    internalServerErrorResponse
} = require("../utils/reponseHandler");
const { validationError } = require('../utils/mongooseErrorsHandler');

/** Obtener todas los transacciones
 * @param {Request} req
 * @param {Response} res
 */
exports.getTransactions = function(req, res) {
    Transaction.find((err, transactions) => {
        if (err)
            return internalServerErrorResponse(res, err);
        if (transactions.length < 1)
            return notFoundResponse(res, 'Transactions');
        return successResponse(res, transactions);
    });
}


/** Para agregar un tipo de transaccion se reciben las propiedades
 * de este atraves del body.
 * @param {Request} req
 * @param {Response} res
 */
exports.addTransaction = function(req, res) {
    const transaction = req.body;
    Transaction.create(transaction, (err, nTransaction) => {
        if (err) {
            const error = validationError(err);
            return badResponse(res, error);
        }
        return successResponse(res, nTransaction);
    }) 
}

