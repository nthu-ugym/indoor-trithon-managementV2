//定義 Kendo UI table 

//因為 Kendo UI 的 template function 不能指定別的參數，所以分成兩個 functions，
//function render中英文比賽名稱(model) 和 function render中英文比賽地點(model)
function render中英文比賽名稱(model) { //將有 \n 的字串用 <br> 取代
  var text = model.比賽名稱+ "\n" +model.英文比賽名稱;
  text = text.replace(new RegExp("\n", 'g'), "<br>");
  return text;
}

function render中英文比賽地點(model) { //將有 \n 的字串用 <br> 取代
  var text = model.比賽地點+ "\n" +model.英文比賽地點;
  text = text.replace(new RegExp("\n", 'g'), "<br>");
  return text;
}

//定義 Kendo UI 表格的參數
function initializaTable(){ 
  
  //比賽表格的 schema 定義
  schemaModel = {
        fields: {
          比賽編號: { type: "string" },        
          比賽日期: { type: "string" },
          比賽名稱: { type: "string" },
          比賽地點: { type: "string" },          
          時間範圍: { type: "string" },
          截止時間: { type: "string" },            
          隊數限制: { type: "number" },
          報名人數: { type: "number" },
          比賽種類: { type: "string" }, 
          比賽距離: { type: "string" },             
        }
      };

  //現行比賽表格的 欄位 定義
  defineColumns_現行比賽 = [
    {
      field: "比賽編號",
      title: "編號",
      //template: "<div><a> #: 比賽名稱 # </a><br>aaa</div>",
      width: "70px"
    },  
    {
      field: "比賽名稱",
      template: render中英文比賽名稱,
      //width: "230px"
    },  
    {
      field: "比賽地點",
      template: render中英文比賽地點,
      width: "100px"
    },     
    {
      field: "比賽日期",
      //format: "{0:MM/dd/yyyy}",
      //format: "{0:yyyy-MM-dd}",
      title: "比賽日期",
      width: "100px",
    },
    {
      field: "時間範圍",
      title: "比賽時間",
      width: "100px"
    },
    {
      field: "截止時間",
      title: "報名截止時間",
      width: "120px"
    },
    {
      field: "隊數限制",
      //title: "人數限制",
      width: "75px"
    },
    {
      field: "報名人數",
      //title: "報名人數",
      width: "75px"
    },      
    {
      field: "比賽種類",
      //title: "比賽種類",
      width: "100px"
    },
    {
      field: "比賽距離",
      //title: "比賽距離",
      width: "130px"
    },                  
    {
      field: "比賽名稱",
      title: " ",
      template: "<div onclick='editClick(this)'><i title='Edit Game' style='font-size:20px' class='fa fa-pencil-square-o'></i></div>",
      width:"50px",        
    },
    {
      field: "比賽名稱",
      title: " ",
      template: "<div onclick='直播link(this)'><i style='font-size:20px' class='fa fa-youtube-play'></i></div>",
      width:"50px",        
    }  
  ];

  //過往比賽表格的 欄位 定義  
  defineColumns_過往比賽 = [
    {
      field: "比賽編號",
      title: "編號",
      //template: "<div><a> #: 比賽名稱 # </a><br>aaa</div>",
      width: "70px"
    },  
    {
      field: "比賽名稱",
      template: render中英文比賽名稱,
      //width: "230px"
    },  
    {
      field: "比賽地點",
      template: render中英文比賽地點,      
      width: "100px"
    },     
    {
      field: "比賽日期",
      //format: "{0:MM/dd/yyyy}",
      //format: "{0:yyyy-MM-dd}",
      title: "比賽日期",
      width: "100px",
    },
    {
      field: "時間範圍",
      title: "比賽時間",
      width: "100px"
    },
    {
      field: "截止時間",
      title: "報名截止時間",
      width: "120px"
    },
    {
      field: "隊數限制",
      //title: "人數限制",
      width: "75px"
    },
    {
      field: "報名人數",
      //title: "報名人數",
      width: "75px"
    },      
    {
      field: "比賽種類",
      //title: "比賽種類",
      width: "100px"
    },
    {
      field: "比賽距離",
      //title: "比賽距離",
      width: "130px"
    },                  
    {
      field: "比賽名稱",
      title: " ",
      template: "<div onclick='infoClick(this)'><i style='font-size:20px' class='fa fa-info-circle'></i></div>",
      width:"50px",        
    },                  
    {
      field: "比賽名稱",
      title: " ",
      template: "<div onclick='infoClick(this)'><i style='font-size:20px' class='fa fa-trash-o'></i></div>",
      width:"50px",        
    }
  ];
  
  //報名名單表格的 欄位 定義
  defineColumns_報名名單 = [
    {
      field: "隊伍編號",
      //template: "<div><a> #: 比賽名稱 # </a><br>aaa</div>",
      width: "70px"
    },  
    {
      field: "學院所系",
      //template: "<div><a> #: 比賽名稱 # </a><br>aaa</div>",
      width: "230px"
    },  
    {
      field: "No1",
      title: "隊員1",
      width: "100px",
    },
    {
      field: "No2",
      title: "隊員2",      
      width: "100px"
    },
    {
      field: "No3",
      title: "隊員3",      
      width: "100px"
    },                  
    {
      field: "隊伍Id",
      title: " ",
      template: "<div onclick='取消報名(this)'><i style='font-size:15px' class='fa fa-trash-o'></i></div>",
      width:"30px",        
    }  
  ];  
  
  //比賽結果表格的 欄位 定義
  defineColumns_比賽結果 = [
    {
      field: "隊伍編號",
      //template: "<div><a> #: 比賽名稱 # </a><br>aaa</div>",
      width: "70px"
    },  
    {
      field: "學院所系",
      //template: "<div><a> #: 比賽名稱 # </a><br>aaa</div>",
      width: "230px"
    },  
    {
      field: "No1",
      title: "隊員1",      
      width: "100px",
    },
    {
      field: "No2",
      title: "隊員2",      
      width: "100px"
    },
    {
      field: "No3",
      title: "隊員3",      
      width: "100px"
    } 
  ];    
}

