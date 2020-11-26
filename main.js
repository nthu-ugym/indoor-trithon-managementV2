$("#版本").text("V2.03");

// 初始變數
var 已登入 = -1; // -1:未登入, 0:登入中, 1:已登入
var 登入Email="";
$("#郵件報名按鈕").prop("disabled","disabled");
$("#帳號管理按鈕").prop("disabled","disabled");
$("#院所系管理按鈕").prop("disabled","disabled");
var 最後比賽編號 = 0;; 
var 比賽編號;
var 目前比賽頁面; // 1:比賽資訊, 2:報名名單, 3:比賽結果
var games, gamehistory, 所有學院=[["無"]];
var gameSaveType="New"; //or "Update"
var schemaModel;
var defineColumns_現行比賽;
var defineColumns_過往比賽;
var in管理帳號 = false;
var 隊數;
var 原先隊數;
var 比賽編號位數=5;
var myUser;
var 報名名單;

$(document).ready(function() {

  $.loading.start('Loading...');
  initializaTable();  //defined in functions.js
  
  //Firebase authrization 狀態改變 callback
  firebase.auth().onAuthStateChanged(async function(user) {
    myUser=user;
    if (user) {
      
      //=== 使用 firebase 的 realtime database 來檢查 email 黑名單
      console.log("User is signed in.", user.email);
      await database.ref('/validEmails').once('value', e=>{ 
        validEmails=JSON.parse(e.val());  
      });

      //console.log(validEmails);

      var userIsValid=false;
      //check if the user is in the white list
      for (var i=0; i<validEmails.length; i++){
        //console.log(validEmails[i], user.email)
        if (validEmails[i]==user.email){
          userIsValid = true;
          break;
        }
      }

      //console.log("uservalid", userIsValid);
      if (!userIsValid) {
        alert("此帳號已無效");
        firebase.auth().signOut();
        return;
      }
      //=========================================================

      //=== 除 superadmin 外，用戶 email 需要 verified，才能登入
      if (user.email!="superadmin@test.com" && !user.emailVerified) {
        alert(user.email+" 帳號已產生，請收 eamil 進行驗證後，才能正式登入!");

        user.sendEmailVerification().then(function() {
          // Email sent.
        }).catch(function(error) {
          // An error happened.
        });

        firebase.auth().signOut();
      }
      //=========================================================

      //=== 
      if (user.email=="superadmin@test.com" || user.emailVerified) {
        已登入 = 1;
        登入Email = user.email;
        $("#登出入按鈕").text("登出");   
        $("#登出入訊息").text("歡迎 "+登入Email);   

        if (登入Email=="superadmin@test.com"){
          $("#郵件報名按鈕").prop("disabled",""); 
          $("#帳號管理按鈕").prop("disabled","");    
          $("#院所系管理按鈕").prop("disabled","");       
        } else {  
          $("#郵件報名按鈕").prop("disabled","disabled"); 
          $("#帳號管理按鈕").prop("disabled","disabled");    
          $("#院所系管理按鈕").prop("disabled","disabled");         
        }
        
        //Use API to get 現行比賽
        api3GetAllActiveGameStatus.getAPI();//改用 apiClasses 方式

        //Use API to get 過往比賽
        api4GetAllClosedGames.getAPI(); //改用 apiClasses 方式

        //Use API to get 學院
        api2GetAllSchoolUnits.getAPI(); //改用 apiClasses 方式        
                
      }

    } else {
      console.log("No user is signed in.");
      $.loading.end();
      已登入 = -1;
      登入Email = "";
      $("#登出入按鈕").text("登入");   
      $("#登出入訊息").text("請登入進行管理比賽"); 
      $("#郵件報名按鈕").prop("disabled","disabled");       
      $("#帳號管理按鈕").prop("disabled","disabled");    
      $("#院所系管理按鈕").prop("disabled","disabled");      
    }
  });  
    
  $(".回主畫面").hover(function() {$(this).css('cursor','pointer');});
  $("#新增比賽表格Div").hide();
  $("#院所系管理表單Div").hide(); 
  $("#比賽資訊").css("background", "orange");$("#比賽資訊").css("color", "white");  

  //實體化現行比賽表格
  $("#現行比賽表格").kendoGrid({
    dataSource: {
      data: games,
      sort: { field: "比賽編號", dir:"desc"},
      schema: {
        model: schemaModel
      },
      pageSize: 7
    },
    height: 600,
    toolbar: ["search"],
    scrollable: true,
    sortable: true,
    filterable: false,
    pageable: {
      input: true,
      numeric: false
    },
    columns: defineColumns_現行比賽
  });
  
  //實體化過往比賽表格
  $("#過往比賽表格").kendoGrid({
    dataSource: {
      data: gamehistory,
      sort: { field: "比賽編號", dir:"desc"},          
      schema: {
        model: schemaModel
      },
      pageSize: 4
    },
    height: 420,
    toolbar: ["search"],
    scrollable: true,
    sortable: true,
    filterable: false,
    pageable: {
      input: true,
      numeric: false
    },
    columns: defineColumns_過往比賽
  });  

  //實體化報名名單表格
  $("#報名名單表格").kendoGrid({
    dataSource: {
      data: games,
      sort: { field: "比賽編號", dir:"desc"},
      schema: {
        model: schemaModel
      },
      pageSize: 20
    },
    height: 400,
    toolbar: ["search"],
    scrollable: true,
    sortable: true,
    filterable: false,
    pageable: {
      input: true,
      numeric: false
    },
    columns: defineColumns_報名名單
  });  
  
  //實體化比賽結果表格
  $("#比賽結果表格").kendoGrid({
    dataSource: {
      data: games,
      sort: { field: "比賽編號", dir:"desc"},
      schema: {
        model: schemaModel
      },
      pageSize: 20
    },
    height: 400,
    toolbar: ["search"],
    scrollable: true,
    sortable: true,
    filterable: false,
    pageable: {
      input: true,
      numeric: false
    },
    columns: defineColumns_比賽結果
  });  
  
});

