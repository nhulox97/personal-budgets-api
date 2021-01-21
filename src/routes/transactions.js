const transactionsRouter = require('express').Router();
const { 
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactions');

transactionsRouter.route('/')
    .get(getTransactions)
    .post(addTransaction)
    .put(updateTransaction)
    .delete(deleteTransaction);

module.exports = transactionsRouter;
