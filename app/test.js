var mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/app');

// 定义数据字段
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	username: String,
	password: String,
	age: Number,
	sex: String,
	likes: Array,
	provice: String,
	content: String,
	avatar: String
	/*
	timestamps:自动添加时间
		创建时间：createdAt
		最后一次修改时间：updatedAt
	*/
}, {timestamps:true});

// 将User导出
 var User = mongoose.model('User', UserSchema);


 function rand(m,n){
 	return Math.floor(Math.random()*(n-m+1)+m);
 }

 User.find(function(err,users){
 	if(err){
 		next(err);
 	}else{
 		if(users){
 			users.forEach(function(value,key){
 				console.log(value._id);
 				User.update({_id:value._id},{age:rand(20,50)},function(err,result){
 					if(err){
 						next(err);
 					}else{
 						console.log('修好',err,result);
 					}
 				})
 			})
 		}
 	}
 })