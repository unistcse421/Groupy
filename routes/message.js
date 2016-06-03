/**
 * Created by kimxogus on 2016-05-05.
 */
var
    Q = require('q'),
    routeResolver  = require('./routeResolver'),
    router  = require('express').Router(),
    
    db      = require('../db'),
    c       = db.connection,
    query   = db.query.message,

    FB = require("../facebook").FB;

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

router.get("/validate/:id", function(req, res) {
    if(req.isAPIRequest) {
        res.renderLayout();
    } else {
        var id = req.params.id;
        FB.api('/' + id, 'GET', {
            fields: "id"
        }, (data) => {
            Q.Promise((resolve, reject)=> {
                if(!data.id || data.error && data.error.code === 100) {
                    reject(id);
                } else {
                    resolve();
                }
            })
                .catch(id=>
                    Q.Promise((resolve, reject)=>{
                        c.query(query.deleteById({id}), (err)=>{
                            if(err) reject(err);
                            else {
                                console.log(id + " is deleted");
                                resolve();
                            }
                        });
                    })
                        .catch(err=>console.error(err))
                )
                .then(()=>{
                    res.json({
                        msg: "success"
                    });
                })
                .catch(()=>{
                    res.json({
                        msg: "error"
                    })
                });
        });
    }
});

module.exports = router;