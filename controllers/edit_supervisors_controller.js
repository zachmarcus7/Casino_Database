/********************************************
* Controller for edit_supervisors page. Handles
* all incoming requests for this page and 
* uses the associated model class to retrieve
* required data from MySQL.
*********************************************/



module.exports = function () {
    var modelSource = require('./models/edit_supervisors.js');
    var model = Object.create(modelSource.editSupervisors);
    var express = require('express');
    var router = express.Router();


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
     */
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["edit_supervisors.js"];
        context.cssstyles = ["stylesheet.css"];
        let mysql = req.app.get('mysql');
        if (req.query.callType == "del") {
            model.deleteRow(mysql, req.query.supervisor_ID);
            res.end();
        }
        else{
            model.getTable(res, mysql, context, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('edit_supervisors', context);
            }

        }
    });

    return router;
}();

