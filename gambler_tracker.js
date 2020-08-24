/********************************************
* Main JS file to set up the server.
*********************************************/


//set up express
var express = require('express');
var app = express();
app.set('port', 43029);


//set up handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


//set up body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// database definition
var mysql = require('./dbcon.js');
app.set('mysql', mysql);


// set up public folder
app.use(express.static('public'));


// set up .js calls for the different SQL calls on different pages
app.use('/', require('./page_js/index.js'));
app.use('/Dealers', require('./page_js/dealers.js'));
app.use('/Tables', require('./page_js/tables.js'));
app.use('/Games', require('./page_js/games.js'));
app.use('/Game_Types', require('./page_js/game_types.js'));
app.use('/Qualifications', require('./page_js/qualifications.js'));
app.use('/Supervisors', require('./page_js/supervisors.js'));
app.use('/Game_Search', require('./page_js/game_search.js'));
app.use('/Edit_Game_Types', require('./page_js/edit_game_types.js'));
app.use('/Update_Game_Types', require('./page_js/update_game_types.js'));
app.use('/Dealer_Search', require('./page_js/dealer_search.js'));
app.use('/Edit_Qualifications', require('./page_js/edit_qualifications.js'));
app.use('/Update_Qualifications', require('./page_js/update_qualifications.js'));
app.use('/Edit_Dealers', require('./page_js/edit_dealers.js'));
app.use('/Update_Dealers', require('./page_js/update_dealers.js'));
app.use('/Edit_Supervisors', require('./page_js/edit_supervisors.js'));
app.use('/Update_Supervisors', require('./page_js/update_supervisors.js'));


//error handlers
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});


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
