// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/tao');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
// banner轮播
const bannerImg = new mongoose.Schema({
    image: Array
})
// 富文本编辑上传图片
const ueditor = new mongoose.Schema({
    action: String,
    start: String,
    noCache: String
})
// 网赚思路详情
const infoDetail = new mongoose.Schema({
    title: String,
    image: Array,
    interest: String,
    author:String,
    interest_name: String,
    date: String,
    number:String,
    details: String
})
// 网赚思路分类
const infoClass = new mongoose.Schema({
    name:String,
    class_id: String
})
// 优惠券父级分类
const couponPrev = new mongoose.Schema({
    name: String,
    previd: String
})
// 优惠券子级分类
const couponChide = new mongoose.Schema({
    previd: String,
    image: Array,
    name: String,
    chideid: String
})
// 优惠券上传图片
const couponImage = new mongoose.Schema({
    image: Array
})
// 优惠券详情
const couponDetails = new mongoose.Schema({
    previd: String,
    prev_name: String,
    chideid: String,
    chide_name: String,
    title:String,
    command:String,
    info:String,
    image: Array,
    present_price:String,
    original_price:String,
    discount_price: String,
    date: String,
    details: String,
})
// 网赚想法
const resoureDetails = new mongoose.Schema({
    title:String,
    author:String,
    image: Array,
    fabulous:String,
    browse:String,
    date: String,
    details: String,
})
// 个人建议
const proposalData = new mongoose.Schema({
    openId:String,
    nickName:String,
    nickName:String,
    openId:String,
    name:String,
    phone:String,
    class_id:String,
    class_name:String,
    remark:String,
    current_time:String,
    status:String
})
// 用户注册 openid
const userInfoData = new mongoose.Schema({
    avatarUrl:String,
    city:String,
    openId:String,
    language:String,
    nickName:String
})
// 收藏网赚思路
const collectResoures = new mongoose.Schema({
    openId:String,
    resoures:Array,
    original:Array,
    goods:Array,
})
// 收藏每日羊毛
const collectOriginal = new mongoose.Schema({
    openId:String,
    collect_id:String,
    title: String,
    image: Array,
    interest: String,
    author:String,
    interest_name: String,
    date: String,
    number:String,
    details: String   
})
collectGoods = new mongoose.Schema({
    openId:String,
    collect_id:String,
    prev_name: String,
    chideid: String,
    chide_name: String,
    title:String,
    command:String,
    info:String,
    image: Array,
    present_price:String,
    original_price:String,
    discount_price: String,
    date: String,
    details: String,
})
/************** 定义模型Model **************/
// const Models = {
//     Login : mongoose.model('Login',loginSchema)
// }
const Models = {
    // 轮播
    Banner: mongoose.model('Banner', bannerImg),
    // 网赚思路
    Infodel: mongoose.model('Infodel', infoDetail),
    // 网赚思路分类
    infoCla: mongoose.model('infoCla', infoClass),
    // 优惠券父级分类
    couPrev: mongoose.model('couPrev', couponPrev),
    // 优惠券子级分类
    couChide: mongoose.model('couChide', couponChide),
    // 优惠券广告位
    couponImg: mongoose.model('couponImg', couponImage),
    // 优惠券详情
    couDetails: mongoose.model('couDetails', couponDetails),
    // 富文本编辑
    ueditor: mongoose.model('ueditor', ueditor),
    // 网赚想法
    resoureDel: mongoose.model('resoureDel', resoureDetails),
    // 用户建议
    proposalDt: mongoose.model('proposalData',proposalData),
    // 用户注册信息
    userInfo:mongoose.model('userInfo',userInfoData),
    // 收藏网赚思路
    collectResouresData:mongoose.model('collectResoures',collectResoures),
    // 收藏每日羊毛   
    collectOriginalData:mongoose.model('collectOriginal',collectOriginal),
    // 收藏优惠券商品 
    collectGoodsData:mongoose.model('collectGoods',collectGoods),
}

module.exports = Models;
