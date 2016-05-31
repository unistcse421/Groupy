/**
 * Created by kimxogus on 2016-05-04.
 */
import './app'
import './ctrl/RootCtrl'
import '../../../semantic/dist/semantic'
import '../../../semantic/dist/semantic.css'
import '../css/style.sass'

let { angular, $, app } = global;

app.config(require('./routes'));

$(document).ready(function() {
    angular.bootstrap(document, ['app']);

    $("#content-wrapper").css({
        "padding-left": $("#sidebar").width()
    });
});
