angular.module('starter.services', ['ngCordova','ngResource'])

.constant('CONFIG', {
  // baseUrl: '/',
  // baseUrl: 'http://10.12.43.168/',
  // ioDefaultNamespace: '10.12.43.168/default',
  // baseUrl: 'http://192.168.1.108/',
  baseUrl: 'http://10.12.43.72:9000/Api/v1/',  //RESTful 服务器
  ioDefaultNamespace: '192.168.1.108/default',
  // baseUrl: 'http://www.go5le.net/',
  // ioDefaultNamespace: 'www.go5le.net/default',
  // baseUrl: 'http://app.xiaoyangbao.net/',
  // baseUrl: 'https://app.xiaoyangbao.net/',  // ssl访问
  // ioDefaultNamespace: 'app.xiaoyangbao.net/default',

  consReceiptUploadPath: 'cons/receiptUpload',
  userResUploadPath: 'user/resUpload',

  cameraOptions: {  // 用new的方式创建对象? 可以避免引用同一个内存地址, 可以修改新的对象而不会影响这里的值: 用angular.copy
    quality: 75,
    destinationType: 0,  // Camera.DestinationType = {DATA_URL: 0, FILE_URI: 1, NATIVE_URI: 2};
    sourceType: 0,  // Camera.PictureSourceType = {PHOTOLIBRARY: 0, CAMERA: 1, SAVEDPHOTOALBUM: 2};
    allowEdit: true,  // 会导致照片被正方形框crop, 变成正方形的照片
    encodingType: 0,  // Camera.EncodingType = {JPEG: 0, PNG: 1};
    targetWidth: 100,  // 单位是pix/px, 必须和下面的属性一起出现, 不会改变原图比例?
    targetHeight: 100,
    // mediaType: 0,  // 可选媒体类型: Camera.MediaType = {PICTURE: 0, VIDEO: 1, ALLMEDIA: 2};
    // correctOrientation: true,
    saveToPhotoAlbum: false,
    popoverOptions: { 
      x: 0,
      y:  32,
      width : 320,
      height : 480,
      arrowDir : 15  // Camera.PopoverArrowDirection = {ARROW_UP: 1, ARROW_DOWN: 2, ARROW_LEFT: 4, ARROW_RIGHT: 8, ARROW_ANY: 15};
    },
    cameraDirection: 0  // 默认为前/后摄像头: Camera.Direction = {BACK : 0, FRONT : 1};
  },

  uploadOptions: {
    // fileKey: '',  // The name of the form element. Defaults to file. (DOMString)
    // fileName: '.jpg',  // 后缀名, 在具体controller中会加上文件名; 这里不能用fileName, 否则将CONFIG.uploadOptions赋值给任何变量(引用赋值)后, 如果对该变量的同名属性fileName的修改都会修改CONFIG.uploadOptions.fileName
    fileExt: '.jpg',  // 后缀名, 在具体controller中会加上文件名
    httpMethod: 'POST',  // 'PUT'
    mimeType: 'image/jpg',  // 'image/png'
    //params: {_id: $stateParams.consId},
    // chunkedMode: true,
    //headers: {Authorization: 'Bearer ' + Storage.get('token')}
  },
  showTime: 500,
  /* List all the roles you wish to use in the app
  * You have a max of 31 before the bit shift pushes the accompanying integer out of
  * the memory footprint for an integer
  */
  userRoles: [
    'public',
    'user',
    'serv',
    'unit',
    'medi',
    'ince',
    'admin',
    'super'
  ],
  /* Build out all the access levels you want referencing the roles listed above
  * You can use the "*" symbol to represent access to all roles.
  * The left-hand side specifies the name of the access level, and the right-hand side
  * specifies what user roles have access to that access level. E.g. users with user role
  * 'user' and 'admin' have access to the access level 'user'.
  */
  accessLevels: {
    'public': "*",
    'anon': ['public'],
    'user': ['user', 'admin', 'super'],
    'serv': ['serv', 'super'],
    'unit': ['unit', 'super'],
    'medi': ['medi', 'super'],
    'ince': ['ince', 'super'],
    'admin': ['admin', 'super']
  },
  genders: [1, 2],
  q1: ['父亲名字',
    '母亲名字',
    '配偶名字',
    '小孩名字',
    '父亲生日',
    '母亲生日',
    '配偶生日',
    '小孩生日'],
  q2: ['最喜欢的颜色',
    '小学名称',
    '初中名称',
    '高中名称',
    '大学的专业',
    '最喜欢的演员'],
  q3: ['最喜欢的歌曲',
    '第一只宠物的名字',
    '最喜欢的水果',
    '最喜欢的食物',
    '最喜欢的宠物'],
  serv400: {number: '4008006666', caption: '4008-006-666'}
})

