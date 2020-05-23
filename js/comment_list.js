$(function () {
    // 页码      每页数量
    let page = 1, perpage = 10

    // 1.数据初始化
    function init() {
        // console.log(location.pathname)
        $.ajax({
            // 如果没有设置合理的url,在ajax中默认为pathname,pathname就是当前页面的url
            url: bignews.comment_search,
            data: {
                page,
                perpage
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                // 生成评论列表
                $('tbody').html(template('commentTemp', res.data))
                // 生成对应的分页结构
                setPage(res.data.totalPage)
            }
        })
    }
    init()

    // 分页
    // pageSum:总页数
    function setPage(pageSum) {
        $("#pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: page,
            // 总页数
            totalPages: pageSum,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event, originalEvent, type, cpage) {
                // 把当前点击的页码赋值给
                // cpage:就是用户当前所单击的页码，我们需要让ajax根据这个页码重新的获取数据，进行动态渲染
                page = cpage
                init()
            }
        })
    }

    // 委托方式绑定事件
    // 批准评论
    $('tbody').on('click', '.btnAccept', function () {
        // 获取id
        // let id = $(this).data('id')
        let id = $(this).data().id
        // ajax
        $.ajax({
            type: 'post',
            url: bignews.comment_pass,
            data: { id },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if(res.code == 200){
                    init()
                }
                alert(res.msg)
            }
        })
    })

    // 拒绝评论
    $('tbody').on('click', '.btnReject', function () {
        let id = $(this).data().id
        // ajax
        $.ajax({
            type: 'post',
            url: bignews.comment_reject,
            data: { id },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if(res.code == 200){
                    init()
                }
                alert(res.msg)
            }
        })
    })

    // 删除评论
    $('tbody').on('click', '.btnDelete', function () {
        let id = $(this).data().id
        // ajax
        $.ajax({
            type: 'post',
            url: bignews.comment_delete,
            data: { id },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if(res.code == 200){
                    init()
                }
                alert(res.msg)
            }
        })
    })
})