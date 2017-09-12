var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('./dbconfig');

// 创建一个连接池。。的作用是什么？
var connection = mysql.createPool(db);

/* 后台路由页面 */


//1 获取所有新闻列表
// connection.query(sql,[],function(err,rows,fields));
//  order by  `id` desc
router.get('/getnews', function(req, res, next) {
    connection.query('SELECT * FROM `news` order by  `id` desc', function(err, rows) {
        // if (err) throw err;
        // var data = { code: '200', code_decoration: '查询成功' };
        // data.order = rows;
        // res.send(data);
        res.json(rows);
    });
});

//2 确认更新的功能
router.post('/update', function(req, res) {
    var newsid = req.body.id,
        newstype = req.body.newstype,
        newstitle = req.body.newstitle,
        newsimg = req.body.newsimg,
        newstime = req.body.newstime,
        newssrc = req.body.newssrc;
    // 注意MYSQL写法
    connection.query('UPDATE `news` SET `id`=?,`newstype`=?,`newstittle`=?,`newsimg`=?,`newstime`=?,`newssrc`=? WHERE `id`=?', [newsid, newstype, newstitle, newsimg, newstime, newssrc, newsid], function(err, rows) {

        if (err) {
            res.send('更新失败：' + err);
        } else {
            var data = { code: '200', code_decoration: '更新成功' };
            res.send(data);
        }
    });
});




//3 通过模态框获取值
router.get('/curnew', function(req, res) {
    var newsid = req.query.newsid;
    // 记住 这个固定写法
    connection.query('SELECT * FROM `news` WHERE id=?', [newsid], function(err, rows) {
        if (err) throw err;
        var data = { code: '200', code_decoration: '获取成功' };
        data.order = rows;
        res.send(data);
    });
});

//4 delete删除的功能
router.post('/delete', function(req, res) {
    var newsid = req.body.newsid;


    // 记住 这个固定写法 怎样写接口来判断是否可以任意删除数据；
    connection.query('DELETE FROM `news` WHERE `news`.`id` = ?', [newsid], function(err, result) {
        // 本查询语句中的ID是通过前端AJAX.data: { newsid: deleteId }接收过来,然后删除成功后响应报文结果给前端AJAX success属性回调方法处理；
        // console.log(result.affectedRows);


        // 判断报错情况及编写JSON API数据接口。。。返回REPOSNSE？？？？

        if (err) {
            res.send('删除失败：' + err);

        } else {

            res.send(result);
        }


    });

});



//5 insert功能

router.post('/insert', function(req, res) {
    var newstype = req.body.newstype,
        newstitle = req.body.newstitle,
        newsimg = req.body.newsimg,
        newstime = req.body.newstime,
        newssrc = req.body.newssrc;
    // 重大问题，老师帮分析SQL语句的正确写法及前后关联错误；
    connection.query('INSERT INTO `news`(`newstittle`, `newstype`, `newsimg`, `newstime`, `newssrc`) VALUES (?,?,?,?,?)', [newstitle, newstype, newsimg, newstime, newssrc], function(err, result) {

        if (err) {
            throw err;
        } else {
            var data = { code: '200', code_decoration: '添加成功' };
            res.send(data);
        }

    });

});

module.exports = router;
