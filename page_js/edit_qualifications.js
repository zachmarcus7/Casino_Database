/********************************************
* Functions used for dealing with get requests
* to the Edit Qualifications page, along with additional 
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
        mysql.pool.query("SELECT * FROM Dealers JOIN Qualified_Dealers " +
                         "ON Dealers.dealer_ID = Qualified_Dealers.dealer " +
                         "JOIN Qualifications ON Qualified_Dealers.qualification = Qualifications.qualification_ID " +
                         "ORDER BY dealer_lname, dealer_fname ASC", function(err, results){
            if(err){
                console.log(err);
                return;
            }
            context.dealer_qual = results;
            mysql.pool.query("SELECT * FROM Dealers " +
                             "ORDER BY dealer_lname, dealer_fname ASC", function(err, results){
                if(err){
                    console.log(err);
                    return;
                }
                context.dealer = results;
                mysql.pool.query("SELECT * FROM Qualifications " +
                                 "ORDER BY qualification_name ASC", function(err, results){
                    if(err){
                        console.log(err);
                        return;
                    }
                    context.qual = results;
                    complete();
                });
            });
        });
    }


    /* Function to add table data and display to user
     * Input:   mysql ; mysql object
     * Input:   dealer_ID ; dealer ID to be added
     * Input:   qualification_ID ; qualification ID to be added
     * Output:  n/a
     */
    function addRow(mysql, dealer_ID, qualification_ID){
        mysql.pool.query("SELECT * FROM Qualified_Dealers " +
                         "WHERE dealer=? AND qualification=?",
                          [dealer_ID, qualification_ID], function(err, results){
            if (results.length == 0){
                mysql.pool.query("INSERT INTO Qualified_Dealers (dealer, qualification) " +
                                 "VALUES (?, ?)", [dealer_ID, qualification_ID], function(err){
                    if (err){
                        console.log("error on insert to qualified_dealers");
                        console.log(err);
                        return;
                    }
                });
            }
            else{
                console.log("Error on qualification edit.");
            }
        });
    }


    /* Function to delete table data and display to user
     * Input:   mysql ; mysql object
     * Input:   dealer_ID ; dealer ID to be removed
     * Input:   qualification_ID ; qualification ID to be removed
     * Output:  n/a
     */
    function deleteRow(mysql, dealer_ID, qualification_ID){
        mysql.pool.query("DELETE FROM Qualified_Dealers WHERE dealer=? AND qualification=?", [dealer_ID, qualification_ID], function(err){
            if (err){
                console.log("error on delete of qualified_dealer");
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
            addRow(mysql, req.query.dealer_ID, req.query.qualification_ID);
            res.end()
        }
        else{
            getTable(res, mysql, context, complete);
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

