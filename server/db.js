// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/house');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
// 商家列表
const storeList = new mongoose.Schema({
    id:String,
    name:String,
    phone:String,
    address:String,
    image:Array,
    identity:String,
    editor:String,
    area:String,
    licenseImg:Array,
    areaid:String,
    lat:String,
    lng:String,
    news:String
})
// 商品列表
const goodsList  = new mongoose.Schema({
    id:String,
    name:String,
    goodsprice:String,
    retailprice:String,
    mount:Array,
    brand:String,
    date:String,
    areaid:String,
    qualityperiod:String,
    info:String,
})
// 师傅列表
const workerlist  = new mongoose.Schema({
    id:String,
    name:String,
    phone:String,
    area:String,
    areaid:String,
    range:String
})

// 富文本编辑上传图片
const ueditor = new mongoose.Schema({
    action: String,
    start: String,
    noCache: String
})
/************** 定义模型Model **************/
// const Models = {
//     Login : mongoose.model('Login',loginSchema)
// }
const Models = {
    // 超市列表
    storeList: mongoose.model('storeList', storeList),
    // 商品列表
    goodsList: mongoose.model('goodsList', goodsList)
}

module.exports = Models;
