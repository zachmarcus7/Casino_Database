/********************************************
* Controller for dealers page. Handles
* all incoming requests for this page and 
* uses the associated model class to retrieve
* required data from MySQL.
*********************************************/


module.exports = function () {
    var modelSource = require('./models/dealers.js');
    var model = Object.create(modelSource.dealers);
    var express = require('express');
    var router = express.Router();


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
     */
    router.get('/', function (req, res) {
        // initialize context object to bind to view, callback to make sure model worked correctly
        let callbackCount = 0;
        let context = {};

        // add static pages to the context for data binding
        context.jsscripts = ["dealers.js"];
        context.cssstyles = ["stylesheet.css"];

        // use the model to get data from mysql
        let mysql = req.app.get('mysql');

        // see if an add request was sent
        if (req.query.callType == "add") {
            model.addRow(mysql, req.query.dealer_fname, req.query.dealer_lname, req.query.dealer_age,
                         req.query.supervisor, req.query.qualification_ID);
            res.end();
        }
        // otherwise, just get all the available records
        else{
            model.getTable(res, mysql, context, complete);
        }

        // otherwise, if there was no error
        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                // return the view with context data
                res.render('dealers', context);
            }
        }
    });
    return router;
}();

