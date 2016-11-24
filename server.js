const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

var db;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

MongoClient.connect('mongodb://root:root@ds163377.mlab.com:63377/quetos', (err, database) => {
	if (err) return console.log('__ERROR__: ' + err)
	db = database
	app.listen(3000, function() {
	  console.log('listening on 3000')
	})
})


app.get('/', function(req, res) {
  var cursor = db.collection('quotes').find().toArray(function(error, result){
  	res.render('index', {quotes: result});
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, function(err, result){
		if (err) return console.log(err)

		console.log('saved to database')
    res.redirect('/')
  })
})




// DB NAME: quetos
// DB USERNAME: root
// DB PASSWORD: root
// DB API KEY : SjLxZdSGxR7s2qirk2bd49nmbecl-wYy
// RESTFUL API: https://api.mlab.com/api/1/databases/quetos/collections/quotes?apiKey=SjLxZdSGxR7s2qirk2bd49nmbecl-wYy

