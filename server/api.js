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
}) ;
// 登录页面
router.get('/user/login.html',function(req,res){
    res.sendfile(path.resolve('../public/views/user/login.html'));
})
router.get('/login',function(req,res){
    if(req.query.username == '13693068423' && req.query.password == '123456'){
        res.send({ code: 1, message: '登录成功' });
    }else{
        res.send({ code: 0, message: '登录失败' });
    }
})
// banner轮播图
router.post('/index/banner', (req, res) => {
    db.Banner.find({}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length != 0) {
            docs[0].image = req.body.image
            db.Banner(docs[0]).save(function (err) {
                if (err) {
                    res.status(500).send()
                    return
                }
                res.send({code:"1",message:"上传成功",err:req.body.image})
            })
        }else{
            let bannerImage = new db.Banner(req.body);
            bannerImage.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ code: 1, message: '上传成功' });
                }
            })
        }
    })
})
// 网赚思路列表
router.get('/info/list', (req, res) => {
    var sortquery=db.Infodel.find({}).sort({'_id':-1});
    sortquery.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '登陆成功','data':data});

    })
})
// 保存网赚思路详情
router.post('/info/details', (req, res) => {
    if(req.body._id){
        db.Infodel.update({_id:req.body._id},req.body,function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send({ 'code': 1, 'message': '修改成功' });
        })
    }else{
        let newInfodetail = new db.Infodel(req.body);
        newInfodetail.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, 'message': '保存成功' });
                }
            })
    }
})
// 删除网赚思路详情
router.post('/info/del/details', (req, res) => {
    db.Infodel.remove({ _id: req.body._id }, (err) => {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'code': 1, 'message': '删除成功' })
    })
})
// 上传网赚思路子分类 
router.post('/add/info/class',(req,res) =>{
    db.infoCla.find({ class_id: req.body.class_id }, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            res.send({ 'code': 0, 'message': '已有此id' });
        }else{
            let newinfoCla = new db.infoCla(req.body);
            newinfoCla.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, 'message': '保存成功' });
                }
            })
        }
    })
})
// 获取网赚思路子分类 couChide
router.get('/get/info/class',(req,res) =>{
    db.infoCla.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})
// 优惠券父级分类 couPrev
router.post('/coupon/prev',(req,res) =>{
    db.couPrev.find({ previd: req.body.previd }, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            res.send({ 'code': 0, 'message': '已有此id' });
        }else{
            let newcouPrev = new db.couPrev(req.body);
            newcouPrev.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, 'message': '保存成功' });
                }
            })
        }
    })
})
// 获取优惠券父级分类
router.get('/get/coupon/prev',(req,res) =>{
    db.couPrev.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})
// 富文本编辑
router.get('/ueditor',(req,res) =>{
    let newueditor = new db.ueditor(req.body);
    newueditor.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ code: 1, message: '上传成功' });
        }
    })
})
// ueditor/server
// 优惠券子集分类
router.post('/coupon/chide',(req,res) =>{
    db.couChide.find({ chideid: req.body.chideid }, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            res.send({ 'code': 0, 'message': '已有此id' });
        }else{
            let newcouChide = new db.couChide(req.body);
            newcouChide.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, 'message': '保存成功' });
                }
            })
        }
    })
})
// 获取优惠券子分类 couChide
router.get('/get/coupon/chide',(req,res) =>{
    db.couChide.find({previd: req.query.type}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})
// 优惠券详情
router.post('/coupon/details', (req, res) => {
    if(req.body._id){
        db.couDetails.update({_id:req.body._id},req.body,function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send({ 'code': 1, 'message': '修改成功' });
        })
    }else{
        let newcouDetails = new db.couDetails(req.body);
            newcouDetails.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, 'message': '保存成功' });
                }
            })
    }
})
// 获取所有优惠券详情
router.get('/get/coupon/details', (req, res) => {
    db.couDetails.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})
// 优惠券广告位

// couponImg
router.post('/coupon/banner', (req, res) => {
    db.couponImg.find({}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length != 0) {
            docs[0].image = req.body.image
            db.couponImg(docs[0]).save(function (err) {
                if (err) {
                    res.status(500).send()
                    return
                }
                res.send({code:"1",message:"上传成功"})
            })
        }else{
            let newcouponImg = new db.couponImg(req.body);
            newcouponImg.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ code: 1, message: '上传成功' });
                }
            })
        }
    })
})
// 删除优惠券详情
router.post('/coupon/del/details', (req, res) => {
    db.couDetails.remove({ _id: req.body._id }, (err) => {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'code': 1, 'message': '删除成功' })
    })
})

