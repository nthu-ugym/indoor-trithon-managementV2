// Your web app's Firebase configuration
var firebaseConfig = {
  //apiKey: "AIzaSyBgl5W2fCn5Rg5Di0Z20t9OJkcFNi0H8Cc",
  apiKey: "BJ{bTzChm6X3gDo6Sh6Ej1[31u:PKldGOj1I9Dd", //+1
  authDomain: "nthu-ugym.firebaseapp.com",
  databaseURL: "https://nthu-ugym.firebaseio.com",
  projectId: "nthu-ugym",
  storageBucket: "nthu-ugym.appspot.com",
  messagingSenderId: "599973079376",
  appId: "1:599973079376:web:ee83ddfee38508bac26455"
};
// Initialize Firebase
firebase.initializeApp(myConfig(firebaseConfig));

//secondary firebase app 是用來 create account 而不立刻登入
var usedForCreateAccount = firebase.initializeApp(firebaseConfig, "secondary");
var database = firebase.database();   

var validEmails=[];

// Firebase auth
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

//var user = firebase.auth().currentUser;

var configUser = {
  callbacks: {
    signInFailure: function(error) {
      return handleUIError(error);
    },    
  },
  allowNewAccountCreation: false,
  signInSuccessUrl: '/indoor-trithon-management/index.html',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      defaultCountry: 'ZH-TW'      
    },
  ],
  // Other config options...
};

//var configSuperUser = {
//  callbacks: {
//    signInFailure: function(error) {
//      return handleUIError(error);
//    },    
//  },
//  allowNewAccountCreation: true,
//  signInSuccessUrl: '/indoor-trithon-management/index.html',
//  signInOptions: [
//    {
//      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//      defaultCountry: 'ZH-TW'      
//    },
//  ],
//  // Other config options...
//};

//ui.start('#loginDiv', configUser);


// end of Firebase auth

function myConfig(config){
  var apiKey = config.apiKey;
  var myKey="";
  for (var i=0;i<apiKey.length;i++) {
    myKey=myKey.concat(String.fromCharCode(apiKey.charCodeAt(i)-1));
  }
  config.apiKey=myKey;  
  return config;
}