//比賽編輯時，因應選擇不同的學院，更改顯示 系所 的畫面
//使用 jQuery remove/append 來做動態項目顯示
function 更改學院(selectObject){
  
  console.log("更改學院", selectObject.name, selectObject.selectedIndex, selectObject.id);
  
  var 學院Idx   = selectObject.selectedIndex;
  var 隊伍學院id = selectObject.id;
  var 隊伍系所id = 隊伍學院id.replace(/學院/i, '系所');
  var 隊伍號碼   = 隊伍系所id.substr(4,4);
  
  console.log(隊伍系所id, 隊伍號碼);
  
  //重建 系所 的選項，先移除 #系所Option
  $("#系所Option"+隊伍號碼).remove();
  
  //Append 新的 #系所Option
  所有學院[學院Idx].forEach(系所 => {
    $("#"+隊伍系所id).append('<option id="系所Option'+隊伍號碼+'" value="'+系所+'">'+系所+'</option>');    
  });  
   
}

//院所系管理表單，當選擇不同學院，顯示其所屬系所
//使用 jQuery remove/append 來做動態項目顯示
function 學院Selected(學院){
  console.log("學院Selected", 學院.textContent);
  $("#清華大學系所").text(學院.textContent);
  
  var 學院Idx;
  for (var i=0; i< 所有學院.length; i++){
    if (所有學院[i][0]==學院.textContent) {
      console.log(i);
      學院Idx = i;
      break;
    }
  }
  
  //重建 系所 的選項，先移除 #系所List
  $("#系所List").remove();
 
  //Append 新的 #系所List
  $("#所系List").append('<div id="系所List" class="系所List內容">'+所有學院[學院Idx][0]+'</div>');
  for (var i=1; i< 所有學院[1].length; i++) {
    $("#所系List").append('<div id="系所List" class="系所List內容">'+所有學院[學院Idx][i]+' <a style="font-size:5px; color:red; cursor:pointer" onclick="delete系所('+i.toString()+')"> delete </a></div>');
  }  
  
}

//回歸主畫面
//使用 hide/show 和 window.scrollTo 來顯示主畫面
function 回主畫面(){
  console.log("回主畫面");
  $("#新增比賽表格Div").hide();
  $("#院所系管理表單Div").hide();  
  $("#mainPage").show();
  window.scrollTo(0,0);
}

//現行比賽的 Edit 按鈕 handler
function editClick(e) {
  window.scrollTo(0,0); //捲動到畫面頂端
  
  console.log("edit click");
  if (已登入!=1) {
    alert("請先登入才可以編輯修改比賽");
    return;
  }  
  
  gameSaveType = "Update"; //更新比賽
  
  //取得所選比賽的比賽編號
  var 現行比賽表格 = $("#現行比賽表格").data("kendoGrid");
  var dataItem = 現行比賽表格.dataItem($(e).closest("tr"));
  console.log(dataItem.比賽編號);
  
  //取得所選比賽的比賽資訊
  games.forEach( 
    game => {
      if (game.比賽編號==dataItem.比賽編號) selectedGame=game;
    }
  );
  
  console.log(selectedGame);
  //顯示所選比賽的比賽資訊
  比賽編號 = parseInt(selectedGame.比賽編號);
  $("#比賽編號內容").text(比賽編號.toString());
  $("#直播連結內容").val(selectedGame.直播連結);
  $("#比賽名稱內容").text(selectedGame.比賽名稱);
  $("#英文比賽名稱內容").text(selectedGame.英文比賽名稱);
  $("#比賽說明內容").text(selectedGame.比賽說明);
  $("#英文比賽說明內容").text(selectedGame.英文比賽說明);
  $("#比賽地點內容").val(selectedGame.比賽地點);  
  $("#英文比賽地點內容").val(selectedGame.英文比賽地點);  
  $("#比賽日期").val(selectedGame.比賽日期);
  var 時間範圍 = selectedGame.時間範圍; 
  var 開始結束 = 時間範圍.split("~");
  $("#開始時間").val(開始結束[0]);
  $("#結束時間").val(開始結束[1]);  

  //"截止時間" : "2020-10-31 18:00"
  var 截止日期時間Str = selectedGame.截止時間;
  var 截止日期時間Arr = 截止日期時間Str.split(' ');
  $("#截止日期").val(截止日期時間Arr[0]);
  $("#截止時間").val(截止日期時間Arr[1]);
  
  $("#參賽隊數").val(selectedGame.隊數限制.toString());  
  $("#"+selectedGame.比賽種類).prop("checked", "checked");
  
  //準備比賽距離資料
  var distStr = selectedGame.比賽距離;
  distArr = distStr.split(",");
  for (var i=0; i<3; i++){
    if (distArr[i]!=undefined) {
      var execise = distArr[i].split(":");
      var exeType = execise[0].substr(0,2);
      var exeDist = execise[1].replace(/\D/g,'');
      console.log(exeType, exeDist);
      $("#"+exeType+"距離").val(exeDist);
    }
  }
  
  //設定隊伍學院系所
  設定隊伍院系所(selectedGame.隊數限制); 
  
  var 學院系所JSON = selectedGame.學院系所; //API 傳回的 selectedGame.學院系所 為 JSON strin
  
  //分析學院系所字串
  var numGroup = 學院系所JSON.length;
  for (var i=0; i<numGroup; i++){
    var 學院系所Arr = 學院系所JSON[i].split(',');
    var 學院Arr = 學院系所Arr[0].split(':');
    var 系所Arr = 學院系所Arr[1].split(':');    
    
    $("#隊伍學院"+(i+1).toString()).val(學院Arr[1]);
    
    //移除後再 append #系所Option
    $("#系所Option"+(i+1).toString()).remove();
    所有學院[parseInt(學院Arr[0])].forEach(系所 => {
      $("#隊伍系所"+(i+1).toString()).append('<option id="系所Option'+(i+1).toString()+'" value="'+系所+'">'+系所+'</option>');    
    });  
    $("#隊伍系所"+(i+1).toString()).val(系所Arr[1]);
    
  }
  
  $("#新增比賽儲存按鈕").prop("disabled", false);
  
  $("#mainPage").hide();
  $("#院所系管理表單Div").hide(); 
  $("#報名名單Div").hide(); 
  $("#比賽結果Div").hide(); 
  $("#新增比賽表格Div").show(); 
  $("#新增比賽表格header").text("編輯比賽");  
  $("#報名名單").prop("disabled", false);
  $("#比賽結果").prop("disabled", false);  
  比賽資訊click();  //顯示 新增比賽/編輯比賽 資訊頁面，並設定 目前比賽頁面 = 1
}    