.factory('Camera', ['$q','$cordovaCamera','CONFIG', function($q,$cordovaCamera,CONFIG) {
 
  return {
    getPicture: function() {

      var options = { 
          quality : 75, 
          destinationType : 0, 
          sourceType : 0, 
          allowEdit : true,
          encodingType: 0,
          targetWidth: 300,
          targetHeight: 300,
           popoverOptions: CONFIG.popoverOptions,
          saveToPhotoAlbum: false
      };

     var q = $q.defer();
     // $cordovaCamera.getPicture(function(imageData) {
     //    result = "data:image/jpeg;base64," + imageData;
     //    // console.log(result);
     //    q.resolve(result);
     //  }, function(err) {
     //    q.reject(err);
     //  }, options);
      $cordovaCamera.getPicture(options).then(function(imageData) {
          imgURI = "data:image/jpeg;base64," + imageData;
          // console.log("succeed" + imageData);
          q.resolve(imgURI);
      }, function(err) {
          // console.log("sth wrong");
          imgURI = undefined;
          q.resolve(err);
      });      
      return q.promise; //return a promise
    }
  }
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Patients',function(){
  //get patients
  //remove certain patients
  //add  patients
  //blablabla used by two controllers

  return {
    all: function() {
      return patients_array;
    },
    remove: function(patient) {
      patients_array.splice(patients_array.indexOf(chat), 1);
    },
    get: function(patientid) {
      for (var i = 0; i < patients_array.length; i++) {
        if (patients_array[i].id === parseInt(patientid)) {
          return patients_array[i];
        }
      }
      return null;
    }
  };
})

.factory('Storage', ['$window', function ($window) {
  return {
    set: function(key, value) {
      $window.localStorage.setItem(key, value);
    },
    get: function(key) {
      return $window.localStorage.getItem(key);
    },
    rm: function(key) {
      $window.localStorage.removeItem(key);
    },
    clear: function() {
      $window.localStorage.clear();
    }
  };
}])


.factory('Data', ['$resource', '$q', 'CONFIG', '$interval', function ($resource, $q, CONFIG, $interval) {
  var self = this;

  // self.promises = [];  // 服务是单例, 在一个app实例中只中实例化一次, 刷新页面导致app重新实例化, 服务也重新实例化(初始化)
  var abort = $q.defer();
  // self.promises.push(abort);  // 只会存在一个元素: self.promises[0] = abort
  // console.log(self.promises.length);

  var User = function () {
    return $resource(CONFIG.baseUrl + ':path/:route', {
      // baseurl:'localhost', 
      path:'user',
      // callback: 'JSON_CALLBACK' //jsonp_flag
    }, {
      // register: {method:'POST', params:{route: 'register'}, timeout: 10000},
      // bulkInsert: {method:'POST', params:{route: 'bulkInsert'}},
      // insertOne: {method:'POST', params:{route: 'insertOne'}, timeout: 10000},
      verifyPwd: {method:'POST', params:{route: 'verifyPwd'}, timeout: 10000},
      verifyUser: {method:'POST', params:{route: 'verifyUser'}, timeout: 10000},
      login: {method:'POST', params:{route: 'login'}, timeout: 10000},
      getList: {method:'POST', params:{route: 'getList'}, timeout: abort.promise},
      getInfo: {method:'GET', params:{route: 'getInfo'}, timeout: 10000},
      getAccInfo: {method:'GET', params:{route: 'getAccInfo'}, timeout: 10000},
      // getOthersInfo: {method:'POST', params:{route: 'getOthersInfo'}, timeout: 10000},
      // modify: {method:'POST', params:{route: 'modify'}, timeout: 10000},
      // update: {method:'POST', params:{route: 'update'}, timeout: 10000},
      updateOne: {method:'POST', params:{route: 'updateOne'}, timeout: 10000},
      bindBarcode: {method:'POST', params:{route: 'bindBarcode'}, timeout: 10000},
      updateOnesPwd: {method:'POST', params:{route: 'updateOnesPwd'}, timeout: 10000},
      updateOneWithSMS: {method:'POST', params:{route: 'updateOneWithSMS'}, timeout: 10000},
      // remove: {method:'POST', params:{route: 'remove'}, timeout: 10000},
      // removeOne: {method:'GET', params:{route: 'removeOne'}, timeout: 10000},
      logout: {method:'GET', params:{route: 'logout'}, timeout: 10000}
    });
  };
  var Insurance = function () {
    return $resource(CONFIG.baseUrl + ':path/:route', {
      // baseurl:'localhost', 
      path:'ince',
      // callback: 'JSON_CALLBACK' //jsonp_flag
    }, {
      getInfo: {method:'POST', params:{route: 'getInfo'}, timeout: 10000},
      getList: {method:'POST', params:{route: 'getList'}, timeout: abort.promise},
      modify: {method:'POST', params:{route: 'modify'}, timeout: 10000},
      remove: {method:'POST', params:{route: 'remove'}, timeout: 10000},
      removeOne: {method:'GET', params:{route: 'removeOne'}, timeout: 10000}
    });
  };
  var Consumption = function () {
    return $resource(CONFIG.baseUrl + ':path/:route', {
      // baseurl:'localhost', 
      path:'cons',
      // callback: 'JSON_CALLBACK' //jsonp_flag
    }, {
      insertOne: {method:'POST', params:{route: 'insertOne'}, timeout: 10000},
      getOne: {method:'POST', params:{route: 'getOne'}, timeout: 10000},
      getList: {method:'POST', params:{route: 'getList'}, timeout: abort.promise},
      // modify: {method:'POST', params:{route: 'modify'}, timeout: 10000},
      updateOne: {method:'POST', params:{route: 'updateOne'}, timeout: 10000},
      revoking: {method:'POST', params:{route: 'revoking'}, timeout: 10000}//,
      // remove: {method:'POST', params:{route: 'remove'}, timeout: 10000},
      // removeOne: {method:'GET', params:{route: 'removeOne'}, timeout: 10000}
    });
  };
  var Post = function () {
    return $resource(CONFIG.baseUrl + ':path/:route', {
      // baseurl:'localhost', 
      path:'post',
      // callback: 'JSON_CALLBACK' //jsonp_flag
    }, {
      post: {method:'POST', params:{route:'post'}, timeout: 10000},
      getList: {method:'POST', params:{route: 'getList'}, timeout: abort.promise},
      modify: {method:'POST', params:{route: 'modify'}, timeout: 10000},
      updateOne: {method:'POST', params:{route: 'updateOne'}, timeout: 10000},
      removeOne: {method:'GET', params:{route: 'removeOne'}, timeout: 10000}
    });
  };
  var Resource = function () {
    return $resource(CONFIG.baseUrl + ':path/:route', {
      // baseurl:'localhost', 
      path:'multer',
      // callback: 'JSON_CALLBACK' //jsonp_flag
    }, {
      rmBrokenFile: {method:'GET', params:{route:'upload'}, timeout: 10000}
    });
  };
  var Interface = function () {
    return $resource(CONFIG.baseUrl + ':path/:route', {
      // baseurl:'localhost', 
      path:'interface',
      // callback: 'JSON_CALLBACK' //jsonp_flag
    }, {
      smsSend: {method:'POST', params:{route:'smsSend'}, timeout: 10000},
      captchaImg: {method:'GET', params:{route:'captchaImg'}, timeout: 10000}
    });
  };
  self.abort = function ($scope) {
    abort.resolve();  // resolve()模拟服务器返回status(200), 进入successCallBack(); 如果用reject(), 进入errCallBack()
    // angular.forEach(self.promises, function (p) { p.resolve();});  // resolve()模拟服务器返回status(200), 进入successCallBack(); 如果用reject(), 进入errCallBack()
    // $scope.$evalAsync(function () {
    $interval(function () {  // 因为这里有递归调用的$resource.Insurance.getList(), 所以不能马上恢复设置 abort = $q.defer(); 要加一个延时(将abort = $q.defer()操作放置为下一个event loop的最后一个操作), 否则一旦恢复设置, 只能取消一个request, 后面剩余的递归调用的request由于 abort 又等于 $q.defer(), 会继续执行.
      // self.promises = [];  // 清空数组
      abort = $q.defer();
      // self.promises.push(abort);
      self.User = User();  // 重新初始化$resource方法(必须在恢复abort = $q.defer();后初始化), 主要是初始化其中的timeout: abort.promise, 因为原来的abort已经resolve()或reject()了
      self.Insurance = Insurance();
      self.Consumption = Consumption();
      self.Post = Post();
      self.Resource = Resource();
      self.Interface = Interface();
    }, 0, 1);
    // });
  };

  self.User = User();
  self.Insurance = Insurance();
  self.Consumption = Consumption();
  self.Post = Post();
  self.Resource = Resource();
  self.Interface = Interface();

  return self;
}])


.factory('PageFunc', ['$ionicPopup', '$ionicScrollDelegate', '$ionicSlideBoxDelegate', '$ionicModal', '$timeout', function ($ionicPopup, $ionicScrollDelegate, $ionicSlideBoxDelegate, $ionicModal, $timeout) {
  return {
    message: function (_msg, _time, _title) {
      var messagePopup = $ionicPopup.alert({
        title: _title || '消息',  // String. The title of the popup.
        // cssClass: '',  // String, The custom CSS class name.
        // subTitle: '',  // String (optional). The sub-title of the popup.
        template: _msg,  // String (optional). The html template to place in the popup body.
        // templateUrl: '',  // String (optional). The URL of an html template to place in the popup   body.
        okText: '确认',  // String (default: 'OK'). The text of the OK button.
        okType: 'button-energized'  // String (default: 'button-positive'). The type of the OK button.
      });

      if (_time) {
        $timeout(function () {
          messagePopup.close('Timeout!');
        }, _time);
      }

      // messagePopup.then(function(res) {
      //   console.log(res);
      // });

      // 这里返回Popup实例, 便于在调用的地方编程执行messagePopup.close()关闭alert; 需要的话还可以执行messagePopup.then(callback).
      return messagePopup;
    },
    confirm: function (_msg, _title) {
      var confirmPopup = $ionicPopup.confirm({
        title: _title,
        // cssClass: '',
        // subTitle: '',
        template: _msg,
        // templateUrl: '',
        cancelText: '取消', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: 'button-default', // String (default: 'button-default'). The type of the Cancel button.
        okText: '确定',
        okType: 'button-energized'
      });

      // confirmPopup.then(function(res) {  // true if press 'OK' button, false if 'Cancel' button
      //   console.log(res);
      // });
      
      // 这里返回Popup实例, 便于在调用的地方执行confirmPopup.then(callback).
      return confirmPopup;  
    },
    prompt: function (_msg, _title) {
      var promptPopup = $ionicPopup.prompt({
        title: _title,
        // cssClass: '',
        // subTitle: '',
        template: _msg,
        // templateUrl: '',
        inputType: 'password',  // String (default: 'text'). The type of input to use
        inputPlaceholder: _msg,  // String (default: ''). A placeholder to use for the input.
        cancelText: '取消', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: 'button-default', // String (default: 'button-default'). The type of the Cancel button.
        okText: '确定',
        okType: 'button-energized'
      });

      // promptPopup.then(function(res) {  // true if press 'OK' button, false if 'Cancel' button
      //   console.log(res);
      // });
      
      // 这里返回Popup实例, 便于在调用的地方执行promptPopup.then(callback).
      return promptPopup;  
    },
    selection: function (_msg, _title, _res, $scope) {
      var selectionPopup = $ionicPopup.show({
        title: _title,
        // cssClass: '',
        // subTitle: '',
        template: _msg,
        // templateUrl: '',
        scope: $scope, // Scope (optional). A scope to link to the popup content. 这里的scope等于$scope, 可以通过$scope和popup页面的数据绑定
        buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
          text: '取消',
          type: 'button-default',
          onTap: function(e) {
            // e.preventDefault() will stop the popup from closing when tapped.
            // e.preventDefault();
            // 点击按钮的默认效果就是关闭popup, 只有加e.preventDefault()才会阻止关闭
          }
        }, {
          text: '确定',
          type: 'button-positive',
          onTap: function(e) {
            // Returning a value will cause the promise to resolve with the given value.
            // console.log($scope.ince.selected);  // 这里不能单纯用$scope.ince, 必须用对象
            // e.preventDefault();
            return $scope[_res].selected;  // 这里必须使用$scope, 文档中用scope是不对的; 不能单纯用$scope.ince, 必须用对象
          }
        }]
      });

      // selectionPopup.then(function(res) {  // true if press 'OK' button, false if 'Cancel' button
      //   console.log(res);
      // });
      
      // 这里返回Popup实例, 便于在调用的地方执行promptPopup.then(callback).
      return selectionPopup;  
    },
    viewer: function ($scope, images, $index) {
      $ionicModal.fromTemplateUrl('partials/modal/viewer.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.viewerModal = modal;
        $scope.viewerModal.show();

        $timeout(function () {  // 在这里初始化, 加$timeout在.show()完成后再初始化; 也可以放到'modal.shown'监听事件中初始化
          // $ionicSlideBoxDelegate.$getByHandle('viewer').slide($index);  // 用ion-slide-box的active-slide代替
          $scope.currentIndex = $index;
          $scope.slidesCount = $ionicSlideBoxDelegate.$getByHandle('viewer').slidesCount();
          // $ionicSlideBoxDelegate.$getByHandle('viewer').update();
          
          // console.log(tapTimeStamp);
        });  // 放在这里就不需要设置延时时间了
      });

      // console.log(tapTimeStamp);

      $scope.actions = $scope.actions || {};
      $scope.error = $scope.error || {};
      $scope.images = images;
      $scope.zoomMin = 1;
      $scope.zoomMax = 3;
      var tapTimeStamp;
      var exitTimeout;
      var tapInterval = 300;

      // Triggered in the modal to close it or zoom the image
      $scope.actions.exit = function ($event) {
        // console.log($event);
        
        if (tapTimeStamp && $event.timeStamp - tapTimeStamp < tapInterval) {
          $timeout.cancel(exitTimeout);
        }
        else {
          tapTimeStamp = $event.timeStamp;
          exitTimeout = $timeout(function () {
            $scope.viewerModal.remove()
            .then(function () {
              // $scope.viewerModal = null;
              // console.log(tapTimeStamp);
              // tapTimeStamp = null;
              // exitTimeout = null;
            });
          }, tapInterval);
        }
      };

      $scope.actions.zoom = function ($index) {
        // console.log('double-tap');
        var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + $index).getScrollPosition().zoom;
        if (zoomFactor === $scope.zoomMax) {
          $ionicScrollDelegate.$getByHandle('scrollHandle' + $index).zoomTo(1, true);  // 缩放到1
        }
        else {
          $ionicScrollDelegate.$getByHandle('scrollHandle' + $index).zoomBy(2, true);  // 乘以2
        }
      };

      $scope.actions.updateSlideStatus = function($index) {
        var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + $index).getScrollPosition().zoom;
        // console.log($ionicScrollDelegate.$getByHandle('scrollHandle' + $index).getScrollPosition());
        if (zoomFactor === $scope.zoomMin) {
          $ionicSlideBoxDelegate.enableSlide(true);
        } else {
          $ionicSlideBoxDelegate.enableSlide(false);
        }
      };

      $scope.actions.getIndex = function () {
        // $scope.slidesCount = $ionicSlideBoxDelegate.$getByHandle('viewer').slidesCount();
        $scope.currentIndex = $ionicSlideBoxDelegate.$getByHandle('viewer').currentIndex();
        // $scope.error.viewerError = '';
        // console.log($scope.currentIndex, $scope.slidesCount);
      };
    }
  };
}])


