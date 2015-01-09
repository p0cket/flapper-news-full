app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['postService', function (postService) {
          return postService.getAll();
        }]
      }
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostCtrl',
    resolve: {
      post: ['$stateParams', 'postService', function ($stateParams, postService) {
        return postService.get($stateParams.id)
      }]
    }
    });
    .state('profiles', {
      url: '/profiles/{username}',
      templateUrl: '/profiles.html',
      controller: 'ProfileCtrl',
    resolve: {
      post: ['$stateParams', 'postService', function ($stateParams, postService) {
        return postService.get($stateParams.username)
      }]
    }
    })

  $urlRouterProvider.otherwise('home');
}])
