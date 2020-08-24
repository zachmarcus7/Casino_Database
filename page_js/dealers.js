/********************************************
* Functions used for dealing with get requests
* to the Dealers page, along with additional 
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
        mysql.pool.query("SELECT * FROM Dealers " +
                         "JOIN Supervisors ON Supervisors.supervisor_ID = Dealers.supervisor " +
                         "ORDER BY dealer_lname, dealer_fname ASC", function(err, results){
            if(err){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            mysql.pool.query("SELECT * FROM Supervisors ORDER BY supervisor_lname, supervisor_fname ASC", function(err, results){
                if(err){
                res.write(JSON.stringify(error));
                res.end();
                }
                context.sup = results;
                mysql.pool.query("SELECT * FROM Qualifications ORDER BY qualification_name ASC", function(err, results){
                    if(err){
                    res.write(JSON.stringify(error));
                    res.end();
                    }
                    context.qual = results;
                    complete();
                });
            });
        });
    }


    /* Function to add table data and display to user
     * Input:   mysql ; mysql object
     * Input:   fname ; dealer first name
     * Input:   lname ; dealer last name
     * Input:   age ; dealer age
     * Input:   supervisor ; supervisor ID
     * Input:   qualification ; qualification ID
     * Output:  n/a
     */
    function addRow(mysql, fname, lname, age, supervisor, qualification){
        mysql.pool.query("SELECT * FROM Dealers " +
                         "WHERE dealer_fname=? AND dealer_lname=? AND dealer_age=? AND supervisor=?",
                          [fname, lname, age, supervisor], function(err, results){
            if (results.length == 0){
                mysql.pool.query("INSERT INTO Dealers (dealer_fname, dealer_lname, dealer_age, supervisor) " +
                                 "VALUES (?, ?, ?, ?)", [fname, lname, age, supervisor], function(err){
                    if (err){
                        console.log("error on insert to dealers");
                        console.log(err);
                        return;
                    }
                    mysql.pool.query("INSERT INTO Qualified_Dealers (dealer, qualification) " +
                                     "VALUES ((SELECT dealer_ID FROM Dealers " +
                                     "WHERE dealer_fname = ? AND dealer_lname = ? AND dealer_age = ? AND supervisor = ?), ?)",
                                     [fname, lname, age, supervisor, qualification], function(err){
                        if (err){
                            console.log("error on relations table");
                            console.log(err);
                            return;
                        }
                    });
                });
            }
            else{
                console.log("Error on INSERT to Dealers.");
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
        context.jsscripts = ["dealers.js"];
        context.cssstyles = ["stylesheet.css"];
        let mysql = req.app.get('mysql');
        if (req.query.callType == "add") {
            addRow(mysql, req.query.dealer_fname, req.query.dealer_lname, req.query.dealer_age,
                   req.query.supervisor, req.query.qualification_ID);
            res.end();
        }
        else{
            getTable(res, mysql, context, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('dealers', context);
            }

        }
    });
    return router;
}();

