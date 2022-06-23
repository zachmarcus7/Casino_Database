/********************************************
* Main JS file to set up the server.
*********************************************/


// set up express for managing routes
var express = require('express');
var app = express();
app.set('port', 43029);


// set up handlebars for data binding
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// set up body parser middleware for parsing data from request body
// the extended option lets us use the querystring library for parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// database definition
var mysql = require('./dbcon.js');
app.set('mysql', mysql);


// set up public folder
app.use(express.static('public'));


// set up controllers for all the different routes
app.use('/', require('./controllers/index_controller.js'));
app.use('/Dealers', require('./controllers/dealers_controller.js'));
app.use('/Tables', require('./controllers/tables_controller.js'));
app.use('/Games', require('./controllers/games_controller.js'));
app.use('/Game_Types', require('./controllers/game_types_controller.js'));
app.use('/Qualifications', require('./controllers/qualifications_controller.js'));
app.use('/Supervisors', require('./controllers/supervisors_controller.js'));
app.use('/Game_Search', require('./controllers/game_search_controller.js'));
app.use('/Edit_Game_Types', require('./controllers/edit_game_types_controller.js'));
app.use('/Update_Game_Types', require('./controllers/update_game_types_controller.js'));
app.use('/Dealer_Search', require('./controllers/dealer_search_controller.js'));
app.use('/Edit_Qualifications', require('./controllers/edit_qualifications_controller.js'));
app.use('/Update_Qualifications', require('./controllers/update_qualifications_controller.js'));
app.use('/Edit_Dealers', require('./controllers/edit_dealers_controller.js'));
app.use('/Update_Dealers', require('./controllers/update_dealers_controller.js'));
app.use('/Edit_Supervisors', require('./controllers/edit_supervisors_controller.js'));
app.use('/Update_Supervisors', require('./controllers/update_supervisors_controller.js'));


// request error handler
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});


// server error handler
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500 - Server Error');
});


//set up port
app.listen(app.get('port'), function(){
    console.log('Express has started on flip 3, port: ' +
    app.get('port') + '; Press Ctrl-C to terminate.');
});
