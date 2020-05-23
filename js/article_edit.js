$(function () {
    // 分类数据的动态加载
    // 动态加载分类数据
    // 获取分类数据，实现动态渲染
    function cateinit() {
        $.ajax({
            url: bignews.category_list,
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    $('.category').html(template('cateTemp', res))
                }
            }
        })
    }
    cateinit()

    // 实现图片预览
    $('#inputCover').change(function () {
        // 1.获取图片对象
        let myfile = $('#inputCover')[0].files[0]
        // 2.根据图片对象创建一个url
        let url = URL.createObjectURL(myfile)
        // 3.将url赋值给img标签
        $('.article_cover').attr('src', url)
    });


    // 获取编辑文章时所传入的文章id
    let id = itcast.getArguments(location.search).id
    // 根据文章id获取文章详情数据
    $.ajax({
        url: bignews.article_search,
        data: { id },
        dataType: 'json',
        success: function (res) {
            console.log(res)
            // dom操作
            if (res.code == 200) {
                $('#inputTitle').val(res.data.title)
                // 下拉列表
                $('.category').val(res.data.categoryId)
                // 文章封面
                $('.article_cover').attr('src',res.data.cover)
                // 发布时间
                $('#articleDate').val(res.data.date)
                // 富文本框:当赋值给文本域之后，插件会默认的将数据镜像到插件中
                $('#articleContent').val(res.data.content)
                // 正宗的为富文本框赋值的方法
                // 如果你使用下面这种方式，那有一种可能：由于tinymce插件比较的庞大，有可能在数据请求已经完成的时候，插件还没有加载完毕
                // setTimeout(() => {
                    // tinymce.activeEditor.setContent(res.data.content)
                // }, 200);
            }
        }
    });

    // 修改操作
    $('.btn-edit').click(function(e){
        e.preventDefault()
        // console.log(tinymce.activeEditor.getContent())
        opt('已发布')
    })
    // 存储为草稿
    $('.btn-draft').click(function(e){
        e.preventDefault()
        // console.log(tinymce.activeEditor.getContent())
        opt('草稿')
    })

    // 实现编辑或存储为草稿
    function opt(state){
        // formdata收集数据:收集  标题 ，分类  ，图片，时间
        let formdata = new FormData($('form')[0])
        // 追加富文本框的数据
        formdata.append('content',tinymce.activeEditor.getContent())
        // 追加id
        formdata.append('id',id)
        // 追加状态
        formdata.append('state',state)

        // ajax请求
        $.ajax({
            type:'post',
            url:bignews.article_edit,
            data:formdata,
            dataType:'json',
            processData:false,
            contentType:false,
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    alert(res.msg)
                    // 刷新---重新回到文章列表页
                    location.href = './article_list.html'
                    // back()并不会实现真正的重新加载，而是从缓存中获取
                    // history.back()
                }
            }
        })
    }
})