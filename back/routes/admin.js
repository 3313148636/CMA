var express = require('express');
var router = express.Router();

var admin_controller = require('../controllers/admin');

var fileUpload = require('../middlewares/fileUpload')

router.use(function (req, res, next) {
    res.set('content-type', 'application/json; charset=utf8');
    next()
})

/* GET home page. */
router.post('/registe', admin_controller.registe);
router.post('/login', admin_controller.login);


module.exports = router;
