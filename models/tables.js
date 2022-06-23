/********************************************
* Model for managing the data of the tables
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/


const tables = {

    /* Function to get starting table data from MYSQL
    * Input:   res ; response variable from router 
    * Input:   mysql ; mysql object
    * Input:   context ; object to hold results
    * Input:   complete ; function that is called on successful completion of mysql call
    * Output:  n/a
   */
    getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Tables", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            complete();
        });
    },


    /* Function that sends an INSERT query to MYSQL 
     * Input:   mysql ; mysql object
     * Input:   floor ; value to set the floor attribute to in MYSQL   
     * Output:  n/a
    */
    addRow(mysql, floor) {
        mysql.pool.query("INSERT INTO Tables (floor) VALUES (?)", [floor], function (err) {
            if (err) {
                console.log("error on insert to tables");
                console.log(err);
                return;
            }
        });
    }

}
