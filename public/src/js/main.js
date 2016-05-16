/**
 * Created by kimxogus on 2016-05-04.
 */

import './app'
import '../../../semantic/dist/semantic.min'
import '../../../semantic/dist/semantic.min.css'
import '../css/style.sass'

let { angular, $, app } = global;


$(document).ready(function() {
    angular.bootstrap(document, ['app']);

    $("#content-wrapper").css({
        "padding-left": $("#sidebar").width()
    });
});
