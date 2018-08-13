const express = require('express');
const async = require('async');
module.exports = function () {

    
    const router = express.Router();
    router.use((req ,res, next)=>{
        if(!req.session.username){
            res.redirect('/login');
            return ;
        }
        next();
    });
    router.get('/', (req, res) => {
        let sql = 'SELECT * FROM post WHERE status=0';
        mydb.query(sql, (err, results) => {
            if (err) {
                console.log(err);
            };
            results.name=req.session.username;
            console.log(results);
            res.render('personal', {
                postlist: results,
                r:results.name
            });
        });
    });

    return router;
}