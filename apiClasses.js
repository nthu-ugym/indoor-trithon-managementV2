//使用 class 來定義 API

var endPointUrl = "https://ugymtriathlon.azurewebsites.net/api/";
class API {  
  constructor(apiName, fn){
    this.apiName    = apiName;
    this.url        = endPointUrl;
    this.parameters = "";
    this.fn = fn;
    this.gameId = 0;
    this.比賽編號="";
    this.body = {};
  }    
}

class GetAPI extends API {
  async getAPI(){
    console.log("get:", this.apiName, this.parameters);
    $.loading.start('Loading...');
    var apiUrl = this.url+this.apiName+"?Code="+getMagic()+"&gameId="+this.gameId.toString();
    var fn = this.fn;
    var apiName=this.apiName;
    await axios.get(apiUrl)
    .then(function (response) {
      // handle success
      if (fn!=null) fn(apiName, response);    
      $.loading.end();  
      console.log("API: "+apiName+" is done");      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });   
  }
}

class PostAPI extends API {
  async postAPI(){
    console.log("post:", this.apiName, this.gameId, this.body);
    //$.loading.start('Loading...');
    var apiUrl = this.url+this.apiName+"?Code="+getMagic()+"&GameId="+this.gameId;
    var fn = this.fn;
    var apiName=this.apiName;

    console.log(apiUrl);
    await axios.post(apiUrl, this.body)
    .then(function (response) {
      // handle success
      if (fn!=null) fn(apiName, response);    
      $.loading.end();  
      console.log("API: "+apiName+" is done");  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      alert("寫入資料庫錯誤!");
      window.scrollTo(0,0);
      location.reload();
    })
    .then(function () {
      // always executed
    });    
  }
}

//API2: 讀取系所管理資料
api2PostProcess = function (apiName, response) {
  var 學院 = JSON.parse(response.data);
  var 學院keys = Object.keys(學院);

  學院keys.forEach(key=>{ 所有學院.push(學院[key])})

  所有學院.forEach(學院 => {
    if (學院[0] != "無") $("#學院List").append('<div class="學院List內容" onclick="學院Selected(this)">'+學院[0]+'</div>');
  });

  $("#所系List").append('<div id="系所List" class="系所List內容">'+所有學院[1][0]+'</div>');
  for (var i=1; i< 所有學院[1].length; i++) {
    $("#所系List").append('<div id="系所List" class="系所List內容">'+所有學院[1][i]+' <a style="font-size:5px; color:red; cursor:pointer" onclick="delete系所('+i.toString()+')"> delete </a></div>');
  }    
}
api2GetAllSchoolUnits =new GetAPI("GetAllSchoolUnits", api2PostProcess);

//API3: 讀取所有現行比賽資訊
api3PostProcess = function (apiName, response) {
  games = JSON.parse(response.data);

  //調整比賽編號為 4 位數
  for (var i=0; i< games.length; i++){ 
    var heading0s ="";
    for (var j=0; j < (比賽編號位數 - games[i].比賽編號.toString().length); j++){
      heading0s+="0";
    }
    games[i].比賽編號 = heading0s+games[i].比賽編號.toString();
    
    //for Test
    if (games[i].英文比賽名稱 == "")        games[i].英文比賽名稱 = "Empty";
    if (games[i].英文比賽名稱 == undefined) games[i].英文比賽名稱 = "API not working";
    if (games[i].英文比賽說明 == "")        games[i].英文比賽說明 = "Empty";
    if (games[i].英文比賽說明 == undefined) games[i].英文比賽說明 = "API not working";

    if (games[i].比賽地點 == "")        games[i].比賽地點 = "Empty";
    if (games[i].比賽地點 == undefined) games[i].比賽地點 = "API not working";      
    if (games[i].英文比賽地點 == "")        games[i].英文比賽地點 = "Empty";
    if (games[i].英文比賽地點 == undefined) games[i].英文比賽地點 = "API not working";      
  }    

  //最後比賽編號 = 0;     
  //find 最後比賽編號 in 現行比賽
  for (var i=0; i< games.length; i++){    
    if ( parseInt(games[i].比賽編號) > 最後比賽編號) 最後比賽編號 = parseInt(games[i].比賽編號);
  }

  $("#現行比賽表格").data("kendoGrid").dataSource.success(games);
}
api3GetAllActiveGameStatus =new GetAPI("GetAllActiveGameStatus", api3PostProcess);

//API4: 讀取過往現行比賽資訊
api4PostProcess = function (apiName, response) {
  gamehistory = JSON.parse(response.data);   
  
  //調整比賽編號為 4 位數
  for (var i=0; i< gamehistory.length; i++){ 
    var heading0s ="";
    for (var j=0; j < (比賽編號位數 - gamehistory[i].比賽編號.toString().length); j++){
      heading0s+="0";
    }
    gamehistory[i].比賽編號 = heading0s+gamehistory[i].比賽編號.toString();
       
  } 
  
  // find 最後比賽編號 in 過往比賽
  for (var i=0; i< gamehistory.length; i++){    
    if ( parseInt(gamehistory[i].比賽編號) > 最後比賽編號) 最後比賽編號 = parseInt(gamehistory[i].比賽編號);
  }  
  
  $("#過往比賽表格").data("kendoGrid").dataSource.success(gamehistory); 
  
}
api4GetAllClosedGames =new GetAPI("GetAllClosedGames", api4PostProcess);

//API6: 讀取單一比賽報名資料
api6PostProcess = function (apiName, response) {
  報名名單 = JSON.parse(response.data);   
  console.log(報名名單);
}
api6GetSignUpByGameId =new GetAPI("GetSignUpByGameId", api6PostProcess);

//API7: 讀取單一比賽結果
api7PostProcess = function (apiName, response) {
  比賽結果 = JSON.parse(response.data);   
  console.log(比賽結果);
}
api7GetGameResults =new GetAPI("GetGameResults", api7PostProcess);

//API8: 寫入/更新單一現行比賽資訊，使用必須設定 body for post
api8PostProcess = function (apiName, response) {
  if (gameSaveType=="New") 最後比賽編號++;
}
api8CreateOrUpdateGame =new PostAPI("CreateOrUpdateGame", api8PostProcess);

//API14: 刪除比賽
api14PostProcess = function (apiName, response) { 
  console.log(response.data);  
  if (response.data =="Ok") {
    console.log("OK1 ", api14RemoveGame.比賽編號);
    for (var i=0; i< gamehistory.length; i++){
      if (gamehistory[i].比賽編號 == api14RemoveGame.比賽編號) {
        gamehistory.splice(i,1);
        $("#過往比賽表格").data("kendoGrid").dataSource.success(gamehistory);
        break;
      }
    }   
  } else {
    alert("比賽刪除失敗");
  }
}
api14RemoveGame =new GetAPI("RemoveGame", api14PostProcess);
