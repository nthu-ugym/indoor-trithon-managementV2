//使用 class 來定義 API

var endPointUrl = "https://ugymtriathlon.azurewebsites.net/api/";
class API {  
  constructor(apiName, fn){
    this.apiName    = apiName;
    this.url        = endPointUrl;
    this.parameters = "";
    this.fn = fn;
    this.gameId = 0;
    this.body = {};
  }    
}

class GetAPI extends API {
  async getAPI(){
    console.log("get:", this.apiName, this.parameters);
    $.loading.start('Loading...');
    var apiUrl = this.url+this.apiName+"?Code="+getMagic();
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
//  games = JSON.parse(response.data);
  games = response.data;

  //調整比賽編號為 4 位數
  for (var i=0; i< games.length; i++){ 
    var heading0s ="";
    for (var j=0; j < (比賽編號位數 - games[i].比賽編號.toString().length); j++){
      heading0s+="0";
    }
    games[i].比賽編號 = heading0s+games[i].比賽編號.toString();
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
  $("#過往比賽表格").data("kendoGrid").dataSource.success(gamehistory); 
  
  // find 最後比賽編號 in 過往比賽
  for (var i=0; i< gamehistory.length; i++){    
    if ( parseInt(gamehistory[i].比賽編號) > 最後比賽編號) 最後比賽編號 = parseInt(gamehistory[i].比賽編號);
  }  
}
api4GetAllClosedGames =new GetAPI("GetAllClosedGames", api4PostProcess);

//API8: 寫入/更新單一現行比賽資訊，使用必須設定 body for post
api8PostProcess = function (apiName, response) {
  if (gameSaveType=="New") 最後比賽編號++;
}
api8CreateOrUpdateGame =new PostAPI("CreateOrUpdateGame", api8PostProcess);


