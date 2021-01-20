const router = require("express").Router();
const transactionTypesRouter = require("./transactionTypes");

router.get('/', (_, res) => {
    res.send({
        msg: 'Welcome to api'
    })
});

module.exports = {
    routes: router,
    transactionTypesRoutes: transactionTypesRouter
}
