const fs = require('fs');
const path = require('path');
const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

const server = express();


// 模板引擎相关设置
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');
server.set('views', 'view');

//数据库连接
global.mydb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'horizon'
});
mydb.connect();

// 启用cookice bodyParser,并设置签名密钥
let cookiesigned = 'horizon';
server.use(cookieParser(cookiesigned));

// 启用session相关的中间件
server.use(session({
    secret: cookiesigned,
    name: 'sessid',
    resave: true, //每次发起请求的时候，有效时间要不要重新及时
    saveUninitialized: false,
    cookie: {maxAge: 1800 * 1000}
}));

// 接受post过来的所有数据
server.use(bodyParser.urlencoded({
    extended: true
}));

// 静态资源托管
server.use('/uploads', express.static('uploads'));
server.use(express.static('view'));

// 端口号
server.listen(81);