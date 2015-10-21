'use district'

describe('CoachIdUploadCtrl Test', function() {
  
  beforeEach(module('starter.controllers'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.state', function() {
    it('state is wrong', function() {
      var $scope = {};
      var controller = $controller('CoachIdUploadCtrl', { $scope: $scope });
      expect($scope.state).toEqual("未上传");
    });

 

  });

});



// describe('CoachPatientsCtrl Test', function() {
  
//   beforeEach(module('starter.controllers'));

//   var $controller,$httpBackend;

//   beforeEach(inject(function($injector){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $controller = $injector.get('$controller');
//     $httpBackend = $injector.get('$httpBackend');
//   }));

//   describe('CoachPatientsCtrl', function() {
//    it('delete should minus one of the patients array length', function() {
//       var $scope = {};
//       var $http;
//       var controller = $controller('CoachPatientsCtrl', { $scope: $scope, $httpBackend:$htt});
//       // expect($scope.data.showDelete).toBeUndefined();
//       // expect($scope.data.showReorder).toBeUndefined();
//       $scope.doRefresh();
//       var temp = $scope.patients.length;
//       $scope.onItemDelete($scope.patients[0]);
//       expect($scope.patients.length).toEqual(temp -1 );
//     });   

//   });
// });