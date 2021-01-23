const Transaction = require('../models/transactions');
const {
    successResponse,
    badResponse,
    notFoundResponse,
    internalServerErrorResponse
} = require('../utils/reponseHandler');
const { validationError } = require('../utils/mongooseErrorsHandler');
const { findRegisterById } = require('../utils/mongooseQueryHandler');

/** Obtener el total de los gastos de las transactions de un project
 * @param {Array} transactions
 * @returns {Array} [count, gastos]
 */
function getGastos(transactions) {
    let gastos = 0;
    let count = 0;
    transactions.forEach((transaction, _) => {
        if(transaction.transaction_type.transaction_type_name === 'Gasto') {
            gastos += transaction.transaction_amount; 
            count++;    
        }
    });
    return [count, gastos];
}

/** Obtener el total de los ingresos de las transactions de un project
 * @param {Array} transactions
 * @returns {Array} [count, ingresos]
 */
function getIngresos(transactions) {
    let ingresos = 0; 
    let count = 0;
    transactions.forEach((transaction, _) => {
        if(transaction.transaction_type.transaction_type_name === 'Ingreso') {
            ingresos += transaction.transaction_amount;
            count++
        }
    });
    return [count, ingresos];
}


/** Obtener todas los transacciones
 * @param {Request} req
 * @param {Response} res
 */
exports.getTransactions = function(req, res) {
    const { project } = req.query;
    Transaction.find({ 
        project: `${project}`, 
        transaction_status: { $ne: false } 
    }, (err, transactions) => {
        if (err)
            return internalServerErrorResponse(res, err);
        if (transactions.length < 1)
            return notFoundResponse(res, 'Transactions');
        const [countIngresos, ingresos] = getIngresos(transactions);
        const [countGastos, gastos] = getGastos(transactions);
        return successResponse(res, { 
            transactions, 
            gastos,
            countGastos,
            ingresos,
            countIngresos
        });
    });
}

/** Para agregar una transaccion se reciben las propiedades
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
    }); 
}

/** Actualizar un transaction, es necesario que en req.body se envie la propiedad
 * transaction_id, de lo contrario no se podra ejecutar la funcion update
 * @param {Request} req
 * @param {Response} res
 */
exports.updateTransaction = async function(req, res) {
    const nTransaction = req.body;
    // Verificar si el req.body contiene las propiedades del transaction
    if (Object.keys(nTransaction).length <= 1 
        || nTransaction.constructor === {})
        return badResponse(res, { transaction: { 
            msg: 'No fueron enviados los parametros necesarios' } 
        });
    const { _id } = nTransaction;
    // Verificar si el id del transaction fu enviado
    if (!_id)
        return badResponse(res, { _id: {
            msg: 'No se recibio el id del transaction' 
        } });
    const transactionExists = await findRegisterById(Transaction, _id);
    // Verificar si el transaction existe
    if (!transactionExists)
        return notFoundResponse(res, `Transaction -> ${_id}`);
    // Adding updating date
    nTransaction.transaction_updated_at = new Date();
    Transaction.findByIdAndUpdate(
        _id, 
        nTransaction, 
        { new: true }, 
        (err, result) => {
            if (err)
                return internalServerErrorResponse(res, err);
            // Enviar el transaction actualizado
            return successResponse(res, result);
        }
    );
}

/** Eliminar un transaction, es necesario que en req.body se envie la propiedad
 * transaction_id, de lo contrario no se podra ejecutar la funcion delete.
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteTransaction = async function(req, res) {
    const transaction = req.body;
    const { _id } = transaction;
    // Verificar si el id del transaction fu enviado
    if (!_id)
        return badResponse(res, { _id: { 
            msg: 'No se recibio el id del transaction' } 
        });
    const transactionExists = await findRegisterById(Transaction, _id);
    // Verificar si el transaction existe
    if (!transactionExists)
        return notFoundResponse(res, `Transaction -> ${_id}`);
    transaction.transaction_status = false;
    Transaction.findByIdAndUpdate(
        _id, 
        transaction, 
        { new: true }, 
        (err, result) => {
            if (err)
                return internalServerErrorResponse(res, err);
            // Enviar el transaction se ha eliminado
            return successResponse(res, result);
        }
    );
}