.factory('Token', ['Storage', 'jwtHelper', 'ACL', function (Storage, jwtHelper, ACL) {
  return {
    // isAuthenticated: false,
    curUserRole: function () {
      var userRole = ACL.userRoles.public.title;
      try {
        userRole = jwtHelper.decodeToken(Storage.get('token')).userRole;
      }
      catch (e) {
        // console.log(e);
        return ACL.userRoles.public.title;
      }
      return userRole;
    },
    isExpired: function () {
      // return Storage.get('token') && jwtHelper.isTokenExpired(Storage.get('token'));
      var isExpired = true;
      try {
        isExpired = jwtHelper.isTokenExpired(Storage.get('token'));
        // console.log(isExpired);
      }
      catch (e) {
        // console.log(e);
        return true;
      }
      return isExpired;
    }
  };
}])

.factory('User', ['$rootScope', 'PageFunc', '$ionicLoading', '$ionicActionSheet', '$cordovaCamera', '$cordovaFileTransfer', 'CONFIG', '$timeout', 'Storage', 'Data', 'Token', '$state', '$ionicHistory', '$ionicModal', '$q', '$ionicSlideBoxDelegate', 'jwtHelper', '$http', '$interval', function ($rootScope, PageFunc, $ionicLoading, $ionicActionSheet, $cordovaCamera, $cordovaFileTransfer, CONFIG, $timeout, Storage, Data, Token, $state, $ionicHistory, $ionicModal, $q, $ionicSlideBoxDelegate, jwtHelper, $http, $interval) {
  var self = this;
  self.takePicsModal = function ($scope, images) {
    $ionicModal.fromTemplateUrl('templates/modals/takePics.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.takePicsModal = modal;
      $scope.takePicsModal.show();
      // // 在$scope销毁的时候, 务必清除该$scope的modal, 否则容易造成内存溢出, 实际上由于ionic的缓存页面机制(好像全局设置关不掉页面缓存), 导致$destroy事件很少发生, 可以不用监听
      // $scope.$on('$destroy', function() {
      //   if ($scope.takePicsModal) {  // 加判断是因为有可能已经在登录成功后清除了$scope.takePicsModal
      //     $scope.takePicsModal.remove()
      //     .then(function () {
      //       // console.log('Leaving ' + $scope.$id);
      //       $scope.takePicsModal = null;
      //     });
      //   }
      // });

      $timeout(function () {  // 在这里初始化, 加$timeout在.show()完成后再初始化; 也可以放到'modal.shown'监听事件中初始化
        $scope.slidesCount = $ionicSlideBoxDelegate.$getByHandle('takePics').slidesCount();
        $ionicSlideBoxDelegate.$getByHandle('takePics').enableSlide(false);  // 阻止手势滑动
        $ionicSlideBoxDelegate.$getByHandle('takePics').update();
      });  // 放在这里就不需要设置延时时间了
    });

    $scope.actions = $scope.actions || {};
    $scope.error = $scope.error || {};
    $scope.pageHandler = $scope.pageHandler || {progress: 0};
    // $scope.images = images;
    for (var i = 0; i < images.length; i++) {  // 不能直接$scope.config.images = images, 因为$scope.config.images中的title不能被覆盖(images一开始可能是空的, $scope.config.images相当于一个图片拍摄套餐或路径)
      for (var j = 0; j < $scope.config.images.length; j++) {
        if ($scope.config.images[j].title === images[i].title) {
          $scope.config.images[j].Url = images[i].Url;
          $scope.config.images[j]._id = images[i]._id;
        }
      }
    }
    var cameraOptions = angular.copy(CONFIG.cameraOptions), 
        uploadOptions = angular.copy(CONFIG.uploadOptions);
    $scope.currentIndex = 0;

    // Triggered in the modal to close it
    $scope.actions.closeTakePics = function () {
      $scope.takePicsModal.hide();
    };
    $scope.actions.rmTakePics = function () {
      $scope.takePicsModal.remove()
      .then(function () {
        $scope.takePicsModal = null;
      });
    };

    $scope.actions.previous = function () {
      $ionicSlideBoxDelegate.$getByHandle('takePics').previous();
    };
    $scope.actions.next = function () {
      $ionicSlideBoxDelegate.$getByHandle('takePics').next();
    };
    $scope.actions.getIndex = function () {
      // $scope.slidesCount = $ionicSlideBoxDelegate.$getByHandle('takePics').slidesCount();
      $scope.currentIndex = $ionicSlideBoxDelegate.$getByHandle('takePics').currentIndex();
      $scope.error.takePicsError = '';
      // console.log($scope.currentIndex, $scope.slidesCount);
    };
    
    $scope.actions.takePics = function(imgTitle, _id) {

      if (!(window.navigator && window.navigator.camera)) {
        return console.log('不支持window.navigator.camera');
      }

      $cordovaCamera.getPicture(cameraOptions).then(function (imageURI) {
        $timeout(function () {
          var serverUrl = encodeURI(CONFIG.baseUrl + CONFIG.userResUploadPath);  //what is encodeURI evoked form where
          uploadOptions.headers = {Authorization: 'Bearer ' + Storage.get('token')};
          uploadOptions.fileName = 'imgTitle' + CONFIG.uploadOptions.fileExt;
          uploadOptions.params = {method: '$set', dest: 'personalInfo.idImg', queryTitle: imgTitle, _id: _id, replace: true, inArray: true};  // true在http params中会变成'1'

          // console.log($scope.info, $scope.accountInfo);

          PageFunc.confirm('是否上传?', '上传' + imgTitle).then(function (res) {
            if (res) {
              if (!window.FileTransfer) {
                return console.log('不支持window.FileTransfer');
              }
              return $cordovaFileTransfer.upload(serverUrl, imageURI, uploadOptions, true).then(function (result) {
                  $scope.pageHandler.progress = 0;
                  $scope.error.takePicsError = '';
                  // console.log(result);
                  var resImg = JSON.parse(result.response).results;
                  if ($scope.accountInfo) {
                    $scope.accountInfo.user.personalInfo.idImg = resImg;
                    Storage.set('AccInfo', JSON.stringify($scope.accountInfo));
                  }

                  if ($scope.info) {
                    $scope.info.personalInfo.idImg = resImg;
                    Storage.set('info', JSON.stringify($scope.info));
                  }
                  
                  for (var i = 0; i < resImg.length; i++) {  // 不能直接$scope.config.images = resImg, 因为$scope.config.images中的title不能被覆盖(resImg可能有部分图片是空的, $scope.config.images相当于一个图片拍摄套餐或路径)
                    for (var j = 0; j < $scope.config.images.length; j++) {
                      if ($scope.config.images[j].title === resImg[i].title) {
                        $scope.config.images[j].Url = resImg[i].Url;
                        $scope.config.images[j]._id = resImg[i]._id;
                      }
                    }
                  }

                  try {
                    $cordovaCamera.cleanup().then(function () {  // only for ios when using FILE_URI
                      console.log("Camera cleanup success.");
                    }, function (err) {
                      console.log(err);
                    });
                  }
                  catch (e) {
                    console.log(e);
                  }
              }, function (err) {
                // Error
                // console.log(err);
                $scope.error.takePicsError = err;
                $scope.pageHandler.progress = 0;

                try {
                  $cordovaCamera.cleanup().then(function () {  // only for ios when using FILE_URI
                    console.log("Camera cleanup success.");
                  }, function (err) {
                    console.log(err);
                  });
                }
                catch (e) {
                  console.log(e);
                }
              }, function (progress) {
                $scope.pageHandler.progress = progress.loaded / progress.total * 100;
              });
            }
            
            $scope.pageHandler.progress = 0;
            $scope.error.takePicsError = '取消上传!';
            try {
              $cordovaCamera.cleanup().then(function () {  // only for ios when using FILE_URI
                console.log("Camera cleanup success.");
              }, function (err) {
                console.log(err);
              });
            }
            catch (e) {
              console.log(e);
            }
          });
        }, 0);
      }, function (err) {
        $scope.error.takePicsError = err;
        console.log(err);
      });
    };
  };
}])






