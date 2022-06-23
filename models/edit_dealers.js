/********************************************
* Model for managing the data of the edit_dealers
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/


const editDealers = {

    /* Function to get table data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
     */
    getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Dealers JOIN Supervisors " +
            "ON Supervisors.supervisor_ID = Dealers.supervisor " +
            "ORDER BY dealer_lname, dealer_fname ASC", function (err, results) {
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
     * Input:   dealer_ID ; dealer ID to be removed
     * Output:  n/a
     */
    deleteRow(mysql, dealer_ID) {
        mysql.pool.query("DELETE FROM Dealers WHERE dealer_ID=?", [dealer_ID], function (err) {
            if (err) {
                console.log("error on delete of dealer");
                console.log(err);
                return;
            }
        });
    }
}

