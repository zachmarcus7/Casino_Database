var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '',  //edited for privacy
    user            : '',
    password        :  '',
    database         : ''
});
module.exports.pool = pool;