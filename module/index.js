const express = require('express');
module.exports = function () {
    let router = express.Router();

    // 首页
    router.get('/',(req,res)=>{
        res.render('index');
    })

    // 注册页面
    router.get('/register',(req,res)=>{
        res.render('register')
    })

    return router;
}