// 网赚思路列表resouse
router.get('/resouse/list', (req, res) => {
    var sortresoureDel=db.resoureDel.find({}).sort({'_id':-1});
    sortresoureDel.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '登陆成功','data':data});

    })
})
// 网赚思路详情
router.post('/resouse/details', (req, res) => {
    if(req.body._id){
        db.resoureDel.update({_id:req.body._id},req.body,function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send({ 'code': 1, 'message': '修改成功' });
        })
    }else{
        let newresoureDel = new db.resoureDel(req.body);
        newresoureDel.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, 'message': '保存成功' });
                }
            })
    }
})
// 删除网赚思路详情
router.post('/info/delresouse/details', (req, res) => {
    db.resoureDel.remove({ _id: req.body._id }, (err) => {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'code': 1, 'message': '删除成功' })
    })
})

// 小程序
// 轮播图
router.get('/get/index/banner', (req, res) => {
    db.Banner.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})

// 网赚思路详情列表
router.post('/get/info/list', (req, res) => {
    let page = req.body.page;
    let rows= req.body.rows;
    let interest = req.body.interest; 
    var jsonArray = [];
    var query=db.Infodel.find({interest:interest}).sort({'_id':-1});
    query.skip((page-1)*rows);
    query.limit(rows);
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            db.Infodel.find(function(err,result){
                if(parseInt(page * rows) < parseInt(result.length)){
                    jsonArray={data:rs,result:result.length,page:page + 1};
                }else{
                    jsonArray={data:rs,result:result.length,page:0};
                }
                res.json(jsonArray);         
            });
        }
    });
})
// 网赚思路单个详情
var getoriginal0 = function (req, res, next) {
    db.collectResouresData.find({openId:req.body.openId}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            if(docs[0].original.length > 0){
                for(var i = 0; i < docs[0].original.length; i++){
                    if(docs[0].original[i] == req.body.id){
                        req.goodstatus = true;
                        next();
                        return;
                    }
                    req.goodstatus = false;
                }
            }else{
                req.goodstatus = false;
            }
        }
        else{
            req.goodstatus = false;
        }
        next();
    })
}
var getoriginal1 = function (req, res, next) {
    db.Infodel.find({_id:req.body.id}, (err, data) => {
        if (err) {
            res.send(err); 
            return
        }
        res.send({ 'code': 1,status:req.goodstatus,'message': '请求成功','data':data});
        next();
    })
}
router.post('/get/info/details', [getoriginal0,getoriginal1])
// 更新网赚思路单个详情的观看人数
router.post('/update/details/number', (req, res) => {
    db.Infodel.find({_id:req.body.id}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        docs[0].number = docs[0].number == undefined ? 1 : parseInt(docs[0].number) + parseInt(1);
        db.Infodel(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send({ 'code': 1, 'message': '更新成功' })
        })
    })
})

// 优惠券父级分类
router.get('/get/coupon/prev', (req, res) => {
    db.couPrev.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})

// 优惠券子级分类
router.post('/get/coupon/chide', (req, res) => {
    db.couChide.find({previd:req.body.id}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})

// 优惠券子级列表
router.post('/get/coupon/chidelist', (req, res) => {
    let page = req.body.page;
    let rows= req.body.rows;
    var jsonArray = [];
    var query=db.couDetails.find({chideid:req.body.id});
    query.skip((page-1)*rows);
    query.limit(rows);
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            db.couDetails.find({chideid:req.body.id},function(err,result){
                if(parseInt(page * rows) < parseInt(result.length)){
                    jsonArray={data:rs,result:result.length,page:page + 1,type:'list'};
                }else{
                    jsonArray={data:rs,result:result.length,page:0,type:'list'};
                }
                res.json(jsonArray);         
            });
        }
    });
})
// 搜索优惠券列表
router.post('/get/search/chidelist', (req, res) => {
var reg = new RegExp(req.body.title,'i');
    let page = req.body.page;
    let rows= req.body.rows;
    var jsonArray = [];
    var query=db.couDetails.find({title : {$regex : reg}});
    query.skip((page-1)*rows);
    query.limit(rows);
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            db.couDetails.find({title : {$regex : reg}},function(err,result){
                if(parseInt(page * rows) < parseInt(result.length)){
                    jsonArray={data:rs,result:result.length,page:page + 1,type:'list'};
                }else{
                    jsonArray={data:rs,result:result.length,page:0,type:'list'};
                }
                res.json(jsonArray);         
            });
        }
    });
})
// 优惠券详情页面
var getcoupon0 = function (req, res, next) {
    db.collectResouresData.find({openId:req.body.openId}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            if(docs[0].resoures.length > 0){
                for(var i = 0; i < docs[0].resoures.length; i++){
                    if(docs[0].resoures[i] == req.body.id){
                        req.goodstatus = true;
                        next();
                        return;
                    }
                    req.goodstatus = false;
                }
            }else{
                req.goodstatus = false;
            }
        }
        else{
            req.goodstatus = false;
        }
        next();
    })
}
var getcoupon1 = function (req, res, next) {
    db.couDetails.find({_id:req.body.id}, (err, data) => {
        if (err) {
            res.send(err); 
            return
        }
        res.send({ 'code': 1,status:req.goodstatus,'message': '请求成功','data':data});
        next();
    })
}
router.post('/get/coupon/onedetails',[getcoupon0,getcoupon1]
)