//現行比賽的 直播按鈕 handler
function 直播link(e) {
  console.log("直播link");
  if (已登入!=1) {
    alert("請先登入才可以編輯直播連結");
    return;
  }  
  
  gameSaveType = "Update";
  
  var 現行比賽表格 = $("#現行比賽表格").data("kendoGrid");
  var dataItem = 現行比賽表格.dataItem($(e).closest("tr"));
  console.log(dataItem.比賽編號);
  //var selectedGame;
  games.forEach( 
    game => {
      //console.log(game.比賽編號);
      if (game.比賽編號==dataItem.比賽編號) selectedGame=game;
    }
  );
  
  var promptLink = (selectedGame.直播連結=="")? "https://":selectedGame.直播連結; 
  var broadcastingUrl = prompt("請輸入直播連結:", promptLink);
  selectedGame.直播連結 = (broadcastingUrl==null)? selectedGame.直播連結:broadcastingUrl; 
  
  console.log(selectedGame);
  
  //API to write to database, repeated with the code in saveGame()
  api8CreateOrUpdateGame.gameId = selectedGame.比賽編號.toString();
  api8CreateOrUpdateGame.body = selectedGame;
  api8CreateOrUpdateGame.postAPI();  
}

//過往比賽的 Info 按鈕 handler
function infoClick(e) {
  console.log("info click");
  var 過往比賽表格 = $("#過往比賽表格").data("kendoGrid");
  var dataItem = 過往比賽表格.dataItem($(e).closest("tr"));
  console.log(dataItem.比賽編號);
  
  gamehistory.forEach( 
    game => {
      //console.log(game.比賽編號);
      if (game.比賽編號==dataItem.比賽編號) selectedGame=game;
    }
  );
  
  console.log(selectedGame);
  比賽編號 = selectedGame.比賽編號;
  $("#比賽編號內容").text(比賽編號.toString());
  $("#直播連結內容").val(selectedGame.直播連結);
  $("#比賽名稱內容").text(selectedGame.比賽名稱);
  $("#英文比賽名稱內容").text(selectedGame.英文比賽名稱);
  $("#比賽說明內容").text(selectedGame.比賽說明);
  $("#英文比賽說明內容").text(selectedGame.英文比賽說明);
  $("#比賽地點內容").val(selectedGame.比賽地點);  
  $("#英文比賽地點內容").val(selectedGame.英文比賽地點); 
  $("#比賽日期").val(selectedGame.比賽日期);     //$("#比賽日期").prop('disabled', true);
  var 時間範圍 = selectedGame.時間範圍; 
  var 開始結束 = 時間範圍.split("~");
  $("#開始時間").val(開始結束[0]); //$("#開始時間").prop('disabled', true);
  $("#結束時間").val(開始結束[1]); //$("#結束時間").prop('disabled', true); 
  $("#參賽隊數").val(selectedGame.隊數限制.toString()); 原先隊數=selectedGame.隊數限制; //$("#參賽隊數").prop('disabled', true);
  $("#"+selectedGame.比賽種類).prop("checked", "checked"); //$("#"+selectedGame.比賽種類).prop("disabled", true); 
  var distStr = selectedGame.比賽距離;
  distArr = distStr.split(",");
  
  $("#跑步距離").val("");  $("#飛輪距離").val("");  $("#划船距離").val("");
  for (var i=0; i<3; i++){
    if (distArr[i]!=undefined) {
      var execise = distArr[i].split(":");
      var exeType = execise[0].substr(0,2);
      var exeDist = execise[1].replace(/\D/g,'');
      console.log(exeType, exeDist);
      $("#"+exeType+"距離").val(exeDist); //$("#"+exeType+"距離").prop('disabled', true);
    }
  }
  
  //設定隊伍學院系所
  設定隊伍院系所(selectedGame.隊數限制); //先 reset
  var numGroup = selectedGame.學院系所.length;
  for (var i=0; i<numGroup; i++){
    var 學院系所Arr = selectedGame.學院系所[i].split(',');
    var 學院Arr = 學院系所Arr[0].split(':');
    var 系所Arr = 學院系所Arr[1].split(':');    
    
    console.log(學院Arr[0], 學院Arr[1], 系所Arr[0], 系所Arr[1]);
    
    $("#隊伍學院"+(i+1).toString()).val(學院Arr[1]);
    
    $("#系所Option"+(i+1).toString()).remove();
    所有學院[parseInt(學院Arr[0])].forEach(系所 => {
      $("#隊伍系所"+(i+1).toString()).append('<option id="系所Option'+(i+1).toString()+'" value="'+系所+'">'+系所+'</option>');    
    });  
    $("#隊伍系所"+(i+1).toString()).val(系所Arr[1]);
    
  }
  
  //disable 儲存按鈕
  $("#新增比賽儲存按鈕").prop("disabled", true);
  
  $("#mainPage").hide();
  $("#院所系管理表單Div").hide(); 
  $("#報名名單Div").hide(); 
  $("#比賽結果Div").hide(); 
  $("#新增比賽表格Div").show(); 
  $("#新增比賽表格header").text("比賽資訊"); 
  $("#報名名單").prop("disabled", false);
  $("#比賽結果").prop("disabled", false);  
  比賽資訊click();  //顯示 新增比賽/編輯比賽 資訊頁面，並設定 目前比賽頁面 = 1
  
}

