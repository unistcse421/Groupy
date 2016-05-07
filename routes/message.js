/**
 * Created by Taehyun on 2016-05-05.
 */
var
    express = require('express'),
    router  = express.Router(),
    db      = require('../db'),
    c       = db.connection,
    query   = db.query.message;


/**
 * Message API Routes
 */
router.get("/:id", function(req, res) {
    c.query(query.selectById(req.params), (err, result) => {
        if(err) res.error(err);
        res.json(result);
    });
});

module.exports = router;