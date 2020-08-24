/********************************************
* Functions used for dealing with get requests
* to the Supervisors page, along with additional 
* functions used to send queries to MYSQL.
*********************************************/


module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /* Function to get table data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
     */
    function getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Supervisors", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            complete();
        });
    }


    /* Function to add table data and display to user
     * Input:   mysql ; mysql object
     * Input:   fname ; supervisor first name
     * Input:   lname ; supervisor last name
     * Output:  n/a
     */
    function addRow(mysql, fname, lname){
        mysql.pool.query("SELECT * FROM Supervisors WHERE supervisor_fname=? AND supervisor_lname=?",
                         [fname, lname], function(err, results){
            if (results.length == 0){
                mysql.pool.query("INSERT INTO Supervisors (supervisor_fname, supervisor_lname) " +
                                 "VALUES (?, ?)", [fname, lname], function(err){
                    if (err){
                        console.log("error on insert to supervisors");
                        console.log(err);
                        return;
                    }
                });
            }
            else{
                console.log("Error on INSERT into Supervisors.");
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
        context.jsscripts = ["supervisors.js"];
        context.cssstyles = ["stylesheet.css"];
        let mysql = req.app.get('mysql');
        if (req.query.callType == "add") {
            addRow(mysql, req.query.supervisor_fname, req.query.supervisor_lname);
            res.end();
        }
        else{
            getTable(res, mysql, context, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('supervisors', context);
            }

        }
    });

    return router;
}();

