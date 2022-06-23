/********************************************
* Model for managing the data of the qualifications
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/


const qualifications = {

    /* Function to get table data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
     */
    getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Qualifications", function (error, results, fields) {
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
     * Input:   name ; qualification name
     * Input:   difficulty ; qualification difficulty
     * Output:  n/a
     */
    addRow(mysql, name, difficulty) {
        mysql.pool.query("SELECT * FROM Qualifications WHERE qualification_name=? AND qualification_difficulty=?",
            [name, difficulty], function (err, results) {
                if (results.length == 0) {
                    mysql.pool.query("INSERT INTO Qualifications (qualification_name, qualification_difficulty) " +
                        "VALUES (?, ?)", [name, difficulty], function (err) {
                            if (err) {
                                console.log("error on insert to qualifications");
                                console.log(err);
                                return;
                            }
                    });
                }
                else {
                    console.log("Error on INSERT into Qualifications.");
                }
        });
    }

}