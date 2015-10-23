/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.blog', [
  'ui.router',
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'blog', {
    url: '/blog',
    // abstract: true,
    views: {
      "main": {
        templateUrl: 'blog/blog.tpl.html',
        controller: 'BlogCtrl'
      }
    },
    data:{ pageTitle: 'Blog' }
  })
  .state( 'blog.item', {
    url: '/{name}',
    views: {
      "main": {
        templateUrl: 'blog/blog_item.tpl.html',
        controller: 'BlogItemCtrl'
      }
    },
    data:{ pageTitle: 'Blog' }
  });
})

/**$state
 * And of course we define a controller for our route.
 */
.controller( 'BlogCtrl', function BlogCtrlController( $scope, $state, $http ) {
    $scope.totalItems = 0;
    $scope.currentPage = 0;
    $scope.items = [];

    $scope.$watch('currentPage', function(){
        if (! $scope.items.length){
          return;
        }
        $state.go('blog.item', {name: $scope.items[$scope.currentPage-1].name});
    });

    $http.get(
        '/blog',
        {params: {page: 0, description_only: true}}
    ).then(function(data){
        $scope.totalItems = data.data.pages;
        $scope.currentPage = data.data.page + 1;
        $scope.items = data.data.items;
    });
})

.controller( 'BlogItemCtrl', function BlogItemCtrlController( $rootScope, $scope, $http, $stateParams, $sce ) {
    $http.get(
        $stateParams.name
    ).then(function(data){
        $scope.data = data.data;
        $rootScope.articleTitle = $scope.data.title;
        $scope.data.text = $sce.trustAsHtml($scope.data.text);
    });
})

;

