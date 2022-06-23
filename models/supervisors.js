/********************************************
* Model for managing the data of the supervisors
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/

const supervisors = {

    /* Function to get table data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
     */
    getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Supervisors", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            complete();
        });
    },


    /* Function to add table data and display to user
     * Input:   mysql ; mysql object
     * Input:   fname ; supervisor first name
     * Input:   lname ; supervisor last name
     * Output:  n/a
     */
    addRow(mysql, fname, lname) {
        mysql.pool.query("SELECT * FROM Supervisors WHERE supervisor_fname=? AND supervisor_lname=?",
            [fname, lname], function (err, results) {
                if (results.length == 0) {
                    mysql.pool.query("INSERT INTO Supervisors (supervisor_fname, supervisor_lname) " +
                        "VALUES (?, ?)", [fname, lname], function (err) {
                            if (err) {
                                console.log("error on insert to supervisors");
                                console.log(err);
                                return;
                            }
                        });
                }
                else {
                    console.log("Error on INSERT into Supervisors.");
                }
            });
    }
}