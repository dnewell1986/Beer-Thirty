'use strict';

angular.module('yeomanBeerThirtyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('brewery', {
        url: '/brewery',
        templateUrl: 'app/brewery/brewery.html',
        controller: 'BreweryCtrl'
      });
  });
