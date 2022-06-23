/********************************************
* Model for managing the data of the dealerSearch
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/


const dealerSearch = {

    /* Function to get starting table data so user can see what they want to search
    * Input:   res ; response variable from router get transaction
    * Input:   mysql ; mysql object
    * Input:   context ; object to hold results
    * Input:   complete ; function that is called on successful completion of mysql call
    * Output:  n/a
    */
    getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Dealers " +
            "JOIN Supervisors ON Supervisors.supervisor_ID = Dealers.supervisor " +
            "ORDER BY dealer_lname, dealer_fname ASC", function (err, results) {
                if (err) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.rows = results;
                complete();
            });
    },


    /* Function to search the Dealers table
    * Input:   res ; response variable from router get transaction
    * Input:   mysql ; mysql object
    * Input:   req ; request variable from router get transaction
    * Output:  n/a
    */
    search(res, mysql, req) {
        // building the search query
        searchQuery = "SELECT * FROM Dealers JOIN Supervisors ON Dealers.supervisor = Supervisors.supervisor_ID WHERE ";
        let count = 0;
        if (req.query.first.length > 0) { searchQuery += req.query.col0 + "=? "; count++; }
        if (req.query.second.length > 0) { searchQuery += req.query.l0 + " " + req.query.col1 + "=? "; count++; }
        if (req.query.third.length > 0) { searchQuery += req.query.l1 + " " + req.query.col2 + "=? "; count++; }
        if (req.query.fourth.length > 0) { searchQuery += req.query.l2 + " " + req.query.col3 + "=? "; count++; }
        if (req.query.fifth.length > 0) { searchQuery += req.query.l3 + " " + req.query.col4 + "=? "; count++; }

        mysql.pool.query(searchQuery, [req.query.first, req.query.second, req.query.third, req.query.fourth, req.query.fifth],
            function (err, results) {
                res.type('text/plain');
                if (err) {
                    console.log("error on dealer search");
                    console.log(err);
                    res.end();
                }
                res.send(JSON.stringify(results));
            });
    }
};