
"use strict";
const db = require('../db');
const express = require('express');
const router=express.Router();
// 获取所有商家列表s
router.get('/get/list', (req, res) => {
    let page = parseFloat(req.query.page);
    let rows= parseFloat(req.query.limit);
    var jsonArray = [];
    var query=db.storeList.find({}).sort({'_id':-1});
    query.skip((page-1)*rows);
    query.limit(rows);
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            db.storeList.find(function(err,result){
                if(parseInt(page * rows) < parseInt(result.length)){
                    jsonArray={code:1,message:"请求成功",data:rs,count:result.length,page:page + 1};
                }else{
                    jsonArray={code:1,message:"请求成功",data:rs,count:result.length,page:0};
                }
                res.json(jsonArray); 
            });

        }
    });
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
            res.status(500).send();
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