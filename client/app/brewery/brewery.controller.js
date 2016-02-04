'use strict';

angular.module('yeomanBeerThirtyApp')
    .controller('BreweryCtrl', function ($scope, $http) {
        $scope.infiniteBreweries = [];
        $scope.breweries = [];
        $scope.stopInfiniteScroll = false;
        $scope.dataLoaded = false;

        $http.get('/api/breweries').then(function (result) {
            $scope.infiniteBreweries = result.data.filter(function (brewery) {
                return brewery.description !== null && brewery.description !== '';
            }).sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                }
                return 0;
            });
            $scope.dataLoaded = true;
            $scope.loadMoreBreweries();
        });

        $scope.loadMoreBreweries = function () {
            if ($scope.dataLoaded) {
                if ($scope.breweries.length === 0 && $scope.infiniteBreweries.length > 0) {
                    getNextFiftyBreweries();
                } else {
                    if ($scope.infiniteBreweries.length > 0) {
                        getNextFiftyBreweries();
                    } else {
                        $scope.stopInfiniteScroll = true;
                    }
                }
            }
        }

        function getNextFiftyBreweries() {
            for (var i = 0; i < 50; i++) {
                var nextItem = $scope.infiniteBreweries.pop();
                if (nextItem !== undefined) {
                    $scope.breweries.push(nextItem);
                } else {
                    $scope.stopInfiniteScroll = true;
                }
            }
        }
    });
