var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

//create router to be used bt Books API
var bookRouter = express.Router();

bookRouter.route('/Books')
  .get(function(request, response){
    Book.find(function(err, books){
      if(err){
        response.status(500).send(err);
      } else {
        response.json(books);
      }
    });
    // var responseJson = {
    //   hello: "This is my API"
    // }
    // response.json(responseJson);
  });

app.use('/api', bookRouter);


app.get('/', function(request, response){
  response.send('Welcome to my API');
});

app.listen(port, function(){
  console.log("GULP is running on PORT: " + port)
});
