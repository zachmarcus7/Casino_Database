/********************************************
* Model for managing the data of the dealers
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/


const dealers = {

    /* Function to get table data to display to user
      * Input:   res ; response variable from router get transaction
      * Input:   mysql ; mysql object
      * Input:   context ; object to hold results
      * Input:   complete ; function that is called on successful completion of mysql call
      * Output:  n/a
      */
    getTable(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM Dealers " +
            "JOIN Supervisors ON Supervisors.supervisor_ID = Dealers.supervisor " +
            "ORDER BY dealer_lname ASC", function (err, results) {
                if (err) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.rows = results;
                mysql.pool.query("SELECT * FROM Supervisors ORDER BY supervisor_lname, supervisor_fname ASC", function (err, results) {
                    if (err) {
                        res.write(JSON.stringify(error));
                        res.end();
                    }
                    context.supervisors = results;
                    mysql.pool.query("SELECT * FROM Qualifications ORDER BY qualification_name ASC", function (err, results) {
                        if (err) {
                            res.write(JSON.stringify(error));
                            res.end();
                        }
                        context.qualifications = results;
                        complete();
                    });
                });
            });
    },


    /* Function to add table data and display to user
     * Input:   mysql ; mysql object
     * Input:   fname ; dealer first name
     * Input:   lname ; dealer last name
     * Input:   age ; dealer age
     * Input:   supervisor ; supervisor ID
     * Input:   qualification ; qualification ID
     * Output:  n/a
     */
    addRow(mysql, fname, lname, age, supervisor, qualification) {
        // first, check if dealer already exists
        mysql.pool.query("SELECT * FROM Dealers " +
            "WHERE dealer_fname=? AND dealer_lname=? AND dealer_age=? AND supervisor=?",
            [fname, lname, age, supervisor], function (err, results) {

                // if not, then create a new record for the dealer
                if (results.length == 0) {
                    mysql.pool.query("INSERT INTO Dealers (dealer_fname, dealer_lname, dealer_age, supervisor) " +
                        "VALUES (?, ?, ?, ?)", [fname, lname, age, supervisor], function (err) {
                            if (err) {
                                console.log("error on insert to dealers");
                                console.log(err);
                                return;
                            }
                            mysql.pool.query("INSERT INTO Qualified_Dealers (dealer, qualification) " +
                                "VALUES ((SELECT dealer_ID FROM Dealers " +
                                "WHERE dealer_fname = ? AND dealer_lname = ? AND dealer_age = ? AND supervisor = ?), ?)",
                                [fname, lname, age, supervisor, qualification], function (err) {
                                    if (err) {
                                        console.log("error on relations table");
                                        console.log(err);
                                        return;
                                    }
                                });
                        });
                }
                else {
                    console.log("Error on INSERT to Dealers.");
                }
            });
    }
}
