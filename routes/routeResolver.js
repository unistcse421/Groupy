/**
 * Created by Taehyun on 2016-05-16.
 */

function routeResolver(req, res, next) {
    req.isAPIRequest = !req.headers['x-api-request'];
    res.renderLayout = function() {
        res.render('index');
    };

    next();
}

module.exports = routeResolver;