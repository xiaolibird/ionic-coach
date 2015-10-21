angular.module('starter.services', ['ngCordova'])

.constant('CONFIG', {
  // baseUrl: '/',
  // baseUrl: 'http://10.12.43.168/',
  // ioDefaultNamespace: '10.12.43.168/default',
  baseUrl: 'http://192.168.1.108/',
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
    sourceType: 1,  // Camera.PictureSourceType = {PHOTOLIBRARY: 0, CAMERA: 1, SAVEDPHOTOALBUM: 2};
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

// .factory('Camera', ['$q', function($q) {
 
//   return {
//     getPicture: function() {
//       var q = $q.defer();
      
//       navigator.camera.getPicture(function(result) {
//         // Do any magic you need
//         q.resolve(result);
//       }, function(err) {
//         q.reject(err);
//       }, options);
      
//       return q.promise;
//     }
//   }
// }])

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


.factory('Camera', ['$cordovaCamera','CONFIG',
  function($cordovaCamera,CONFIG) {
  //def options inside factory no need for params in controller 



  var imgURI;
  return {
    getPicture: function() {  
        var options = { 
            quality : 75, 
            destinationType : 0, 
            sourceType : 1, 
            allowEdit : true,
            encodingType: 0,
            targetWidth: 300,
            targetHeight: 300,
             popoverOptions: CONFIG.popoverOptions,
            saveToPhotoAlbum: false
        };
      // $cordovaCamera.getPicture(function(imageData) {
      //     imgURI = "data:image/jpeg;base64," + imageData;
      //     console.log(imgURI);
      //   }, function(err) {
      //       // An error occured. Show a message to the user
      //       console.log("sth wrong");
      //       imgURI = undefined;
      //   },options);


      // return $cordovaCamera.getPicture(options);
      $cordovaCamera.getPicture(options).then(function(imageData) {
          imgURI = "data:image/jpeg;base64," + imageData;
          console.log("succeed" + imageData);
      }, function(err) {
          console.log("sth wrong");
          imgURI = undefined;
      });
    },
    getimgURL:function(){
      return imgURI;
    }
  }
}])


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
}]);
