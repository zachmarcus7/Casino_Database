/********************************************
* Model for managing the data of the game_types
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/

const gameTypes = {

    /* Function to get starting table data from MYSQL
        * Input:   res ; response variable from router 
        * Input:   mysql ; mysql object
        * Input:   context ; object to hold results
        * Input:   complete ; function that is called on successful completion of mysql call
        * Output:  n/a
    */
    getTable(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM Game_Types", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            complete();
        });
    },


    /* Function to send an INSERT query to MYSQL
        * Input:   mysql ; mysql object
        * Input:   name ; value to set name attribute to in MYSQL
        * Input:   description ; value to set description attribute to in MYSQL
        * Output:  n/a
    */
    addRow(mysql, name, description) {
        mysql.pool.query("INSERT INTO Game_Types (name, description) VALUES (?, ?)", [name, description], function (err) {
            if (err) {
                console.log("error on insert to tables");
                console.log(err);
                return;
            }
        });
    }
}
