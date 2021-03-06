var express = require('express');
var app = express();

var router = express.Router();

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express'
  });
});

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts) {
    if (err) {
      return next(err);
    }

    console.log(posts);
    res.json(posts);
  });
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post) {
    if (err) {
      return next(err);
    }

    res.json(post);
  });
});

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function(err, post) {
    if (err) {
      return next(err);
    }
    if (!post) {
      return next(new Error("can't find post"));
    }

    req.post = post;
    return next();
  });
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    res.json(post);
  });
});

router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post) {
    if (err) {
      return next(err);
    }

    res.json(post);
  });
});

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if (err) {
        return next(err);
      }

      res.json(comment);
    });
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return next(new Error("can't find comment"));
    }

    req.comment = comment;
    return next();
  });
});

router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment) {
    if (err) {
      return next(err);
    }

    res.json(comment);
  });
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  })
);

module.exports = router;
