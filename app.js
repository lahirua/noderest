var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//create router to be used bt Books API
var bookRouter = express.Router();

bookRouter.route('/Books')
  .post(function(request, response){
    var book = new Book(request.body);
    book.save();
    response.status(201).send(book);
  })
  .get(function(request, response){
    //create query
    var query = {};
    if(request.query.genre){
      query.genre = request.query.genre;
    }

    Book.find(query, function(err, books){
      if(err){
        response.status(500).send(err);
      } else {
        response.json(books);
      }
    });
  });

bookRouter.route('/Books/:bookId')
  .get(function(request, response){
    Book.findById(request.params.bookId, function(err, book){
      if(err){
        response.status(500).send(err);
      } else{
        response.json(book);
      }
    });
  });

app.use('/api', bookRouter);


app.get('/', function(request, response){
  response.send('Welcome to my API');
});

app.listen(port, function(){
  console.log("GULP is running on PORT: " + port)
});