//登出入按鈕 handler
function 登出入按鈕click() {
  console.log("登出入按鈕click", );
  if (已登入== -1) { //未登入，進行登入
    已登入 = 0;
    $("#登出入按鈕").html("取消登入");
    $("#登出入訊息").html("請登入進行管理比賽");  
    ui.start('#loginDiv', configUser);
    $("#loginDiv").show();

  } else if (已登入== 0){
    $("#登出入按鈕").html("登入");
    已登入 = -1;       
    $("#登出入訊息").html("請登入進行管理比賽");          
    $("#loginDiv").hide();
  } else {
    firebase.auth().signOut();
    $("#登出入按鈕").html("登出");
    已登入 = true;       
    $("#登出入訊息").html("已登入，不用時請登出");          
    console.log("已登入");    
  }
}

//dele 系所 handler，未完成
function delete系所(index){
  
  var 系所名 = $("#清華大學系所").text();
  
  var 學院Idx;
  for (var i=0; i< 所有學院.length; i++){
    if (所有學院[i][0]==系所名) {
      console.log(i);
      學院Idx = i;
      break;
    }
  }
  
  console.log("學院", 學院Idx, " 系所", index);
  console.log("delete ", 所有學院[學院Idx][index])
  
  var deleteIt = confirm("確定要刪除 "+所有學院[學院Idx][index]+" 嗎?");
  //TODO: delete 系所
}

function 新增比賽按鈕click(){
  console.log("新增比賽");
  if (已登入!=1) {
    alert("請先登入才可以新增比賽");
    return;
  }
  
  gameSaveType = "New";
  
  $("#mainPage").hide();
  $("#院所系管理表單Div").hide(); 
  $("#報名名單Div").hide(); 
  $("#比賽結果Div").hide(); 
  $("#新增比賽表格Div").show(); 
  $("#新增比賽表格header").text("新增比賽");    
  $("#報名名單").prop("disabled", true);
  $("#比賽結果").prop("disabled", true);
  
  $("#比賽編號內容").text((最後比賽編號+1).toString());
  $("#直播連結內容").val(selectedGame.直播連結);
  $("#比賽名稱內容").text(selectedGame.比賽名稱);
  $("#英文比賽名稱內容").text(selectedGame.英文比賽名稱);
  $("#比賽說明內容").text(selectedGame.比賽說明);
  $("#英文比賽說明內容").text(selectedGame.英文比賽說明);
  $("#比賽地點內容").val(selectedGame.比賽地點);  
  $("#英文比賽地點內容").val(selectedGame.英文比賽地點); 
  $("#比賽日期").val("");    
  $("#開始時間").val(""); 
  $("#結束時間").val(""); 
  $("#參賽隊數").val("10"); 原先隊數=10;
  $("#個人三鐵").prop("checked", "checked");  
  $("#跑步距離").val("");  $("#飛輪距離").val("");  $("#划船距離").val("");
  
  
  //預設新增比賽 參賽隊伍 10 隊
  $("#參賽隊數").val("10");
  設定隊伍院系所(10);
  selectedGame= {隊數限制:10, 學院系所:[]};
  
  $("#新增比賽儲存按鈕").prop("disabled", false);
  
  // TODO: clear 比賽資訊, 報名名單, 比賽結果
  比賽資訊click();  //顯示 新增比賽/編輯比賽 資訊頁面，並設定 目前比賽頁面 = 1
}

function 比賽資訊click(){
  $("#比賽資訊Div").show(); 
  $("#比賽資訊").css("background", "orange");$("#比賽資訊").css("color", "white"); 
  $("#報名名單Div").hide(); 
  $("#報名名單").css("background", "");$("#報名名單").css("color", "black");   
  $("#比賽結果Div").hide();  
  $("#比賽結果").css("background", "");$("#比賽結果").css("color", "black"); 
  目前比賽頁面 = 1;
}

function 報名名單click(){
  $("#比賽資訊Div").hide(); 
  $("#比賽資訊").css("background", "");$("#比賽資訊").css("color", "black");   
  $("#報名名單Div").show(); 
  $("#報名名單").css("background", "orange");$("#報名名單").css("color", "white");   
  $("#比賽結果Div").hide();  
  $("#比賽結果").css("background", "");$("#比賽結果").css("color", "black");   
  目前比賽頁面 = 2;
  
  
  //使用 API6 GetSignUpByGameId
  var postProcess = function (apiName, response) {
    報名名單 = JSON.parse(response.data); 
    console.log(報名名單);
    
    //get the index of the game
    var gameIndex=-1;
    var 比賽名稱 = "";
    for (var i=0; i< games.length; i++){
      if (games[i].比賽編號 == 比賽編號) {
        gameIndex = i;
        比賽名稱 = games[gameIndex].比賽名稱;
        break;
      }
    }
    
    if (gameIndex = -1){
      for (var i=0; i< gamehistory.length; i++){
        if (gamehistory[i].比賽編號 == 比賽編號) {
          gameIndex = i;
          比賽名稱 = gamehistory[gameIndex].比賽名稱
          break;
        }
      }   
    }
    
    $("#報名名單比賽編號內容").text(比賽編號);
    $("#報名名單比賽名稱內容").text(比賽名稱);    
    
    console.log("報名名單", gameIndex);
    var selectedGame報名名單 =[];

    //for (var i=1; i<games[gameIndex].隊數限制+1; i++){
    for (var i=1; i<Object.keys(報名名單.隊伍).length+1; i++){
      var 報名record={};

      報名record["隊伍Id"]= i;    
      報名record["隊伍編號"]= "第 "+i.toString()+" 隊";

      var teamNumStr = "T"+i.toString();
      var 隊伍標頭Str = 報名名單.隊伍[teamNumStr].學院系所;
      var 隊伍標頭Arr = 隊伍標頭Str.split(/[:,]+/);   
      報名record["學院所系"]= (隊伍標頭Str=="")?"無指定":隊伍標頭Arr[1]+" - "+隊伍標頭Arr[3];

      var 隊伍人數 = Object.keys(報名名單.隊伍[teamNumStr].報名者).length;
      //console.log(隊伍人數);
      var 隊伍報名="";
      var 轉換=['一','二','三'];
      for (var j=1; j< 隊伍人數+1; j++){
        var 人員 = "No"+j.toString();
        var 隊伍報名Str = 報名名單.隊伍[teamNumStr].報名者[人員];

        報名record[人員]= 隊伍報名Str.運動 + ":" + ((隊伍報名Str.姓名=="")?"尚未報名":隊伍報名Str.姓名);     
      } 
      selectedGame報名名單.push(報名record);

    }

    //console.log(selectedGame報名名單);

    //如果要做 Grid 動態 height 調整
    //$("#報名名單表格").height(300) 修改高度 146|180|214
    //$("#報名名單表格").data("kendoGrid").dataSource.pageSize(1|2|3)
    //$("#報名名單表格").data("kendoGrid").refresh()
    $("#報名名單表格").data("kendoGrid").dataSource.success(selectedGame報名名單);
  }
  api6GetSignUpByGameId =new GetAPI("GetSignUpByGameId", postProcess);  
  
  console.log(比賽編號);  
  api6GetSignUpByGameId.gameId = 比賽編號;  
  api6GetSignUpByGameId.getAPI(); //get 報名名單  
  
}

