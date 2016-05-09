/**
 * Created by kimxogus on 2016-05-05.
 */
var
    express = require('express'),
    router  = express.Router(),
    
    db      = require('../db'),
    c       = db.connection,
    query   = db.query,
    
    registerGroup = require('../facebook/group/registerGroupAndSaveMessages');


/**
 * Group API Routes
 */
router.get("/", function(req, res) {
    c.query(query.group.selectAll(), (err, result) => {
        if(err) res.error(err);
        res.json(result);
    });
});

router.put("/:id", function(req, res) {
    c.query(query.group.selectById(req.params), (err, result)=>{
        if(err) res.error(err);
        if(result.length > 0) {
            res.json({
                message: "Group " + result[0].name + " is already registered."
            });
        } else {
            registerGroup(req.params.id)
                .then((result)=> {
                    res.json(result);
                })
                .catch(err=> {
                    res.error(err);
                });
        }
    });
});

router.get("/:id", function(req, res) {
    c.query(query.group.selectById(req.params), (err, result) => {
        if(err) res.error(err);
        if(result.length == 0) {
            res.status(404).send("Group " + req.params.id + " is not registered or does not exists.");
        } else {
            res.json(result);
        }
    });
});

router.get("/:group_id/page/:page", function(req, res) {
    c.query(query.message.selectByGroupIdPage(req.params), (err, result) => {
        if(err) {
            res.status(500).send(err);
        }
        if(result.length == 0) {
            res.status(404).send("Group " + req.params.group_id + " is not registered or does not exists.");
        } else {
            res.json(result);
        }
    });
});

module.exports = router;