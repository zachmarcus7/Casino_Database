/********************************************
* Functions used for dealing with get requests
* to the Qualifications page, along with additional 
* functions used to send queries to MYSQL.
*********************************************/


module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /* Function to get table data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function from example database that is called on successful completion of mysql call
     * Output:  n/a
     */
    function getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Qualifications", function(error, results, fields){
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
     * Input:   name ; qualification name
     * Input:   difficulty ; qualification difficulty
     * Output:  n/a
     */
    function addRow(mysql, name, difficulty){
        mysql.pool.query("SELECT * FROM Qualifications WHERE qualification_name=? AND qualification_difficulty=?",
                         [name, difficulty], function(err, results){
            if (results.length == 0){
                mysql.pool.query("INSERT INTO Qualifications (qualification_name, qualification_difficulty) " +
                                 "VALUES (?, ?)", [name, difficulty], function(err){
                    if (err){
                        console.log("error on insert to qualifications");
                        console.log(err);
                        return;
                    }
                });
            }
            else{
                console.log("Error on INSERT into Qualifications.");
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
        context.jsscripts = ["qualifications.js"];
        context.cssstyles = ["stylesheet.css"];
        let mysql = req.app.get('mysql');
        if (req.query.callType == "add") {
            addRow(mysql, req.query.qualification_name, req.query.qualification_difficulty);
            res.end();
        }
        else{
            getTable(res, mysql, context, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('qualifications', context);
            }

        }
    });

    return router;
}();

