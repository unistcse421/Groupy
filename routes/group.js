/**
 * Created by Taehyun on 2016-05-05.
 */
var
    express = require('express'),
    router  = express.Router(),
    db      = require('../db'),
    c       = db.connection,
    query   = db.query;


/**
 * Group API Routes
 */
router.get("/", function(req, res) {
    c.query(query.group.selectAll(), (err, result) => {
        if(err) res.error(err);
        res.json(result);
    });
});

router.get("/:id", function(req, res) {
    c.query(query.group.selectById(req.params), (err, result) => {
        if(err) res.error(err);
        res.json(result);
    });
});

router.get("/page/:page", function(req, res) {
    c.query(query.message.selectByPage(req.params), (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).send(err);
        }
        res.json(result);
    });
});
router.get("/page/:page", function(req, res) {
    c.query(query.message.selectByPage(req.params), (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).send(err);
        }
        res.json(result);
    });
});

module.exports = router;