// .factory('Camera', ['$cordovaCamera','CONFIG','$q',
//   function($cordovaCamera,CONFIG,$q) {
//   //def options inside factory no need for params in controller 
//   var imgURI = null;
//   return {
//     getPicture: function() {  
//         var options = { 
//             quality : 75, 
//             destinationType : 0, 
//             sourceType : 1, 
//             allowEdit : true,
//             encodingType: 0,
//             targetWidth: 300,
//             targetHeight: 300,
//              popoverOptions: CONFIG.popoverOptions,
//             saveToPhotoAlbum: false
//         };
//       // $cordovaCamera.getPicture(function(imageData) {
//       //     imgURI = "data:image/jpeg;base64," + imageData;
//       //     console.log(imgURI);
//       //   }, function(err) {
//       //       // An error occured. Show a message to the user
//       //       console.log("sth wrong");
//       //       imgURI = undefined;
//       //   },options);


//       // return $cordovaCamera.getPicture(options);
//       $cordovaCamera.getPicture(options).then(function(imageData) {
//           imgURI = "data:image/jpeg;base64," + imageData;
//           console.log("succeed" + imageData);
//           return imgURI;
//       }, function(err) {
//           console.log("sth wrong");
//           imgURI = undefined;
//           return imgURI;
//       });
//     },
//     getimgURL:function(){
//       return imgURI;
//     }
//   }
// }])


;
