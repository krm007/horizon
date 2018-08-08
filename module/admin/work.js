module.exports = function () {
    let router = express.Router();
    //判断是否登录
    router.use((req, res, next) => {
        if (!req.session.aid) {
            res.redirect('/admin/login');
            return;
        }
        next();
    });
    //显示分类管理页面
    router.get('/', (req, res) => {
        let sql = 'SELECT * FROM work WHERE status = 0';
        mydb.query(sql, (err, result) => {
            // console.log("hello")
            // console.log(result)
            res.render('admin/worklist', { worklist: result });
        });
    });

    //添加分类信息
    router.get('/addwork', (req, res) => {
        res.render('admin/addwork');
    });
    router.post('/addworksubmit', (req, res) => {
        let sql = 'INSERT INTO work(wname,aid,username,addtime) VALUES(?,?,?,?)';
        mydb.query(sql, [req.body.wname, req.session.aid, req.session.username, new Date().toLocaleString()], (err, result) => {
            if (err) {
                console.log(err);
                res.json({ r: 'db_err' });
                return;
            }
            res.json({ r: 'ok' });
        });
    });
    //删除分类信息
    router.post('/del',(req,res)=>{
        let delsql='UPDATE work SET status=1 WHERE wid=?';
        mydb.query(delsql,req.body.wid,(err,result)=>{
            if (err) {
                console.log(err);
                res.json({ r: 'db_err' });
                return;
            }
            res.json({ r: 'ok' });
        });
    });
    //修改分类信息
    router.get('/update',(req,res)=>{
        let sql = 'SELECT * FROM work WHERE status = 0 AND wid=? LIMIT 1';
        mydb.query(sql, req.query.wid,(err, result) => {
            // console.log(result);
            // console.log(result[0]);
            res.render('admin/updatework', { work: result[0]});
        });
    });
    router.post('/updateworksubmit',(req,res)=>{
        let upsql='UPDATE work SET wname=?,updatetime=? WHERE wid=? LIMIT 1';
        mydb.query(upsql,[req.body.wname,new Date().toLocaleString(),req.body.wid],(err,result)=>{
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