function 取消報名(e){
  console.log("取消報名");
  
  if (已登入!=1) {
    alert("請先登入才可以編輯直播連結");
    return;
  }  
  
  var 報名名單表格 = $("#報名名單表格").data("kendoGrid");
  var dataItem = 報名名單表格.dataItem($(e).closest("tr"));
  console.log(dataItem.隊伍Id);
}

function 隊伍轉換(名次){
  if (名次 =="") return ("無資料");
  
  var numberStr = 名次.隊伍.substr(1);
  return "第 "+ 名次.隊伍.substr(1) + " 隊";
}

function 比賽結果click(){
  $("#比賽資訊Div").hide(); 
  $("#比賽資訊").css("background", "");$("#比賽資訊").css("color", "black");  
  $("#報名名單Div").hide(); 
  $("#報名名單").css("background", "");$("#報名名單").css("color", "black");   
  $("#比賽結果Div").show();  
  $("#比賽結果").css("background", "orange");$("#比賽結果").css("color", "white");    
  目前比賽頁面 = 3;
  
  if (報名名單 == undefined){
    報名名單click();
  }
  
  //使用 API7 GetGameResults
  var postProcess = function (apiName, response) {
    比賽結果 = JSON.parse(response.data); 
    console.log(比賽結果);

    //get the index of the game
    var gameIndex=-1;
    var 比賽名稱 = "";
    for (var i=0; i< games.length; i++){
      if (games[i].比賽編號 == 比賽編號) {
        gameIndex = i;
        比賽名稱 = games[gameIndex].比賽名稱;
        break;
      }
    }
    
    if (gameIndex = -1){
      for (var i=0; i< gamehistory.length; i++){
        if (gamehistory[i].比賽編號 == 比賽編號) {
          gameIndex = i;
          比賽名稱 = gamehistory[gameIndex].比賽名稱
          break;
        }
      }   
    }
    
    $("#比賽結果比賽編號內容").text(比賽編號);
    $("#比賽結果比賽名稱內容").text(比賽名稱); 

    console.log("比賽結果", gameIndex);
  
    var 名次成績 =
        "<div id='名次結果'>" +
        "    <b>&nbsp &nbsp 第一名: </b>"+ 隊伍轉換(比賽結果.第一名) + " 成績: " + 比賽結果.第一名.成績 +
        "<br><b>&nbsp &nbsp 第二名: </b>"+ 隊伍轉換(比賽結果.第二名) + " 成績: " + 比賽結果.第二名.成績 +
        "<br><b>&nbsp &nbsp 第三名: </b>"+ 隊伍轉換(比賽結果.第三名) + " 成績: " + 比賽結果.第三名.成績 +
        "</div>";

    $("#名次結果").remove(); 
    $("#比賽結果比賽名次標題").append(名次成績); //用 append 是為了容易改變顯示格式

    var selectedGame比賽結果 =[];

    //for (var i=1; i<games[gameIndex].隊數限制+1; i++){
    for (var i=1; i<Object.keys(報名名單.隊伍).length+1; i++){
      var 比賽結果record={};

      比賽結果record["隊伍Id"]= i;    
      比賽結果record["隊伍編號"]= "第 "+i.toString()+" 隊";

      var teamNumStr = "T"+i.toString();
      var 隊伍標頭Str = 比賽結果.隊伍[teamNumStr].學院系所;
      var 隊伍標頭Arr = 隊伍標頭Str.split(/[:,]+/);   
      //比賽結果record["學院所系"]= 隊伍標頭Arr[1]+" - "+隊伍標頭Arr[3];
      比賽結果record["學院所系"]= (隊伍標頭Str=="")?"無指定":隊伍標頭Arr[1]+" - "+隊伍標頭Arr[3];
      var 隊伍人數 = Object.keys(比賽結果.隊伍[teamNumStr].報名者).length;
      //console.log(隊伍人數);
      var 隊伍報名="";
      for (var j=1; j< 隊伍人數+1; j++){
        var 人員 = "No"+j.toString();
        var 隊伍報名Str = 比賽結果.隊伍[teamNumStr].報名者[人員];

        比賽結果record[人員]= 隊伍報名Str.運動 + ":" + ((隊伍報名Str.姓名=="")?"尚未報名":隊伍報名Str.姓名) + 
                            ", 成績: " + 隊伍報名Str.成績 ;     
      } 
      selectedGame比賽結果.push(比賽結果record);

    }  

    $("#比賽結果表格").data("kendoGrid").dataSource.success(selectedGame比賽結果);  
  }
  
  api7GetGameResults =new GetAPI("GetGameResults", postProcess); 
  
  console.log(比賽編號);  
  api7GetGameResults.gameId = 比賽編號;
  api7GetGameResults.getAPI(); //get 比賽結果  

}

function 院所系管理按鈕click(){
  $("#mainPage").hide();
  $("#新增比賽表格Div").hide();
  $("#院所系管理表單Div").show(); 
}

function 郵件報名按鈕click() {
  console.log("郵件報名按鈕click");
  window.open("https://ugymtriathlon.azurewebsites.net/web/getlink.aspx");
}