// 轮播图
router.get('/get/coupon/banner', (req, res) => {
    db.couponImg.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '请求成功','data':data});
    })
})

// 网赚想法
router.post('/get/details/list', (req, res) => {
    let page = req.body.page;
    let rows= req.body.rows;
    var jsonArray = [];
    var query=db.resoureDel.find({}).sort({'_id':-1});
    query.skip((page-1)*rows);
    query.limit(rows);
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            db.resoureDel.find(function(err,result){
                if(parseInt(page * rows) < parseInt(result.length)){
                    jsonArray={data:rs,result:result.length,page:page + 1,type:'list'};
                }else{
                    jsonArray={data:rs,result:result.length,page:0,type:'list'};
                }
                res.json(jsonArray);         
            });
        }
    });
});

// 网赚思路单个详情
var getresouces0 = function (req, res, next) {
    db.collectResouresData.find({openId:req.body.openId}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            if(docs[0].goods.length > 0){
                for(var i = 0; i < docs[0].goods.length; i++){
                    if(docs[0].goods[i] == req.body.id){
                        req.goodstatus = true;
                        next();
                        return;
                    }
                    req.goodstatus = false;
                }
            }else{
                req.goodstatus = false;
            }
        }
        else{
            req.goodstatus = false;
        }
        next();
    })
}
var getresouces1 = function (req, res, next) {
    db.resoureDel.find({_id:req.body.id}, (err, data) => {
        if (err) {
            res.send(err); 
            return
        }
        res.send({ 'code': 1,status:req.goodstatus,'message': '请求成功','data':data});
        next();
    })
}
router.post('/get/resouces/details',[getresouces0,getresouces1])
// 搜索网赚想法列表
router.post('/get/search/resouce', (req, res) => {
    let page = req.body.page;
    let rows= req.body.rows;
    var jsonArray = [];
    var reg = new RegExp(req.body.title,'i');
        var query=db.resoureDel.find({title : {$regex : reg}});
        query.skip((page - 1) * rows);
        query.limit(rows);
        //计算分页数据
        query.exec(function(err,rs){
            if(err){
                res.send(err);
            }else{
                //计算数据总数
                db.resoureDel.find(function(err,result){
                    if(parseInt(page * rows) < parseInt(result.length)){
                        jsonArray={data:rs,result:result.length,page:page + 1,type:'search'};
                    }else{
                        jsonArray={data:rs,result:result.length,page:0,type:'search'};
                    }
                    res.json(jsonArray);         
                });
            }
        });
    })
// 首页爆品
router.post('/get/hot/goods', (req, res) => {
    var jsonArray = [];
    var query=db.couDetails.find({});
    query.skip(0);
    query.limit(5);
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            db.couDetails.find(function(err,result){
                jsonArray={data:rs,result:result.length};
                res.json(jsonArray);         
            });
        }
    });
})

// 首页网赚思路
router.post('/get/home/resouce', (req, res) => {
    var jsonArray = [];
    var query=db.Infodel.find({}).sort({'_id':-1});
    query.skip(0);
    query.limit(3);
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            db.Infodel.find(function(err,result){
                jsonArray={data:rs,result:result.length};
                res.json(jsonArray);         
            });
        }
    });
})
// 用户提交建议
router.post('/post/proposal/info', (req, res) => {
    req.body.current_time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    let newproposalDt = new db.proposalDt(req.body);
    newproposalDt.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ 'code': 1, 'message': '保存成功' });
        }
    })
})
// 后台获取建议列表
router.get('/get/proposal/info', (req, res) => {
    db.proposalDt.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '登陆成功','data':data});
    })
})
// 删除用户建议
router.post('/delete/proposal/info', (req, res) => {
    db.proposalDt.remove({ _id: req.body._id }, (err) => {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'code': 1, 'message': '删除成功' })
    })
})
// 更新用户建议状态
router.post('/update/proposal/info', (req, res) => {
    db.proposalDt.find({_id:req.body._id}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        docs[0].status = docs[0].number == undefined ? 1 : parseInt(docs[0].number) + parseInt(1);
        db.proposalDt(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send({ 'code': 1, 'message': '更新成功' })
        })
    })
})

