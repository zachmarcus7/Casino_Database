/********************************************
* Model for managing the data of the update_dealers
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/


const updateDealers = {

    /* Function to get base dealer data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   dealer ; dealer in question
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
     */
    getTable(res, mysql, context, dealer, complete){
        mysql.pool.query("SELECT * FROM Dealers " +
            "JOIN Supervisors ON Supervisors.supervisor_ID = Dealers.supervisor " +
            "WHERE dealer_ID=? ", [dealer], function (err, results) {
                if (err) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.dealer = results;
                mysql.pool.query("SELECT * FROM Supervisors ORDER BY supervisor_lname, supervisor_fname ASC", function (err, results) {
                    if (err) {
                        res.write(JSON.stringify(error));
                        res.end();
                    }
                    context.sup = results;
                    complete();
                });
            });
    },


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
    updateRow(mysql, dealer_ID, fname, lname, age, supervisor, qualification) {
        mysql.pool.query("SELECT * FROM Dealers " +
            "WHERE dealer_fname=? AND dealer_lname=? AND dealer_age=? AND supervisor=?",
            [fname, lname, age, supervisor], function (err, results) {
                if (results.length == 0) {
                    mysql.pool.query("UPDATE Dealers SET dealer_fname=?, dealer_lname=?, dealer_age=?, " +
                        "supervisor=? WHERE dealer_ID=?", [fname, lname, age, supervisor, dealer_ID], function (err) {
                            if (err) {
                                console.log("error on insert to dealers");
                                console.log(err);
                                return;
                            }
                        });
                }
                else {
                    console.log("Error with updating row.");
                }
            });
    }

}

