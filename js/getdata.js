var express = require('express');
var mysql = require('mysql');

var app = express();
var connection = mysql.createConnection({
	host : '127.0.0.1',
	database: 'gagalin',
	port : '3306',
	user : 'root',
	password : '123456',
});

app.get('/listArticles',function(req,res){
	/**设置响应头允许ajax跨域访问**/
	res.setHeader("Access-Control-Allow-Origin","*");
	/*星号表示所有的异域请求都可以接受，*/
 	res.setHeader("Access-Control-Allow-Methods","GET,POST");

	var themeGetSql = 'SELECT * FROM ga_article where state=1 order by id desc';
	connection.query(themeGetSql,function (err, result) {
       res.send(result);
	});	
});
app.get('/listCities',function(req,res){
	/**设置响应头允许ajax跨域访问**/
	res.setHeader("Access-Control-Allow-Origin","*");
	/*星号表示所有的异域请求都可以接受，*/
	res.setHeader("Access-Control-Allow-Methods","GET,POST");

	var themeGetSql = 'SELECT * FROM ga_city where state=1 order by times desc';
	connection.query(themeGetSql,function (err, result) {
		var cities = new Array();
		for(var i in result){
			cities.push({name:result[i].name,value:result[i].times})
		}
		res.send(cities);
	});
});
app.get('/addArticlePv/:id',function(req,res){			//增加文章浏览量
	/**设置响应头允许ajax跨域访问**/
	res.setHeader("Access-Control-Allow-Origin","*");
	/*星号表示所有的异域请求都可以接受，*/
	res.setHeader("Access-Control-Allow-Methods","GET,POST");
	var updatesql = 'update ga_article set pv=pv+1 where id='+req.params.id;
	connection.query(updatesql,function (err, result) {
		var selectsql = 'select * from ga_article where id='+req.params.id;
		connection.query(selectsql,function (err, result) {
			res.send(result);
		});
	});
});
var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('可访问http://%s:%s',host,port);
});

