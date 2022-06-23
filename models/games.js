/********************************************
* Model for managing the data of the games
* page. Contains several functions for querying
* MySQL, and returning specified records.
*********************************************/

const games = {

    /* Function to get starting table data from MYSQL
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    getTable(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Games", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rows = results;
            complete();
        });
    },


    /* Function to get game type data to display for user selection
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    getTypes(res, mysql, context, complete) {
        mysql.pool.query("SELECT game_type_ID as id, name FROM Game_Types", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.types = results;
            complete();
        });
    },


    /* Function to get dealer data to display for user selection
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    getDealers(res, mysql, context, complete) {
        mysql.pool.query("SELECT dealer_ID, dealer_fname, dealer_lname FROM Dealers ORDER BY dealer_lname ASC", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.dealers = results;
            complete();
        });
    },


    /* Function to get table data to display for user selection
     * Input:   res ; response variable from router 
     * Input:   mysql ; mysql object
     * Input:   context ; object to hold results
     * Input:   complete ; function that is called on successful completion of mysql call
     * Output:  n/a
    */
    getTableID(res, mysql, context, complete) {
        mysql.pool.query("SELECT table_ID FROM Tables ORDER BY table_ID ASC", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.table_IDs = results;
            complete();
        });
    },


    /* Function insert a row into the Games MYSQL Table, along with its 3 intersection tables
     * Input:   mysql ; mysql object
     * Input:   amount_earned ; value to set amount_earned attribute to in MYSQL
     * Input:   date ; value to set date attribute to in MYSQL
     * Input:   game_type ; value to set game_type attribute to in MYSQL
     * Input:   players_total ; value to set players_total attribute to in MYSQL
     * Input:   table_ID ; value to set table_ID attribute to in MYSQL
     * Input:   dealer_ID ; value to set dealer_ID attribute to in MYSQL
     * Output:  n/a
    */
    addRow(mysql, amount_earned, date, game_type, players_total, table_ID, dealer_ID) {
        //check if game_type is null, set to javascript null
        if (game_type == "Null") {
            game_type = null;
        }

        mysql.pool.query("INSERT INTO Games (amount_earned, date, game_type, players_total) VALUES (?, ?, ?, ?)", [amount_earned, date, game_type, players_total], function (err) {
            if (err) {
                console.log("error on insert to Games");
                console.log(err);
                return;
            }

            //check if game_type is null
            //need to format query differently if it is
            if (game_type == null) {
                //insert values for Games_Dealers intersection table
                mysql.pool.query("INSERT INTO Games_Dealers (game_ID, dealer_ID) VALUES ((SELECT game_ID FROM Games WHERE amount_earned = ? AND  date = ? AND game_type IS NULL AND players_total = ?), ?)", [amount_earned, date, players_total, dealer_ID], function (err) {
                    if (err) {
                        console.log("error on insert to Games_Dealers");
                        console.log(err);
                        return;
                    }
                });

                //insert values for Tables_Dealers intersection table
                mysql.pool.query("INSERT INTO Tables_Dealers (table_ID, dealer_ID) VALUES (?, ?)", [table_ID, dealer_ID], function (err) {
                    if (err) {
                        console.log("error on insert to Games_Dealers");
                        console.log(err);
                        return;
                    }
                });

                //insert values for Tables_Games intersection table
                mysql.pool.query("INSERT INTO Tables_Games (game_ID, table_ID) VALUES ((SELECT game_ID FROM Games WHERE amount_earned = ? AND  date = ? AND game_type IS NULL AND players_total = ?), ?)", [amount_earned, date, players_total, table_ID], function (err) {
                    if (err) {
                        console.log("error on insert to Tables_Games");
                        console.log(err);
                        return;
                    }
                });
            } else {
                //insert values for Games_Dealers intersection table
                mysql.pool.query("INSERT INTO Games_Dealers (game_ID, dealer_ID) VALUES ((SELECT game_ID FROM Games WHERE amount_earned = ? AND  date = ? AND game_type = ? AND players_total = ?), ?)", [amount_earned, date, game_type, players_total, dealer_ID], function (err) {
                    if (err) {
                        console.log("error on insert to Games_Dealers");
                        console.log(err);
                        return;
                    }
                });

                //insert values for Tables_Dealers intersection table
                mysql.pool.query("INSERT INTO Tables_Dealers (table_ID, dealer_ID) VALUES (?, ?)", [table_ID, dealer_ID], function (err) {
                    if (err) {
                        console.log("error on insert to Games_Dealers");
                        console.log(err);
                        return;
                    }
                });

                //insert values for Tables_Games intersection table
                mysql.pool.query("INSERT INTO Tables_Games (game_ID, table_ID) VALUES ((SELECT game_ID FROM Games WHERE amount_earned = ? AND  date = ? AND game_type = ? AND players_total = ?), ?)", [amount_earned, date, game_type, players_total, table_ID], function (err) {
                    if (err) {
                        console.log("error on insert to Tables_Games");
                        console.log(err);
                        return;
                    }
                });
            }
        });
    }

}


