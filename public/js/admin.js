// 打开页面的时候后，发送请求，刷新新闻列表；　 ////////////////////////////// //
///////////////////////////////////////////////////////////


$(function() {
    // 　第一部：自定义的一个表体全局变量。。有内容时预刷新
    var $newsTable = $("#newstable tbody");
    refreshNews();

    　
    // 第二部：提交新闻按钮　添加新闻的开始
    $("#btnsubmit").click(function(e) {
        // alert("您点到我了");
        e.preventDefault();

        //（1）表单输入的判断 为空的及其它情况的进行处理
        if ($("#newstitle").val() === "" || $("#newsimg").val() === "" || $("#newstime").val() === "" || $("#newstype").val() === "" || $("#newssrc").val() === "") {
            // 第一种处理
            if ($("#newstitle").val() === "") {
                $("#newstitle").parent().addClass('has-error');
            } else {
                $("#newstitle").parent().removeClass('has-error');
            }
            // 第二种处理
            if ($("#newsimg").val() === "") {
                $("#newsimg").parent().addClass('has-error');
            } else {
                $("#newsimg").parent().removeClass('has-error');
            }
            // 第三种处理
            if ($("#newstime").val() === "") {
                $("#newstime").parent().addClass('has-error');
            } else {
                $("#newstime").parent().removeClass('has-error');
            }
            // 第四种处理
            if ($("#newssrc").val() === "") {
                $("#newssrc").parent().addClass('has-error');
            } else {
                $("#newssrc").parent().removeClass('has-error');
            }
        } else {

            var jsonNews = {
                newstitle: $("#newstitle").val(),
                newstype: $("#newstype").val(),
                newsimg: $("#newsimg").val(),
                newstime: $("#newstime").val(),
                newssrc: $("#newssrc").val()
            };
            // console.log(jsonNews);
            //（2）提交添加
            $.ajax({
                url: '/admin/insert',
                type: 'post',
                // DATA指定把JSONNEWS的数据发送出去
                data: jsonNews,
                // 传送数据格式的规定
                datatype: 'json',
                success: function(data) {
                    // console.log(data);
                    // 让数据更加条理化，清空处理刷新内容
                    $("#newstitle").val('');
                    $("#newstype").val('');
                    $("#newsimg").val('');
                    $("#newstime").val('');
                    $("#newssrc").val('');
                    refreshNews();
                }
            });

        }

    });
    //添加新闻的结束

    // 第三大部分
    // 
    // 
    // 
    // 第一：删除新闻功能
    　
    var deleteId = null;
    //触发删除按钮
    $newsTable.on("click", ".btn-danger", function(e) {
        $("#deleteModal").modal("show");
        deleteId = $(this).parent().prevAll().eq(3).html();
        // console.log(deleteId);
    });

    // 删除事件的业务逻辑 一点打到匹配ID值进行数据库处理
    $("#deleteModal #confirmDelete").click(function(e) {

        // alert("点删除");
        // var jsondata = [
        //     { "succode": "1000", " message": "有权限删除", "newsid":" deleteId" },
        //     { "succode": "1001", " message": "无权限删除", "contnet": "未授权删除" }
        // ];

        if (deleteId) {
            $.ajax({
                // 路径是路由指向到/admin/delete...
                url: '/admin/delete',
                type: 'post',
                datatype: 'json',
                data: {newsid:deleteId},
                success: function(data) {
                    // 如何根据状态码进行安全判断， 老师在批改我的作业的时候没有讲清思路？？
                    if (data.succode = '1000') {
                        console.log(data.message);
                        $("#deleteModal").modal("hide");
                        refreshNews();
                    } else if (data.succode = '1001') {
                        console.log(data.message);
                    }
                }

            });

        }
    });



    //第二：修改新闻功能
    var updateId = null;
    // 触发修改按钮  思考一下这个点击的时候会发生什么:实时反映内容
    $newsTable.on("click", ".btn-primary", function(e) {
        $("#updateModal").modal("show");
        // 这时需要找到当前点击的哪一行IDEX么？
        updateId = $(this).parent().prevAll().eq(3).html();
        // AJAX可以指定传送数据给后台处理也可监听后台处理出来的数据进行异步刷新？
        $.ajax({
            url: '/admin/curnew',
            type: 'get',
            datatype: 'json',
            // 传送点击"修改"当前记录的ID
            data: { newsid: updateId },
            success: function(data) {
                // console.log(data);
                // 如果接收到数据对弹出的表单BODY进行接收更新
                $("#unewstitle").val(data[0].newstittle);
                $("#unewstype").val(data[0].newstype);
                $("#unewsimg").val(data[0].newsimg);
                $("#unewssrc").val(data[0].newssrc);
                // 进行空格分隔？可以取得年月日的部分值得深究
                var utime = data[0].newstime.split('T')[0];
                $("#unewstime").val(utime);

            }
        });
        // console.log(updateId);


    });


    // 弹出窗的确认按钮功能
    $("#updateModal #confirmUpdate").click(function(e) {
        // console.log(updateId);

        $.ajax({
            url: '/admin/update',
            type: 'post',
            datatype: 'json',
            data: {
                newstitle: $("#unewstitle").val(),
                newsimg: $("#unewsimg").val(),
                newstime: $("#unewstime").val(),
                newstype: $("#unewstype").val(),
                newssrc: $("#unewssrc").val(),
                id: updateId

            },
            success: function(data) {
                // 为什么加上这些判断就老是更新失败了呢？
                // console.log(data);
                // if (data.message == 'success') {
                //     alert("插入数据成功了,恭喜");
                //     $("#updateModal").modal("hide");
                //     refreshNews();
                // } else {
                //     alert("数据更新失败");
                // }

                $("#updateModal").modal("hide");
                refreshNews();

            }

        });

    });








    // refreshNews()的开始　

    function refreshNews() {

        //empty table使用
        $newsTable.empty();

        // 通过$.ajax({参数})动态添加，链接到'../baidunews/server/getnews.php'
        $.ajax({
            type: 'get',
            // 这里的路径要注意指向　
            url: '/admin/getnews',
            datatype: 'json',

            success: function(data) {
                // console.log(data);
                data.forEach(function(item, index, array) {
                    var $tdid = $('<td>').html(item.id);
                    var $tdtittle = $('<td>').html(item.newstittle);
                    var $tdtype = $('<td>').html(item.newstype);
                    // var $tdimg = $('<td>').html(item.newsimg);
                    // var $tdsrc = $('<td>').html(item.newssrc);
                    var $tdtime = $('<td>').html(item.newstime);
                    var $tdctrl = $('<td>');
                    var $btnupdate = $('<button>').addClass('btn btn-primary btn-xs').html('修改');
                    var $btndelete = $('<button>').addClass('btn btn-danger btn-xs').html('删除');
                    $tdctrl.append($btnupdate, $btndelete);
                    var $tRow = $('<tr>');
                    $tRow.append($tdid, $tdtittle, $tdtype, $tdtime, $tdctrl);
                    // var $newsTable = $("#newstable tbody");
                    $newsTable.append($tRow);
                });

            }
        });
    }

    // refreshNews()的结束　



});
