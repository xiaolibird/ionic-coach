angular.module('starter.controllers', ['ionic','starter.services'])


// .config(function($compileProvider){
//   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
// })

// Coach Identification Controller
// ----------------------------------------------------------------------------------------
.controller('CoachIdUploadCtrl', ['$scope','$state','$ionicPopover','$stateParams','Storage','Patients','Camera','Users',
  function($scope,$state,$ionicPopover,$stateParams,Storage,Patients,Camera,Users) {

  $scope.DtInfo = [
  { t:"单位",
    v: "某三本大学"
  }, 
  { t:"职务",
    v: "搬砖"
  }, 
  { t:"Level",
    v: "233"
  }, 
  { t:"科室",
    v: "217"
  }
  ];

  $scope.Info = {
    name: "叶良辰",
    gender: "男",
    birthday:"19980808",
    id: 1212
  }

  $scope.state = "未提交";
  
  $scope.imgURI = "img/Barot_Bellingham_tn.jpg"
  //the user skip this step put state to unuploaded.
  $scope.onClickSkip = function(){     
      $scope.state = "未提交";
      Storage.set(13,$scope.state);
      $state.go('coach.i',{'state': $scope.state,'info':null},"replace");
  };

  //the user submit
  $scope.onClickSubmit = function(){
      
      $scope.state = "审核中";
      //用户的信息封装进完整的一个对象里面 存localstorage 全局调用 JSON化 反 JSON 化

      var DtInfo2 = {
        unitname: $scope.DtInfo[0].v,
        jobTitle: $scope.DtInfo[1].v,
        level: $scope.DtInfo[2].v,
        dept: $scope.DtInfo[3].v
      };

      // console.log($scope.Info);
      // console.log(DtInfo2);

      var userInfo = {
        BasicInfo : $scope.Info,
        DtInfo : DtInfo2
      }
      var objStr=JSON.stringify(userInfo);
      // console.log(userInfo);

      Storage.set("userInfo",objStr);
      Storage.set(13,$scope.state);
      // Storage.set(13000);
      // Storage.set(131,$scope.DtInfo[0].v);
      // Storage.set(132,$scope.DtInfo[1].v);
      // Storage.set(133,$scope.DtInfo[2].v);
      // Storage.set(134,$scope.DtInfo[3].v);
      Storage.set(14,$scope.imgURI);
      // for(i=0;i<temp.length;i++)console.log(temp[i].v);
      // $state.go('coach.home',{'state': $scope.state, 'info' :  infoObject.name},"replace");
      $scope.upload();
      $state.go('coach.i',{},"replace");
  };

  //upload
  $scope.upload = function(){

    var DoctorInfo = {
      UserId: "ZXF",
      UserName: "ZXF",
      Birthday: 19930418,
      Gender: 1,
      IDNo: "ZXF",
      InvalidFlag: 0,
      piUserId: "ZXF",
      piTerminalName: "ZXFZXF",
      piTerminalIP: "ZXF",
      piDeviceType: 0
  };

    var responce = Users.myTrial(DoctorInfo);
    
    var temp = Users.myTrial2("ZXF");

    var temp2 = Camera.uploadPicture($scope.imgURI);
    // var temp2 = Camera.uploadPicture2($scope.imgURI);
    console.log("返回的数据" + temp2 );
  };
    //-----------------------------------------------------------

  $scope.onClickCamera = function($event){
    $scope.openPopover($event);
  };
  
   $scope.onClickCameraCancel = function(){
    $scope.closePopover();
  };


  $scope.onClickCameraPhotos = function(){
  
   console.log("选个照片"); 
   $scope.choosePhotos();
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
      // console.log(data);
      $scope.imgURI = data;
    }, function(err) {
      // console.err(err);
      $scope.imgURI = undefined;
    });
    // console.log($scope.imgURI);
  };
  
  $scope.choosePhotos = function() {
   Camera.getPictureFromPhotos().then(function(data) {
      // console.log(data);
      $scope.imgURI = data;
    }, function(err) {
      // console.err(err);
      $scope.imgURI = undefined;
    });
    // conso
  }
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



// Coach HomePage/Me Controller
// ----------------------------------------------------------------------------------------
.controller('CoachHomeCtrl', 
  ['$scope','$state','$stateParams','Storage',
  function($scope,$state,$stateParams,Storage) {
   
   // console.log($stateParams.info);
   // console.log($stateParams.info.intro);
   // $scope.items = $stateParams.info;
   // $scope.state = $stateParams.state;

   
   $scope.state = Storage.get(13);
   // $scope.name = Storage.get(131);
   // $scope.company = Storage.get(132);
   // $scope.position = Storage.get(133);
   // $scope.selfintro = Storage.get(134);
   $scope.imgURI = Storage.get(14);
   // console.log($scope.infom);


   $scope.userInfo = JSON.parse(Storage.get("userInfo"));
   // console.log($scope.userInfo);
   // console.log($scope.userInfo.BasicInfo.name);
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

//this controller is discarded me and home use CoachHomeController together
.controller('CoachMeCtrl', 
  ['$scope','$state','$stateParams','Storage',
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
.controller('CoachPersonalInfoCtrl', ['$scope','$state','$ionicHistory','Storage',
  function($scope,$state,$ionicHistory,Storage) {
   //获得信息
   // $scope.state = Storage.get(13);
   // $scope.name = Storage.get(131);
   // $scope.company = Storage.get(132);
   // $scope.position = Storage.get(133);
   // $scope.selfintro = Storage.get(134);
   $scope.imgURI = Storage.get(14);
   $scope.userInfo = JSON.parse(Storage.get("userInfo"));

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

