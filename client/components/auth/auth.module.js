'use strict';

angular.module('yeomanBeerThirtyApp.auth', [
  'yeomanBeerThirtyApp.constants',
  'yeomanBeerThirtyApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
