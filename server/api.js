"use strict";
const db = require('./db');
const express = require('express');
const router = express.Router();
var request = require('request');
var app = express();
const jwt = require("jsonwebtoken");
var sd = require('silly-datetime');
const path = require('path');
var bodyParse = require('body-parser')
var ueditor = require("./ueditor")
var WXBizDataCrypt = require('./WXBizDataCrypt')
router.use('/store',require('./store/index'));
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
router.get("/ueditor/ue", ueditor(path.join(__dirname, '../public'), function (req, res, next) {
    //客户端上传文件设置
    var imgDir = '/img/ueditor/'
     var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));
router.post("/ueditor/ue", ueditor(path.join(__dirname, '../public'), function (req, res, next) {
    //客户端上传文件设置
    var imgDir = '/img/ueditor/'
     var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));
// 首页
router.get('/',function(req,res){
    res.sendfile(path.resolve('../public/views/index.html'));
});
// 创建商家详情
router.post('/store/details', (req, res) => {
    let newstoreList = new db.storeList(req.body);
    newstoreList.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ 'code': 1, 'message': '保存成功' });
        }
    })
})
// 获取所有商家列表
router.get('/get/store/list', (req, res) => {
    db.storeList.find({}, (err, data) => {
        
        if (err) {
            res.send(err);
            return
        }else{
            res.send({ 'code': 1, data:data, 'message': '收藏成功' })
        }
    })
})
router.get('/login',function(req,res){
    if(req.query.username == '13693068423' && req.query.password == '123456'){
        res.send({ code: 1, message: '登录成功' });
    }else{
        res.send({ code: 0, message: '登录失败' });
    }
})
module.exports = router;