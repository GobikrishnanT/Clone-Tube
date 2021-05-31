
async function SearchByKeyword(keyWord) {
  let response_json = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyWord}&key=AIzaSyCtqqsUGdVXsEmf5ysofm8odyNt5q_gmII`);
  let response_obj = response_json.json();
  return response_obj;
}

//1. question Channel Info :
async function channelInfo(channelId) {
  let response_json = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyCtqqsUGdVXsEmf5ysofm8odyNt5q_gmII`);
  let response_obj = await response_json.json();
  return response_obj;
}
async function bannerFounder(channelId) {
  let response_json = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=AIzaSyCtqqsUGdVXsEmf5ysofm8odyNt5q_gmII`);
  let response_obj = await response_json.json();
  return response_obj;
}
async function playListFounder(channelId) {
  let response_json = await fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails%2Cplayer&channelId=${channelId}&maxResults=25&key=AIzaSyCtqqsUGdVXsEmf5ysofm8odyNt5q_gmII`);
  let response_obj = response_json.json();

  return response_obj;

}

// <><><><><><><><><<><><><><><><><><><>< For Banner Creation <><><><><><><><><><><>
function seperateBanner(url) {
  let bannerImage = document.createElement("img");
  bannerImage.setAttribute("src" , url);
  return bannerImage;
}
// <><><><><><><><><<><><><><><><><><><>< For Banner Creation <><><><><><><><><><><>

// <><><><><><><><><<><><><><><><><><><>< For Description Creation <><><><><><><><><><><>
function descriptionBox(content , subArray) {

  let mainBox = document.createElement("div");
  mainBox.setAttribute("class" , "descriptionBox");


  //Description:
  let descriptionDiv = document.createElement("div");
  descriptionDiv.setAttribute("class" , "descriptionDiv");

  let tittleH4 = document.createElement("h4");
  tittleH4.textContent = "Description";

  let descriptionH4 = document.createElement("h4");
  descriptionH4.textContent = content;

  descriptionDiv.append(tittleH4 , descriptionH4);



  //Subscribersdeatails :
  let subDiv = document.createElement("div");
  subDiv.setAttribute("class" , "subDiv");

  let s_tittleH4 = document.createElement("h4");
  s_tittleH4.textContent = "Stats";

  let s_viewsH4 = document.createElement("h4");
  s_viewsH4.textContent = "Total Views      " + subArray[0];

  let s_subH4 = document.createElement("h4");
  s_subH4.textContent = "Subscribers      " + subArray[1];

  let s_videoH4 = document.createElement("h4");
  s_videoH4.textContent = "Videos     " + subArray[2]

  subDiv.append(s_tittleH4 , s_viewsH4 , s_subH4 , s_videoH4);



  mainBox.append(descriptionDiv , subDiv);
  return mainBox;

}
// <><><><><><><><><<><><><><><><><><><>< For Description Creation <><><><><><><><><><><>

// <><><><><><><><><<><><><><><><><><><>< For name Creation <><><><><><><><><><><>
function nameBoxCreator(url , name) {

  let mainBox2 = document.createElement("div");
  mainBox2.setAttribute("class" , "nameBox");

 
  let ownerImage = document.createElement("img");
  ownerImage.setAttribute("src" , url);
  let ownerName = document.createElement("h3");
  ownerName.textContent = name +  " " + "✅";

  mainBox2.append(ownerImage , ownerName);
  return mainBox2;

}
// <><><><><><><><><<><><><><><><><><><>< For name Creation <><><><><><><><><><><>

// <><><><><><><><><<><><><><><><><><><>< For PlayList <><><><><><><><><><><>
function playListBox(detailArray) {
  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("class" , "playListBox");

  for(let i = 0 ; i < detailArray.length ; i++) {
    let videoDiv = document.createElement("div");
    videoDiv.setAttribute("class" , `playLitsBar playListNo_${i}`);

    videoDiv.innerHTML = detailArray[i][0];

    let titleH4 = document.createElement("h4");
    titleH4.textContent = detailArray[i][1];

    let descriptionH4 = document.createElement("h4");
    descriptionH4.textContent = detailArray[i][2] === "" ? "No Description" : detailArray[i][2];

    videoDiv.append(titleH4 , descriptionH4);
    mainDiv.append(videoDiv);
  }
  return mainDiv;
}
// <><><><><><><><><<><><><><><><><><><>< For PlayList <><><><><><><><><><><>





