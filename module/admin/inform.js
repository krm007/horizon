module.exports = function () {
    let router = express.Router();
    // 判断是否登录
    router.use((req, res, next) => {
        if (!req.session.aid) {
            res.redirect('/admin/login');
            return;
        }
        next();
    });
    //显示公告信息管理页面
    router.get('/', (req, res) => {
        
        let sql = 'SELECT * FROM inform WHERE status = 0';
        mydb.query(sql, (err, result) => {
            // console.log("hello")
            // console.log(result)
            res.render('admin/informlist', { informlist: result });
        });
    });

    //添加公告信息
    router.get('/addinform', (req, res) => {
        res.render('admin/addinform');
    });
    router.post('/addinformsubmit', (req, res) => {
        let sql = 'INSERT INTO inform(intitle,incontent,username,addtime) VALUES(?,?,?,?)';
        mydb.query(sql, [req.body.intitle,req.body.incontent,req.session.username, new Date().toLocaleString()], (err, result) => {
            if (err) {
                console.log(err);
                res.json({ r: 'db_err' });
                return;
            }
            res.json({ r: 'ok' });
        });
    });
    //删除公告信息
    router.post('/del',(req,res)=>{
        let delsql='UPDATE inform SET status=1 WHERE inid=?';
        mydb.query(delsql,req.body.inid,(err,result)=>{
            if (err) {
                console.log(err);
                res.json({ r: 'db_err' });
                return;
            }
            res.json({ r: 'ok' });
        });
    });
    //修改公告信息
    router.get('/update',(req,res)=>{
        let sql = 'SELECT * FROM inform WHERE status = 0 AND inid=? LIMIT 1';
        mydb.query(sql, req.query.inid,(err, result) => {
            // console.log(result);
            // console.log(result[0]);
            res.render('admin/updateinform', { inform: result[0]});
        });
    });
    router.post('/updateinformsubmit',(req,res)=>{
        let upsql='UPDATE inform SET intitle=?,incontent=?,updatetime=? WHERE inid=? LIMIT 1';
        mydb.query(upsql,[req.body.intitle,req.body.incontent,new Date().toLocaleString(),req.body.inid],(err,result)=>{
            if (err) {
                console.log(err);
                res.json({ r: 'db_err' });
                return;
            }
            res.json({ r: 'ok' });
    
        });
    });

    
    return router;
}
