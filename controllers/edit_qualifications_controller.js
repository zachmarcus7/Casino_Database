/********************************************
* Controller for edit_qualifications page. Handles
* all incoming requests for this page and 
* uses the associated model class to retrieve
* required data from MySQL.
*********************************************/



module.exports = function () {
    var modelSource = require('./models/edit-qualifications.js');
    var model = Object.create(modelSource.editQualifications);
    var express = require('express');
    var router = express.Router();


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
     */
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["edit_qualifications.js"];
        context.cssstyles = ["stylesheet.css"];
        let mysql = req.app.get('mysql');
        if (req.query.callType == "del") {
            deleteRow(mysql, req.query.dealer_ID, req.query.qualification_ID);
            res.end();
        }
        else if (req.query.callType == "add") {
            model.addRow(mysql, req.query.dealer_ID, req.query.qualification_ID);
            res.end()
        }
        else{
            model.getTable(res, mysql, context, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('edit_qualifications', context);
            }

        }
    });


    return router;
}();

