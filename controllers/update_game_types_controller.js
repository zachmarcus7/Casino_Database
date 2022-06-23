/********************************************
* Controller for the update_game_types page. Handles
* all incoming requests for this page and 
* uses the associated model class to retrieve
* required data from MySQL.
*********************************************/

module.exports = function () {
    var model = require('./models/update_game_types.js');
    var express = require('express');
    var router = express.Router();


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
    */
    router.get('/', function(req, res){
        var context = {};
        context.jsscripts = ["script.js"];
        context.cssstyles = ["stylesheet.css"];
        var mysql = req.app.get('mysql');


        //check if update has been requested
        if (req.query.callType == "update"){
            model.updateRow(mysql, req);
        }

        model.getTable(res, mysql, context, req);
    });


    return router;
}();
