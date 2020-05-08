layui.define(function(exports){
    var admin = layui.admin;
    
// 提交
    form.on('submit(layui-form-submit)', function(data){
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        // 提交 Ajax 成功后，关闭当前弹层并重载表格
        var url = this.getAttribute('data-url');
        form.render('checkbox');
        $.ajax({
            type: "POST",
            async: false,
            dataType: "json",
            url: url,
            data: field,
            success: function(res) {
                if (res.code ==0) {
                    message.success(res.message);
                    parent.layui.table.reload('table-index-list'); //重载表格  table-index-list：表格名称
                    parent.layer.close(index); //再执行关闭
                }else {
                    message.error(res.message);
                }
            },
            error: function (res){
                message.error(res.message);
            }
        });
    });
});
