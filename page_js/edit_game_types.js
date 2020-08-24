/********************************************
* Functions used for dealing with get requests
* to the Edit Game Types page, along with additional 
* functions used to send queries to MYSQL.
*********************************************/


module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /* Function to get starting table data from MYSQL
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    function getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Game_Types", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            complete();
        });
    }
    

    /* Function to get starting table data from MYSQL
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    function deleteRow(mysql, game_type_ID){
        mysql.pool.query("DELETE FROM Game_Types WHERE game_type_ID = ?", [game_type_ID], function(err){
            if (err){
                console.log("error on delete from Game_Types");
                console.log(err);
                return;
            }
        });
    }


    /* Function for sending an UPDATE query for the Game_Types MYSQL table
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    function updateRow(mysql, game_type_ID, name, description){
        mysql.pool.query("UPDATE Game_Types SET name = ?, description = ? WHERE game_type_ID = ?", [name, description, game_type_ID], function(err){
            if (err){
                console.log("error on update to Game_Types");
                console.log(err);
                return;
            }
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
       
        if (req.query.callType == "delete") {
            deleteRow(mysql, req.query.game_type_ID);
            res.end();
        } else if (req.query.callType == "update"){
            updateRow(mysql, req.query.name, req.query.description, req.query.game_type_ID);
            res.end();
        } else {
            getTable(res, mysql, context, complete);
        }

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('edit_game_types', context);
            }

        }
    });


    return router;
}();
