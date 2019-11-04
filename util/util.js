exports.isReg = (userObj,users)=>{
		for(let i=0;i<users.length;i++){
			//取出单个用户对象
			let user = users[i];
			//判断
			if(user.username === userObj.username){
				return user;
			}
		}
};

exports.users = [];
