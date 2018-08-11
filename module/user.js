const express = require('express');
const async = require('async');
module.exports = function (){
    const router = express.Router();

    router.get('/',(req,res)=>{
        res.render('personal',{
            username:req.session.username
        })
    });

    return router;
}