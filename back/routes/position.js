var express = require('express');
var router = express.Router();

var position_controller = require('../controllers/position');

var fileUpload = require('../middlewares/fileUpload')

router.use(function (req, res, next) {
    res.set('content-type', 'application/json; charset=utf8');
    next()
})

/* GET home page. */
router.get('/list', position_controller.list);

router.post('/save', fileUpload, position_controller.save);

router.get('/listone', position_controller.listone);

router.post('/update', fileUpload, position_controller.update);

router.post('/update_no', position_controller.update);

router.get('/remove', position_controller.remove);


module.exports = router;
