/********************************************
* Functions used for dealing with get requests
* to the Update Game Types page, along with additional 
* functions used to send queries to MYSQL.
*********************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
    */
    router.get('/', function(req, res){
        var context = {};
        context.jsscripts = ["script.js"];
        context.cssstyles = ["stylesheet.css"];
        var mysql = req.app.get('mysql');


        //check if update has been requested
        if (req.query.callType == "update"){
            //function for sending an update query to MYSQL
            mysql.pool.query("UPDATE Game_Types SET name = ?, description = ? WHERE game_type_ID = ?", [req.query.name, req.query.description, req.query.game_type_ID], function(err){
                if (err){
                    console.log("error on update to Game_Types");
                    console.log(err);
                    return;
                }
            });
        }
       

        mysql.pool.query("SELECT * FROM Game_Types WHERE game_type_ID = ?",[req.query.game_type_ID], function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;

            //SQL is returning an array with the needed data at the 0th element
            context.game_type = context.rows[0];
            res.render('update_game_types', context);
        });

    });


    return router;
}();
