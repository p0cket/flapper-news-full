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
    }).success(function(XXX) {
      $scope.post.XXX.push(XXX);
    });
    $scope.body = '';
  };
}
]);
//
// //
// app.controller('PostCtrl', [
// '$scope',
// 'postService',
// 'post',
// function($scope, postService, post){
//   $scope.post = post;
//
//   $scope.addComment = function(){
//     if(!$scope.body) {
//       return;
//     }
//     postService.addComment(post._id, {
//       body: $scope.body,
//       author: 'user',
//     }).success(function(comment) {
//       $scope.post.comments.push(comment);
//     });
//     $scope.body = '';
//   };
//
//   $scope.incrementUpvotes = function(comment){
//     postService.upvoteComment(post, comment);
//   };
//
// }
// ]);
