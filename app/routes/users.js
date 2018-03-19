var express = require('express');
var router = express.Router();
var User = require('../util/model').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
	var where = {};
	if(req.query.username){
		where.username = new RegExp(req.query.username);
	}
	if(req.query.sex){
		where.sex = req.query.sex;
	}
	if(req.query.minAge && req.query.maxAge){
		where.age = {$gt:req.query.minAge,$lt:req.query.maxAge};
	}
	var str = '';
	for(var i in req.query){
		if(i != 'page'){
			str += i+'='+req.query[i]+'&';
		}
		
	}
	User.count(function(err,total){
		if(err){
			next(err);
		}else{
			var page = {};
			page.every = 4;
			page.totalPage = Math.ceil(total/page.every)
			page.nowPage = Number(req.query.page ? req.query.page : 1);
			page.nextPage = page.nowPage + 1 >= page.totalPage ? page.totalPage : page.nowPage + 1;
			page.prevPage = page.nowPage - 1 <= 1 ? 1 : page.nowPage - 1;
			User.find(function(err,users){
				if(err){
					next(err);
				}else{
					var sex = ['男','女','保密'];
					var provice = ['吃','喝','拉','撒'];
					res.render('users',{users:users,sex:sex,provice:provice,page:page,query:req.query,str:str})
				}
			}).where(where).limit(page.every).skip((page.nowPage-1)*page.every);
		}
	}).where(where);

});
router.get('/create', function(req, res, next) {
  res.render('users/create');
});
router.post('/create', function(req, res, next) {
	req.body.password = require('../util/md5').md5(req.body.password);
	User.create(req.body,function(err,result){
		if(err){
			next(err);
		}else{
			res.redirect('/users');
		}
	})
});
router.get('/remove/:_id', function(req, res, next) {
	User.remove(req.params,function(err,result){
		if(err){
			next(err);
		}else{
			res.redirect('/users');
		}
	})
});
router.get('/update/:_id', function(req, res, next) {
	User.findOne(req.params,function(err,result){
		if(err){
			next(err);

		}else{
			res.render('users/update',{user:result});
		}
	})
});
router.post('/update', function(req, res, next) {
	User.update({_id:req.body._id},req.body,function(err,result){
		if(err){
			next(err);
		}else{
			res.redirect('/users');
		}
	})
});
router.get('/avatar/:_id', function(req, res, next) {
	User.findOne(req.params,function(err,result){
		if(err){
			next(err);

		}else{
			res.render('users/avatar',{user:result});
		}
	})
});

router.post('/avatar', function(req, res, next) {
	var util = require('../util/upload');
	util.upload(req,'./public/uploads').then(function(data,files){
		User.update(data.fields,{avatar:data.files.avatar.path.slice(6).replace(/\\/g,'/')},function(err,result){
			if(err){
				next(err);
			}else{
				res.redirect('/users');
			}
		})
	})
});
module.exports = router;
