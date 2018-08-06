window.onload = function () {
    //管理员登录界面
    login();
}

//管理员登录界面
function login() {
    $('.loginbtn').click(function () {
        $('.form-group').removeClass('has-error');
        //验证账号和密码
        let usernameReg = /^[\w\u4e00-\u9fa5]{2,12}$/i;
        if (!usernameReg.test($('#username').val())) {
            $('#username').focus();
            $('#username').parent().parent().addClass('has-error');
            return;
        }
        if ($('#passwd').val().length < 6 || $('#passwd').val().length > 16) {
            $('#passwd').focus();
            $('#passwd').parent().parent().addClass('has-error');
            return;
        }
        //ajax请求
        $.ajax({
            url: '/admin/login',
            type: 'POST',
            dataType: 'JSON',
            data: $('#loginform').serialize(),
            success: function (result) {
                if (result.r == 'ok') {
                    window.location.href = '/admin/work'

                }
            }
        });
    });
}
