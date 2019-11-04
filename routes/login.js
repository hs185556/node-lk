let express = require('express');
let router = express.Router({});

//引用自定义中间件
let util = require('./../util/util');

router.get('/', function(req, res, next) {//路由配置，/login直接走loginRouter，loginRouter定义的就是./routes/login，但跳转时的路径好像还是根目录，所以直接写/
	res.render('login', {
		title: '登录'
	});
});//这个是保证直接进登录页面进得去，因为node里面直接跳转页面是通过get方式过去的，如果是form表单post方法是先走下面方法再走上面方法

//存取数据 实际开发是要把数据存储到数据库的，这里存到一个中间件去util

router.post('/', function(req, res, next) {
	//			1.获取数据 实际开发用户信息是要进行安全性和合法性的检验的
	//			console.log(req.body);
	let username = req.body.username;
	let userpwd = req.body.userpwd;
	//			2.处理数据
	//			2.1 创建用户注册对象(json)
	let loginUser = {
		username,
		userpwd
	};

//			2.2验证当前用户是否存在
	let user = util.isReg(loginUser, util.users);
	if(null === user || undefined === user) {
		res.send('当前的用户不存在');
	} else { //匹配到用户
//			2.2.1匹配密码
		if(user.userpwd === userpwd) {
			res.redirect('/chat');
		}else{
//			res.send('密码不正确');
			res.redirect('/login');
		}
	}
});

module.exports = router;