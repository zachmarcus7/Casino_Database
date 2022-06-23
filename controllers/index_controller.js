/********************************************
* Controller for the index page. Handles
* all incoming requests for this page.
*********************************************/


module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/',function(req,res,next){
        var context = {};
        context.cssstyles = ["stylesheet.css"];
        res.render('index', context);
    });

    return router;
}();

