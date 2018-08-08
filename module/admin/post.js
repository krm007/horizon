const async=require('async');
module.exports = function () {
    let router = express.Router();
    //判断是否登录
    // router.use((req, res, next) => {
    //     if (!req.session.aid) {
    //         res.redirect('/admin/login');
    //         return;
    //     }
    //     next();
    // });

    //显示作品管理页面
    router.get('/', (req, res) => {
        let wid = req.query.wid ? req.query.wid : 0;
        wid = parseInt(wid);
        
        //当前页面
        let page = req.query.page ? req.query.page : 1;
        //每页显示多少条
        let pagenum = 1;
        //总页数
        let totalpage= 1;
        //链接地址扩展信息
        let urlext = '';
        async.series({
            worklist: function (cb) {
                //获取分类信息
                let sql = 'SELECT wid, wname FROM work WHERE status = 0';
                mydb.query(sql, (err, results) => {
                    cb(null, results);
                });
            },
            totalnums: function (cb) {
                //查询满足条件的记录数
                let sql = `SELECT count(pid) AS totalnums FROM post WHERE status = 0`;
                //根据分类查询试题
                if (wid) {
                    sql += ` AND wid = ${wid}`;
                    urlext += `&wid=${wid}`;
                }
                mydb.query(sql, (err, result) => {
                    console.log(err);
                    //返回总记录数
                    cb(null, result[0].totalnums);
                });
            },
            postlist: function (cb) {
                //查询所有的试题并显示到页面
                let sql = `SELECT p.pid, p.ptitle, p.username,p.addtime,p.uploadnums,p.zannums, w.wname 
                           FROM post AS p 
                           LEFT JOIN work AS w ON p.wid = w.wid 
                           WHERE p.status = 0`;
                //根据分类查询试题
                if (wid) {
                    sql += ` AND p.wid = ${wid}`;
                }
            
                //查询当前页应该显示的记录
                sql += ` LIMIT ${pagenum * (page - 1)},${pagenum}`;
                mydb.query(sql, (err, result) => {
                    cb(null, result);
                });
            }

        }, (err, results) => {
            results.wid = wid;
            //totalnums  存的是满足条件的总记录数
            //计算总页数
            totalpage = Math.ceil(results.totalnums / pagenum);
            results.totalpage = totalpage;
            results.page = page;
            //显示前后3页  end - start = showpage - 1        6  7  8  9  10  11  12
            let showpage = 7;
            let start = page - Math.ceil((showpage-1)/2);
            let end = page + Math.floor((showpage-1)/2);
            //开始页数不能小于  1
            if(start < 1){
                start   = 1;
                end     = showpage - 1 + start;
            }
            //结束页码不能大于总页数
            if(end > totalpage){
                end     = totalpage;
                start   = end + 1 - showpage;
                //开始页数不能小于  1
                if(start < 1){
                    start = 1;
                }
            }
            results.start = start;
            results.end = end;
            //链接地址里面查询信息
            results.urlext = urlext;
            res.render('admin/postlist', results);
        });

       
});


//删除作品信息
router.post('/del',(req,res)=>{
    let delsql='UPDATE post SET status=1 WHERE pid=?';
    mydb.query(delsql,req.body.pid,(err,result)=>{
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
