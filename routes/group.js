/**
 * Created by kimxogus on 2016-05-05.
 */
var
    routeResolver  = require('./routeResolver'),
    router  = require('express').Router(),
    
    db      = require('../db'),
    c       = db.connection,
    query   = db.query,
    
    registerGroup = require('../facebook/group/registerGroupAndSaveMessages');


router.use(routeResolver);

/**
 * Group API Routes
 */
router.get("/", function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        c.query(query.group.selectAllWithNumberOfPosts(), (err, result) => {
            if (err) {
                console.error(err);
                res.error(err);
            } else {
                res.json(result);
            }
        });
    }
});

router.put("/:id", function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        c.query(query.group.selectById(req.params), (err, result)=> {
            if (err) {
                res.error(err);
            } else {
                c.query("SELECT count(1) AS cnt FROM message WHERE group_id=:id", req.params, (err, messages)=> {
                    if (err) res.error(err);
                    if (result.length > 0 && messages.length > 0) {
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
            }
        });
    }
});

router.get("/:id", function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        c.query(query.group.selectById(req.params), (err, result) => {
            if (err) {
                res.error(err);
            } else if (result.length == 0) {
                res.status(404).send("Group " + req.params.id + " is not registered or does not exists.");
            } else {
                res.json(result);
            }
        });
    }
});

router.get("/:group_id/page/:page", function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        var params = Object.assign(req.params, req.query);
        c.query(query.message.selectByGroupIdPage(params), (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else if (!result) {
                res.json([]);
            } else {
                res.json(result);
            }
        });
    }
});

router.get("/:group_id/hashtag", function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        var params = Object.assign(req.params, req.query);
        c.query(query.messageHashtagRelation.selectByGroupId(params), (err, result) => {
            if(err) {
                console.error(err);
                res.status(500).send(err);
            } else if (!result) {
                res.json([]);
            } else {
                res.json(result);
            }
        })
    }
});

module.exports = router;
