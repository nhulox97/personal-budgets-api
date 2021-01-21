const transactionsRouter = require('express').Router();
const { 
    addTransaction,
    getTransactions
} = require('../controllers/transactions');

transactionsRouter.route('/')
    .get(getTransactions)
    .post(addTransaction);

module.exports = transactionsRouter;
