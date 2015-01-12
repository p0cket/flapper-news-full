app.controller('PostCtrl', [
'$scope',
'postService',
'post',
'profile',
function($scope, postService, post) {
  $scope.post = post;

  $scope.addBio = function(){
    if(!scope.body) {
      return;
    }

    postService.addBio(post.username, {
      body: $scope.body,
      author: 'user',
    }).success(function(bio) {
      $scope.post.bio = bio;
    })
    // }).success(function(bio) {
    //   $scope.post.bio.push(bio);
    // });
    $scope.body = '';
  };

    postService.addUsername(post.username, {
      body: $scope.body,
      author: 'user',
    }).success(function(username) {
      $scope.post.username = username;
    })
}
]);
