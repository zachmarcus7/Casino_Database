/********************************************
* Controller for dealer_search page. Handles
* all incoming requests for this page and 
* uses the associated model class to retrieve
* required data from MySQL.
*********************************************/


module.exports = function () {
    var modelSource = require('./models/dealer_search.js');
    var model = Object.create(modelSource.dealerSearch);
    var express = require('express');
    var router = express.Router();


    /* Base router get handle for the dealer_search page
     * Input:   get data from web page
     * Output:  page rendering data
     */
    router.get('/', function (req, res) {
        // initialize context variable to bind to view, callback to make sure model worked correctly
        let callbackCount = 0;
        let context = {};

        // add static pages to the context for data binding
        context.jsscripts = ["dealer_search.js"];
        context.cssstyles = ["stylesheet.css"];

        // use the model to get data from mysql
        let mysql = req.app.get('mysql');
        if (req.query.callType == "search") {
            model.search(res, mysql, req);
        }
        else{
            model.getTable(res, mysql, context, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('dealer_search', context);
            }
        }
    });

    return router;
}();

