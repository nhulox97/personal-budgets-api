const router = require('express').Router();
const transactionTypesRouter = require('./transactionTypes');
const transactionsRouter = require('./transactions');
const projectRouter = require('./projects');

router.get('/', (_, res) => {
    res.send({
        msg: 'Welcome to api'
    })
});

module.exports = {
    routes: router,
    transactionTypesRoutes: transactionTypesRouter,
    transactionsRoutes: transactionsRouter,
    projectRoutes: projectRouter
}
