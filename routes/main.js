/**
 * Created by kimxogus on 2016-05-05.
 */
var 
    routeResolver  = require('./routeResolver'),
    router  = require('express').Router(),
    db      = require('../db'),
    c       = db.connection,
    query   = db.query;


router.use(routeResolver);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/ios/:uuid', function(req, res, next) {
    res.render('index');
});

/**
 * Push API Routes
 */
router.get('/push/ios/:uuid', function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        c.query(query.device.selectByUUID(req.params), (err, result) => {
            if (err) res.error(err);
            if (result.length == 0) {
                res.status(404).send("Device " + req.params.uuid + " does not exists.");
            } else {
                res.json(result);
            }
        });
    }
});

router.get('/push/keyword/ios/:uuid', function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        c.query(query.pushInfo.selectByUUID(req.params), (err, result) => {
            if (err) res.error(err);
            if (result.length == 0) {
                res.status(404).send("P " + req.params.uuid + " does not exists.");
            } else {
                res.json(result);
            }
        });
    }
});

router.put('/push/add/:push_keyword/:group_id/:hashtag/ios/:uuid', function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        c.query(query.pushInfo.insert(req.params), (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).send("Alarm add fail.");
            } else {
                res.json(result);
            }
        });
    }
});

router.put('/push/del/:push_keyword/:group_id/:hashtag/ios/:uuid', function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        c.query(query.pushInfo.delete(req.params), (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).send("Alarm del fail.");
            } else {
                res.json(result);
            }
        });
    }
});

router.put('/push/update/:flag/ios/:uuid', function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        c.query(query.device.update(req.params), (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(404).send("push_enabled updated error");
            } else {
                res.json(result);
            }
        });
    }
});

module.exports = router;
