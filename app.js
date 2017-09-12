// 想问一下老师app.js是什么？概念是主程序文件？
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index'); //主页.js
var users = require('./routes/users'); //后台管理.js

var app = express();

// view engine setup
// views又叫什么，设置在/views子目录下，会生成VIEWS这个文件么？
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 请求数据之前的中间件处理？是模板-路径view渲染的地方么???
app.use(express.static(path.join(__dirname, 'public')));
// 使用路由指向处理，这个很流行 index.js由上面引入由回调函数处理。。
// 将这个请求改掉,也就是说监听服务器的3000端口，有发往NEWS的请求后就进入到以下这个路由文件当中
app.use('/news', index);
// 监听服务器的3000端口，有发往admin的请求后就进入到以下这个路由文件当中
app.use('/admin', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
