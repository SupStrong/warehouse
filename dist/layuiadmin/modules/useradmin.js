/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/layuiadmin/modules/useradmin.js":
/*!*********************************************!*\
  !*** ./src/layuiadmin/modules/useradmin.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n\r\n @Name：layuiAdmin 用户管理 管理员管理 角色管理\r\n @Author：star1029\r\n @Site：http://www.layui.com/admin/\r\n @License：LPPL\r\n    \r\n */\nlayui.define(['table', 'form'], function (exports) {\n  var $ = layui.$,\n      table = layui.table,\n      form = layui.form; //用户管理\n\n  table.render({\n    elem: '#LAY-user-manage',\n    url: layui.setter.base + 'json/useradmin/webuser.js' //模拟接口\n    ,\n    cols: [[{\n      type: 'checkbox',\n      fixed: 'left'\n    }, {\n      field: 'id',\n      width: 100,\n      title: 'ID',\n      sort: true\n    }, {\n      field: 'username',\n      title: '用户名',\n      minWidth: 100\n    }, {\n      field: 'avatar',\n      title: '头像',\n      width: 100,\n      templet: '#imgTpl'\n    }, {\n      field: 'phone',\n      title: '手机'\n    }, {\n      field: 'email',\n      title: '邮箱'\n    }, {\n      field: 'sex',\n      width: 80,\n      title: '性别'\n    }, {\n      field: 'ip',\n      title: 'IP'\n    }, {\n      field: 'jointime',\n      title: '加入时间',\n      sort: true\n    }, {\n      title: '操作',\n      width: 150,\n      align: 'center',\n      fixed: 'right',\n      toolbar: '#table-useradmin-webuser'\n    }]],\n    page: true,\n    limit: 30,\n    height: 'full-220',\n    text: '对不起，加载出现异常！'\n  }); //监听工具条\n\n  table.on('tool(LAY-user-manage)', function (obj) {\n    var data = obj.data;\n\n    if (obj.event === 'del') {\n      layer.prompt({\n        formType: 1,\n        title: '敏感操作，请验证口令'\n      }, function (value, index) {\n        layer.close(index);\n        layer.confirm('真的删除行么', function (index) {\n          obj.del();\n          layer.close(index);\n        });\n      });\n    } else if (obj.event === 'edit') {\n      var tr = $(obj.tr);\n      layer.open({\n        type: 2,\n        title: '编辑用户',\n        content: '../../../views/user/user/userform.html',\n        maxmin: true,\n        area: ['500px', '450px'],\n        btn: ['确定', '取消'],\n        yes: function yes(index, layero) {\n          var iframeWindow = window['layui-layer-iframe' + index],\n              submitID = 'LAY-user-front-submit',\n              submit = layero.find('iframe').contents().find('#' + submitID); //监听提交\n\n          iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {\n            var field = data.field; //获取提交的字段\n            //提交 Ajax 成功后，静态更新表格中的数据\n            //$.ajax({});\n\n            table.reload('LAY-user-front-submit'); //数据刷新\n\n            layer.close(index); //关闭弹层\n          });\n          submit.trigger('click');\n        },\n        success: function success(layero, index) {}\n      });\n    }\n  }); //管理员管理\n\n  table.render({\n    elem: '#LAY-user-back-manage',\n    url: layui.setter.base + 'json/useradmin/mangadmin.js' //模拟接口\n    ,\n    cols: [[{\n      type: 'checkbox',\n      fixed: 'left'\n    }, {\n      field: 'id',\n      width: 80,\n      title: 'ID',\n      sort: true\n    }, {\n      field: 'loginname',\n      title: '登录名'\n    }, {\n      field: 'telphone',\n      title: '手机'\n    }, {\n      field: 'email',\n      title: '邮箱'\n    }, {\n      field: 'role',\n      title: '角色'\n    }, {\n      field: 'jointime',\n      title: '加入时间',\n      sort: true\n    }, {\n      field: 'check',\n      title: '审核状态',\n      templet: '#buttonTpl',\n      minWidth: 80,\n      align: 'center'\n    }, {\n      title: '操作',\n      width: 150,\n      align: 'center',\n      fixed: 'right',\n      toolbar: '#table-useradmin-admin'\n    }]],\n    text: '对不起，加载出现异常！'\n  }); //监听工具条\n\n  table.on('tool(LAY-user-back-manage)', function (obj) {\n    var data = obj.data;\n\n    if (obj.event === 'del') {\n      layer.prompt({\n        formType: 1,\n        title: '敏感操作，请验证口令'\n      }, function (value, index) {\n        layer.close(index);\n        layer.confirm('确定删除此管理员？', function (index) {\n          console.log(obj);\n          obj.del();\n          layer.close(index);\n        });\n      });\n    } else if (obj.event === 'edit') {\n      var tr = $(obj.tr);\n      layer.open({\n        type: 2,\n        title: '编辑管理员',\n        content: '../../../views/user/administrators/adminform.html',\n        area: ['420px', '420px'],\n        btn: ['确定', '取消'],\n        yes: function yes(index, layero) {\n          var iframeWindow = window['layui-layer-iframe' + index],\n              submitID = 'LAY-user-back-submit',\n              submit = layero.find('iframe').contents().find('#' + submitID); //监听提交\n\n          iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {\n            var field = data.field; //获取提交的字段\n            //提交 Ajax 成功后，静态更新表格中的数据\n            //$.ajax({});\n\n            table.reload('LAY-user-front-submit'); //数据刷新\n\n            layer.close(index); //关闭弹层\n          });\n          submit.trigger('click');\n        },\n        success: function success(layero, index) {}\n      });\n    }\n  }); //角色管理\n\n  table.render({\n    elem: '#LAY-user-back-role',\n    url: layui.setter.base + 'json/useradmin/role.js' //模拟接口\n    ,\n    cols: [[{\n      type: 'checkbox',\n      fixed: 'left'\n    }, {\n      field: 'id',\n      width: 80,\n      title: 'ID',\n      sort: true\n    }, {\n      field: 'rolename',\n      title: '角色名'\n    }, {\n      field: 'limits',\n      title: '拥有权限'\n    }, {\n      field: 'descr',\n      title: '具体描述'\n    }, {\n      title: '操作',\n      width: 150,\n      align: 'center',\n      fixed: 'right',\n      toolbar: '#table-useradmin-admin'\n    }]],\n    text: '对不起，加载出现异常！'\n  }); //监听工具条\n\n  table.on('tool(LAY-user-back-role)', function (obj) {\n    var data = obj.data;\n\n    if (obj.event === 'del') {\n      layer.confirm('确定删除此角色？', function (index) {\n        obj.del();\n        layer.close(index);\n      });\n    } else if (obj.event === 'edit') {\n      var tr = $(obj.tr);\n      layer.open({\n        type: 2,\n        title: '编辑角色',\n        content: '../../../views/user/administrators/roleform.html',\n        area: ['500px', '480px'],\n        btn: ['确定', '取消'],\n        yes: function yes(index, layero) {\n          var iframeWindow = window['layui-layer-iframe' + index],\n              submit = layero.find('iframe').contents().find(\"#LAY-user-role-submit\"); //监听提交\n\n          iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function (data) {\n            var field = data.field; //获取提交的字段\n            //提交 Ajax 成功后，静态更新表格中的数据\n            //$.ajax({});\n\n            table.reload('LAY-user-back-role'); //数据刷新\n\n            layer.close(index); //关闭弹层\n          });\n          submit.trigger('click');\n        },\n        success: function success(layero, index) {}\n      });\n    }\n  });\n  exports('useradmin', {});\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGF5dWlhZG1pbi9tb2R1bGVzL3VzZXJhZG1pbi5qcz8wMjM2Il0sIm5hbWVzIjpbImxheXVpIiwiZGVmaW5lIiwiZXhwb3J0cyIsIiQiLCJ0YWJsZSIsImZvcm0iLCJyZW5kZXIiLCJlbGVtIiwidXJsIiwic2V0dGVyIiwiYmFzZSIsImNvbHMiLCJ0eXBlIiwiZml4ZWQiLCJmaWVsZCIsIndpZHRoIiwidGl0bGUiLCJzb3J0IiwibWluV2lkdGgiLCJ0ZW1wbGV0IiwiYWxpZ24iLCJ0b29sYmFyIiwicGFnZSIsImxpbWl0IiwiaGVpZ2h0IiwidGV4dCIsIm9uIiwib2JqIiwiZGF0YSIsImV2ZW50IiwibGF5ZXIiLCJwcm9tcHQiLCJmb3JtVHlwZSIsInZhbHVlIiwiaW5kZXgiLCJjbG9zZSIsImNvbmZpcm0iLCJkZWwiLCJ0ciIsIm9wZW4iLCJjb250ZW50IiwibWF4bWluIiwiYXJlYSIsImJ0biIsInllcyIsImxheWVybyIsImlmcmFtZVdpbmRvdyIsIndpbmRvdyIsInN1Ym1pdElEIiwic3VibWl0IiwiZmluZCIsImNvbnRlbnRzIiwicmVsb2FkIiwidHJpZ2dlciIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFVQUEsS0FBSyxDQUFDQyxNQUFOLENBQWEsQ0FBQyxPQUFELEVBQVUsTUFBVixDQUFiLEVBQWdDLFVBQVNDLE9BQVQsRUFBaUI7QUFDL0MsTUFBSUMsQ0FBQyxHQUFHSCxLQUFLLENBQUNHLENBQWQ7QUFBQSxNQUNDQyxLQUFLLEdBQUdKLEtBQUssQ0FBQ0ksS0FEZjtBQUFBLE1BRUNDLElBQUksR0FBR0wsS0FBSyxDQUFDSyxJQUZkLENBRCtDLENBSy9DOztBQUNBRCxPQUFLLENBQUNFLE1BQU4sQ0FBYTtBQUNYQyxRQUFJLEVBQUUsa0JBREs7QUFFVkMsT0FBRyxFQUFFUixLQUFLLENBQUNTLE1BQU4sQ0FBYUMsSUFBYixHQUFvQiwyQkFGZixDQUUyQztBQUYz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LE9BQVg7QUEwQkQ7QUFDRixHQXJDRDtBQXVDQWhDLFNBQU8sQ0FBQyxXQUFELEVBQWMsRUFBZCxDQUFQO0FBQ0QsQ0F0TUQiLCJmaWxlIjoiLi9zcmMvbGF5dWlhZG1pbi9tb2R1bGVzL3VzZXJhZG1pbi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG5cclxuIEBOYW1l77yabGF5dWlBZG1pbiDnlKjmiLfnrqHnkIYg566h55CG5ZGY566h55CGIOinkuiJsueuoeeQhlxyXG4gQEF1dGhvcu+8mnN0YXIxMDI5XHJcbiBAU2l0Ze+8mmh0dHA6Ly93d3cubGF5dWkuY29tL2FkbWluL1xyXG4gQExpY2Vuc2XvvJpMUFBMXHJcbiAgICBcclxuICovXHJcblxyXG5cclxubGF5dWkuZGVmaW5lKFsndGFibGUnLCAnZm9ybSddLCBmdW5jdGlvbihleHBvcnRzKXtcclxuICB2YXIgJCA9IGxheXVpLiRcclxuICAsdGFibGUgPSBsYXl1aS50YWJsZVxyXG4gICxmb3JtID0gbGF5dWkuZm9ybTtcclxuXHJcbiAgLy/nlKjmiLfnrqHnkIZcclxuICB0YWJsZS5yZW5kZXIoe1xyXG4gICAgZWxlbTogJyNMQVktdXNlci1tYW5hZ2UnXHJcbiAgICAsdXJsOiBsYXl1aS5zZXR0ZXIuYmFzZSArICdqc29uL3VzZXJhZG1pbi93ZWJ1c2VyLmpzJyAvL+aooeaLn+aOpeWPo1xyXG4gICAgLGNvbHM6IFtbXHJcbiAgICAgIHt0eXBlOiAnY2hlY2tib3gnLCBmaXhlZDogJ2xlZnQnfVxyXG4gICAgICAse2ZpZWxkOiAnaWQnLCB3aWR0aDogMTAwLCB0aXRsZTogJ0lEJywgc29ydDogdHJ1ZX1cclxuICAgICAgLHtmaWVsZDogJ3VzZXJuYW1lJywgdGl0bGU6ICfnlKjmiLflkI0nLCBtaW5XaWR0aDogMTAwfVxyXG4gICAgICAse2ZpZWxkOiAnYXZhdGFyJywgdGl0bGU6ICflpLTlg48nLCB3aWR0aDogMTAwLCB0ZW1wbGV0OiAnI2ltZ1RwbCd9XHJcbiAgICAgICx7ZmllbGQ6ICdwaG9uZScsIHRpdGxlOiAn5omL5py6J31cclxuICAgICAgLHtmaWVsZDogJ2VtYWlsJywgdGl0bGU6ICfpgq7nrrEnfVxyXG4gICAgICAse2ZpZWxkOiAnc2V4Jywgd2lkdGg6IDgwLCB0aXRsZTogJ+aAp+WIqyd9XHJcbiAgICAgICx7ZmllbGQ6ICdpcCcsIHRpdGxlOiAnSVAnfVxyXG4gICAgICAse2ZpZWxkOiAnam9pbnRpbWUnLCB0aXRsZTogJ+WKoOWFpeaXtumXtCcsIHNvcnQ6IHRydWV9XHJcbiAgICAgICx7dGl0bGU6ICfmk43kvZwnLCB3aWR0aDogMTUwLCBhbGlnbjonY2VudGVyJywgZml4ZWQ6ICdyaWdodCcsIHRvb2xiYXI6ICcjdGFibGUtdXNlcmFkbWluLXdlYnVzZXInfVxyXG4gICAgXV1cclxuICAgICxwYWdlOiB0cnVlXHJcbiAgICAsbGltaXQ6IDMwXHJcbiAgICAsaGVpZ2h0OiAnZnVsbC0yMjAnXHJcbiAgICAsdGV4dDogJ+WvueS4jei1t++8jOWKoOi9veWHuueOsOW8guW4uO+8gSdcclxuICB9KTtcclxuICBcclxuICAvL+ebkeWQrOW3peWFt+adoVxyXG4gIHRhYmxlLm9uKCd0b29sKExBWS11c2VyLW1hbmFnZSknLCBmdW5jdGlvbihvYmope1xyXG4gICAgdmFyIGRhdGEgPSBvYmouZGF0YTtcclxuICAgIGlmKG9iai5ldmVudCA9PT0gJ2RlbCcpe1xyXG4gICAgICBsYXllci5wcm9tcHQoe1xyXG4gICAgICAgIGZvcm1UeXBlOiAxXHJcbiAgICAgICAgLHRpdGxlOiAn5pWP5oSf5pON5L2c77yM6K+36aqM6K+B5Y+j5LukJ1xyXG4gICAgICB9LCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpe1xyXG4gICAgICAgIGxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICBcclxuICAgICAgICBsYXllci5jb25maXJtKCfnnJ/nmoTliKDpmaTooYzkuYgnLCBmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgICBvYmouZGVsKCk7XHJcbiAgICAgICAgICBsYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmKG9iai5ldmVudCA9PT0gJ2VkaXQnKXtcclxuICAgICAgdmFyIHRyID0gJChvYmoudHIpO1xyXG5cclxuICAgICAgbGF5ZXIub3Blbih7XHJcbiAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICx0aXRsZTogJ+e8lui+keeUqOaItydcclxuICAgICAgICAsY29udGVudDogJy4uLy4uLy4uL3ZpZXdzL3VzZXIvdXNlci91c2VyZm9ybS5odG1sJ1xyXG4gICAgICAgICxtYXhtaW46IHRydWVcclxuICAgICAgICAsYXJlYTogWyc1MDBweCcsICc0NTBweCddXHJcbiAgICAgICAgLGJ0bjogWyfnoa7lrponLCAn5Y+W5raIJ11cclxuICAgICAgICAseWVzOiBmdW5jdGlvbihpbmRleCwgbGF5ZXJvKXtcclxuICAgICAgICAgIHZhciBpZnJhbWVXaW5kb3cgPSB3aW5kb3dbJ2xheXVpLWxheWVyLWlmcmFtZScrIGluZGV4XVxyXG4gICAgICAgICAgLHN1Ym1pdElEID0gJ0xBWS11c2VyLWZyb250LXN1Ym1pdCdcclxuICAgICAgICAgICxzdWJtaXQgPSBsYXllcm8uZmluZCgnaWZyYW1lJykuY29udGVudHMoKS5maW5kKCcjJysgc3VibWl0SUQpO1xyXG5cclxuICAgICAgICAgIC8v55uR5ZCs5o+Q5LqkXHJcbiAgICAgICAgICBpZnJhbWVXaW5kb3cubGF5dWkuZm9ybS5vbignc3VibWl0KCcrIHN1Ym1pdElEICsnKScsIGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICB2YXIgZmllbGQgPSBkYXRhLmZpZWxkOyAvL+iOt+WPluaPkOS6pOeahOWtl+autVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/mj5DkuqQgQWpheCDmiJDlip/lkI7vvIzpnZnmgIHmm7TmlrDooajmoLzkuK3nmoTmlbDmja5cclxuICAgICAgICAgICAgLy8kLmFqYXgoe30pO1xyXG4gICAgICAgICAgICB0YWJsZS5yZWxvYWQoJ0xBWS11c2VyLWZyb250LXN1Ym1pdCcpOyAvL+aVsOaNruWIt+aWsFxyXG4gICAgICAgICAgICBsYXllci5jbG9zZShpbmRleCk7IC8v5YWz6Zet5by55bGCXHJcbiAgICAgICAgICB9KTsgIFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBzdWJtaXQudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLHN1Y2Nlc3M6IGZ1bmN0aW9uKGxheWVybywgaW5kZXgpe1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy/nrqHnkIblkZjnrqHnkIZcclxuICB0YWJsZS5yZW5kZXIoe1xyXG4gICAgZWxlbTogJyNMQVktdXNlci1iYWNrLW1hbmFnZSdcclxuICAgICx1cmw6IGxheXVpLnNldHRlci5iYXNlICsgJ2pzb24vdXNlcmFkbWluL21hbmdhZG1pbi5qcycgLy/mqKHmi5/mjqXlj6NcclxuICAgICxjb2xzOiBbW1xyXG4gICAgICB7dHlwZTogJ2NoZWNrYm94JywgZml4ZWQ6ICdsZWZ0J31cclxuICAgICAgLHtmaWVsZDogJ2lkJywgd2lkdGg6IDgwLCB0aXRsZTogJ0lEJywgc29ydDogdHJ1ZX1cclxuICAgICAgLHtmaWVsZDogJ2xvZ2lubmFtZScsIHRpdGxlOiAn55m75b2V5ZCNJ31cclxuICAgICAgLHtmaWVsZDogJ3RlbHBob25lJywgdGl0bGU6ICfmiYvmnLonfVxyXG4gICAgICAse2ZpZWxkOiAnZW1haWwnLCB0aXRsZTogJ+mCrueusSd9XHJcbiAgICAgICx7ZmllbGQ6ICdyb2xlJywgdGl0bGU6ICfop5LoibInfVxyXG4gICAgICAse2ZpZWxkOiAnam9pbnRpbWUnLCB0aXRsZTogJ+WKoOWFpeaXtumXtCcsIHNvcnQ6IHRydWV9XHJcbiAgICAgICx7ZmllbGQ6ICdjaGVjaycsIHRpdGxlOiflrqHmoLjnirbmgIEnLCB0ZW1wbGV0OiAnI2J1dHRvblRwbCcsIG1pbldpZHRoOiA4MCwgYWxpZ246ICdjZW50ZXInfVxyXG4gICAgICAse3RpdGxlOiAn5pON5L2cJywgd2lkdGg6IDE1MCwgYWxpZ246ICdjZW50ZXInLCBmaXhlZDogJ3JpZ2h0JywgdG9vbGJhcjogJyN0YWJsZS11c2VyYWRtaW4tYWRtaW4nfVxyXG4gICAgXV1cclxuICAgICx0ZXh0OiAn5a+55LiN6LW377yM5Yqg6L295Ye6546w5byC5bi477yBJ1xyXG4gIH0pO1xyXG4gIFxyXG4gIC8v55uR5ZCs5bel5YW35p2hXHJcbiAgdGFibGUub24oJ3Rvb2woTEFZLXVzZXItYmFjay1tYW5hZ2UpJywgZnVuY3Rpb24ob2JqKXtcclxuICAgIHZhciBkYXRhID0gb2JqLmRhdGE7XHJcbiAgICBpZihvYmouZXZlbnQgPT09ICdkZWwnKXtcclxuICAgICAgbGF5ZXIucHJvbXB0KHtcclxuICAgICAgICBmb3JtVHlwZTogMVxyXG4gICAgICAgICx0aXRsZTogJ+aVj+aEn+aTjeS9nO+8jOivt+mqjOivgeWPo+S7pCdcclxuICAgICAgfSwgZnVuY3Rpb24odmFsdWUsIGluZGV4KXtcclxuICAgICAgICBsYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgbGF5ZXIuY29uZmlybSgn56Gu5a6a5Yig6Zmk5q2k566h55CG5ZGY77yfJywgZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2cob2JqKVxyXG4gICAgICAgICAgb2JqLmRlbCgpO1xyXG4gICAgICAgICAgbGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1lbHNlIGlmKG9iai5ldmVudCA9PT0gJ2VkaXQnKXtcclxuICAgICAgdmFyIHRyID0gJChvYmoudHIpO1xyXG5cclxuICAgICAgbGF5ZXIub3Blbih7XHJcbiAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICx0aXRsZTogJ+e8lui+keeuoeeQhuWRmCdcclxuICAgICAgICAsY29udGVudDogJy4uLy4uLy4uL3ZpZXdzL3VzZXIvYWRtaW5pc3RyYXRvcnMvYWRtaW5mb3JtLmh0bWwnXHJcbiAgICAgICAgLGFyZWE6IFsnNDIwcHgnLCAnNDIwcHgnXVxyXG4gICAgICAgICxidG46IFsn56Gu5a6aJywgJ+WPlua2iCddXHJcbiAgICAgICAgLHllczogZnVuY3Rpb24oaW5kZXgsIGxheWVybyl7XHJcbiAgICAgICAgICB2YXIgaWZyYW1lV2luZG93ID0gd2luZG93WydsYXl1aS1sYXllci1pZnJhbWUnKyBpbmRleF1cclxuICAgICAgICAgICxzdWJtaXRJRCA9ICdMQVktdXNlci1iYWNrLXN1Ym1pdCdcclxuICAgICAgICAgICxzdWJtaXQgPSBsYXllcm8uZmluZCgnaWZyYW1lJykuY29udGVudHMoKS5maW5kKCcjJysgc3VibWl0SUQpO1xyXG5cclxuICAgICAgICAgIC8v55uR5ZCs5o+Q5LqkXHJcbiAgICAgICAgICBpZnJhbWVXaW5kb3cubGF5dWkuZm9ybS5vbignc3VibWl0KCcrIHN1Ym1pdElEICsnKScsIGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICB2YXIgZmllbGQgPSBkYXRhLmZpZWxkOyAvL+iOt+WPluaPkOS6pOeahOWtl+autVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/mj5DkuqQgQWpheCDmiJDlip/lkI7vvIzpnZnmgIHmm7TmlrDooajmoLzkuK3nmoTmlbDmja5cclxuICAgICAgICAgICAgLy8kLmFqYXgoe30pO1xyXG4gICAgICAgICAgICB0YWJsZS5yZWxvYWQoJ0xBWS11c2VyLWZyb250LXN1Ym1pdCcpOyAvL+aVsOaNruWIt+aWsFxyXG4gICAgICAgICAgICBsYXllci5jbG9zZShpbmRleCk7IC8v5YWz6Zet5by55bGCXHJcbiAgICAgICAgICB9KTsgIFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBzdWJtaXQudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLHN1Y2Nlc3M6IGZ1bmN0aW9uKGxheWVybywgaW5kZXgpeyAgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8v6KeS6Imy566h55CGXHJcbiAgdGFibGUucmVuZGVyKHtcclxuICAgIGVsZW06ICcjTEFZLXVzZXItYmFjay1yb2xlJ1xyXG4gICAgLHVybDogbGF5dWkuc2V0dGVyLmJhc2UgKyAnanNvbi91c2VyYWRtaW4vcm9sZS5qcycgLy/mqKHmi5/mjqXlj6NcclxuICAgICxjb2xzOiBbW1xyXG4gICAgICB7dHlwZTogJ2NoZWNrYm94JywgZml4ZWQ6ICdsZWZ0J31cclxuICAgICAgLHtmaWVsZDogJ2lkJywgd2lkdGg6IDgwLCB0aXRsZTogJ0lEJywgc29ydDogdHJ1ZX1cclxuICAgICAgLHtmaWVsZDogJ3JvbGVuYW1lJywgdGl0bGU6ICfop5LoibLlkI0nfVxyXG4gICAgICAse2ZpZWxkOiAnbGltaXRzJywgdGl0bGU6ICfmi6XmnInmnYPpmZAnfVxyXG4gICAgICAse2ZpZWxkOiAnZGVzY3InLCB0aXRsZTogJ+WFt+S9k+aPj+i/sCd9XHJcbiAgICAgICx7dGl0bGU6ICfmk43kvZwnLCB3aWR0aDogMTUwLCBhbGlnbjogJ2NlbnRlcicsIGZpeGVkOiAncmlnaHQnLCB0b29sYmFyOiAnI3RhYmxlLXVzZXJhZG1pbi1hZG1pbid9XHJcbiAgICBdXVxyXG4gICAgLHRleHQ6ICflr7nkuI3otbfvvIzliqDovb3lh7rnjrDlvILluLjvvIEnXHJcbiAgfSk7XHJcbiAgXHJcbiAgLy/nm5HlkKzlt6XlhbfmnaFcclxuICB0YWJsZS5vbigndG9vbChMQVktdXNlci1iYWNrLXJvbGUpJywgZnVuY3Rpb24ob2JqKXtcclxuICAgIHZhciBkYXRhID0gb2JqLmRhdGE7XHJcbiAgICBpZihvYmouZXZlbnQgPT09ICdkZWwnKXtcclxuICAgICAgbGF5ZXIuY29uZmlybSgn56Gu5a6a5Yig6Zmk5q2k6KeS6Imy77yfJywgZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIG9iai5kZWwoKTtcclxuICAgICAgICBsYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfWVsc2UgaWYob2JqLmV2ZW50ID09PSAnZWRpdCcpe1xyXG4gICAgICB2YXIgdHIgPSAkKG9iai50cik7XHJcblxyXG4gICAgICBsYXllci5vcGVuKHtcclxuICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgLHRpdGxlOiAn57yW6L6R6KeS6ImyJ1xyXG4gICAgICAgICxjb250ZW50OiAnLi4vLi4vLi4vdmlld3MvdXNlci9hZG1pbmlzdHJhdG9ycy9yb2xlZm9ybS5odG1sJ1xyXG4gICAgICAgICxhcmVhOiBbJzUwMHB4JywgJzQ4MHB4J11cclxuICAgICAgICAsYnRuOiBbJ+ehruWumicsICflj5bmtognXVxyXG4gICAgICAgICx5ZXM6IGZ1bmN0aW9uKGluZGV4LCBsYXllcm8pe1xyXG4gICAgICAgICAgdmFyIGlmcmFtZVdpbmRvdyA9IHdpbmRvd1snbGF5dWktbGF5ZXItaWZyYW1lJysgaW5kZXhdXHJcbiAgICAgICAgICAsc3VibWl0ID0gbGF5ZXJvLmZpbmQoJ2lmcmFtZScpLmNvbnRlbnRzKCkuZmluZChcIiNMQVktdXNlci1yb2xlLXN1Ym1pdFwiKTtcclxuXHJcbiAgICAgICAgICAvL+ebkeWQrOaPkOS6pFxyXG4gICAgICAgICAgaWZyYW1lV2luZG93LmxheXVpLmZvcm0ub24oJ3N1Ym1pdChMQVktdXNlci1yb2xlLXN1Ym1pdCknLCBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgdmFyIGZpZWxkID0gZGF0YS5maWVsZDsgLy/ojrflj5bmj5DkuqTnmoTlrZfmrrVcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5o+Q5LqkIEFqYXgg5oiQ5Yqf5ZCO77yM6Z2Z5oCB5pu05paw6KGo5qC85Lit55qE5pWw5o2uXHJcbiAgICAgICAgICAgIC8vJC5hamF4KHt9KTtcclxuICAgICAgICAgICAgdGFibGUucmVsb2FkKCdMQVktdXNlci1iYWNrLXJvbGUnKTsgLy/mlbDmja7liLfmlrBcclxuICAgICAgICAgICAgbGF5ZXIuY2xvc2UoaW5kZXgpOyAvL+WFs+mXreW8ueWxglxyXG4gICAgICAgICAgfSk7ICBcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgc3VibWl0LnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICxzdWNjZXNzOiBmdW5jdGlvbihsYXllcm8sIGluZGV4KXtcclxuICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGV4cG9ydHMoJ3VzZXJhZG1pbicsIHt9KVxyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/layuiadmin/modules/useradmin.js\n");

/***/ }),

/***/ 13:
/*!***************************************************!*\
  !*** multi ./src/layuiadmin/modules/useradmin.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\刘晨\Desktop\flyadmin\src\layuiadmin\modules\useradmin.js */"./src/layuiadmin/modules/useradmin.js");


/***/ })

/******/ });