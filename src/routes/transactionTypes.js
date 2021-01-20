const transactionTypesRouter = require('express').Router();
const { addTransactionType } = require('../controllers/transactionTypes');

transactionTypesRouter.route('/')
    .post(addTransactionType);

module.exports = transactionTypesRouter;
