/********************************************
* Functions used for dealing with get requests
* to the Update Dealers Search page, along with additional 
* functions used to send queries to MYSQL.
*********************************************/


module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /* Function to get base dealer data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   dealer ; dealer in question
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
     */
    function getTable(res, mysql, context, dealer, complete){
        mysql.pool.query("SELECT * FROM Dealers " +
                         "JOIN Supervisors ON Supervisors.supervisor_ID = Dealers.supervisor " +
                         "WHERE dealer_ID=? ", [dealer], function(err, results){
            if(err){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dealer = results;
            mysql.pool.query("SELECT * FROM Supervisors ORDER BY supervisor_lname, supervisor_fname ASC", function(err, results){
                if(err){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.sup = results;
                complete();
            });
        });
    }


    /* Function to update table data
     * Input:   mysql ; mysql object
     * Input:   dealer_ID ; dealer ID
     * Input:   fname ; dealer first name
     * Input:   lname ; dealer last name
     * Input:   age ; dealer age
     * Input:   supervisor ; supervisor ID
     * Input:   qualification ; qualification ID
     * Output:  n/a
     */
    function updateRow(mysql, dealer_ID, fname, lname, age, supervisor, qualification){
        mysql.pool.query("SELECT * FROM Dealers " +
                         "WHERE dealer_fname=? AND dealer_lname=? AND dealer_age=? AND supervisor=?",
                          [fname, lname, age, supervisor], function(err, results){
            if (results.length == 0){
                mysql.pool.query("UPDATE Dealers SET dealer_fname=?, dealer_lname=?, dealer_age=?, " +
                                 "supervisor=? WHERE dealer_ID=?", [fname, lname, age, supervisor, dealer_ID], function(err){
                    if (err){
                        console.log("error on insert to dealers");
                        console.log(err);
                        return;
                    }
                });
            }
            else{
                console.log("Error with updating row.");
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
        context.jsscripts = ["update_dealers.js"];
        context.cssstyles = ["stylesheet.css"];
        let mysql = req.app.get('mysql');
        if (req.query.callType == "update") {
            updateRow(mysql, req.query.dealer_ID, req.query.dealer_fname, req.query.dealer_lname, req.query.dealer_age,
                   req.query.supervisor);
            res.end();
        }
        else{
            getTable(res, mysql, context, req.query.dealer_ID, complete);
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

