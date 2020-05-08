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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/layuiadmin/modules/common.js":
/*!******************************************!*\
  !*** ./src/layuiadmin/modules/common.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n\r\n @Name：layuiAdmin 公共业务\r\n @Author：贤心\r\n @Site：http://www.layui.com/admin/\r\n @License：LPPL\r\n    \r\n */\nlayui.define(function (exports) {\n  var $ = layui.$,\n      layer = layui.layer,\n      laytpl = layui.laytpl,\n      setter = layui.setter,\n      view = layui.view,\n      admin = layui.admin; //公共业务的逻辑处理可以写在此处，切换任何页面都会执行\n  //……\n  //退出\n\n  admin.events.logout = function () {\n    //执行退出接口\n    admin.req({\n      url: layui.setter.base + 'json/user/logout.js',\n      type: 'get',\n      data: {},\n      done: function done(res) {\n        //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行\n        //清空本地记录的 token，并跳转到登入页\n        admin.exit(function () {\n          location.href = 'user/login.html';\n        });\n      }\n    });\n  }; //对外暴露的接口\n\n\n  exports('common', {});\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGF5dWlhZG1pbi9tb2R1bGVzL2NvbW1vbi5qcz9jMzU2Il0sIm5hbWVzIjpbImxheXVpIiwiZGVmaW5lIiwiZXhwb3J0cyIsIiQiLCJsYXllciIsImxheXRwbCIsInNldHRlciIsInZpZXciLCJhZG1pbiIsImV2ZW50cyIsImxvZ291dCIsInJlcSIsInVybCIsImJhc2UiLCJ0eXBlIiwiZGF0YSIsImRvbmUiLCJyZXMiLCJleGl0IiwibG9jYXRpb24iLCJocmVmIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFTQUEsS0FBSyxDQUFDQyxNQUFOLENBQWEsVUFBU0MsT0FBVCxFQUFpQjtBQUM1QixNQUFJQyxDQUFDLEdBQUdILEtBQUssQ0FBQ0csQ0FBZDtBQUFBLE1BQ0NDLEtBQUssR0FBR0osS0FBSyxDQUFDSSxLQURmO0FBQUEsTUFFQ0MsTUFBTSxHQUFHTCxLQUFLLENBQUNLLE1BRmhCO0FBQUEsTUFHQ0MsTUFBTSxHQUFHTixLQUFLLENBQUNNLE1BSGhCO0FBQUEsTUFJQ0MsSUFBSSxHQUFHUCxLQUFLLENBQUNPLElBSmQ7QUFBQSxNQUtDQyxLQUFLLEdBQUdSLEtBQUssQ0FBQ1EsS0FMZixDQUQ0QixDQVE1QjtBQUNBO0FBSUE7O0FBQ0FBLE9BQUssQ0FBQ0MsTUFBTixDQUFhQyxNQUFiLEdBQXNCLFlBQVU7QUFDOUI7QUFDQUYsU0FBSyxDQUFDRyxHQUFOLENBQVU7QUFDUkMsU0FBRyxFQUFFWixLQUFLLENBQUNNLE1BQU4sQ0FBYU8sSUFBYixHQUFvQixxQkFEakI7QUFFUEMsVUFBSSxFQUFFLEtBRkM7QUFHUEMsVUFBSSxFQUFFLEVBSEM7QUFJUEMsVUFBSSxFQUFFLGNBQVNDLEdBQVQsRUFBYTtBQUFFO0FBRXBCO0FBQ0FULGFBQUssQ0FBQ1UsSUFBTixDQUFXLFlBQVU7QUFDbkJDLGtCQUFRLENBQUNDLElBQVQsR0FBZ0IsaUJBQWhCO0FBQ0QsU0FGRDtBQUdEO0FBVk8sS0FBVjtBQVlELEdBZEQsQ0FkNEIsQ0ErQjVCOzs7QUFDQWxCLFNBQU8sQ0FBQyxRQUFELEVBQVcsRUFBWCxDQUFQO0FBQ0QsQ0FqQ0QiLCJmaWxlIjoiLi9zcmMvbGF5dWlhZG1pbi9tb2R1bGVzL2NvbW1vbi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG5cclxuIEBOYW1l77yabGF5dWlBZG1pbiDlhazlhbHkuJrliqFcclxuIEBBdXRob3LvvJrotKTlv4NcclxuIEBTaXRl77yaaHR0cDovL3d3dy5sYXl1aS5jb20vYWRtaW4vXHJcbiBATGljZW5zZe+8mkxQUExcclxuICAgIFxyXG4gKi9cclxuIFxyXG5sYXl1aS5kZWZpbmUoZnVuY3Rpb24oZXhwb3J0cyl7XHJcbiAgdmFyICQgPSBsYXl1aS4kXHJcbiAgLGxheWVyID0gbGF5dWkubGF5ZXJcclxuICAsbGF5dHBsID0gbGF5dWkubGF5dHBsXHJcbiAgLHNldHRlciA9IGxheXVpLnNldHRlclxyXG4gICx2aWV3ID0gbGF5dWkudmlld1xyXG4gICxhZG1pbiA9IGxheXVpLmFkbWluXHJcbiAgXHJcbiAgLy/lhazlhbHkuJrliqHnmoTpgLvovpHlpITnkIblj6/ku6XlhpnlnKjmraTlpITvvIzliIfmjaLku7vkvZXpobXpnaLpg73kvJrmiafooYxcclxuICAvL+KApuKAplxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC8v6YCA5Ye6XHJcbiAgYWRtaW4uZXZlbnRzLmxvZ291dCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAvL+aJp+ihjOmAgOWHuuaOpeWPo1xyXG4gICAgYWRtaW4ucmVxKHtcclxuICAgICAgdXJsOiBsYXl1aS5zZXR0ZXIuYmFzZSArICdqc29uL3VzZXIvbG9nb3V0LmpzJ1xyXG4gICAgICAsdHlwZTogJ2dldCdcclxuICAgICAgLGRhdGE6IHt9XHJcbiAgICAgICxkb25lOiBmdW5jdGlvbihyZXMpeyAvL+i/memHjOimgeivtOaYjuS4gOS4i++8mmRvbmUg5piv5Y+q5pyJIHJlc3BvbnNlIOeahCBjb2RlIOato+W4uOaJjeS8muaJp+ihjOOAguiAjCBzdWNjZXNlIOWImeaYr+WPquimgSBodHRwIOS4uiAyMDAg5bCx5Lya5omn6KGMXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/muIXnqbrmnKzlnLDorrDlvZXnmoQgdG9rZW7vvIzlubbot7PovazliLDnmbvlhaXpobVcclxuICAgICAgICBhZG1pbi5leGl0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJ3VzZXIvbG9naW4uaHRtbCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIFxyXG4gIC8v5a+55aSW5pq06Zyy55qE5o6l5Y+jXHJcbiAgZXhwb3J0cygnY29tbW9uJywge30pO1xyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/layuiadmin/modules/common.js\n");

/***/ }),

/***/ 1:
/*!************************************************!*\
  !*** multi ./src/layuiadmin/modules/common.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\刘晨\Desktop\flyadmin\src\layuiadmin\modules\common.js */"./src/layuiadmin/modules/common.js");


/***/ })

/******/ });