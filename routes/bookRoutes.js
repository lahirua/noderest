var express = require('express');

var routes = function(Book){
  var bookRouter = express.Router();

  bookRouter.route('/')
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

  bookRouter.route('/:bookId')
    .get(function(request, response){
      Book.findById(request.params.bookId, function(err, book){
        if(err){
          response.status(500).send(err);
        } else{
          response.json(book);
        }
      });
    });

return bookRouter;
};


module.exports = routes;
