/**
 * Created by kimxogus on 2016-05-05.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;