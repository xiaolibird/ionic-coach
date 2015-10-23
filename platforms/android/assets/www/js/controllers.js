// angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope) {})

// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });


angular.module('starter.controllers', ['ionic','starter.services'])


// .config(function($compileProvider){
//   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
// })

// Coach Identification Controller
// ----------------------------------------------------------------------------------------
.controller('CoachIdUploadCtrl', ['$scope','$state','$ionicPopover','$stateParams','Storage','Patients','Camera',
  function($scope,$state,$ionicPopover,$stateParams,Storage,Patients,Camera) {

  $scope.items = [
  { t:"姓名",
    v: ""
  }, 
  { t:"工作单位",
    v: ""
  }, 
  { t:"职务",
    v: ""
  }, 
  { t:"个人简介",
    v: ""
  }
  ];

  $scope.state = "未上传";
  
  //the user skip this step put state to unuploaded.
  $scope.onClickSkip = function(){     
      $scope.state = "未上传";
      Storage.set(13,$scope.state);
      $state.go('coach.home',{'state': $scope.state,'info':null},"replace");
  };

  //the user submit
  $scope.onClickSubmit = function(){
      
      // $scope.state = "审核中";
      // $scope.name = "hehe"
      // var temp = $scope.items;
      // console.log($scope.items[0].v);
      // 可能要在service里封装一个将对象数组变成对象数组的方法
      // var i = 0;
      // var infoObject = {
      //   name: $scope.items[0].v,
      //   company: $scope.items[1].v,
      //   position: $scope.items[2].v,
      //   intro: $scope.items[3].v,
      //   imageURI:''
      // };

      Storage.set(13,$scope.state);
      Storage.set(131,$scope.items[0].v);
      Storage.set(132,$scope.items[1].v);
      Storage.set(133,$scope.items[2].v);
      Storage.set(134,$scope.items[3].v);
      Storage.set(14,$scope.imgURI);
      // for(i=0;i<temp.length;i++)console.log(temp[i].v);
      // $state.go('coach.home',{'state': $scope.state, 'info' :  infoObject.name},"replace");
      $state.go('coach.home');
  };

  $scope.onClickCamera = function($event){
    $scope.openPopover($event);
  };
  
   $scope.onClickCameraCancel = function(){
    $scope.closePopover();
  };


  $scope.onClickCameraPhotos = function(){
  
   console.log("选个照片"); 
  //blablabla
   $scope.closePopover();
  };

  $scope.onClickCameraCamera = function(){
    // console.log("要拍照了！");
    // Camera.getPicture().then(function(imageURI){
    //   console.log(imageURI);
    // },function(err){
    //   console.log(err);
    // });
    $scope.closePopover();
  };
  
  $scope.getPhoto = function() {
    console.log("要拍照了！");
    $scope.takePicture();
    $scope.closePopover();
  };

  $scope.takePicture = function() {
      
   Camera.getPicture().then(function(data) {
      console.log(data);
      $scope.imgURI = data;
    }, function(err) {
      console.err(err);
      $scope.imgURI = undefined;
    });
    console.log($scope.imgURI);
  };

// ionicPopover functions
//-----------------------------------------------------------------
// .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

// ionicPopover functions
//------------------------------------------------------------

  //the user did not fill in all the necessary info put state to unuploaded.

  //being checked

  //the user skip this step put state to unuploaded.

}])



// Coach HomePage Controller
// ----------------------------------------------------------------------------------------
.controller('CoachHomeCtrl', 
  ['$scope',
  '$state',
  '$stateParams',
  'Storage',
  function($scope,$state,$stateParams,Storage) {
   
   // console.log($stateParams.info);
   // console.log($stateParams.info.intro);
   // $scope.items = $stateParams.info;
   // $scope.state = $stateParams.state;

   
   $scope.state = Storage.get(13);
   $scope.name = Storage.get(131);
   $scope.company = Storage.get(132);
   $scope.position = Storage.get(133);
   $scope.selfintro = Storage.get(134);
   $scope.imgURI = Storage.get(14);
   // console.log($scope.infom);
   
  $scope.onClickPersonalInfo = function(){
      $state.go('personalinfo');
  };

  $scope.onClickPersonalConfig = function(){
      $state.go('config');
  };

  $scope.onClickPersonalSchedule = function(){
      $state.go('schedule');
  };

}])


// Coach Personal Config Controller
// ----------------------------------------------------------------------------------------
.controller('CoachPersonalConfigCtrl', ['$scope','$state','$ionicHistory',function($scope,$state,$ionicHistory) {
  $scope.onClickBackward = function(){
      $ionicHistory.goBack();
  };
}])



// Coach Personal Infomation Controller
// ----------------------------------------------------------------------------------------
.controller('CoachPersonalInfoCtrl', ['$scope','$state','$ionicHistory',
  function($scope,$state,$ionicHistory) {
  $scope.onClickBackward = function(){
       $ionicHistory.goBack();
  };
}])


// Coach Personal Schedule Controller
// ----------------------------------------------------------------------------------------
.controller('CoachScheduleCtrl', ['$scope','$state','$ionicHistory','$http',
  function($scope,$state,$ionicHistory,$http) {

  $http.get('js/data.json').success(function(data) {
    $scope.calendar = data.calendar; 
    // $scope.whichartist= $state.params.aId;
    // console.log($scope.whichartist);
    $scope.data = { showDelete: false, showReorder: false };

  $scope.onItemDelete = function(dayIndex,item) {
    // $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
    $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
  }

  $scope.toggleStar = function(item) {
   item.star = !item.star;
  }

  $scope.onClickBackward = function(){
     $ionicHistory.goBack();
  }

  $scope.doRefresh =function() {

      $http.get('js/data.json').success(function(data) {
      $scope.patients = data.calendar;
      $scope.$broadcast('scroll.refreshComplete');

    });
  }
  });

}])

.controller('CoachMessageCtrl',function(){

})

.controller('CoachMeCtrl',function(){

})

.controller('CoachPatientsCtrl', ['Patients','$scope','$http','$state',
  function(Patients,$scope,$http,$state){
  // $scope.chats = Chats.all(); 
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
  // $scope.patients = Patients.all();
  $http.get('js/data.json').success(function(data) {
    $scope.patients = data.artists; 
    $scope.whichartist= $state.params.aId;
    // console.log($scope.whichartist);
    $scope.data = { showDelete: false, showReorder: false };

    $scope.moveItem = function(item, fromIndex, toIndex) {
          $scope.patients.splice(fromIndex, 1);
          $scope.patients.splice(toIndex, 0, item);
    }

    $scope.onItemDelete = function(item) {
      $scope.patients.splice($scope.patients.indexOf(item), 1);
    }

    $scope.toggleStar = function(item) {
     item.star = !item.star;
    }

    $scope.doRefresh =function() {
        $http.get('js/data.json').success(function(data) {
        $scope.patients = data.artists;
        $scope.$broadcast('scroll.refreshComplete'); 
      });
    }
  });


}])

// .controller('CoachPatientsDetailController',function(){

// })

// Coach Identification Controller
// ----------------------------------------------------------------------------------------
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  
  // $scope.
});

