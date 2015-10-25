angular.module('starter.services', ['ngCordova','ngResource'])

.constant('CONFIG', {

  baseUrl: 'http://10.12.43.72:9000/Api/v1/',  //RESTful 服务器
  ImageAddressIP: "http://121.43.107.106:8088",
  ImageAddressFile : "/PersonalPhoto",
  // ImageAddress = ImageAddressIP + ImageAddressFile + "/" + DoctorId + ".jpg";
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
  }
  /* List all the roles you wish to use in the app
  * You have a max of 31 before the bit shift pushes the accompanying integer out of
  * the memory footprint for an integer
  */
})

.value('VALUE',{
  temp: ""
})

.factory('Camera', ['$q','$cordovaCamera','CONFIG', '$cordovaFileTransfer',function($q,$cordovaCamera,CONFIG,$cordovaFileTransfer) {
 
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

     var q = $q.defer();

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
    },

    getPictureFromPhotos: function(){
      var options = { 
          quality : 75, 
          destinationType : 0, 
          sourceType : 0, 
          allowEdit : true,
          encodingType: 0,
          targetWidth: 300,
          targetHeight: 300
      };
        //从相册获得的照片不能被裁减 调研~
     var q = $q.defer();
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
    },

    uploadPicture : function(imgURI){
        // document.addEventListener('deviceready', onReadyFunction,false);
        // function onReadyFunction(){
          var uri = encodeURI(CONFIG.ImageAddressIP + "/upload.php");
          var options = {
            fileKey : "file",
            fileName : "ZXF" + ".jpg",
            chunkedMode : true,
            mimeType : "image/jpeg"
          };
          var q = $q.defer();
          console.log("jinlaile");
          $cordovaFileTransfer.upload(uri,imgURI,options)
            .then( function(r){
              console.log("Code = " + r.responseCode);
              console.log("Response = " + r.response);
              console.log("Sent = " + r.bytesSent);
              q.resolve(r);        
            }, function(err){
              alert("An error has occurred: Code = " + error.code);
              console.log("upload error source " + error.source);
              console.log("upload error target " + error.target);
              q.resolve(error);          
            }, function (progress) {
              console.log(progress);
            })

            ;
          return q.promise;  
        // }


        // var ft = new FileTransfer();
        // $cordovaFileTransfer.upload(imgURI, uri, win, fail, options);
      
    },

  uploadPicture2: function(imgURI){
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
   // as soon as this function is called FileTransfer "should" be defined
      console.log(FileTransfer);
      console.log(File);
    }
  }


}
  
}])



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


.factory('Data', ['$resource', '$q', 'CONFIG', '$interval','Storage',function ($resource, $q, CONFIG, $interval,Storage) {

  var self = this;

  var abort = $q.defer();

  var urlPartials = "WL";
  var setUrlPartials = function(p){

      self.urlPartials = p;
      urlPartials = p;
      // console.log("在setUrlPartials函数内,"+"UrlPartials =  " + self.urlPartials );
      // console.log(self.urlPartials);
      // console.log(urlPartials);
  };

  var getUrlPartials = function(){
      // console.log("在getUrlPartials函数内,"+"UrlPartials =  " + self.urlPartials );
      return self.urlPartials;
  };

  var User = function () {

    // console.log("在User函数内,"+"UrlPartials =  " + getUrlPartials() );
    // console.log(Storage.get(13131313) + '/'+'DoctorInfo');
    return $resource(CONFIG.baseUrl + ':path/:route', {
    
      path:'Users',
      
    }, {
      myTrialPost:{method:'POST',params:{route:'DoctorInfo'}, timeout:10000},
      myTrialGET: {method:'GET', params:{route: Storage.get(13131313) + '/'+'DoctorInfo'}, timeout: 10000}
    });
  };

  var User2 = function (data) {


    return $resource(CONFIG.baseUrl + ':path/'+':userid'+'/:route', {
    
      path:'Users',
      
    }, {
      // myTrialPost:{method:'POST',params:{route:'DoctorInfo'}, timeout:10000},
      myTrialGET: {method:'GET', params:{userid: data,route:'DoctorInfo'}, timeout: 10000}
    });
  };

  self.abort = function ($scope) {
    abort.resolve();  
    $interval(function () { 
      abort = $q.defer();
      self.User = User();
      self.User2 = User2(); 
      // self.setUrlPartials = setUrlPartials();
      // self.getUrlPartials = getUrlPartials();
    }, 0, 1);
  };

  self.User = User();
  self.User2 = User2(); 
  // self.setUrlPartials = setUrlPartials();
  // self.getUrlPartials = getUrlPartials();
  return self;
}])

.factory('Users', ['$q', '$http', 'Data','Storage','$resource','CONFIG',function ($q, $http, Data,Storage,$resource,CONFIG) {
  var self = this;

  self.myTrial = function (DoctorInfo) {
    var deferred = $q.defer();
    Data.User.myTrialPost(DoctorInfo, function (data, headers) {
      deferred.resolve(data);
    }, function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  };

  self.myTrial2 = function (userid) {
    
    // Storage.set(13131313,userid);
    //由于API中要求有userID变量 DATA 中只能写死 所以动态生成一个方法
    var temp = $resource(CONFIG.baseUrl + ':path/:uid/:route', {
      path:'Users',  
    }, {
      myTrialGET: {method:'GET', params:{uid: userid,route:'DoctorInfo'}, timeout: 10000}
    });


    var deferred = $q.defer();
    temp.myTrialGET({}, function (data, headers) {
      console.log("获得了数据"+data)
      deferred.resolve(data);
    }, function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  };

    return self;
}])

;
