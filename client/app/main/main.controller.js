'use strict';

angular.module('yeomanBeerThirtyApp')
    .controller('MainCtrl', function ($scope,$http) {
        $http.get('/api/beers').then(function(result){
            $scope.beers = result.data;
        });
    });
