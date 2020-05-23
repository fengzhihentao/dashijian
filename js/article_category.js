$(function () {
    // 获取分类数据，实现动态渲染
    function init() {
        $.ajax({
            url: bignews.category_list,
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    $('tbody').html(template('cateTemp', res))
                }
            }
        })
    }
    init()

    // 实现新增或编辑
    $('.btn_opt').on('click', function () {
        // 获取数据并进行简单的判断
        let name = $('#catename').val()
        let slug = $('#cateslug').val()
        if (name == '' || slug == '') {
            alert('请输入分类名称和别名')
            return
        }
        if ($(this).text() == '新增') { //新增
            opt(bignews.category_add, { name, slug })
        } else {
            // 编辑需要id
            opt(bignews.category_edit, { name, slug, id: $('input[name=id]').val() })
        }
    })

    // 真正的实现新增或编辑操作
    function opt(url, data) {
        // 发请求
        $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: data,
            success: function (res) {
                console.log(res)
                if (res.code == 201 || res.code == 200) { // 坑
                    // 弹出提示
                    alert(res.msg)
                    // 隐藏模态框
                    $('#mymodal').modal('hide')
                    // 清空之前的用户数据--js原生方法，可以清空表单的所有元素的值---恢复到默认值
                    $('form')[0].reset()
                    // 刷新
                    // location.reload()
                    init() // 重新加载数据
                }
            }
        })
    }

    // 删除文章分类
    $('tbody').on('click', '.btn_del', function () {
        // 原生js:dom.dataset.id  dom.dataset['id]
        // jq：$().data('id)  $().data().id
        let id = $(this).data('id')
        $.ajax({
            type: 'post',
            url: bignews.category_delete,
            data: { id },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.code == 204) {
                    alert(res.msg)
                    init()
                }
            }
        })
    })

    // 新增分类，弹出模态框
    $('#xinzengfenlei').on('click', function () {
        // 修改模态框的标题
        $('.modal-title').text('新增分类')
        // 修改按钮文本
        $('.btn_opt').text('新增')
    })

    // 编辑操作--弹出模态框
    $('tbody').on('click', '.btn_edit', function () {
        // 弹出模态框
        $('#mymodal').modal('show')
        // 修改模态框的标题
        $('.modal-title').text('编辑分类')
        // 修改按钮文本
        $('.btn_opt').text('编辑')
        // 获取自定义属性
        let data = $(this).data()
        $('#catename').val(data.name)
        $('#cateslug').val(data.slug)
        $('input[name=id]').val(data.id)
    })

    $('#mymodal').on('hidden.bs.modal', function (e) {
        $('form')[0].reset()
    })
})