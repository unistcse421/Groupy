/**
 * Created by kimxogus on 2016-05-05.
 */
var router  = require('./router');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;