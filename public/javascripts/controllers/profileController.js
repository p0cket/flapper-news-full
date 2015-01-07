app.controller('ProfileCtrl', [
'$scope',
'postService',
'profile',
  function($scope, postService, profile){
      $scope.post = post;
      // $scope.profile = post;

      $scope.addProfileName = function(){
        if(!$scope.profileName){
          return;
        }
        postService.addProfileName(post._id, {
          body: $scope.body,
          author: 'user',
        }).success(function(comment) {
          $scope.profile.profileName.push(profileName);
        });
      };

  }
]);

// extra stuff - delete soon
app.controller('PostCtrl', [
'$scope',
'postService',
'post',
function($scope, postService, post){
  $scope.post = post;

  $scope.addComment = function(){
    if(!$scope.body) {
      return;
    }
    postService.addComment(post._id, {
      body: $scope.body,
      author: 'user',
    }).success(function(comment) {
      $scope.post.comments.push(comment);
    });
    $scope.body = '';
  };

  $scope.incrementUpvotes = function(comment){
    postService.upvoteComment(post, comment);
  };

  $scope.incremetnDownvotes = function(comment){
    console.log(post, comment);

    postService.downvoteComment(post, comment);
  };

}
]);
