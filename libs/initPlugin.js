$(function(){
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
})