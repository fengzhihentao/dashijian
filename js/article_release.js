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

    // 封面处理--只是实现预览，图片数据将来会在发布文章的时候一起传递给后台
    $('#inputCover').change(function () {
        // 1.获取图片对象
        let myfile = $('#inputCover')[0].files[0]
        // 2.根据图片对象创建一个url
        let url = URL.createObjectURL(myfile)
        // 3.将url赋值给img标签
        $('.article_cover').attr('src', url)
    });

    // 发布日期
    // elem:指定的元素
    // options：配置选项
    // jeDate(elem, options)
    //或者为这样的
    jeDate("#articleDate", {
        trigger: 'click',
        theme: { bgcolor: "#ff0000", pnColor: "#00DDAA" },//绿色主题
        format: "YYYY-MM-DD", // 年月日
        isinitVal: true
    })
    // 初始化富文本框--richTextBox
    tinymce.init({
        selector: '#articleContent',
        height:'350px', // 高度
        language: 'zh_CN', // 语言，如果没有设置则默认为英文
        directionality: 'ltl', // 对齐方向
        browser_spellcheck: true, // 是否启用拼写检查
        contextmenu: false, // 右键菜单
        plugins: [ // 插件
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste imagetools wordcount",
            "code"
        ],
        // 下面是工具条
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
    });


    // 发布文章
    $('.btn-release').click(function (e) {
        e.preventDefault()
        articleOpt('已发布')
    })
    // 将文章存储的草稿
    $('.btn-draft').click(function(e){
        e.preventDefault()
        articleOpt('草稿')
    })

    // 文章发布或者存储为草稿
    function articleOpt (state){
        // 判断图片有没有选择，如果没有选择则提示他一定要选择图片
        // console.log(tinymce.activeEditor.getContent())
        let formdata = new FormData($('#form')[0])
        // 追加文章内容到formdata
        formdata.append('content',tinymce.activeEditor.getContent())
        // 添加state参数
        formdata.append('state',state)
        $.ajax({
            type: 'post',
            url: bignews.article_publish,
            data: formdata,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (res) {
                // console.log(res)
                // 给出提示
                if(res.code == 200){
                    alert(res.msg)
                    $('.level02>li:eq(0)',window.parent.document).addClass('active').siblings().removeClass('active')
                    // 跳转回文章列表页面
                    location.href='./article_list.html'
                }
            }
        })
    }
})