/**
 * Created by Taehyun on 2016-05-16.
 */
var
    express = require('express'),
    router = express.Router();

router.use(function (req, res, next) {
    if(!req.headers['x-api-request']) {
        res.json = function() {
            res.render('index');
        };
    }

    next();
});

module.exports = router;