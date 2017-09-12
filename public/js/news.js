var type = "精选";

$(function() {
    refreshNews(type);
    $("nav a").click(function(e) {
        e.preventDefault();
        var type = $(this).text();
        refreshNews(type);
    })

});



function refreshNews(type) {


    var $lists = $("article ul");
    $lists.empty();

    // 记住AJAX的固定格式为$.ajax({});
    $.ajax({
        url: '/news',
        type: 'get',
        datatype: 'json',
        // 往服务器方向发送我们的DATA
        data: { newstype: type },
        success: function(data) {
            console.log(data);
            data.forEach(function(item, index, array) {
                    // 这个变量接收一对LI标签元素
                    var $list = $("<li></li>").addClass("news-list").prependTo($lists);
                    var $newsImg = $("<div></div>").addClass("newsimg").appendTo($list);
                    var $img = $("<img>").attr("src", item.newsimg).appendTo($newsImg);
                    var $newsContent = $("<div></div>").addClass("newscontent").appendTo($list);
                    var $h1 = $("<h1></h1>").html(item.newstittle).appendTo($newsContent);
                    var $p = $("<p></p>").appendTo($newsContent);
                    var $newsTime = $("<span></span>").addClass("newstime").html(item.newstime).appendTo($p);
                    var $newsSrc = $("<span></span>").addClass("newssrc").html(item.newssrc).appendTo($p);
                })
                // alert("能连到PHP获取数据");
                // console.log(data);
        }

    });


}
