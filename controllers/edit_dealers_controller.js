/********************************************
* Controller for edit_dealers page. Handles
* all incoming requests for this page and 
* uses the associated model class to retrieve
* required data from MySQL.
*********************************************/


module.exports = function () {
    var modelSource = require('./models/edit_dealers.js');
    var model = Object.create(modelSource.editDealers);
    var express = require('express');
    var router = express.Router();


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
     */
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["edit_dealers.js"];
        context.cssstyles = ["stylesheet.css"];
        let mysql = req.app.get('mysql');
        if (req.query.callType == "del") {
            model.deleteRow(mysql, req.query.dealer_ID);
            res.end();
        }
        else{
            model.getTable(res, mysql, context, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('edit_dealers', context);
            }

        }
    });


    return router;
}();

