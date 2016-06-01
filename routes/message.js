/**
 * Created by kimxogus on 2016-05-05.
 */
var
    routeResolver  = require('./routeResolver'),
    router  = require('express').Router(),
    
    db      = require('../db'),
    c       = db.connection,
    query   = db.query.message;

router.use(routeResolver);

/**
 * Message API Routes
 */
router.get("/:id", function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        c.query(query.selectById(req.params), (err, result) => {
            if (err) res.error(err);
            if (result.length == 0) {
                res.status(404).send("Message " + req.params.id + " does not exists.");
            } else {
                res.json(result);
            }
        });
    }
});

module.exports = router;