const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express');
const api = require('./api'); 
const app = express();
app.use(express.static(path.join(__dirname, '../public')));
const session=require('express-session');
app.all('*', function(req, res, next) {
    //设为指定的域
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
  });
//跨域
app.use(cors());
// app.use(cookieParser());
app.use(express.json({limit: '5mb'}));
// app.use(session({
//     secret:'12345',
//     cookie:{maxAge:60 * 1000 * 60},
//     resave:false,
//     saveUninitialized:true
// }))

app.use(bodyParser.json());
//当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);

// 监听8088端口
var server=app.listen(3001) ;
console.log('success listen…………');