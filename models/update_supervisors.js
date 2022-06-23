/********************************************
* Model for managing the data of the update_supervisors
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/


const updateSupervisors = {

    /* Function to get base data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   supervisor ; supervisor ID
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
     */
    getTable(res, mysql, context, supervisor, complete){
        mysql.pool.query("SELECT * FROM Supervisors " +
            "WHERE supervisor_ID=?", [supervisor], function (err, results) {
                if (err) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.supervisor = results;
                complete();
            });
    },


    /* Function to update table data and display to user
     * Input:   mysql ; mysql object
     * Input:   supervisor_ID ; supervisor ID
     * Input:   fname ; supervisor first name
     * Input:   lname ; supervisor last name
     * Output:  n/a
     */
    updateRow(mysql, supervisor_ID, fname, lname) {
        mysql.pool.query("SELECT * FROM Supervisors " +
            "WHERE supervisor_fname=? AND supervisor_lname=?",
            [fname, lname], function (err, results) {
                if (results.length == 0) {
                    mysql.pool.query("UPDATE Supervisors SET supervisor_fname=?, supervisor_lname=? " +
                        "WHERE supervisor_ID=?", [fname, lname, supervisor_ID], function (err) {
                            if (err) {
                                console.log("error on insert to supervisors");
                                console.log(err);
                                return;
                            }
                        });
                }
                else {
                    console.log("Error on updating supervisor.");
                }
            });
    }
}

