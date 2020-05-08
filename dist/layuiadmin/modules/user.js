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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/layuiadmin/modules/user.js":
/*!****************************************!*\
  !*** ./src/layuiadmin/modules/user.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n\r\n @Name：layuiAdmin 用户登入和注册等\r\n @Author：贤心\r\n @Site：http://www.layui.com/admin/\r\n @License: LPPL\r\n    \r\n */\nlayui.define('form', function (exports) {\n  var $ = layui.$,\n      layer = layui.layer,\n      laytpl = layui.laytpl,\n      setter = layui.setter,\n      view = layui.view,\n      admin = layui.admin,\n      form = layui.form;\n  var $body = $('body'); //自定义验证\n\n  form.verify({\n    nickname: function nickname(value, item) {\n      //value：表单的值、item：表单的DOM对象\n      if (!new RegExp(\"^[a-zA-Z0-9_\\u4E00-\\u9FA5\\\\s\\xB7]+$\").test(value)) {\n        return '用户名不能有特殊字符';\n      }\n\n      if (/(^\\_)|(\\__)|(\\_+$)/.test(value)) {\n        return '用户名首尾不能出现下划线\\'_\\'';\n      }\n\n      if (/^\\d+\\d+\\d$/.test(value)) {\n        return '用户名不能全为数字';\n      }\n    } //我们既支持上述函数式的方式，也支持下述数组的形式\n    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]\n    ,\n    pass: [/^[\\S]{6,12}$/, '密码必须6到12位，且不能出现空格']\n  }); //发送短信验证码\n\n  admin.sendAuthCode({\n    elem: '#LAY-user-getsmscode',\n    elemPhone: '#LAY-user-login-cellphone',\n    elemVercode: '#LAY-user-login-vercode',\n    ajax: {\n      url: layui.setter.base + 'json/user/sms.js' //实际使用请改成服务端真实接口\n\n    }\n  }); //更换图形验证码\n\n  $body.on('click', '#LAY-user-get-vercode', function () {\n    var othis = $(this);\n    this.src = 'https://www.oschina.net/action/user/captcha?t=' + new Date().getTime();\n  }); //对外暴露的接口\n\n  exports('user', {});\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGF5dWlhZG1pbi9tb2R1bGVzL3VzZXIuanM/ODBkNCJdLCJuYW1lcyI6WyJsYXl1aSIsImRlZmluZSIsImV4cG9ydHMiLCIkIiwibGF5ZXIiLCJsYXl0cGwiLCJzZXR0ZXIiLCJ2aWV3IiwiYWRtaW4iLCJmb3JtIiwiJGJvZHkiLCJ2ZXJpZnkiLCJuaWNrbmFtZSIsInZhbHVlIiwiaXRlbSIsIlJlZ0V4cCIsInRlc3QiLCJwYXNzIiwic2VuZEF1dGhDb2RlIiwiZWxlbSIsImVsZW1QaG9uZSIsImVsZW1WZXJjb2RlIiwiYWpheCIsInVybCIsImJhc2UiLCJvbiIsIm90aGlzIiwic3JjIiwiRGF0ZSIsImdldFRpbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQVNBQSxLQUFLLENBQUNDLE1BQU4sQ0FBYSxNQUFiLEVBQXFCLFVBQVNDLE9BQVQsRUFBaUI7QUFDcEMsTUFBSUMsQ0FBQyxHQUFHSCxLQUFLLENBQUNHLENBQWQ7QUFBQSxNQUNDQyxLQUFLLEdBQUdKLEtBQUssQ0FBQ0ksS0FEZjtBQUFBLE1BRUNDLE1BQU0sR0FBR0wsS0FBSyxDQUFDSyxNQUZoQjtBQUFBLE1BR0NDLE1BQU0sR0FBR04sS0FBSyxDQUFDTSxNQUhoQjtBQUFBLE1BSUNDLElBQUksR0FBR1AsS0FBSyxDQUFDTyxJQUpkO0FBQUEsTUFLQ0MsS0FBSyxHQUFHUixLQUFLLENBQUNRLEtBTGY7QUFBQSxNQU1DQyxJQUFJLEdBQUdULEtBQUssQ0FBQ1MsSUFOZDtBQVFBLE1BQUlDLEtBQUssR0FBR1AsQ0FBQyxDQUFDLE1BQUQsQ0FBYixDQVRvQyxDQVdwQzs7QUFDQU0sTUFBSSxDQUFDRSxNQUFMLENBQVk7QUFDVkMsWUFBUSxFQUFFLGtCQUFTQyxLQUFULEVBQWdCQyxJQUFoQixFQUFxQjtBQUFFO0FBQy9CLFVBQUcsQ0FBQyxJQUFJQyxNQUFKLENBQVcscUNBQVgsRUFBK0NDLElBQS9DLENBQW9ESCxLQUFwRCxDQUFKLEVBQStEO0FBQzdELGVBQU8sWUFBUDtBQUNEOztBQUNELFVBQUcscUJBQXFCRyxJQUFyQixDQUEwQkgsS0FBMUIsQ0FBSCxFQUFvQztBQUNsQyxlQUFPLG1CQUFQO0FBQ0Q7O0FBQ0QsVUFBRyxhQUFhRyxJQUFiLENBQWtCSCxLQUFsQixDQUFILEVBQTRCO0FBQzFCLGVBQU8sV0FBUDtBQUNEO0FBQ0YsS0FYUyxDQWFWO0FBQ0E7QUFkVTtBQWVUSSxRQUFJLEVBQUUsQ0FDTCxjQURLLEVBRUosbUJBRkk7QUFmRyxHQUFaLEVBWm9DLENBa0NwQzs7QUFDQVQsT0FBSyxDQUFDVSxZQUFOLENBQW1CO0FBQ2pCQyxRQUFJLEVBQUUsc0JBRFc7QUFFaEJDLGFBQVMsRUFBRSwyQkFGSztBQUdoQkMsZUFBVyxFQUFFLHlCQUhHO0FBSWhCQyxRQUFJLEVBQUU7QUFDTEMsU0FBRyxFQUFFdkIsS0FBSyxDQUFDTSxNQUFOLENBQWFrQixJQUFiLEdBQW9CLGtCQURwQixDQUN1Qzs7QUFEdkM7QUFKVSxHQUFuQixFQW5Db0MsQ0ErQ3BDOztBQUNBZCxPQUFLLENBQUNlLEVBQU4sQ0FBUyxPQUFULEVBQWtCLHVCQUFsQixFQUEyQyxZQUFVO0FBQ25ELFFBQUlDLEtBQUssR0FBR3ZCLENBQUMsQ0FBQyxJQUFELENBQWI7QUFDQSxTQUFLd0IsR0FBTCxHQUFXLG1EQUFrRCxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBN0Q7QUFDRCxHQUhELEVBaERvQyxDQXFEcEM7O0FBQ0EzQixTQUFPLENBQUMsTUFBRCxFQUFTLEVBQVQsQ0FBUDtBQUNELENBdkREIiwiZmlsZSI6Ii4vc3JjL2xheXVpYWRtaW4vbW9kdWxlcy91c2VyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcblxyXG4gQE5hbWXvvJpsYXl1aUFkbWluIOeUqOaIt+eZu+WFpeWSjOazqOWGjOetiVxyXG4gQEF1dGhvcu+8mui0pOW/g1xyXG4gQFNpdGXvvJpodHRwOi8vd3d3LmxheXVpLmNvbS9hZG1pbi9cclxuIEBMaWNlbnNlOiBMUFBMXHJcbiAgICBcclxuICovXHJcbiBcclxubGF5dWkuZGVmaW5lKCdmb3JtJywgZnVuY3Rpb24oZXhwb3J0cyl7XHJcbiAgdmFyICQgPSBsYXl1aS4kXHJcbiAgLGxheWVyID0gbGF5dWkubGF5ZXJcclxuICAsbGF5dHBsID0gbGF5dWkubGF5dHBsXHJcbiAgLHNldHRlciA9IGxheXVpLnNldHRlclxyXG4gICx2aWV3ID0gbGF5dWkudmlld1xyXG4gICxhZG1pbiA9IGxheXVpLmFkbWluXHJcbiAgLGZvcm0gPSBsYXl1aS5mb3JtO1xyXG5cclxuICB2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgXHJcbiAgLy/oh6rlrprkuYnpqozor4FcclxuICBmb3JtLnZlcmlmeSh7XHJcbiAgICBuaWNrbmFtZTogZnVuY3Rpb24odmFsdWUsIGl0ZW0peyAvL3ZhbHVl77ya6KGo5Y2V55qE5YC844CBaXRlbe+8muihqOWNleeahERPTeWvueixoVxyXG4gICAgICBpZighbmV3IFJlZ0V4cChcIl5bYS16QS1aMC05X1xcdTRlMDAtXFx1OWZhNVxcXFxzwrddKyRcIikudGVzdCh2YWx1ZSkpe1xyXG4gICAgICAgIHJldHVybiAn55So5oi35ZCN5LiN6IO95pyJ54m55q6K5a2X56ymJztcclxuICAgICAgfVxyXG4gICAgICBpZigvKF5cXF8pfChcXF9fKXwoXFxfKyQpLy50ZXN0KHZhbHVlKSl7XHJcbiAgICAgICAgcmV0dXJuICfnlKjmiLflkI3pppblsL7kuI3og73lh7rnjrDkuIvliJLnur9cXCdfXFwnJztcclxuICAgICAgfVxyXG4gICAgICBpZigvXlxcZCtcXGQrXFxkJC8udGVzdCh2YWx1ZSkpe1xyXG4gICAgICAgIHJldHVybiAn55So5oi35ZCN5LiN6IO95YWo5Li65pWw5a2XJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aIkeS7rOaXouaUr+aMgeS4iui/sOWHveaVsOW8j+eahOaWueW8j++8jOS5n+aUr+aMgeS4i+i/sOaVsOe7hOeahOW9ouW8j1xyXG4gICAgLy/mlbDnu4TnmoTkuKTkuKrlgLzliIbliKvku6PooajvvJpb5q2j5YiZ5Yy56YWN44CB5Yy56YWN5LiN56ym5pe255qE5o+Q56S65paH5a2XXVxyXG4gICAgLHBhc3M6IFtcclxuICAgICAgL15bXFxTXXs2LDEyfSQvXHJcbiAgICAgICwn5a+G56CB5b+F6aG7NuWIsDEy5L2N77yM5LiU5LiN6IO95Ye6546w56m65qC8J1xyXG4gICAgXSBcclxuICB9KTtcclxuICBcclxuICBcclxuICAvL+WPkemAgeefreS/oemqjOivgeeggVxyXG4gIGFkbWluLnNlbmRBdXRoQ29kZSh7XHJcbiAgICBlbGVtOiAnI0xBWS11c2VyLWdldHNtc2NvZGUnXHJcbiAgICAsZWxlbVBob25lOiAnI0xBWS11c2VyLWxvZ2luLWNlbGxwaG9uZSdcclxuICAgICxlbGVtVmVyY29kZTogJyNMQVktdXNlci1sb2dpbi12ZXJjb2RlJ1xyXG4gICAgLGFqYXg6IHtcclxuICAgICAgdXJsOiBsYXl1aS5zZXR0ZXIuYmFzZSArICdqc29uL3VzZXIvc21zLmpzJyAvL+WunumZheS9v+eUqOivt+aUueaIkOacjeWKoeerr+ecn+WunuaOpeWPo1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC8v5pu05o2i5Zu+5b2i6aqM6K+B56CBXHJcbiAgJGJvZHkub24oJ2NsaWNrJywgJyNMQVktdXNlci1nZXQtdmVyY29kZScsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgb3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgdGhpcy5zcmMgPSAnaHR0cHM6Ly93d3cub3NjaGluYS5uZXQvYWN0aW9uL3VzZXIvY2FwdGNoYT90PScrIG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgfSk7XHJcbiAgXHJcbiAgLy/lr7nlpJbmmrTpnLLnmoTmjqXlj6NcclxuICBleHBvcnRzKCd1c2VyJywge30pO1xyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/layuiadmin/modules/user.js\n");

/***/ }),

/***/ 12:
/*!**********************************************!*\
  !*** multi ./src/layuiadmin/modules/user.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\刘晨\Desktop\flyadmin\src\layuiadmin\modules\user.js */"./src/layuiadmin/modules/user.js");


/***/ })

/******/ });