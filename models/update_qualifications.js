/********************************************
* Model for managing the data of the update_qualifications
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/


const updateQualifications = {

    /* Function to get base data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   dealer ; dealer ID
     * Input:   qualification ; qualification ID
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    getTable(res, mysql, context, dealer, qualification, complete){
        mysql.pool.query("SELECT * FROM Qualified_Dealers JOIN Dealers " +
            "ON Dealers.dealer_ID = Qualified_Dealers.dealer " +
            "JOIN Qualifications ON Qualified_Dealers.qualification = Qualifications.qualification_ID " +
            "WHERE dealer=? AND qualification=?", [dealer, qualification], function (err, results) {
                if (err) {
                    console.log("error on getting Qualified Dealers");
                    console.log(err);
                    return;
                }
                context.dealer_qual = results;
                mysql.pool.query("SELECT * FROM Qualifications ORDER BY qualification_name ASC", function (err, results) {
                    if (err) {
                        console.log("error on getting Qualifications");
                        console.log(err);
                        return;
                    }
                    context.qual = results;
                    complete();
                });
            });
    },


    /* Function to update table data
     * Input:   mysql ; mysql object
     * Input:   dealer_ID ; dealer ID
     * Input:   qualification_old ; old qualification ID
     * Input:   qualification_new ; new qualification ID
     * Output:  n/a
     */
    updateRow(mysql, dealer_ID, qualification_old, qualification_new) {
        mysql.pool.query("SELECT * FROM Qualified_Dealers " +
            "WHERE dealer=? AND qualification=?",
            [dealer_ID, qualification_new], function (err, results) {
                if (results.length == 0) {
                    mysql.pool.query("UPDATE Qualified_Dealers SET dealer=?, qualification=? " +
                        "WHERE dealer=? AND qualification=?", [dealer_ID, qualification_new, dealer_ID, qualification_old], function (err) {
                            if (err) {
                                console.log("error on update to Qualified Dealers");
                                console.log(err);
                                return;
                            }
                        });
                }
                else {
                    console.log("Error on updating qualifications.");
                }
            });
    }
}
