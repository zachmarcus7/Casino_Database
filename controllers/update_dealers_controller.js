/********************************************
* Controller for the update_dealers page. Handles
* all incoming requests for this page and 
* uses the associated model class to retrieve
* required data from MySQL.
*********************************************/


module.exports = function () {
    var modelSource = require('./models/update-dealers.js');
    var model = Object.create(modelSource.updateDealers);
    var express = require('express');
    var router = express.Router();


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
     */
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};

        context.jsscripts = ["update_dealers.js"];
        context.cssstyles = ["stylesheet.css"];

        let mysql = req.app.get('mysql');
        if (req.query.callType == "update") {
            model.updateRow(mysql, req.query.dealer_ID, req.query.dealer_fname, req.query.dealer_lname, req.query.dealer_age, req.query.supervisor);
            res.end();
        }
        else{
            model.getTable(res, mysql, context, req.query.dealer_ID, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update_dealers', context);
            }
        }
    });

    return router;
}();

