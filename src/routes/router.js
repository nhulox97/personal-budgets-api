const router = require("express").Router();

router.get('/', (_, res) => {
    res.send({
        msg: 'Welcome to wazunga-blog-api'
    })
});

module.exports = {
    routes: router
}
