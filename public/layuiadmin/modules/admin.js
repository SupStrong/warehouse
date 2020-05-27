;!function (win) {

    var Admin = function () {
    };
    /**
     * 删除提示框 confirm
     * admin.tableDataDelete(url,th,isRefresh){
     *  url 路径
     *  th  当前按钮DOM
     *  isRefresh 跳转地址
     * }
     */
    Admin.prototype.tableDataDelete = function (url, th, isRefresh) {
      layui.layer.confirm('你确认删除吗？', {
        btn: ['删除', '取消']
      }, function () {
        $.ajax({
          type: "DELETE",
          url: url,
          data:{'_token':$('meta[name="csrf_token"]').attr("content")},
          success: function(response) {
            if(response.error) {
              layui.layer.close();
              layui.layer.msg(response.message, {time: 2000, icon: 5})
            } else {
              if (isRefresh) {
                window.location = window.location.href
                return false;
              }
              $(th).parent().parent().parent().remove();
              layui.layer.close();
              layui.layer.msg("删除成功", {time: 2000, icon: 6})
            }
          },
        });
      }, function () {
        layui.layer.close();
      });
    };
    Admin.prototype.openLayerForm = function (url, title, method, width, height, noRefresh, formId) {
      var formId = formId ? formId : "#layer-form";
      $.get(url, function(view) {
        layui.layer.open({
          type: 1,
          title: title,
          anim: 2,
          shadeClose: true,
          content: view,
          success: function() {
            layui.form.render();
          },
          area:[
            width ? width : '50%',
            height ? height : '500px'
          ],
          btn: ['确认', '重置'],
          yes: function (index, layero) {
            var formObj = $(formId);
            $.ajax({
              type: method ? method : 'POST',
              url: formObj.attr("action"),
              dataType: "json",
              data: formObj.serialize(),
              success: function(response) {
                if (response.status === 'success') {
                  layui.layer.close(index);
                  layui.layer.msg(response.message, {time: 2000, icon: 6})
                  if (!noRefresh) {
                    window.location = window.location.href
                  }
                } else {
                  layui.layer.msg(response.message, {time: 3000, icon: 5})
                }
              },
            });
          },
          btn2: function (index, layero) {
            $(formId)[0].reset();
            return false;
          }
        });
      });
    };
    /**
     * admin.dateTime(
     * elem DOM填充元素
     * type 类型 date?mouth
     * value 编辑时的默认值
     * mix 最大值
     * max 最小值
     * is 是否开启分类 false/true
     * )
     */
    Admin.prototype.dateTime = function(elem,type,value,min,max,is = false){
      layui.laydate.render({ 
        elem: elem
        ,type: type
        ,value: value
        ,min: min ? min : '1900-1-1 00:00:00'
        ,max: max ? max : '2099-12-31 23:59:59'
        ,range: is
      });
    }
    /** 
     * admin.popupContent(
     * type 类型 弹窗框类型 1 or 2 url地址 或者 DOM元素
     * title 提示信息
     * content 地址 url地址 或者 DOM元素
     * width/height 宽/高
     * successCallback() 页面成功弹出产生的逻辑
     * yesCallback() 用户点击成功产生的逻辑
     * btnCallback() 用户点击取消产生的逻辑
     * )
    */
    Admin.prototype.popupContent = function(type,title,content,data,width,height,
      successCallback = function(index,layera) {},
      yesCallback = function(index,layera) {},
      btnCallback = function(index) {}){
      layer.open({
        type: type,
        title:title
        ,content:content
        ,area:[width? width + '%' : '100%',height ? height + '%' : '100%']
        ,success: function(layero,index){
          if(data.id != undefined){
            layero.find('iframe').contents().find('.content').val(data.id);
          }
            successCallback(layero,index)
        },yes :function(layero,index){
            yesCallback(layero,index)
        },btn2:function(index){
            btnCallback(index)
          }
      });
    }
    /**
     * admin.confirmPopup(
     * content 提示信息
     * width/height 宽高
     * url url地址 如果有直接请求 没有使用 yes()回调函数
     * cancel 用户取消时产生的逻辑
     * )
     */
    Admin.prototype.confirmPopup = function(content,url,width,height,yes = function(){},cancel = function(){}){
      layer.confirm(content, {
        btn: ['确认','取消'],
        data:{},
        area: [width + 'px',height + 'px']
      }, function(){
        if(url == '' || url == undefined){
          yes();
        }else{
          $.ajax({
              type: 'post',
              dataType: "json",
              url: url,
              data:{},
              success: function (data) {
                layer.msg('删除成功',{icon:1})
                setTimeout(function() {
                  if (data.code == 1) {
                      layui.layer.close();
                      location.reload();
                  }
              }, 1000);
              }
          });
        }
      }, function(){
        cancel()
      });
    }
    /**
     * XmSelect插件
     * el DOM元素
     * filter 是否查询 true/false
     * type 单选/多选 true/false
     * name 表单提交name名称
     * value 编辑时默认值
     * callback() 用户选中返回选中的值
     */
    Admin.prototype.xmSelect = function(el,filter,type,data = [],name,value = [],tips = '请选择',callback=function(data){}){
      xmSelect.render({
          el: el,  
         height: '150px',
          filterable: filter,
         radio: type,
          data: data,
          name: name,
          initValue: value,
          tips: tips,
          on: function(getValue){
            callback(getValue.arr)
          }
      });
    }
    // 编辑时渲染
    Admin.prototype.formVal = function(ele,url,callback = function(data){}){
        $.ajax({
          type: "POST",
          async: false,
          dataType: "json",
          url: url,
          contentType: "application/json",
          data:JSON.stringify({id : $(".content").text()}),
          success: function(res) {
              if (res.code) {
                layui.form.val(ele, res.data[0]);
                callback(res.data[0]);
              }else {
                  message.error(res.message);
              }
          },
          error: function (res){
              message.error(res.message);
          }
      });
    }
    // 表单提交
    Admin.prototype.formSubmit = function(url,field){
      $.ajax({
          type: "POST",
          async: false,
          dataType: "json",
          url: url,
          contentType: "application/json",
          data:JSON.stringify(field),
          success: function(res) {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
              if (res.code) {
                  layer.msg(res.message,{icon:1});
                  setTimeout(function(){
                    parent.layui.table.reload('table-index-list'); //重载表格  table-index-list：表格名称
                    parent.layer.close(index); //再执行关闭
                  },1000)
              }else {
                  message.error(res.message);
              }
          },
          error: function (res){
              message.error(res.message);
          }
      });
    }
    // 编辑时获取图片
    Admin.prototype.UrlImg = function(data,before,cla){
      let str = '';
        for(var i = 0; i < data.length; i++){
           str += `
            <div class="G-img-item" > 
                <img src=${data[i]}> 
                <div class="G-img-delete cur_pointer"  flex="cross:center main:center" style="display:none">
                    <span class="delete">删除<span/>
                </div>
                <input type="hidden" class="${cla}"  value="${data[i]}" />
            </div>`;
        }
        before.before(str);
    }
    // 保存图片
    Admin.prototype.postUrlImg = function(content){
      let arrayData = [];
        for(var i = 0; i < content.length; i++){
          arrayData.push(content.eq(i).val());
        }
        return arrayData;
    }
    window.admin = new Admin();
  }(window);
