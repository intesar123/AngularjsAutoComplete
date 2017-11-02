var app = angular.module('MyApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html'
    })
    .when('/dashboard', {
       
        resolve: {
            "check": function ($location, $rootScope) {
                if (!$rootScope.isLoggedIn) {
                    $location.path('/');
                }
            }
        },
        templateUrl: 'dashboard.html'
    })
    .otherwise({
        redirectTo:'/'
    });
});

app.controller('MainCtrl', function ($scope, $location, $rootScope) {
    $scope.name = 'World';
    $rootScope.loggedInUser = '';
    $scope.message = '';
    $scope.myusers = [{
        username: 'user1',
        password: '12323'
    }, {
        username: 'user2',
        password: '12323'
    }];
    $scope.submit = function () {
        if ($scope.username && $scope.password) {
            var user = $scope.username;
            var pass = $scope.password;
            $scope.message = "welcome " + user;
            $rootScope.isLoggedIn = true;
            $rootScope.loggedInUser = user;
            //$scope.myusers.push({
            //    username: user,
            //    password: pass
            //});
            //$("#loginModal").modal('hide');
            $location.path('/dashboard');
          //  console.log($location.path());
        } else {
            $scope.message = "Invalid Login";
        }
    }
});