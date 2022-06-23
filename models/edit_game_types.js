/********************************************
* Model for managing the data of the edit_game_types
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/

const editGameTypes = {

    /* Function to get starting table data from MYSQL
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Game_Types", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            complete();
        });
    },


    /* Function to get starting table data from MYSQL
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    deleteRow(mysql, game_type_ID) {
        mysql.pool.query("DELETE FROM Game_Types WHERE game_type_ID = ?", [game_type_ID], function (err) {
            if (err) {
                console.log("error on delete from Game_Types");
                console.log(err);
                return;
            }
        });
    },


    /* Function for sending an UPDATE query for the Game_Types MYSQL table
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    updateRow(mysql, game_type_ID, name, description) {
        mysql.pool.query("UPDATE Game_Types SET name = ?, description = ? WHERE game_type_ID = ?", [name, description, game_type_ID], function (err) {
            if (err) {
                console.log("error on update to Game_Types");
                console.log(err);
                return;
            }
        });
    }
}
