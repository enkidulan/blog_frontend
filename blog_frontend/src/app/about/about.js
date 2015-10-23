angular.module( 'ngBoilerplate.about', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope, $rootScope ) {
  // This is simple a demo for UI Boostrap.
  $rootScope.articleTitle = 'I\'m glad that you want to know more about me :)';
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
