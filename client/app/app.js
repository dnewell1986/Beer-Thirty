'use strict';

angular.module('yeomanBeerThirtyApp', [
  'yeomanBeerThirtyApp.auth',
  'yeomanBeerThirtyApp.admin',
  'yeomanBeerThirtyApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
