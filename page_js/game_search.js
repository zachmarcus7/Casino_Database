/********************************************
* Functions used for dealing with get requests
* to the Game Search page, along with additional 
* functions used to send queries to MYSQL.
*********************************************/


module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /* Function to get data from MYSQL
     * Input:   req ; request variable from router
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    function getGameTypes(req, res, mysql, context, complete) {

        let sql_query = "SELECT gt.name, g.game_ID, g.date, g.amount_earned, tg.table_ID, d.dealer_fname, d.dealer_lname ";
        sql_query += "FROM Games g JOIN Game_Types gt ON (g.game_type = gt.game_type_ID) JOIN Tables_Games tg ON (tg.game_ID = g.game_ID) ";
        sql_query += "JOIN Tables t ON (t.table_ID = tg.table_ID) JOIN Games_Dealers gd ON (gd.game_ID = g.game_ID) ";
        sql_query += "JOIN Dealers d ON (d.dealer_ID = gd.dealer_ID) "; 

        //complete the sql query depending on what call type is sent
        if(req.query.callType == "game_type"){
        	sql_query += "WHERE gt.name = ?";
        } else if (req.query.callType == "table_id"){
        	sql_query += "WHERE t.table_ID = ?";
        } else if (req.query.callType == "last_name"){
        	sql_query += "WHERE d.dealer_lname = ?";
        }
     
        mysql.pool.query(sql_query, [req.query.name], function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            complete();
        });
    }


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
    */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["script.js"];
        context.cssstyles = ["stylesheet.css"];
        var mysql = req.app.get('mysql');

        getGameTypes(req, res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('game_search', context);
            }
        }
    });


    return router;
}();
