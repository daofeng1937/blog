var express = require('express');
var router = express.Router();
var Type = require('../util/model').Type;
var Art = require('../util/model').Artical;
/* GET home page. */
router.get('/', function(req, res, next) {
	Type.find(function(err,types){
		if(err){
			next(err);
		}else{
			// console.log(types);
			var tid = req.query.tid ? req.query.tid : types[0]._id;
			Art.find({type:tid},function(err,arts){
				if(err){
					next(err);
				}else{
					var art = {};
					if(req.query.aid){
						for(var i = 0; i < arts.length;i++){
							if(arts[i]._id == req.query.aid){
								art = arts[i]
								break;
							}
						}
					}else{
						art = arts[0]
					}
					console.log(arts);
					res.render('index',{types:types,arts:arts,art:art,tid:tid});
				}

			})
		}
	})
});


module.exports = router;