// 用户登录
var appId = 'wxd687706e478a8c38';
var appSecret = '6482a9dd2a32b87edb26f45c5ec14df5';
router.get('/getUninoid',function(req,res){
    var reqs = req.query;
	request('https://api.weixin.qq.com/sns/jscode2session?appid='+appId+'&secret='+appSecret+'&js_code='+reqs.code+'&grant_type=authorization_code',function(error,response,body){
		if(!error && response.statusCode === 200){	//通过前端传过来的code获取sessionKey
			var bodyJson = JSON.parse(body)
			var sessionKey = bodyJson.session_key;
			
			if(bodyJson.unionid)rexturn ;//用户如果有关注公众号可以直接获取到，不用再进行解密
			// //获取到sessionKey后，开始进行解密，获取uninoid
			var encryptedData = reqs.encryptedData.replace(/ /g,'+');	//要把空格替换成+，不然会报错，因为前端数据传到后端时+号会被解析成空格，要再换回去
			var iv = reqs.iv.replace(/ /g,'+');
			
			var pc = new WXBizDataCrypt(appId, sessionKey)
            req.body.current_time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            var data = pc.decryptData(reqs.encryptedData , iv)
            db.userInfo.find({ openId: data.openId }, (err, docs) => {
                if (err) {
                    res.send(err);
                    return
                }
                if (docs.length > 0) {
                    docs[0].code = 1,
                    docs[0].message = "请求成功"
                    res.send(docs[0]);
                }else{
                    let newuserInfo = new db.userInfo(data);
                    newuserInfo.save(function (err) {
                        if (err) {
                            res.send(err);
                        } else {
                            data.code = 1,
                            data.message = "请求成功"
                            res.send(data)
                        }
                    })
                }
            })
		}
	})	
})
router.get('/get/userInfo/list', (req, res) => {
    db.userInfo.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        res.send({ 'code': 1, 'message': '登陆成功','data':data});

    })
})
var cb0 = function (req, res, next) {
    db.collectResouresData.find({openId:req.body.openId}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            if(docs[0].goods.length > 0){
                req.currentStatus = true;
                for(var i = 0; i < docs[0].goods.length; i++){
                    if(docs[0].goods[i] == req.body.goods[0]){
                        docs[0].goods.splice(i,1)
                        db.collectResouresData(docs[0]).save(function (err) {
                            if (err) {
                                res.status(500).send();
                                return
                            }
                            req.currentStatus = false;
                            res.send({ 'code': 0, status:false, 'message': '取消收藏' });
                            return;
                        })
                    }
                }
                if(req.currentStatus == true){
                    docs[0].goods.push(req.body.goods[0]);
                    db.collectResouresData(docs[0]).save(function (err) {
                        if (err) {
                            res.status(500).send()
                            return
                        }
                        res.send({ 'code': 1, status:true ,'message': '收藏成功' })
                        return;
                    })
                }
            }else{
                docs[0].goods.push(req.body.goods[0]);
                db.collectResouresData(docs[0]).save(function (err) {
                    if (err) {
                        res.status(500).send()
                        return
                    }
                    res.send({ 'code': 1, status:true, 'message': '收藏成功' })
                }) 
            }
        }else{
            let newcollectResoures = new db.collectResouresData(req.body);
            newcollectResoures.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, status:true, 'message': '收藏成功' }); 
                }
            })
        }
    })
}
router.post('/collectresoures',[cb0])
// 我的收藏网赚思路
router.post('/get/collectresoures', (req, res) => {
    let page = req.body.page;
    let rows= req.body.rows;
    var jsonArray = [];
    if(req.body.type == 1){
        let jsonArrayData = [];
        db.collectResouresData.find({openId:req.body.openId}, (err, docs) => {
            if (err) {
                res.send(err);
                return
            }         
            if (docs[0].resoures.length > 0) { 
            for(var i = 0; i < docs[0].resoures.length; i++){
                db.couDetails.find({_id:docs[0].resoures[i]},function(err, docsE){    
                    jsonArrayData.push(docsE[0])
                    if(jsonArrayData.length == docs[0].resoures.length){
                        res.json({"code":1,message:"查询成功",data:jsonArrayData,result:docs[0].resoures.length});
                    }
                });
            }
            }else{
                res.json({"code":0,message:"您还没有收藏过网赚思路",data:[],result:0});
            }
        }) 
    }
    else if(req.body.type == 2){
        let jsonArrayData = [];
        db.collectResouresData.find({openId:req.body.openId}, (err, docs) => {
            if (err) {
                res.send(err);
                return
            }         
            if (docs[0].goods.length > 0) { 
            for(var i = 0; i < docs[0].goods.length; i++){
                db.resoureDel.find({_id:docs[0].goods[i]},function(err, docsE){    
                    jsonArrayData.push(docsE[0])
                    if(jsonArrayData.length == docs[0].goods.length){
                        res.json({"code":1,message:"查询成功",data:jsonArrayData,result:docs[0].goods.length});
                    }
                });
            }
            }else{
                res.json({"code":0,message:"您还没有收藏过网赚思路",data:[],result:0});
            }
        })
    }else if(req.body.type == 3){
        let jsonArrayData = [];
        db.collectResouresData.find({openId:req.body.openId}, (err, docs) => {
            if (err) {
                res.send(err);
                return
            }         
            if (docs[0].original.length > 0) { 
            for(var i = 0; i < docs[0].original.length; i++){
                db.Infodel.find({_id:docs[0].original[i]},function(err, docsE){    
                    jsonArrayData.push(docsE[0])
                    if(jsonArrayData.length == docs[0].original.length){
                        res.json({"code":1,message:"查询成功",data:jsonArrayData,result:docs[0].original.length});
                    }
                });
            }
            }else{
                res.json({"code":0,message:"您还没有收藏过羊毛详情",data:[],result:0});
            }
        })
    }
})

