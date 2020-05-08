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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/layuiadmin/modules/forum.js":
/*!*****************************************!*\
  !*** ./src/layuiadmin/modules/forum.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n\r\n @Name：layuiAdmin 社区系统\r\n @Author：star1029\r\n @Site：http://www.layui.com/admin/\r\n @License：LPPL\r\n    \r\n */\nlayui.define(['table', 'form'], function (exports) {\n  var $ = layui.$,\n      table = layui.table,\n      form = layui.form; //帖子管理\n\n  table.render({\n    elem: '#LAY-app-forum-list',\n    url: layui.setter.base + 'json/forum/list.js' //模拟接口\n    ,\n    cols: [[{\n      type: 'checkbox',\n      fixed: 'left'\n    }, {\n      field: 'id',\n      width: 100,\n      title: 'ID',\n      sort: true\n    }, {\n      field: 'poster',\n      title: '发帖人'\n    }, {\n      field: 'avatar',\n      title: '头像',\n      width: 100,\n      templet: '#imgTpl'\n    }, {\n      field: 'content',\n      title: '发帖内容'\n    }, {\n      field: 'posttime',\n      title: '发帖时间',\n      sort: true\n    }, {\n      field: 'top',\n      title: '置顶',\n      templet: '#buttonTpl',\n      minWidth: 80,\n      align: 'center'\n    }, {\n      title: '操作',\n      width: 150,\n      align: 'center',\n      fixed: 'right',\n      toolbar: '#table-forum-list'\n    }]],\n    page: true,\n    limit: 10,\n    limits: [10, 15, 20, 25, 30],\n    text: '对不起，加载出现异常！'\n  }); //监听工具条\n\n  table.on('tool(LAY-app-forum-list)', function (obj) {\n    var data = obj.data;\n\n    if (obj.event === 'del') {\n      layer.confirm('确定删除此条帖子？', function (index) {\n        obj.del();\n        layer.close(index);\n      });\n    } else if (obj.event === 'edit') {\n      var tr = $(obj.tr);\n      layer.open({\n        type: 2,\n        title: '编辑帖子',\n        content: '../../../views/app/forum/listform.html',\n        area: ['550px', '400px'],\n        btn: ['确定', '取消'],\n        resize: false,\n        yes: function yes(index, layero) {\n          var iframeWindow = window['layui-layer-iframe' + index],\n              submitID = 'LAY-app-forum-submit',\n              submit = layero.find('iframe').contents().find('#' + submitID); //监听提交\n\n          iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {\n            var field = data.field; //获取提交的字段\n            //提交 Ajax 成功后，静态更新表格中的数据\n            //$.ajax({});\n\n            table.reload('LAY-app-forum-list'); //数据刷新\n\n            layer.close(index); //关闭弹层\n          });\n          submit.trigger('click');\n        },\n        success: function success(layero, index) {}\n      });\n    }\n  }); //回帖管理\n\n  table.render({\n    elem: '#LAY-app-forumreply-list',\n    url: layui.setter.base + 'json/forum/replys.js' //模拟接口\n    ,\n    cols: [[{\n      type: 'checkbox',\n      fixed: 'left'\n    }, {\n      field: 'id',\n      width: 100,\n      title: 'ID',\n      sort: true\n    }, {\n      field: 'replyer',\n      title: '回帖人'\n    }, {\n      field: 'cardid',\n      title: '回帖ID',\n      sort: true\n    }, {\n      field: 'avatar',\n      title: '头像',\n      width: 100,\n      templet: '#imgTpl'\n    }, {\n      field: 'content',\n      title: '回帖内容',\n      width: 200\n    }, {\n      field: 'replytime',\n      title: '回帖时间',\n      sort: true\n    }, {\n      title: '操作',\n      width: 150,\n      align: 'center',\n      fixed: 'right',\n      toolbar: '#table-forum-replys'\n    }]],\n    page: true,\n    limit: 10,\n    limits: [10, 15, 20, 25, 30],\n    text: '对不起，加载出现异常！'\n  }); //监听工具条\n\n  table.on('tool(LAY-app-forumreply-list)', function (obj) {\n    var data = obj.data;\n\n    if (obj.event === 'del') {\n      layer.confirm('确定删除此条评论？', function (index) {\n        obj.del();\n        layer.close(index);\n      });\n    } else if (obj.event === 'edit') {\n      var tr = $(obj.tr);\n      layer.open({\n        type: 2,\n        title: '编辑评论',\n        content: '../../../views/app/forum/replysform.html',\n        area: ['550px', '350px'],\n        btn: ['确定', '取消'],\n        resize: false,\n        yes: function yes(index, layero) {\n          //获取iframe元素的值\n          var othis = layero.find('iframe').contents().find(\"#layuiadmin-form-replys\");\n          var content = othis.find('textarea[name=\"content\"]').val(); //数据更新\n\n          obj.update({\n            content: content\n          });\n          layer.close(index);\n        },\n        success: function success(layero, index) {}\n      });\n    }\n  });\n  exports('forum', {});\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGF5dWlhZG1pbi9tb2R1bGVzL2ZvcnVtLmpzPzdjYTIiXSwibmFtZXMiOlsibGF5dWkiLCJkZWZpbmUiLCJleHBvcnRzIiwiJCIsInRhYmxlIiwiZm9ybSIsInJlbmRlciIsImVsZW0iLCJ1cmwiLCJzZXR0ZXIiLCJiYXNlIiwiY29scyIsInR5cGUiLCJmaXhlZCIsImZpZWxkIiwid2lkdGgiLCJ0aXRsZSIsInNvcnQiLCJ0ZW1wbGV0IiwibWluV2lkdGgiLCJhbGlnbiIsInRvb2xiYXIiLCJwYWdlIiwibGltaXQiLCJsaW1pdHMiLCJ0ZXh0Iiwib24iLCJvYmoiLCJkYXRhIiwiZXZlbnQiLCJsYXllciIsImNvbmZpcm0iLCJpbmRleCIsImRlbCIsImNsb3NlIiwidHIiLCJvcGVuIiwiY29udGVudCIsImFyZWEiLCJidG4iLCJyZXNpemUiLCJ5ZXMiLCJsYXllcm8iLCJpZnJhbWVXaW5kb3ciLCJ3aW5kb3ciLCJzdWJtaXRJRCIsInN1Ym1pdCIsImZpbmQiLCJjb250ZW50cyIsInJlbG9hZCIsInRyaWdnZXIiLCJzdWNjZXNzIiwib3RoaXMiLCJ2YWwiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVVBQSxLQUFLLENBQUNDLE1BQU4sQ0FBYSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQWIsRUFBZ0MsVUFBU0MsT0FBVCxFQUFpQjtBQUMvQyxNQUFJQyxDQUFDLEdBQUdILEtBQUssQ0FBQ0csQ0FBZDtBQUFBLE1BQ0NDLEtBQUssR0FBR0osS0FBSyxDQUFDSSxLQURmO0FBQUEsTUFFQ0MsSUFBSSxHQUFHTCxLQUFLLENBQUNLLElBRmQsQ0FEK0MsQ0FLL0M7O0FBQ0FELE9BQUssQ0FBQ0UsTUFBTixDQUFhO0FBQ1hDLFFBQUksRUFBRSxxQkFESztBQUVWQyxPQUFHLEVBQUVSLEtBQUssQ0FBQ1MsTUFBTixDQUFhQyxJQUFiLEdBQW9CLG9CQUZmLENBRW9DO0FBRnBDO0FBR1ZDLFFBQUksRUFBRSxDQUFDLENBQ047QUFBQ0MsVUFBSSxFQUFFLFVBQVA7QUFBbUJDLFdBQUssRUFBRTtBQUExQixLQURNLEVBRUw7QUFBQ0MsV0FBSyxFQUFFLElBQVI7QUFBY0MsV0FBSyxFQUFFLEdBQXJCO0FBQTBCQyxXQUFLLEVBQUUsSUFBakM7QUFBdUNDLFVBQUksRUFBRTtBQUE3QyxLQUZLLEVBR0w7QUFBQ0gsV0FBSyxFQUFFLFFBQVI7QUFBa0JFLFdBQUssRUFBRTtBQUF6QixLQUhLLEVBSUw7QUFBQ0YsV0FBSyxFQUFFLFFBQVI7QUFBa0JFLFdBQUssRUFBRSxJQUF6QjtBQUErQkQsV0FBSyxFQUFFLEdBQXRDO0FBQTJDRyxhQUFPLEVBQUU7QUFBcEQsS0FKSyxFQUtMO0FBQUNKLFdBQUssRUFBRSxTQUFSO0FBQW1CRSxXQUFLLEVBQUU7QUFBMUIsS0FMSyxFQU1MO0FBQUNGLFdBQUssRUFBRSxVQUFSO0FBQW9CRSxXQUFLLEVBQUUsTUFBM0I7QUFBbUNDLFVBQUksRUFBRTtBQUF6QyxLQU5LLEVBT0w7QUFBQ0gsV0FBSyxFQUFFLEtBQVI7QUFBZUUsV0FBSyxFQUFFLElBQXRCO0FBQTRCRSxhQUFPLEVBQUUsWUFBckM7QUFBbURDLGNBQVEsRUFBRSxFQUE3RDtBQUFpRUMsV0FBSyxFQUFFO0FBQXhFLEtBUEssRUFRTDtBQUFDSixXQUFLLEVBQUUsSUFBUjtBQUFjRCxXQUFLLEVBQUUsR0FBckI7QUFBMEJLLFdBQUssRUFBRSxRQUFqQztBQUEyQ1AsV0FBSyxFQUFFLE9BQWxEO0FBQTJEUSxhQUFPLEVBQUU7QUFBcEUsS0FSSyxDQUFELENBSEk7QUFhVkMsUUFBSSxFQUFFLElBYkk7QUFjVkMsU0FBSyxFQUFFLEVBZEc7QUFlVkMsVUFBTSxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixDQWZFO0FBZ0JWQyxRQUFJLEVBQUU7QUFoQkksR0FBYixFQU4rQyxDQXlCL0M7O0FBQ0FyQixPQUFLLENBQUNzQixFQUFOLENBQVMsMEJBQVQsRUFBcUMsVUFBU0MsR0FBVCxFQUFhO0FBQ2hELFFBQUlDLElBQUksR0FBR0QsR0FBRyxDQUFDQyxJQUFmOztBQUNBLFFBQUdELEdBQUcsQ0FBQ0UsS0FBSixLQUFjLEtBQWpCLEVBQXVCO0FBQ3JCQyxXQUFLLENBQUNDLE9BQU4sQ0FBYyxXQUFkLEVBQTJCLFVBQVNDLEtBQVQsRUFBZTtBQUN4Q0wsV0FBRyxDQUFDTSxHQUFKO0FBQ0FILGFBQUssQ0FBQ0ksS0FBTixDQUFZRixLQUFaO0FBQ0QsT0FIRDtBQUlELEtBTEQsTUFLTyxJQUFHTCxHQUFHLENBQUNFLEtBQUosS0FBYyxNQUFqQixFQUF3QjtBQUM3QixVQUFJTSxFQUFFLEdBQUdoQyxDQUFDLENBQUN3QixHQUFHLENBQUNRLEVBQUwsQ0FBVjtBQUVBTCxXQUFLLENBQUNNLElBQU4sQ0FBVztBQUNUeEIsWUFBSSxFQUFFLENBREc7QUFFUkksYUFBSyxFQUFFLE1BRkM7QUFHUnFCLGVBQU8sRUFBRSx3Q0FIRDtBQUlSQyxZQUFJLEVBQUUsQ0FBQyxPQUFELEVBQVUsT0FBVixDQUpFO0FBS1JDLFdBQUcsRUFBRSxDQUFDLElBQUQsRUFBTyxJQUFQLENBTEc7QUFNUkMsY0FBTSxFQUFFLEtBTkE7QUFPUkMsV0FBRyxFQUFFLGFBQVNULEtBQVQsRUFBZ0JVLE1BQWhCLEVBQXVCO0FBQzNCLGNBQUlDLFlBQVksR0FBR0MsTUFBTSxDQUFDLHVCQUFzQlosS0FBdkIsQ0FBekI7QUFBQSxjQUNDYSxRQUFRLEdBQUcsc0JBRFo7QUFBQSxjQUVDQyxNQUFNLEdBQUdKLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZLFFBQVosRUFBc0JDLFFBQXRCLEdBQWlDRCxJQUFqQyxDQUFzQyxNQUFLRixRQUEzQyxDQUZWLENBRDJCLENBSzNCOztBQUNBRixzQkFBWSxDQUFDM0MsS0FBYixDQUFtQkssSUFBbkIsQ0FBd0JxQixFQUF4QixDQUEyQixZQUFXbUIsUUFBWCxHQUFxQixHQUFoRCxFQUFxRCxVQUFTakIsSUFBVCxFQUFjO0FBQ2pFLGdCQUFJZCxLQUFLLEdBQUdjLElBQUksQ0FBQ2QsS0FBakIsQ0FEaUUsQ0FDekM7QUFFeEI7QUFDQTs7QUFDQVYsaUJBQUssQ0FBQzZDLE1BQU4sQ0FBYSxvQkFBYixFQUxpRSxDQUs3Qjs7QUFDcENuQixpQkFBSyxDQUFDSSxLQUFOLENBQVlGLEtBQVosRUFOaUUsQ0FNN0M7QUFDckIsV0FQRDtBQVNBYyxnQkFBTSxDQUFDSSxPQUFQLENBQWUsT0FBZjtBQUNELFNBdkJRO0FBd0JSQyxlQUFPLEVBQUUsaUJBQVNULE1BQVQsRUFBaUJWLEtBQWpCLEVBQXVCLENBRWhDO0FBMUJRLE9BQVg7QUE0QkQ7QUFDRixHQXZDRCxFQTFCK0MsQ0FtRS9DOztBQUNBNUIsT0FBSyxDQUFDRSxNQUFOLENBQWE7QUFDWEMsUUFBSSxFQUFFLDBCQURLO0FBRVZDLE9BQUcsRUFBRVIsS0FBSyxDQUFDUyxNQUFOLENBQWFDLElBQWIsR0FBb0Isc0JBRmYsQ0FFc0M7QUFGdEM7QUFHVkMsUUFBSSxFQUFFLENBQUMsQ0FDTjtBQUFDQyxVQUFJLEVBQUUsVUFBUDtBQUFtQkMsV0FBSyxFQUFFO0FBQTFCLEtBRE0sRUFFTDtBQUFDQyxXQUFLLEVBQUUsSUFBUjtBQUFjQyxXQUFLLEVBQUUsR0FBckI7QUFBMEJDLFdBQUssRUFBRSxJQUFqQztBQUF1Q0MsVUFBSSxFQUFFO0FBQTdDLEtBRkssRUFHTDtBQUFDSCxXQUFLLEVBQUUsU0FBUjtBQUFtQkUsV0FBSyxFQUFFO0FBQTFCLEtBSEssRUFJTDtBQUFDRixXQUFLLEVBQUUsUUFBUjtBQUFrQkUsV0FBSyxFQUFFLE1BQXpCO0FBQWlDQyxVQUFJLEVBQUU7QUFBdkMsS0FKSyxFQUtMO0FBQUNILFdBQUssRUFBRSxRQUFSO0FBQWtCRSxXQUFLLEVBQUUsSUFBekI7QUFBK0JELFdBQUssRUFBRSxHQUF0QztBQUEyQ0csYUFBTyxFQUFFO0FBQXBELEtBTEssRUFNTDtBQUFDSixXQUFLLEVBQUUsU0FBUjtBQUFtQkUsV0FBSyxFQUFFLE1BQTFCO0FBQWtDRCxXQUFLLEVBQUU7QUFBekMsS0FOSyxFQU9MO0FBQUNELFdBQUssRUFBRSxXQUFSO0FBQXFCRSxXQUFLLEVBQUUsTUFBNUI7QUFBb0NDLFVBQUksRUFBRTtBQUExQyxLQVBLLEVBUUw7QUFBQ0QsV0FBSyxFQUFFLElBQVI7QUFBY0QsV0FBSyxFQUFFLEdBQXJCO0FBQTBCSyxXQUFLLEVBQUUsUUFBakM7QUFBMkNQLFdBQUssRUFBRSxPQUFsRDtBQUEyRFEsYUFBTyxFQUFFO0FBQXBFLEtBUkssQ0FBRCxDQUhJO0FBYVZDLFFBQUksRUFBRSxJQWJJO0FBY1ZDLFNBQUssRUFBRSxFQWRHO0FBZVZDLFVBQU0sRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsQ0FmRTtBQWdCVkMsUUFBSSxFQUFFO0FBaEJJLEdBQWIsRUFwRStDLENBdUYvQzs7QUFDQXJCLE9BQUssQ0FBQ3NCLEVBQU4sQ0FBUywrQkFBVCxFQUEwQyxVQUFTQyxHQUFULEVBQWE7QUFDckQsUUFBSUMsSUFBSSxHQUFHRCxHQUFHLENBQUNDLElBQWY7O0FBQ0EsUUFBR0QsR0FBRyxDQUFDRSxLQUFKLEtBQWMsS0FBakIsRUFBdUI7QUFDckJDLFdBQUssQ0FBQ0MsT0FBTixDQUFjLFdBQWQsRUFBMkIsVUFBU0MsS0FBVCxFQUFlO0FBQ3hDTCxXQUFHLENBQUNNLEdBQUo7QUFDQUgsYUFBSyxDQUFDSSxLQUFOLENBQVlGLEtBQVo7QUFDRCxPQUhEO0FBSUQsS0FMRCxNQUtPLElBQUdMLEdBQUcsQ0FBQ0UsS0FBSixLQUFjLE1BQWpCLEVBQXdCO0FBQzdCLFVBQUlNLEVBQUUsR0FBR2hDLENBQUMsQ0FBQ3dCLEdBQUcsQ0FBQ1EsRUFBTCxDQUFWO0FBRUFMLFdBQUssQ0FBQ00sSUFBTixDQUFXO0FBQ1R4QixZQUFJLEVBQUUsQ0FERztBQUVSSSxhQUFLLEVBQUUsTUFGQztBQUdScUIsZUFBTyxFQUFFLDBDQUhEO0FBSVJDLFlBQUksRUFBRSxDQUFDLE9BQUQsRUFBVSxPQUFWLENBSkU7QUFLUkMsV0FBRyxFQUFFLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FMRztBQU1SQyxjQUFNLEVBQUUsS0FOQTtBQU9SQyxXQUFHLEVBQUUsYUFBU1QsS0FBVCxFQUFnQlUsTUFBaEIsRUFBdUI7QUFDM0I7QUFDQSxjQUFJVSxLQUFLLEdBQUdWLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZLFFBQVosRUFBc0JDLFFBQXRCLEdBQWlDRCxJQUFqQyxDQUFzQyx5QkFBdEMsQ0FBWjtBQUNBLGNBQUlWLE9BQU8sR0FBR2UsS0FBSyxDQUFDTCxJQUFOLENBQVcsMEJBQVgsRUFBdUNNLEdBQXZDLEVBQWQsQ0FIMkIsQ0FLM0I7O0FBQ0ExQixhQUFHLENBQUMyQixNQUFKLENBQVc7QUFDVGpCLG1CQUFPLEVBQUVBO0FBREEsV0FBWDtBQUdBUCxlQUFLLENBQUNJLEtBQU4sQ0FBWUYsS0FBWjtBQUNELFNBakJRO0FBa0JSbUIsZUFBTyxFQUFFLGlCQUFTVCxNQUFULEVBQWlCVixLQUFqQixFQUF1QixDQUVoQztBQXBCUSxPQUFYO0FBdUJEO0FBQ0YsR0FsQ0Q7QUFvQ0E5QixTQUFPLENBQUMsT0FBRCxFQUFVLEVBQVYsQ0FBUDtBQUNELENBN0hEIiwiZmlsZSI6Ii4vc3JjL2xheXVpYWRtaW4vbW9kdWxlcy9mb3J1bS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG5cclxuIEBOYW1l77yabGF5dWlBZG1pbiDnpL7ljLrns7vnu59cclxuIEBBdXRob3LvvJpzdGFyMTAyOVxyXG4gQFNpdGXvvJpodHRwOi8vd3d3LmxheXVpLmNvbS9hZG1pbi9cclxuIEBMaWNlbnNl77yaTFBQTFxyXG4gICAgXHJcbiAqL1xyXG5cclxuXHJcbmxheXVpLmRlZmluZShbJ3RhYmxlJywgJ2Zvcm0nXSwgZnVuY3Rpb24oZXhwb3J0cyl7XHJcbiAgdmFyICQgPSBsYXl1aS4kXHJcbiAgLHRhYmxlID0gbGF5dWkudGFibGVcclxuICAsZm9ybSA9IGxheXVpLmZvcm07XHJcblxyXG4gIC8v5biW5a2Q566h55CGXHJcbiAgdGFibGUucmVuZGVyKHtcclxuICAgIGVsZW06ICcjTEFZLWFwcC1mb3J1bS1saXN0J1xyXG4gICAgLHVybDogbGF5dWkuc2V0dGVyLmJhc2UgKyAnanNvbi9mb3J1bS9saXN0LmpzJyAvL+aooeaLn+aOpeWPo1xyXG4gICAgLGNvbHM6IFtbXHJcbiAgICAgIHt0eXBlOiAnY2hlY2tib3gnLCBmaXhlZDogJ2xlZnQnfVxyXG4gICAgICAse2ZpZWxkOiAnaWQnLCB3aWR0aDogMTAwLCB0aXRsZTogJ0lEJywgc29ydDogdHJ1ZX1cclxuICAgICAgLHtmaWVsZDogJ3Bvc3RlcicsIHRpdGxlOiAn5Y+R5biW5Lq6J31cclxuICAgICAgLHtmaWVsZDogJ2F2YXRhcicsIHRpdGxlOiAn5aS05YOPJywgd2lkdGg6IDEwMCwgdGVtcGxldDogJyNpbWdUcGwnfVxyXG4gICAgICAse2ZpZWxkOiAnY29udGVudCcsIHRpdGxlOiAn5Y+R5biW5YaF5a65J31cclxuICAgICAgLHtmaWVsZDogJ3Bvc3R0aW1lJywgdGl0bGU6ICflj5HluJbml7bpl7QnLCBzb3J0OiB0cnVlfVxyXG4gICAgICAse2ZpZWxkOiAndG9wJywgdGl0bGU6ICfnva7pobYnLCB0ZW1wbGV0OiAnI2J1dHRvblRwbCcsIG1pbldpZHRoOiA4MCwgYWxpZ246ICdjZW50ZXInfVxyXG4gICAgICAse3RpdGxlOiAn5pON5L2cJywgd2lkdGg6IDE1MCwgYWxpZ246ICdjZW50ZXInLCBmaXhlZDogJ3JpZ2h0JywgdG9vbGJhcjogJyN0YWJsZS1mb3J1bS1saXN0J31cclxuICAgIF1dXHJcbiAgICAscGFnZTogdHJ1ZVxyXG4gICAgLGxpbWl0OiAxMFxyXG4gICAgLGxpbWl0czogWzEwLCAxNSwgMjAsIDI1LCAzMF1cclxuICAgICx0ZXh0OiAn5a+55LiN6LW377yM5Yqg6L295Ye6546w5byC5bi477yBJ1xyXG4gIH0pO1xyXG4gIFxyXG4gIC8v55uR5ZCs5bel5YW35p2hXHJcbiAgdGFibGUub24oJ3Rvb2woTEFZLWFwcC1mb3J1bS1saXN0KScsIGZ1bmN0aW9uKG9iail7XHJcbiAgICB2YXIgZGF0YSA9IG9iai5kYXRhO1xyXG4gICAgaWYob2JqLmV2ZW50ID09PSAnZGVsJyl7XHJcbiAgICAgIGxheWVyLmNvbmZpcm0oJ+ehruWumuWIoOmZpOatpOadoeW4luWtkO+8nycsIGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICBvYmouZGVsKCk7XHJcbiAgICAgICAgbGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZihvYmouZXZlbnQgPT09ICdlZGl0Jyl7XHJcbiAgICAgIHZhciB0ciA9ICQob2JqLnRyKTtcclxuXHJcbiAgICAgIGxheWVyLm9wZW4oe1xyXG4gICAgICAgIHR5cGU6IDJcclxuICAgICAgICAsdGl0bGU6ICfnvJbovpHluJblrZAnXHJcbiAgICAgICAgLGNvbnRlbnQ6ICcuLi8uLi8uLi92aWV3cy9hcHAvZm9ydW0vbGlzdGZvcm0uaHRtbCdcclxuICAgICAgICAsYXJlYTogWyc1NTBweCcsICc0MDBweCddXHJcbiAgICAgICAgLGJ0bjogWyfnoa7lrponLCAn5Y+W5raIJ11cclxuICAgICAgICAscmVzaXplOiBmYWxzZVxyXG4gICAgICAgICx5ZXM6IGZ1bmN0aW9uKGluZGV4LCBsYXllcm8pe1xyXG4gICAgICAgICAgdmFyIGlmcmFtZVdpbmRvdyA9IHdpbmRvd1snbGF5dWktbGF5ZXItaWZyYW1lJysgaW5kZXhdXHJcbiAgICAgICAgICAsc3VibWl0SUQgPSAnTEFZLWFwcC1mb3J1bS1zdWJtaXQnXHJcbiAgICAgICAgICAsc3VibWl0ID0gbGF5ZXJvLmZpbmQoJ2lmcmFtZScpLmNvbnRlbnRzKCkuZmluZCgnIycrIHN1Ym1pdElEKTtcclxuXHJcbiAgICAgICAgICAvL+ebkeWQrOaPkOS6pFxyXG4gICAgICAgICAgaWZyYW1lV2luZG93LmxheXVpLmZvcm0ub24oJ3N1Ym1pdCgnKyBzdWJtaXRJRCArJyknLCBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgdmFyIGZpZWxkID0gZGF0YS5maWVsZDsgLy/ojrflj5bmj5DkuqTnmoTlrZfmrrVcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5o+Q5LqkIEFqYXgg5oiQ5Yqf5ZCO77yM6Z2Z5oCB5pu05paw6KGo5qC85Lit55qE5pWw5o2uXHJcbiAgICAgICAgICAgIC8vJC5hamF4KHt9KTtcclxuICAgICAgICAgICAgdGFibGUucmVsb2FkKCdMQVktYXBwLWZvcnVtLWxpc3QnKTsgLy/mlbDmja7liLfmlrBcclxuICAgICAgICAgICAgbGF5ZXIuY2xvc2UoaW5kZXgpOyAvL+WFs+mXreW8ueWxglxyXG4gICAgICAgICAgfSk7ICBcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgc3VibWl0LnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICxzdWNjZXNzOiBmdW5jdGlvbihsYXllcm8sIGluZGV4KXtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8v5Zue5biW566h55CGXHJcbiAgdGFibGUucmVuZGVyKHtcclxuICAgIGVsZW06ICcjTEFZLWFwcC1mb3J1bXJlcGx5LWxpc3QnXHJcbiAgICAsdXJsOiBsYXl1aS5zZXR0ZXIuYmFzZSArICdqc29uL2ZvcnVtL3JlcGx5cy5qcycgLy/mqKHmi5/mjqXlj6NcclxuICAgICxjb2xzOiBbW1xyXG4gICAgICB7dHlwZTogJ2NoZWNrYm94JywgZml4ZWQ6ICdsZWZ0J31cclxuICAgICAgLHtmaWVsZDogJ2lkJywgd2lkdGg6IDEwMCwgdGl0bGU6ICdJRCcsIHNvcnQ6IHRydWV9XHJcbiAgICAgICx7ZmllbGQ6ICdyZXBseWVyJywgdGl0bGU6ICflm57luJbkuronfVxyXG4gICAgICAse2ZpZWxkOiAnY2FyZGlkJywgdGl0bGU6ICflm57luJZJRCcsIHNvcnQ6IHRydWV9XHJcbiAgICAgICx7ZmllbGQ6ICdhdmF0YXInLCB0aXRsZTogJ+WktOWDjycsIHdpZHRoOiAxMDAsIHRlbXBsZXQ6ICcjaW1nVHBsJ31cclxuICAgICAgLHtmaWVsZDogJ2NvbnRlbnQnLCB0aXRsZTogJ+WbnuW4luWGheWuuScsIHdpZHRoOiAyMDB9XHJcbiAgICAgICx7ZmllbGQ6ICdyZXBseXRpbWUnLCB0aXRsZTogJ+WbnuW4luaXtumXtCcsIHNvcnQ6IHRydWV9XHJcbiAgICAgICx7dGl0bGU6ICfmk43kvZwnLCB3aWR0aDogMTUwLCBhbGlnbjogJ2NlbnRlcicsIGZpeGVkOiAncmlnaHQnLCB0b29sYmFyOiAnI3RhYmxlLWZvcnVtLXJlcGx5cyd9XHJcbiAgICBdXVxyXG4gICAgLHBhZ2U6IHRydWVcclxuICAgICxsaW1pdDogMTBcclxuICAgICxsaW1pdHM6IFsxMCwgMTUsIDIwLCAyNSwgMzBdXHJcbiAgICAsdGV4dDogJ+WvueS4jei1t++8jOWKoOi9veWHuueOsOW8guW4uO+8gSdcclxuICB9KTtcclxuICBcclxuICAvL+ebkeWQrOW3peWFt+adoVxyXG4gIHRhYmxlLm9uKCd0b29sKExBWS1hcHAtZm9ydW1yZXBseS1saXN0KScsIGZ1bmN0aW9uKG9iail7XHJcbiAgICB2YXIgZGF0YSA9IG9iai5kYXRhO1xyXG4gICAgaWYob2JqLmV2ZW50ID09PSAnZGVsJyl7XHJcbiAgICAgIGxheWVyLmNvbmZpcm0oJ+ehruWumuWIoOmZpOatpOadoeivhOiuuu+8nycsIGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICBvYmouZGVsKCk7XHJcbiAgICAgICAgbGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZihvYmouZXZlbnQgPT09ICdlZGl0Jyl7XHJcbiAgICAgIHZhciB0ciA9ICQob2JqLnRyKTtcclxuXHJcbiAgICAgIGxheWVyLm9wZW4oe1xyXG4gICAgICAgIHR5cGU6IDJcclxuICAgICAgICAsdGl0bGU6ICfnvJbovpHor4TorronXHJcbiAgICAgICAgLGNvbnRlbnQ6ICcuLi8uLi8uLi92aWV3cy9hcHAvZm9ydW0vcmVwbHlzZm9ybS5odG1sJ1xyXG4gICAgICAgICxhcmVhOiBbJzU1MHB4JywgJzM1MHB4J11cclxuICAgICAgICAsYnRuOiBbJ+ehruWumicsICflj5bmtognXVxyXG4gICAgICAgICxyZXNpemU6IGZhbHNlXHJcbiAgICAgICAgLHllczogZnVuY3Rpb24oaW5kZXgsIGxheWVybyl7XHJcbiAgICAgICAgICAvL+iOt+WPlmlmcmFtZeWFg+e0oOeahOWAvFxyXG4gICAgICAgICAgdmFyIG90aGlzID0gbGF5ZXJvLmZpbmQoJ2lmcmFtZScpLmNvbnRlbnRzKCkuZmluZChcIiNsYXl1aWFkbWluLWZvcm0tcmVwbHlzXCIpO1xyXG4gICAgICAgICAgdmFyIGNvbnRlbnQgPSBvdGhpcy5maW5kKCd0ZXh0YXJlYVtuYW1lPVwiY29udGVudFwiXScpLnZhbCgpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAvL+aVsOaNruabtOaWsFxyXG4gICAgICAgICAgb2JqLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgbGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAsc3VjY2VzczogZnVuY3Rpb24obGF5ZXJvLCBpbmRleCl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gIGV4cG9ydHMoJ2ZvcnVtJywge30pXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/layuiadmin/modules/forum.js\n");

/***/ }),

/***/ 5:
/*!***********************************************!*\
  !*** multi ./src/layuiadmin/modules/forum.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\刘晨\Desktop\flyadmin\src\layuiadmin\modules\forum.js */"./src/layuiadmin/modules/forum.js");


/***/ })

/******/ });