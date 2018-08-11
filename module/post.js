module.exports = function () {
    let router = express.Router();
    // 显示页面
    // router.get('/', (req, res) => {
    //     res.render('postcenter');
    // });

    // 将数据库的数据渲染到页面
    router.get('/', (req, res) => {
    let sql = 'SELECT * FROM post WHERE status=0';
    mydb.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        }
        // console.log(1);
        res.render('postcenter', { postlist:results });
    });
});
    
    //添加作品页面
    router.get('/addpersonwork', (req, res) => {
        // if (!req.session.uid) {
        //     res.redirect('login');
        //     return;
        // }
        res.render('addpersonwork');
    });
    //把接收到的数据保存到数据库
    router.post('/savework', (req, res) => {
        let rb = req.body;
        let sql = 'INSERT INTO post(pid,ptitle,username,wname,imglist,description,addtime) VALUES(?,?,?,?,?,?,?)';
        mydb.query(sql, [rb.pid, rb.ptitle,rb.username, rb.wname, rb.imglist, rb.description, new Date().toLocaleString()], (err, result) => {
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