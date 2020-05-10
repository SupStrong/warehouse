
"use strict";
const db = require('../db');
const express = require('express');
const router=express.Router();
// 获取所有商家列表
router.get('/get/list', (req, res) => {
    db.storeList.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }else{
            res.send({ 'code': 1, data:data, 'message': '收藏成功' })
        }
    })
})
// 删除网赚思路详情
router.post('/del/list', (req, res) => {
    db.storeList.remove({ _id: req.query.id }, (err) => {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'code': 1, 'message': '删除成功' })
    })
})
// 创建商家详情
router.post('/create/details', (req, res) => {
    let newstoreList = new db.storeList(req.body);
    newstoreList.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ 'code': 1, 'message': '保存成功' });
        }
    })
})
// 编辑商家详情
router.post('/update/details', (req, res) => {
    db.storeList.update({_id:req.query.id},req.body,function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'code': 1, 'message': '修改成功' });
    })
})
// 获取商家详情
router.post('/get/details', (req, res) => {
    db.storeList.find({_id:req.query.id}, (err, data) => {
        if (err) {
            res.send(err); 
            return
        }
        res.send({ 'code': 1,'message': '请求成功','data':data});
    })
})
module.exports = router;