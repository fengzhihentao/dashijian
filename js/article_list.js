$(function(){
    // 动态加载分类数据
    // 获取分类数据，实现动态渲染
    function cateinit() {
        $.ajax({
            url: bignews.category_list,
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    $('#selCategory').html(template('cateTemp', res))
                }
            }
        })
    }
    cateinit()

    let page = 1 // 当前页码，当前第一页
    let perpage = 10 // 每页所显示的数量
    let total
    // 数据初始化--封装函数
    function init(){
        $.ajax({
            type:'get',
            url:bignews.article_query,
            data:{
                page,
                perpage,
                // 添加分类筛选条件
                type:$('#selCategory').val(),
                // 添加文章状态筛选条件
                state:$('#selStatus').val()
            },
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    // 动态生成文章列表页
                    $('tbody').html(template('articleTemp',res.data))
                    // 同时生成分页结构
                    // totalPage:后台返回的数据，这个数据就是总页数
                    // 总记录数 totalCount
                    total = res.data.totalCount
                    setPage(page,res.data.totalPage)
                }
            }
        })
    }
    init();

    // 自动生成分页结构，且实现分页功能
    // pageCurrent：当前页码
    // total:总页数
    function setPage(pageCurrent, total) {
        // $(".pagination")是我们需要放置分页结构的元素
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页--页码
            currentPage: page,
            // 总页数
            totalPages: total,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event,originalEvent,type,cpage) {
                // cpage:就是用户当前所单击的页码，我们就需要获取这个页码所对应的分页数据
                // 把当前点击的页码赋值给全局页码变量, 再调用ajax,渲染页面
                // console.log(cpage)
                // 将当前用户所单击的页码重置全局的页码
                page = cpage
                // 根据现在的页码重新发起ajax请求并实现动态渲染
                init()
            }
        })
    }

    // 筛选
    $('#btnSearch').on('click',function(e){
        // 阻止默认行为
        e.preventDefault()
        // 获取下拉列表所选择的数据，是通过value属性
        // 如果用户没有设置value属性，则获取option标签之间的值
        // 如果设置了value属性，则获取value属性的值
        // console.log($('#selCategory').val())
        // 将页码重置到第一页,如果没有重置，会选择通过之前的碝页码查询不到数据
        page = 1
        init()
    })

    // 文章列表中的“发表文章”，让左侧导航项对应项被选中
    $('#release_btn').click(function(){
        $('.level02>li:eq(1)',window.parent.document).addClass('active').siblings().removeClass('active')
    })

    // 文章删除
    $('tbody').on('click','.deletebtn',function(){
        let id = $(this).data('id')
        $.ajax({
            type:'post',
            url:bignews.article_delete,
            data:{id},
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code == 204){ // 说明这个请求已经搞定了，记录在数据库中已经删除了，只是还没有刷新 
                    alert(res.msg)
                    // 判断刷新之前的tbody的tr的数量，如果只有一条，那么说明经过这次的删除操作，这条记录应该不存在了，则需要到上页
                    // if($('tbody').find('tr').length == 1){
                    //     if(page > 1){ // 判断是不是第一页
                    //         --page
                    //     }
                    // }

                    // -1是为了模拟当前记录已经被删除了，意味着总记录数需要-1
                    if(Math.ceil((total - 1) / perpage) < page){
                        page --
                    }

                    // 页面还没有刷新


                    // 刷新--刷新页面，重新获取数据库中的数据
                    init()
                }
            }
        })
    })
})