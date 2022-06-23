/********************************************
* Model for managing the data of the update_game_types
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/

const updateGameTypes = {

    /* Function to get base data to display to user
     * Input:   res ; response variable from router get transaction
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   supervisor ; supervisor ID
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
     */
    getTable(res, mysql, context, req) {
        mysql.pool.query("SELECT * FROM Game_Types WHERE game_type_ID = ?", [req.query.game_type_ID], function (err, results) {
            if (err) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.supervisor = results;
        });
    },


    /* Function to update table data 
     * Input:   mysql ; mysql object
     * Input:   supervisor_ID ; supervisor ID
     * Input:   fname ; supervisor first name
     * Input:   lname ; supervisor last name
     * Output:  n/a
     */
    updateRow(mysql, req) {
        mysql.pool.query("UPDATE Game_Types SET name = ?, description = ? WHERE game_type_ID = ?", [req.query.name, req.query.description, req.query.game_type_ID], function (err) {
            if (err) {
                console.log("error on update to Game_Types");
                console.log(err);
                return;
            }
        });
    }
}