function 帳號管理按鈕click() {
  console.log("帳號管理按鈕click");
  if (!in管理帳號) {
    in管理帳號 = true;
    $("#帳號管理按鈕").text("關閉管理帳號");
    $("#createAccountDiv").show();  
  } else {
    in管理帳號 = false;
    $("#帳號管理按鈕").text("管理帳號");
    $("#createAccountDiv").hide();      
  }
  
}

function 增加學院按鈕click(){
  console.log("增加學院按鈕click");
}

function 增加所系按鈕click(){
  console.log("增加所系按鈕click");  
}

function createAccount() {
  console.log("createAccount");
  
  var email    = $("#新增帳號email").val().toLocaleLowerCase();
  var password = $("#新增帳號pwd").val();
  console.log(email, password);
  
  if (validateEmail(email) && validatePassword(password) ) {
    console.log("correct email and password", email, password);
    
    usedForCreateAccount.auth().createUserWithEmailAndPassword(email, password)
    .then (function(result) {
      //alert("新增帳號成功，請先預登入，再收 eamil 進行驗證後，才能登入!"); 
      result.user.sendEmailVerification()
      .then(function(result) {
        validEmails.push(email);
        database.ref('/validEmails').set(JSON.stringify(validEmails));
        alert("新增帳號成功，請收 eamil 進行驗證後，才能登入!");   
      })
      .catch(function(error) {
        var errorCode = error.code;      
        var errorMessage = error.message;
        alert("驗證 Email 發送失敗:", errorMessage);      
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("新增帳號失敗:", errorMessage);
      // ...                                                                  
    });  
  }
  
  in管理帳號 = false;
  $("#帳號管理按鈕").text("管理帳號");
  $("#createAccountDiv").hide();  
}

function deleteAccount() {
  console.log("deleteAccount");
  
  var emailToDelete = $("#刪除帳號email").val().toLocaleLowerCase();
  if (emailToDelete=="superadmin@test.com"){
    alert("不能刪除 Super User");
    return;
  }
  
  var index=-1;
  for (var i =0; i<validEmails.length; i++){
    if (validEmails[i]==emailToDelete) {
      index=i;
      break;
    }
  }
  
  if (index>-1){
    validEmails.splice(index,1);
    if (confirm("確定要刪除 "+emailToDelete)){
      database.ref('/validEmails').set(JSON.stringify(validEmails));
      alert("此帳號已被刪除無效");
    }
  } else {
    alert("查無此帳號: "+emailToDelete);
  }
  
  in管理帳號 = false;
  $("#帳號管理按鈕").text("管理帳號");
  $("#createAccountDiv").hide(); 
  
}

function 設定隊伍院系所(比賽隊數){
  
  //先清除已有的資料
  remove隊伍院系所();
  
  // 根據比賽隊數 appned 報名隊伍
  for (i=1; i< 比賽隊數+1; i++) {
    var num = i.toString();
    var insertHtml = '\
      <p> \
        <div class="隊伍格式" >' +num+ '</div>\
        <select class="新增比賽表格項目內容" style="width:250px" name="隊伍學院' +num+ '" id="隊伍學院' +num+ '" style="margin-left:10px" onchange="更改學院(this)">\
          <!-- 內容 appended by JS code-->\
        </select>\
        <select class="新增比賽表格項目內容" style="width:550px" name="隊伍系所' +num+ '" id="隊伍系所' +num+ '" style="margin-left:10px">\
          <!-- 內容 appended by JS code-->\
        </select>\
      </p>';


    //console.log(insertHtml);
    $("#隊伍院所設定").append(insertHtml);
  }

  //init 學院選單
  //get selectedIndex by $("#學院").prop('selectedIndex'
  for (i=1; i< 比賽隊數+1; i++) {
    所有學院.forEach(學院 => {
      $("#隊伍學院"+i.toString()).append('<option value="'+學院[0]+'">'+學院[0]+'</option>');
    });

    //$("#隊伍學院"+i.toString()).prop("selectedIndex", 3);
    所有學院[0].forEach(系所 => {
      $("#隊伍系所"+i.toString()).append('<option id="系所Option' +i.toString()+ '" value="'+系所+'">'+系所+'</option>');    
    });
  }  
}

function remove隊伍院系所(){
  $(".隊伍格式").remove();
  for (var i=1; i<1000; i++) {
    if ($("#隊伍學院"+i.toString()).val() == undefined) break;
    $("#隊伍學院"+i.toString()).remove();
    $("#隊伍系所"+i.toString()).remove();
  }  
  
}
  
function ExportClick(index) {
  console.log("Export", index);
  
  //TODO: API 用 比賽編號 get 報名名單，先用模擬資料
  //var 報名名單 = Object.assign({}, 報名名單2);
  //var 比賽結果 = Object.assign({}, 比賽結果2);
  
  var exportGame;
  //get the index of the game
  var gameIndex=-1;
  for (var i=0; i< games.length; i++){
    if (games[i].比賽編號 == 比賽編號) {
      gameIndex = i;
      exportGame = game[i];
      break;
    }
  }  
  
  if (gameIndex = -1){
    for (var i=0; i< gamehistory.length; i++){
      if (gamehistory[i].比賽編號 == 比賽編號) {
        gameIndex = i;
        exportGame = gamehistory[i];
        break;
      }
    }   
  }  
  
  var magicHead = String.fromCharCode(65279);
  var filenamePreStr ="";
  if (index==2) {
    filenamePreStr = "報名名單";
    strToSave = magicHead +
      "報名名單:\r\n" +
      "比賽編號:" + exportGame.比賽編號 + "," +
      "比賽名稱:" + exportGame.比賽名稱 + "\r\n" +
      "比賽種類:" + exportGame.比賽種類 + "," +
      "比賽隊數:" + exportGame.隊數限制 + "\r\n";

    //for (var i=1; i<exportGame.隊數限制+1; i++){
    for (var i=1; i<Object.keys(報名名單.隊伍).length+1; i++){
      var teamNumStr = "T"+i.toString();
      console.log(報名名單.隊伍[teamNumStr].學院系所);      
      var 隊伍標頭Str = 報名名單.隊伍[teamNumStr].學院系所;
      var 隊伍標頭Arr = 隊伍標頭Str.split(/[:,]+/);

      var 第幾隊 = "第 "+i.toString()+" 隊";
      var 隊伍學院系所 = 隊伍標頭Arr[1]+" - "+隊伍標頭Arr[3];

      strToSave += (第幾隊 + "," + 隊伍學院系所);  

      var 隊伍人數 = Object.keys(報名名單.隊伍[teamNumStr].報名者).length;
      //console.log(隊伍人數);
      var 隊伍報名="";
      for (var j=1; j< 隊伍人數+1; j++){
        var 隊伍報名Str = 報名名單.隊伍[teamNumStr].報名者["No"+j.toString()];
        //console.log(隊伍報名Str);
        隊伍報名 += (
           "," + 隊伍報名Str.運動 + ":" + 
          ((隊伍報名Str.姓名=="")?"尚未報名":隊伍報名Str.姓名));
      }  

      strToSave += 隊伍報名 + "\r\n";
    }       
          
  }
  
  if (index==3) {
    filenamePreStr = "比賽結果";  
    strToSave = magicHead +
      "比賽結果:\r\n" +
      "比賽編號:" + exportGame.比賽編號 + "," +
      "比賽名稱:" + exportGame.比賽名稱 + "\r\n" +
      "比賽種類:" + exportGame.比賽種類 + "," +
      "比賽隊數:" + exportGame.隊數限制 + "\r\n" +
      "比賽名次:\r\n" +
      "第一名:"+比賽結果.第一名.隊伍+",學院系所:"+比賽結果.第一名.學院系所+",成績:"+比賽結果.第一名.成績+ "\r\n" + 
      "第二名:"+比賽結果.第二名.隊伍+",學院系所:"+比賽結果.第二名.學院系所+",成績:"+比賽結果.第二名.成績+ "\r\n" +
      "第三名:"+比賽結果.第三名.隊伍+",學院系所:"+比賽結果.第三名.學院系所+",成績:"+比賽結果.第三名.成績+ "\r\n";

    
    //for (var i=1; i<exportGame.隊數限制+1; i++){
    for (var i=1; i<Object.keys(比賽結果.隊伍).length+1; i++){
        var teamNumStr = "T"+i.toString();
        var 隊伍標頭Str = 比賽結果.隊伍[teamNumStr].學院系所;
        var 隊伍標頭Arr = 隊伍標頭Str.split(/[:,]+/);

        var 第幾隊 = "第 "+i.toString()+" 隊";
        var 隊伍學院系所 = 隊伍標頭Arr[1]+" - "+隊伍標頭Arr[3];
        
        strToSave += (第幾隊 + "," + 隊伍學院系所);  

        var 隊伍人數 = Object.keys(比賽結果.隊伍[teamNumStr].報名者).length;
        //console.log(隊伍人數);
        var 隊伍報名="";
        for (var j=1; j< 隊伍人數+1; j++){
          var 隊伍報名Str = 比賽結果.隊伍[teamNumStr].報名者["No"+j.toString()];
          //console.log(隊伍報名Str);
          隊伍報名 += (
             "," + 隊伍報名Str.運動 + ":" + 
            ((隊伍報名Str.姓名=="")?"尚未報名":隊伍報名Str.姓名) + "," + 隊伍報名Str.成績);
        }  

        strToSave += 隊伍報名 + "\r\n";
      }        
  }

  var blob = new Blob([strToSave], {type: "text/plain;charset=utf-8"});
  saveAs(blob, filenamePreStr+"_export.csv");
  
}
  
function 確定比賽種類() {
  if ($("#個人三鐵").prop("checked")) return "個人三鐵";
  if ($("#三人三鐵").prop("checked")) return "三人三鐵";
  if ($("#三人綜合").prop("checked")) return "三人綜合";
  if ($("#三人跑步").prop("checked")) return "三人跑步";
  if ($("#三人飛輪").prop("checked")) return "三人飛輪";
  if ($("#三人划船").prop("checked")) return "三人划船";  
  if ($("#個人跑步").prop("checked")) return "個人跑步";
  if ($("#個人飛輪").prop("checked")) return "個人飛輪";
  if ($("#個人划船").prop("checked")) return "個人划船";
}

function 檢查比賽資料完整(){
  console.log("檢查比賽資料完整");
  
  if ($("#比賽名稱內容").val()=="") {
    alert("比賽名稱不得為空白!")
    return false;
  }
  if ($("#比賽日期").val()=="") {
    alert("比賽日期不得為空白!")
    return false;
  }
  if ($("#開始時間").val()=="") {
    alert("開始時間不得為空白!")
    return false;
  }  
  if ($("#結束時間").val()=="") {
    alert("結束時間!")
    return false;
  } 
  if ($("#截止日期").val()=="") {
    alert("截止日期不得為空白!")
    return false;
  }  
  if ($("#截止時間").val()=="") {
    alert("截止時間不得為空白!")
    return false;
  } 
  if ($("#跑步距離").val()=="") {
    //alert("跑步距離不得為空白!")
    $("#跑步距離").val("0");
    //return false;
  }   
  if ($("#飛輪距離").val()=="") {
    //alert("飛輪距離不得為空白!")
    $("#飛輪距離").val("0");
    //return false;
  } 
  if ($("#划船距離").val()=="") {
    //alert("划船距離不得為空白!")
    $("#划船距離").val("0");
    //return false;
  }   

  return true;
}

function saveGame() {
  console.log("saveGame");
  
  //check data integrity
  if (檢查比賽資料完整()==false) return;
  
  if (confirm("請確定要儲存比賽!!!")){    

    var 比賽距離 = 
        "跑步機: "+$("#跑步距離").val()+"公里 ,飛輪車: "+$("#飛輪距離").val()+"公里 ,划船器: "+$("#划船距離").val()+"公尺";
    console.log(比賽距離);
    
    var 學院系所 = [];
    for (var i=1; i< parseInt($("#參賽隊數").val())+1; i++) {
      console.log(i);
      var 隊伍 = $("#隊伍學院"+i.toString()).prop("selectedIndex").toString()+":" +
                $("#隊伍學院"+i.toString()).val()+","                            +
                $("#隊伍系所"+i.toString()).prop("selectedIndex").toString()+":" +
                $("#隊伍系所"+i.toString()).val();      
      
      學院系所.push(隊伍);
    }
    
    var game = {
        "比賽編號" : $("#比賽編號內容").text(),     
        "直播連結" : $("#直播連結內容").val(),
        "比賽日期" : $("#比賽日期").val(), 
        "比賽名稱" : $("#比賽名稱內容").val(), 
        "英文比賽名稱" : $("#英文比賽名稱內容").val(), 
        "比賽說明" : $("#比賽說明內容").val(), 
      
        "英文比賽說明" : $("#英文比賽說明內容").val(),       
        "比賽地點" : $("#比賽地點內容").val(), 
        "英文比賽地點" : $("#英文比賽地點內容").val(), 
        "時間範圍" : $("#開始時間").val()+"~"+$("#結束時間").val(), 
        "截止時間" : $("#截止日期").val()+" "+$("#截止時間").val(), 
        "隊數限制" : $("#參賽隊數").val(), 
        "報名人數" : 0, //若是 edit game, 取現有報名人數 
        "比賽種類" : 確定比賽種類(),  
        "比賽距離" : 比賽距離,   
        "學院系所" : 學院系所
    };
    
    console.log(game);
        
    //API to write to database
    api8CreateOrUpdateGame.gameId = game.比賽編號.toString();
    api8CreateOrUpdateGame.body = game;
    console.log(game);
    api8CreateOrUpdateGame.postAPI();
    
    if (gameSaveType=="New") {
      console.log("Add New Game");
      
      var gameWithDigits = Object.assign({}, game);
      var heading0s="";
      for (var i=0; i < (比賽編號位數 - gameWithDigits.比賽編號.length); i++) {
        heading0s += "0";
      }
      gameWithDigits.比賽編號 = heading0s + gameWithDigits.比賽編號;
      games.push(gameWithDigits);
      
    } else {
      
      //replace the gameRecord
      console.log("Update a Game");
      
      for (var i=0; i< games.length; i++) {
        if (parseInt(games[i].比賽編號) == parseInt(game.比賽編號)) {
          console.log("find gameId", game.比賽編號, i);
          var temp = games[i].比賽編號;
          games[i]=game;
          games[i].比賽編號 = temp;
          break;
        }
      };
    }
    
    $("#現行比賽表格").data("kendoGrid").dataSource.success(games);    
    
    回主畫面();
  }
}

function 隊數修改() {
  console.log("隊數修改");
  var 隊數Str = $("#參賽隊數").val();
  隊數Str = 隊數Str.replace(/\D/g,'');
  $("#參賽隊數").val(隊數Str);
  console.log(隊數Str);
  
  隊數 = parseInt(隊數Str) 
  console.log(隊數);
  
  //先暫定隊數上限是 100 隊，避免 performance 受影響
  if (isNaN(隊數) || 隊數<1 || 隊數>100 ) {
    alert("隊數輸入錯誤，請再檢查。上限隊數 100");
    return;
  }

  //設定隊伍院系所(隊數);
  
  if (confirm("修改隊數，之前設定會清空，請確定!!!")){
    if (隊數 < selectedGame.隊數限制){
      setTimeout(function() { //setTimeout 是為了不要讓 alert 擋住前面 $("#參賽隊數").val(隊數Str);
        設定隊伍院系所(隊數);
        原先隊數 = 隊數;
        if (selectedGame.學院系所.length>0){
          for (var i=0; i<隊數; i++){
            var 學院系所Arr = selectedGame.學院系所[i].split(',');
            var 學院Arr = 學院系所Arr[0].split(':');
            var 系所Arr = 學院系所Arr[1].split(':');    

            console.log(學院Arr[0], 學院Arr[1], 系所Arr[0], 系所Arr[1]);

            $("#隊伍學院"+(i+1).toString()).val(學院Arr[1]);

            $("#系所Option"+(i+1).toString()).remove();
            所有學院[parseInt(學院Arr[0])].forEach(系所 => {
              $("#隊伍系所"+(i+1).toString()).append('<option id="系所Option'+(i+1).toString()+'" value="'+系所+'">'+系所+'</option>');    
            });  
            $("#隊伍系所"+(i+1).toString()).val(系所Arr[1]);
          }    
        }
      }, 10);

    } else {
      設定隊伍院系所(隊數);
      原先隊數 = 隊數;
      try {
        for (var i=0; i<selectedGame.隊數限制; i++){
          var 學院系所Arr = selectedGame.學院系所[i].split(',');
          var 學院Arr = 學院系所Arr[0].split(':');
          var 系所Arr = 學院系所Arr[1].split(':');    

          console.log(學院Arr[0], 學院Arr[1], 系所Arr[0], 系所Arr[1]);

          $("#隊伍學院"+(i+1).toString()).val(學院Arr[1]);

          $("#系所Option"+(i+1).toString()).remove();
          所有學院[parseInt(學院Arr[0])].forEach(系所 => {
            $("#隊伍系所"+(i+1).toString()).append('<option id="系所Option'+(i+1).toString()+'" value="'+系所+'">'+系所+'</option>');    
          });  
          $("#隊伍系所"+(i+1).toString()).val(系所Arr[1]);
        }   
      } catch (e) {
        console.log(e);
      }

    }
  } else $("#參賽隊數").val(原先隊數);
}

function validateEmail(mail) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if(mailformat.test(mail)) {
    return (true);
  }
    alert("Email 格式輸入錯誤!")
    return (false);
}

function validatePassword(password) {
  var passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  if(passwordformat.test(password)) {
    return (true);
  }
    alert("密碼格式必須介於 6 到 20 個字，包含至少一個數字，一個大寫英文字母和一個小寫英文字母。不要使用特殊字元。")
    return (false);
}