// 每日羊毛
var original = function (req, res, next) {
    db.collectResouresData.find({openId:req.body.openId}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            if(docs[0].original.length > 0){
                req.currentStatus = true;
                for(var i = 0; i < docs[0].original.length; i++){
                    if(docs[0].original[i] == req.body.original[0]){
                        docs[0].original.splice(i,1)
                        db.collectResouresData(docs[0]).save(function (err) {
                            if (err) {
                                res.status(500).send();
                                return
                            }
                            req.currentStatus = false;
                            res.send({ 'code': 0, status:false, 'message': '取消收藏' });
                            return;
                        })
                    }
                }
                if(req.currentStatus == true){
                    docs[0].original.push(req.body.original[0]);
                    db.collectResouresData(docs[0]).save(function (err) {
                        if (err) {
                            res.status(500).send()
                            return
                        }
                        res.send({ 'code': 1, status:true ,'message': '收藏成功' })
                        return;
                    })
                }
            }else{
                docs[0].original.push(req.body.original[0]);
                db.collectResouresData(docs[0]).save(function (err) {
                    if (err) {
                        res.status(500).send()
                        return
                    }
                    res.send({ 'code': 1, status:true, 'message': '收藏成功' })
                }) 
            }
        }else{
            let newcollectResoures = new db.collectResouresData(req.body);
            newcollectResoures.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, status:true, 'message': '收藏成功' }); 
                }
            })
        }
    })
}
// collectOriginalData
router.post('/collectoriginal', [original])

// 收藏优惠券商品
var goods0 = function (req, res, next) {
    db.collectResouresData.find({openId:req.body.openId}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            if(docs[0].resoures.length > 0){
                req.currentStatus = true;
                for(var i = 0; i < docs[0].resoures.length; i++){
                    if(docs[0].resoures[i] == req.body.resoures[0]){
                        docs[0].resoures.splice(i,1)
                        db.collectResouresData(docs[0]).save(function (err) {
                            if (err) {
                                res.status(500).send();
                                return
                            }
                            req.currentStatus = false;
                            res.send({ 'code': 0, status:false, 'message': '取消收藏' });
                            return;
                        })
                    }
                }
                if(req.currentStatus == true){
                    docs[0].resoures.push(req.body.resoures[0]);
                    db.collectResouresData(docs[0]).save(function (err) {
                        if (err) {
                            res.status(500).send()
                            return
                        }
                        res.send({ 'code': 1, status:true ,'message': '收藏成功' })
                        return;
                    })
                }
            }else{
                docs[0].resoures.push(req.body.resoures[0]);
                db.collectResouresData(docs[0]).save(function (err) {
                    if (err) {
                        res.status(500).send()
                        return
                    }
                    res.send({ 'code': 1, status:true, 'message': '收藏成功' })
                }) 
            }
        }else{
            let newcollectResoures = new db.collectResouresData(req.body);
            newcollectResoures.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ 'code': 1, status:true, 'message': '收藏成功' }); 
                }
            })
        }
    })
}
router.post('/collectgoods', [goods0])
module.exports = router;