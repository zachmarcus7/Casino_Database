/********************************************
* Functions used for dealing with get requests
* to the Tables page, along with additional 
* functions used to send queries to MYSQL.
*********************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();


     /* Function to get starting table data from MYSQL
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    function getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Tables", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            complete();
        });
    }


    /* Function that sends an INSERT query to MYSQL 
     * Input:   mysql ; mysql object
     * Input:   floor ; value to set the floor attribute to in MYSQL   
     * Output:  n/a
    */
    function addRow(mysql, floor){
        mysql.pool.query("INSERT INTO Tables (floor) VALUES (?)", [floor], function(err){
            if (err){
                console.log("error on insert to tables");
                console.log(err);
                return;
            }
        });
    }


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
            addRow(mysql, req.query.floor);
            res.end();
        } else {
            getTable(res, mysql, context, complete);
        }

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('tables', context);
            }

        }
    });


    return router;
}();

