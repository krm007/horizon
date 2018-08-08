window.onload = function () {
    //添加分类
    addwork();
    //删除分类
    delwork();
    //修改分类
    updatework();

    //添加公告
    addinform();
    delinform();
    updateinform();

    workpost();
    delpost();
}
// 分类信息
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
function delwork() {
    $(".del").click(function () {
        if (!confirm('确认删除？')) {
            return;
        }
        let $wid = $(this).attr('wid');
        let that = this;
        $.ajax({
            url: '/admin/work/del',
            type: 'POST',
            dataType: 'JSON',
            data: { wid: $wid },
            success: function (result) {
                if (result.r == 'ok') {
                    $(that).parent().parent().remove();
                }
            }
        });
    });
}
function updatework() {
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
                wid: $('#wid').val(),
                wname: $('#wname').val()
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


//公告信息
function addinform() {
    $('#addinformsubmit').click(function () {
        //直接把数据提交到服务器
        $.ajax({
            url: '/admin/inform/addinformsubmit',
            type: 'POST',
            data: $('#addinform').serialize(),
            dataType: 'JSON',
            success: function (data) {
                if (data.r == 'ok') {
                    window.location.href = '/admin/inform/';
                }
            }
        });
    });

}
function delinform() {
    $(".delinform").click(function () {
        if (!confirm('确认删除？')) {
            return;
        }
        let $inid = $(this).attr('inid');
        let that = this;
        $.ajax({
            url: '/admin/inform/del',
            type: 'POST',
            dataType: 'JSON',
            data: { inid: $inid },
            success: function (result) {
                if (result.r == 'ok') {
                    $(that).parent().parent().remove();
                }
            }
        });
    });
}
function updateinform(){
    $('#updateinformsubmit').click(function () {
        if (!$('#intitle').val()) {
            $().focus();
            return;
        }
        $.ajax({
            url: '/admin/inform/updateinformsubmit',
            type: 'POST',
            dataType: 'JSON',
            data: $('#updateinform').serialize(),
            success: function (result) {
                console.log(result);
                if (result.r == 'ok') {
                    window.location.href = '/admin/inform/';
                }
            }
        });
    });
}


//作品发布列表
// 根据分类筛选作品
function workpost() {
    $('.csearch').change(function () {
        window.location.href = '/admin/post?wid=' + $(this).val();
    });
}
function delpost() {
    $(".delpost").click(function () {
        if (!confirm('确认删除？')) {
            return;
        }
        let $pid = $(this).attr('pid');
        let that = this;
        $.ajax({
            url: '/admin/post/del',
            type: 'POST',
            dataType: 'JSON',
            data: { pid: $pid },
            success: function (result) {
                if (result.r == 'ok') {
                    $(that).parent().parent().remove();
                }
            }
        });
    });
}