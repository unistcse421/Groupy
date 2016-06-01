/**
 * Created by kimxogus on 2016-05-05.
 */
var 
    routeResolver  = require('./routeResolver'),
    router  = require('express').Router();

router.use(routeResolver);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;