// <><><><><><><>><><><><><><><><><><><><><><><><><><><><
function uiForChannelInfo(myArray , playListVideos) {
  // console.log("IAm called from uichannel");
  //First we want to clear the preLoaded channel 


  
  
  let bannerDiv = document.createElement("div");
  bannerDiv.setAttribute("class" , "bannerDiv");
  // 1 . first bannerImage :
  bannerDiv.append(seperateBanner(myArray[0]));
  // 2 . name :
  let row2 = nameBoxCreator(myArray[myArray.length - 1] , myArray[2]);

  let row3 = descriptionBox(myArray[3] , myArray[4]);

  //here we call a function to create a list of video
  //of the channel :
  //fo that we want to supply the channel id :
  let row4 = playListBox(playListVideos);



  videoSectionDiv.append(bannerDiv ,row2, row3 , row4);
  
  
}








//WE WANT TO EXCUTE THIS PROCESS : 
//FOR THE WE WANT TO LISTEN THE SERACH BUTON :
//1 . fro ques1:
let videoSectionDiv = document.querySelector(".videoSection");
let channelInfoArray = [];
let mainForm = document.querySelector("form");
mainForm.addEventListener(('submit') , (event) => {
  channelInfoArray = [];
  event.preventDefault();
  let userKeyword = document.querySelector("#serchVideo_id").value;
  document.querySelector("#serchVideo_id").value = "";
  SearchByKeyword(userKeyword)
  .then((response => {
    //console.log(response);
    let channelId = response["items"][0]["id"]["channelId"];
    channelInfoArray.push(channelId);
    //By using this response we are getting the channel Info :
    return channelInfo(channelId);
  }))
  .then((response) => {
    //console.log("Channel Information :::");
    //console.log(response);
    //Snipet -> info:
    let title = response["items"][0]["snippet"]["localized"]["title"];
    let description = response["items"][0]["snippet"]["localized"]["description"];
    let subsDetail = [];
    let viewsCount = response["items"][0]["statistics"]["viewCount"];
    let subCount = response["items"][0]["statistics"]["subscriberCount"];
    let videoCount = response["items"][0]["statistics"]["videoCount"];
    
    let ownwerImage = response["items"][0]["snippet"]["thumbnails"]["high"]["url"];

    subsDetail.push(viewsCount , subCount , videoCount );
    channelInfoArray.push(title , description , subsDetail , ownwerImage);


    

    let channelId2 = response["items"][0]["id"];
    return bannerFounder(channelId2);
    //here we want also the channel banner :
  })
  .then((response) => {
    
    //console.log("banner Image ::::");
    //console.log(response);
    let bannerImage = response["items"][0]["brandingSettings"]["image"]["bannerExternalUrl"];
    channelInfoArray.unshift(bannerImage);
    videoSectionDiv.innerHTML = "";
    
    console.log(channelInfoArray);

    return playListFounder(channelInfoArray[1]);
  })
  .then((response) => {
    //Try to use Object destructing :
    let itemArray = [];
    itemArray = response["items"];
    console.log(itemArray)
    let videoDetailArr = [];
    // [item[i]["player"]["embedHtml"] ,item[i]["snippet"]["localized"]["title"] , item[i]["snippet"]["localized"]["title"]["description"]]
    for(let i = 0 ; i < itemArray.length ; i++) {
      videoDetailArr.push([itemArray[i]["player"]["embedHtml"] , itemArray[i]["snippet"]["title"] , itemArray[i]["snippet"]["description"]]);
    }
    
    uiForChannelInfo(channelInfoArray , videoDetailArr);
  })
  .catch((error) => {
    console.log(error);
  })
});














