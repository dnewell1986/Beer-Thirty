'use strict';

angular.module('yeomanBeerThirtyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('beer', {
        url: '/beer',
        templateUrl: 'app/beer/beer.html',
        controller: 'BeerCtrl'
      });
  });
