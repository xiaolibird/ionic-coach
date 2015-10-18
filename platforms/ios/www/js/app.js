// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



  // setup an abstract state for the tabs directive
    .state('coach', {
    url: '/coach',
    abstract: true,
    templateUrl: 'templates/coach.html'
  })

  // Each tab has its own nav history stack:
    .state('coach.upload',{
      url:'/upload',
      views:{
        'coach-upload':{
          templateUrl:'templates/coach-idupload.html',
          controller:'CoachIdUploadCtrl'          
        }
      }

    })

  .state('coach.home', {
    url: '/home',
    views: {
      'coach-home': {
        templateUrl: 'templates/coach-home.html',
        controller: 'CoachHomeCtrl'
      }
    }
  })

  .state('coach.personalinfo', {
      url: '/personalinfo',
      views: {
        'coach-personalinfo': {
          templateUrl: 'templates/coach-personalinfo.html',
          controller: 'CoachPersonalInfoCtrl'
        }
      }
    })
    .state('coach.config', {
      url: '/config',
      views: {
        'coach-config': {
          templateUrl: 'templates/coach-config.html',
          controller: 'CoachPersonalConfigCtrl'
        }
      }
    })

  .state('coach.schedule', {
    url: '/schedule',
    views: {
      'coach-schedule': {
        templateUrl: 'templates/coach-schedule.html',
        controller: 'CoachPersonalScheduleCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/coach/upload');

});
