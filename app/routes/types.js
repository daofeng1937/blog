var express = require('express');
var router = express.Router();
var Type = require('../util/model').Type;
/* GET home page. */
router.get('/', function(req, res, next) {
	Type.find(function(err,types){
		if(err){
			next(err);
		}else{
			res.render('types',{types:types});
		}
	})
});
router.get('/create', function(req, res, next) {
	res.render('types/create');
});
router.post('/create', function(req, res, next) {
	Type.create(req.body,function(err,result){
		if(err){
			next(err);
		}else{
			res.redirect('/types')
		}
	})
});
router.get('/remove/:_id', function(req, res, next) {
	Type.remove(req.params,function(err,result){
		if(err){
			next(err);
		}else{
			res.redirect('/types');	
		}
	})
	
});
router.get('/update/:_id', function(req, res, next) {
	Type.findOne(req.params,function(err,result){
		if(err){
			next(err);
		}else{
			res.render('types/update',{user:result});
		}
	})
});

router.post('/update', function(req, res, next) {
	Type.update({_id:req.body._id},req.body,function(err,result){
		if(err){
			next(err);
		}else{
			res.redirect('/types');
		}
	})
});

module.exports = router;
