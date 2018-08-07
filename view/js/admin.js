window.onload = function () {
    //添加分类
    addwork();
    //删除分类
    delwork();
    //修改分类
    updatework();
}
function addwork() {
    $('#addworksubmit').click(function () {
        if (!$('#wname').val()) {
            $().focus();
            return;
        }

        $.ajax({
            url: '/admin/work/addworksubmit',
            type: 'POST',
            dataType: 'JSON',
            data: $('#addwork').serialize(),
            success: function (result) {
                console.log(result);
                if (result.r == 'ok') {
                    window.location.href = '/admin/work/'
                }
            }
        });
    });
}
function delwork(){
    $(".del").click(function(){
        if(!confirm('确认删除？')){
            return;
        }
        let $wid=$(this).attr('wid');
        let that=this;
        $.ajax({
            url:'/admin/work/del',
            type:'POST',
            dataType:'JSON',
            data:{wid:$wid},
            success:function(result){
                if(result.r=='ok'){
                    $(that).parent().parent().remove();
                }
            }
        });
    });
}
function updatework(){
    $('#updateworksubmit').click(function () {
        if (!$('#wname').val()) {
            $().focus();
            return;
        }
        $.ajax({
            url: '/admin/work/updateworksubmit',
            type: 'POST',
            dataType: 'JSON',
            data: {
                wid:$('#wid').val(),
                wname:$('#wname').val()
            },
            success: function (result) {
                console.log(result);
                if (result.r == 'ok') {
                    window.location.href = '/admin/work/';
                }
            }
        });
    });
}