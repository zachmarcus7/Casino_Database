/********************************************
* Controller for the update_qualifications page. Handles
* all incoming requests for this page and 
* uses the associated model class to retrieve
* required data from MySQL.
*********************************************/


module.exports = function () {
    var modelSource = require('./models/update-qualifications.js');
    var model = Object.create(modelSource.updateQualifications);
    var express = require('express');
    var router = express.Router();


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
     */
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};

        context.jsscripts = ["update_qualifications.js"];
        context.cssstyles = ["stylesheet.css"];

        let mysql = req.app.get('mysql');
        if (req.query.callType == "update") {
            model.updateRow(mysql, req.query.dealer_ID, req.query.qualification_old, req.query.qualification_new);
            res.end();
        }
        else{
            model.getTable(res, mysql, context, req.query.dealer_ID, req.query.qualification_ID, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update_qualifications', context);
            }

        }
    });


    return router;
}();

