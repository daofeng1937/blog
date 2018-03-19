var express = require('express');
var router = express.Router();
var Art = require('../util/model').Artical;
var Type = require('../util/model').Type;
/* GET home page. */
router.get('/', function(req, res, next) {
	var where = {};
	if(req.query.articalname){
		where.articalname = new RegExp(req.query.articalname);
	};
	var str = ''
	for(var i in req.query){
		if(i != 'page'){
			str += i + '=' + req.query[i] + '&' ;
		}
	}

	Art.count(function(err,total){
		var page = {};
		page.every = 4;
		page.totalPage = Math.ceil(total/page.every);
		page.nowPage = Number(req.query.page ? req.query.page : 1);
		page.nextPage = page.nowPage + 1 >= page.totalPage ? page.totalPage : page.nowPage + 1 ;
		page.prevPage = page.nowPage - 1 <= 1 ? 1 : page.nowPage - 1;
  		Art.find(function(err,arts){
			if(err){
				next(err);
			}else{
				console.log(arts);
				res.render('artical',{arts:arts,page:page,query:req.query,str:str});
			}
		}).where(where).limit(page.every).skip((page.nowPage-1)*page.every).populate('type');
	}).where(where);
});


router.get('/create', function(req, res, next) {
	Type.find(function(err,types){
		if(err){
			next(err);
		}else{
			res.render('artical/create',{types:types});
		}
	})
});

router.post('/create', function(req, res, next) {
  	Art.create(req.body,function(err,result){
  		if(err){
  			next(err);
  		}else{
  			res.redirect('/artical')
  		}
  	})
});
router.get('/remove/:_id', function(req, res, next) {
	Art.remove(req.params,function(err,result){
		if(err){
			next(err);
		}else{
			res.redirect('/artical');	
		}
	})
});
router.get('/update/:_id', function(req, res, next) {
	Art.findOne(req.params,function(err,art){
		if(err){
			next(err);
		}else{
			Type.find(function(err,types){
				if(err){
					next(err);
				}else{
					// console.log(typeof(art.type),types);
					// res.send('oj');
					res.render('artical/update',{art:art,types:types});
				}
			})
		}
	})
});

router.post('/update', function(req, res, next) {
	Art.update({_id:req.body._id},req.body,function(err,result){
		if(err){
			next(err);
		}else{
			res.redirect('/artical');
		}
	})
});
module.exports = router;
