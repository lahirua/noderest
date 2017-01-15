var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Move Router code to a differnt file to keep the code clarity
var bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
//app.use('api/authors, authorRouter')

app.get('/', function(request, response){
  response.send('Welcome to my API');
});

app.listen(port, function(){
  console.log("GULP is running on PORT: " + port)
});
