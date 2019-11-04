let express = require('express');
let router = express.Router();//这里用({}) 还是 ()

//引用自定义中间件
let util = require('./../util/util');

router.get('/', function(req, res, next) {
  res.render('register', { title: '注册' });
});//就算form表单是post方法，这个也不能去掉，不然进不去注册页面，它正常的路由跳转页面是通过get执行的



router.post('/', function(req, res, next) {
//			1.获取数据 实际开发用户信息是要进行安全性和合法性的检验的
//			console.log(req.body);
			let username = req.body.username;
			let userpwd = req.body.userpwd;
//			2.处理数据
//			2.1 创建用户注册对象(json)
			let regUser = {
				username,
				userpwd
			};
//			2.2验证当前注册用户是否被注册(这个模块经常需要用到，所以最好写成一个中间件)
			let user = util.isReg(regUser,util.users);
			if(user === null || user === undefined){//没有注册
				util.users.push(regUser);
					res.redirect('/login');//页面重定向，跳转登录页面
			}else{//已经被注册
				res.send('当前用户名已经被注册');
			}
});


module.exports = router;
