window.onload = function (){
    register();
    login();
    codeimg();
}

// 用户注册页面
function register (){
$('.regbtn').click(function(){
    $.ajax({
        url:'/register',
        type:'post',
        dataType:'JSON',
        data:$('#regform').serialize(),
        success:function (result){
            if(result.r == 'success'){
                window.location.href = '/login';
            }else if(result.r == 'username_existed'){
                $('#username').next('span').html('账号已存在,请重新注册');
                $('#username').focus();
            }else{
                alert('出现了不可预知的错误');
            }
        }
    })
});
}

// 用户登陆界面
function login(){
    $('.login').click(function(){
        $.ajax({
            url:'/login',
            type:'POST',
            data:$('#loginform').serialize(),
            dataType:'JSON',
            success:function(result){
                if(result.r == 'success'){
                    window.location.href = '/';
                }else if(result.r == 'not_exist'){
                    $('#username').next('span').html('账号不存在，请重新输入');
                }else if(result.r == 'pw_err'){
                    $('#passwordone').next('span').html('密码错误，请重新输入');
                }else if(result.r == 'coder_err'){
                    $('#imgcoder').next('span').html('验证码错误，请重新输入');
                }
            }
        })
    })
}

function codeimg(){
    $('.codeimg').click(function(){
        $(this).attr('src','/coderimg?'+new Date());
    })
}