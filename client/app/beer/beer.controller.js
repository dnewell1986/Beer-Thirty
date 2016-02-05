'use strict';

angular.module('yeomanBeerThirtyApp')
  .controller('BeerCtrl', function ($scope, $http) {
      $scope.infiniteBeers = [];
        $scope.beers = [];
        $scope.stopInfiniteScroll = false;
        $scope.dataLoaded = false;
		$scope.offset = 0;
		$scope.limit = 30;
		$scope.totalBeers = 0;
        
        $http.get('/api/beers/pagedBeers/0').then(function(result){
			$scope.totalBeers = result.data.total;			
			
            $scope.beers = result.data.docs.sort(function(a, b) {
                if (a.name > b.name){
                    return -1;
                }
                if (a.name < b.name){
                    return 1;
                }
                return 0;
            });
            $scope.dataLoaded = true;
        });
        
        $scope.loadMoreBeers = function() {
            if ($scope.dataLoaded){
                if ($scope.beers.length === 0 && $scope.infiniteBeers.length > 0) {
                    getNextFiftyBeers();
                } else {
                    if ($scope.infiniteBeers.length > 0){
                        getNextFiftyBeers();
                    } else {
                        $scope.stopInfiniteScroll = true;
                    }
                }
            }            
        }
        
        function getNextFiftyBeers() {
            for(var i = 0; i < 50; i++) {
                var nextItem = $scope.infiniteBeers.pop();
                if (nextItem !== undefined) {
                    $scope.beers.push(nextItem);
                } else {
                    $scope.stopInfiniteScroll = true;
                }
            }
        }
  });
