app.service('postService', function ($http) {
  var _posts = [];
  this.posts = _posts;

  this.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, _posts);
    });
  };

  this.get = function(id) {
    return $http.get('/posts/' + id).then(function(res){
      return res.data;
    });
  }

  this.create = function(post) {
    // Gets called at maincontroller line 14 -- posting to index.js
    return $http.post('/posts', post).success(function(data){
      console.log(data);
      _posts.push(data);
    });
  };

  this.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote')
      .success(function (data) {
        angular.copy(data, post);
    })
  };

  this.downvote = function(post) {
    return $http.put('/posts/' + post._id + '/downvote')
      .success(function (data) {
        angular.copy(data, post);
    })
  };

  this.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);
  };

  this.upvoteComment = function (post, comment) {
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote')
      .success(function(data) {
        angular.copy(data, comment);
    });
  };

  this.downvoteComment = function (post, comment) {
    console.log('downvoteComment');
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/downvote')
      .success(function(data){
        angular.copy(data, comment);
    });
  };

});
