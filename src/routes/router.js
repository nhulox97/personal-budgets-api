const router = require("express").Router();

router.get('/', (_, res) => {
    res.send({
        msg: 'Welcome to api'
    })
});

module.exports = {
    routes: router
}

