/********************************************
* Functions used for dealing with get requests
* to the Edit Dealers page, along with additional 
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
        mysql.pool.query("SELECT * FROM Dealers JOIN Supervisors " +
                         "ON Supervisors.supervisor_ID = Dealers.supervisor " +
                         "ORDER BY dealer_lname, dealer_fname ASC", function(err, results){
            if(err){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            complete();
        });
    }


    /* Function to delete table data and display to user
     * Input:   mysql ; mysql object
     * Input:   dealer_ID ; dealer ID to be removed
     * Output:  n/a
     */
    function deleteRow(mysql, dealer_ID){
        mysql.pool.query("DELETE FROM Dealers WHERE dealer_ID=?", [dealer_ID], function(err){
            if (err){
                console.log("error on delete of dealer");
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
        context.jsscripts = ["edit_dealers.js"];
        context.cssstyles = ["stylesheet.css"];
        let mysql = req.app.get('mysql');
        if (req.query.callType == "del") {
            deleteRow(mysql, req.query.dealer_ID);
            res.end();
        }
        else{
            getTable(res, mysql, context, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('edit_dealers', context);
            }

        }
    });


    return router;
}();

