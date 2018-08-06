module.exports=function(){
    let router=express.Router();
    //判断是否登录

    router.get('/',(req,res)=>{
        res.render('admin/worklist');
    });

    return router;
}