var express = require('express');
// 这个router一般怎样用？？
var router = express.Router();
var mysql = require('mysql');
var db = require('./dbconfig');

/* 在主页获取新闻时的请求*/
router.get('/', function(req, res, next) {
    var newstype = req.query.newstype;

    var connection = mysql.createConnection(db);

    // 连接建立
    connection.connect();
    // connection.query(sql,[],function(err,rows,fields));
    //  order by  `id` desc
    connection.query('SELECT * FROM `news` WHERE `newstype` = ? order by  `id` desc', [newstype], function(err, rows, fields) {
        res.json(rows);
    });




});

module.exports = router;
