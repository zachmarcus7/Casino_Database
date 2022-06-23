/********************************************
* Model for managing the data of the edit_supervisors
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/

const editSupervisors = {

    /* Function to get table data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
     */
    getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Supervisors " +
            "ORDER BY supervisor_lname, supervisor_fname ASC", function (err, results) {
                if (err) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.rows = results;
                complete();
            });
    },


    /* Function to delete table data and display to user
     * Input:   mysql ; mysql object
     * Input:   supervisor_ID ; supervisor ID to be removed
     * Output:  n/a
     */
    deleteRow(mysql, supervisor_ID) {
        mysql.pool.query("DELETE FROM Supervisors WHERE supervisor_ID=?", [supervisor_ID], function (err) {
            if (err) {
                console.log("error on delete of supervisor");
                console.log(err);
                return;
            }
        });
    }
}