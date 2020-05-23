$(function() {
    // 登录页面功能实现
    // 鼠标点击input_btn按钮时实现登录功能
    $('#input_btn').on('click', function() {
            // 获取用户名及密码
            var username = $('.input_txt').val().trim();
            var password = $('.input_pass').val().trim();
            console.log(username, password);
            // 非空判断
            if (username == '' || password == '') {
                // alert('输入有误请重新输入')
                $('#myModal').modal('show')
                $('.logininfo').text('用户名与密码不能为空')
                console.log(123);
                return;
                console.log(123);
            }
            $.ajax({
                // 项目基地址：http://localhost:8080/api/v1
                // 1、用户登录
                // 请求地址：/admin/user/login
                // 请求方式：post
                type: 'post',
                url: 'http://localhost:8080/api/v1/admin/user/login',
                dataType: 'json',
                data: {
                    // 接口一定一定要参照后台来写
                    username,
                    password
                },
                success: function(res) {
                    console.log(res);
                    if (res.code == 200) {
                        // 先弹出模态框
                        $('#myModal').modal('show')
                        $('.logininfo').text(res.msg)
                            // hidden.bs.modal	此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发。
                        $('#myModal').on('hidden.bs.modal', function(e) {
                            localStorage.setItem('bignews_token', res.token)
                            location.href = './index.html'
                        })
                    } else {
                        $('#myModal').modal('show')
                        $('.logininfo').text(res.msg)
                    }
                }
            })
        })
        // 单击模态框确定按钮隐藏模态框
    $('.btnconfirm').on('click', function() {
        $('#myModal').modal('hide')
    })
})