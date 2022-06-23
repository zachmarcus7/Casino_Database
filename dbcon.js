/********************************************
* Connection info for SQL server.
*********************************************/

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '', 
    user            : '',
    password        : '',
    database        : ''
});

// here, we're making sure the connection is reused instead of recreated
module.exports.pool = pool;