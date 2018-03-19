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
exports.User = mongoose.model('User', UserSchema);

var UserSchema1 = new Schema({
	typename: String
}, {timestamps:true});
exports.Type = mongoose.model('Type', UserSchema1);

var UserSchema2 = new Schema({
	articalname: String,
	content: String,
	type:{type:Schema.Types.ObjectId ,ref:'Type'}
	/*
	timestamps:自动添加时间
		创建时间：createdAt
		最后一次修改时间：updatedAt
	*/
}, {timestamps:true});
exports.Artical = mongoose.model('Artical', UserSchema2);