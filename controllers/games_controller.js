/********************************************
* Controller for the games page. Handles
* all incoming requests for this page and 
* uses the associated model class to retrieve
* required data from MySQL.
*********************************************/


module.exports = function () {
    var modelSource = require('./models/games.js');
    var model = Object.create(modelSource.games);
    var router = express.Router();


    /* Base router get handle for the page
     * Input:   get data from web page
     * Output:  page rendering data
    */
    router.get('/', function (req, res) {
        // initialize context object to bind to view, callback to make sure model worked correctly
        var callbackCount = 0;
        var context = {};

        // add static pages to the context for data binding
        context.jsscripts = ["script.js"];
        context.cssstyles = ["stylesheet.css"];

        // use the model to get data from mysql
        var mysql = req.app.get('mysql');

        // check if an add request was sent
        if (req.query.callType == "add") {
            model.addRow(mysql, req.query.amount_earned, req.query.date, req.query.game_type, req.query.players_total, req.query.table_ID, req.query.dealer_ID);
            res.end();
        } else {
            // otherwise, just query database to get existing records
            model.getTable(res, mysql, context, complete);
            model.getTypes(res, mysql, context, complete);
            model.getDealers(res, mysql, context, complete);
            model.getTableID(res, mysql, context, complete);
        }

        // this is used to check if all 4 of the model's sql queries were successful
        function complete(){
            callbackCount++;
            if (callbackCount >= 4) {
                // return the view
                res.render('games', context);
            }
        }
    });

    return router;
}();
