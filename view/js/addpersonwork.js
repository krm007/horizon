window.onload = function () {
    addwork();//添加作品图片

}
//添加作品图片
function addwork() {
    $('#uploadpic').click(function () {
        $('#images').click();
        // console.log(1223);
    });
    $('#images').change(function () {
        let formdata = new FormData();
        let files = document.querySelector('#images').files;
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            formdata.append('editimages', element);
        }
        //此处的路由对应服务器端入口文件里面处理文件的相关配置
        $.ajax({
            url: '/upload',
            type: 'POST',
            dataType: 'JSON',
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                //把图片放入div中
                let imglist = $('.imglist');
                result.data.forEach(function (item, ind) {
                    imglist.append('<img src="' + item + '">');
                });
                //保存图片的地址
                $('#imglist').val(JSON.stringify(result.data));

            }
        });
    });
}

    //把所有数据都保存到数据库
    $('#addpersonwork').click(function () {
        $.ajax({
            url: '/postcenter/savework',
            type: 'POST',
            dataType: 'JSON',
            data: $('#uploaddata').serialize(),
            success: function (data) {
                console.log(data);
                if(data.r='ok'){
                    window.location.href='/postcenter';
                }
            }
        });
    })



