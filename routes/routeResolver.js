/**
 * Created by Taehyun on 2016-05-16.
 */

function routeResolver(req, res, next) {
    if(!req.headers['x-api-request']) {
        res.json = function() {
            res.render('index');
        };
    }

    next();
}

module.exports = routeResolver;