const transactionTypesRouter = require('express').Router();
const { 
    addTransactionType,
    getTransactionTypes
} = require('../controllers/transactionTypes');

transactionTypesRouter.route('/')
    .get(getTransactionTypes)
    .post(addTransactionType);

module.exports = transactionTypesRouter;
