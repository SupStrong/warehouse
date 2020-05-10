
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
module.exports = router;