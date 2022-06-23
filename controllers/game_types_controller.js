/********************************************
* Controller for game_types page. Handles
* all incoming requests for this page and 
* uses the associated model class to retrieve
* required data from MySQL.
*********************************************/


module.exports = function () {
    var modelSource = require('./models/game_types.js');
    var model = Object.create(modelSource.gameTypes);
    var express = require('express');
    var router = express.Router();


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
    */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["script.js"];
        context.cssstyles = ["stylesheet.css"];
        var mysql = req.app.get('mysql');
       
        if (req.query.callType == "add") {
            model.addRow(mysql, req.query.name, req.query.description);
            res.end();
        } else {
            model.getTable(res, mysql, context, complete);
        }

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('game_types', context);
            }

        }
    });


    return router;
}();
