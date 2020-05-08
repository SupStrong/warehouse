layui.define(["layer","jquery"],function(exports){
    var $ = layui.$
    ,admin = layui.admin
    ,table = layui.table
    ,element = layui.element
    ,layer = layui.layer
    ,laydate = layui.laydate
    ,form = layui.form;
    $('#editor').each(function(e,i){
        var _thisId = $(this).attr('id');
        if(_thisId){
            var ue = UE.getEditor(_thisId);
            ue.execCommand('serverparam','_token',$('meta[name="csrf_token"]').attr('content'));
        }
    });
    exports('editor', {});
});  