const express = require('express');
const mysql = require('mysql');
const md5 = require('md5');
const svgCaptcha = require('svg-captcha');

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

    // 处理注册的数据
    router.post('/register',(req,res)=>{
        let rb = req.body;
        if(!rb.passwordone){
            res.json({r:'passwd_no'});
            return;
        }
        let sql = 'SELECT uid FROM user WHERE username = ? LIMIT 1';
        mydb.query(sql,rb.username,(err,result)=>{
            if(result.length){
                res.json({r:'username_existed'});
            }else{
                let sql = 'INSERT INTO user(username,passwd,email,tel,ip,regtime) VALUES (?,?,?,?,?,?)';
                mydb.query(sql, [rb.username, md5(rb.passwordone), rb.email, rb.tel, req.ip, new Date().toLocaleString()], (err, result)=>{
                    if(err){
                        res.json({r:'db_err'});
                    }else{
                        res.json({r:'success'});
                    }
                });
            }
        })
    })

    // 验证码
    router.get('/coderimg',(req,res)=>{
        var captcha = svgCaptcha.create({
            size:4,
            ignoreChars:'0oOliqpaPQtf',
            noise:0,
            background:'#dde0ab',
            color:true,
            width:150,
            height:42,
        });
        req.session.captcha = captcha.text;
        res.type('svg');
        res.status(200).send(captcha.data);
    })

    // 登陆页面
    router.get('/login',(req,res)=>{
        res.render('login');
    })

    // 登录验证
    router.post('/login',(req,res)=>{
        let rb = req.body;
        console.log(req.session.captcha);
        console.log(rb.coder);
        if(req.session.captcha.toLowerCase() != rb.coder.toLowerCase()){
            res.json({r:'coder_err'});
            return;
        }
        let sql = 'SELECT uid, username, passwd, tel FROM user WHERE username = ? OR tel = ? LIMIT 1';
        mydb.query(sql,[rb.username, rb.username],(err,result)=>{

            if(err){
                console.log(err)
            }
            // 账号验证
            if(!result.length){
                res.json({r:'not_exist'});
                return;
            }
            console.log(result[0]);
            
            // 密码验证
            if(md5(rb.passwordone) !=result[0].passwd){
                res.json({r:'pw_err'});
                return;
            }else{
                res.json({r:'success'});
            }
        })
    })

    return router;
}