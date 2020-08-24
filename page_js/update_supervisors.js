/********************************************
* Functions used for dealing with get requests
* to the Update Supervisors page, along with additional 
* functions used to send queries to MYSQL.
*********************************************/


module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /* Function to get base data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   supervisor ; supervisor ID
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
     */
    function getTable(res, mysql, context, supervisor, complete){
        mysql.pool.query("SELECT * FROM Supervisors " +
                         "WHERE supervisor_ID=?", [supervisor], function(err, results){
            if(err){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.supervisor = results;
            complete();
        });
    }


    /* Function to update table data and display to user
     * Input:   mysql ; mysql object
     * Input:   supervisor_ID ; supervisor ID
     * Input:   fname ; supervisor first name
     * Input:   lname ; supervisor last name
     * Output:  n/a
     */
    function updateRow(mysql, supervisor_ID, fname, lname){
        mysql.pool.query("SELECT * FROM Supervisors " +
                         "WHERE supervisor_fname=? AND supervisor_lname=?",
                          [fname, lname], function(err, results){
            if (results.length == 0){
                mysql.pool.query("UPDATE Supervisors SET supervisor_fname=?, supervisor_lname=? " +
                                 "WHERE supervisor_ID=?", [fname, lname, supervisor_ID], function(err){
                    if (err){
                        console.log("error on insert to supervisors");
                        console.log(err);
                        return;
                    }
                });
            }
            else{
                console.log("Error on updating supervisor.");
            }
        });
    }


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
     */
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["update_supervisors.js"];
        context.cssstyles = ["stylesheet.css"];
        let mysql = req.app.get('mysql');
        if (req.query.callType == "update") {
            updateRow(mysql, req.query.supervisor_ID, req.query.supervisor_fname, req.query.supervisor_lname);
            res.end();
        }
        else{
            getTable(res, mysql, context, req.query.supervisor_ID, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update_supervisors', context);
            }

        }
    });


    return router;
}();

