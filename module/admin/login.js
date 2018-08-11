const md5 = require('md5');
module.exports = function () {
    let router = express.Router();
    //展示登录页面
    router.get('/', (req, res) => {
        res.render('admin/login');
    });
    //处理登录验证
    router.post('/', (req, res) => {
        let sql = 'SELECT aid,username,passwd FROM admin WHERE username=? LIMIT 1';
        mydb.query(sql, req.body.username, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ r: 'db_err' });
                return;
            }
            if (!result.length) {
                res.json({ r: 'username_not_exist' });
                return;
            }
            if (md5(req.body.passwd) != result[0].passwd) {
                res.json({ r: 'passwd_err' });
                return;
            }
            //session处理
            req.session.aid = result[0].aid;
            req.session.username = result[0].username;
            //更新登录信息、
            let upsql = 'UPDATE admin SET loginnum=loginnum+1,lastlogin=?,ip=? WHERE aid=? LIMIT 1'; 
            mydb.query(upsql, [new Date().toLocaleString(), req.ip, result[0].aid], (err, result) => {
                if (err) { console.log(err); }
                res.json({ r: 'ok' });
            });
        });
    });

    //退出登录
    router.get('/logout',(req,res)=>{
        //清除session信息，跳转登录页面
        delete req.session.aid;
        res.redirect('/admin/login');
    });


    // 修改密码
    router.get('/updatepw',(req,res)=>{
        if(!req.session.aid){
            res.redirect('/admin/login');
            return ;
        }
        res.render('admin/updatepw', {username: req.session.username});
    });
    //修改密码操作
    router.post('/changepw', (req, res) => {
    //你要进到这个页面，必须登录
    if(!req.session.aid){
        res.redirect('/admin/login');
        return ;
    }
    //接收post过来的数据
    let oldpw = req.body.oldpw;
    let passwd = req.body.passwd;
    //验证历史密码是不是正确
    let sql = 'SELECT passwd FROM admin WHERE aid = ?';
    mydb.query(sql, req.session.aid, (err, data)=>{
        if (err) {
            //数据库操作错误
            res.json({r: 'db_err'}); 
            return;
        }
        //验证原始密码是不是正确
        if(md5(oldpw) != data[0].passwd){
             //原始密码错误
            res.json({r: 'oldpw_err'});
            return;
        }
        //更新新密码到数据库
        let upsql = 'UPDATE admin SET passwd = ? WHERE aid = ? LIMIT 1';
        mydb.query(upsql, [md5(passwd), req.session.aid], (err, data)=>{
            if (err) {
                res.json({r: 'update_db_err'});
                return;
            }
            res.json({r:'ok'});
        });
    });
})
    return router;
}