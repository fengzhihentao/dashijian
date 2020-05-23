// 封装所有的请求url,以后在每个页面中都可能会使用
// 如果将这些url封装到一个对象中，如下面这种方式，同学们，有什么缺点？每个文件中都需要引入
// 可以使用沙箱,每个页面都能使用一个共同的window
(function(w){
    // 基准路径
    let baseURL = 'http://localhost:8080/api/v1'
    var bignews = {
        // 封装一个一个的请求url
        user_login:      baseURL + '/admin/user/login',// 用户登陆
        user_info:       baseURL + '/admin/user/info', // 获取用户信息
        user_detail:     baseURL + '/admin/user/detail',//用户详情
        user_edit:       baseURL + '/admin/user/edit',//用户编辑
        category_list:   baseURL + '/admin/category/list',//文章类别查询
        category_add:    baseURL + '/admin/category/add',//文章类别新增
        category_search: baseURL + '/admin/category/search',//文章类别搜索
        category_edit:   baseURL + '/admin/category/edit',//文章类别编辑
        category_delete: baseURL + '/admin/category/delete',//文章类别删除
        article_query:   baseURL + '/admin/article/query',//文章搜索
        article_publish: baseURL + '/admin/article/publish',//文章发布
        article_search:  baseURL + '/admin/article/search',//文章信息查询
        article_edit:    baseURL + '/admin/article/edit',//文章编辑
        article_delete:  baseURL + '/admin/article/delete',//文章删除
        comment_search:  baseURL + '/admin/comment/search',//文章评论列表
        comment_pass:    baseURL + '/admin/comment/pass',//文章评论通过
        comment_reject:  baseURL + '/admin/comment/reject',//文章评论不通过
        comment_delete:  baseURL + '/admin/comment/delete',//文章评论删除
    }
    // 将对象挂载到window
    w.bignews = bignews
})(window)