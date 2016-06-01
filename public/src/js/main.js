/**
 * Created by kimxogus on 2016-05-04.
 */
import './app'
import './ctrl/RootCtrl'
import '../../../semantic/dist/semantic'
import '../../../semantic/dist/semantic.css'
import '../css/style.sass'
import '../css/sidebar.css'

let { angular, $, app } = global;

app.config(require('./routes'));

$(document).ready(function() {
    angular.bootstrap(document, ['app']);

    $("#mobile-sidebar")
        .sidebar('attach events', '.toc.item')
    ;

    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width > 700) {
        $("#sidebar").addClass('visible');
	$("#mobile-sidebar").sidebar('hide');
    }
    else {
        $("#sidebar").removeClass('visible');
    }
});
