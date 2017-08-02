"use strict";
const strDatabase = "https://firebasestorage.googleapis.com/v0/b/weeb-applications.appspot.com/o/load_config.json?alt=media&token=e1566b7a-cd9b-49ab-8147-aae7f6cd8173";
const strInitBackground = 'http://designwoop.com/uploads/2012/03/01_free_subtle_textures_apple_ios_linen_texture.jpg';
const strInitNavBColor = "#191414";
const strInitGrey = "rgb(120,120,120)";
const strPlayButton = "./media/playBtn.png";
const strPauseButton = "./media/pauseBtn.png";
const strPauseBtnAnime = "./media/pBtn2.png";
const strErrorImg = "./media/error-img.jpg";
const strLightBG = './media/b14.jpg';
const strNavBImg = './media/navbar.jpg';
const strAnimeBG = './media/b16.jpg';
const strImgLoadingAddress = './media/Spinner.gif';
const strErrorSongName = 'Loading Error';
const strJsonParseErrorMessage = "JSON Parse Error\n\nContact web admin for instruction.";
const strTimeOutErrorMessage = "Timeout:\n\nCheck your network.";
const strPageNotFoundErrorMessage = "404 Not Found:\n\nThe requested page could not be found on the server."
const strServerDownErrorMessage = "Error 500: \n\nServer is down. Please try again later.";
const strNetworkTimeOutErrorMessage = "Error 408: \n\nTimeout.";
const strLoadingMessage = "Loading... ";
const strSuccessMessage = "Success";
const iNumOfCells = 12;

function hideSplashScreen() {
   $("#splash").fadeOut(5000);
}
$(document).ready(function() {
  var metaData =[];
  
  //Set Loading Imagesj
  var objTemplate = document.querySelector('#myTemplt');
  setLoadingTemplate(objTemplate, strImgLoadingAddress);
  
  //fectch the json file from firebase server
  $.getJSON(strDatabase, function(responseText){
    $.each(responseText, function(key, val){
      $.each(val, function(i, result){
          metaData.push(result); // array that has array of images and sounds at each index
      });
    });
  })
  .done(function() {
    console.log(strSuccessMessage);
    hideSplashScreen();
    renderSoundBoard(0, metaData);//render the soundbaord when page loads
    setBackground(); 
  })
  .fail(function(jqXHR, textStatus, errorThrown) { 
    hideSplashScreen();
    if(textStatus === "parsererror"){
        alert(strJsonParseErrorMessage);
    }
    else if(textStatus === "timeout"){
        alert(strTimeOutErrorMessage);
    }
    else if(jqXHR.status == 404){
        alert(strPageNotFoundErrorMessage);
    }
    else if(jqXHR.status == 500){
        alert(strServerDownErrorMessage);
    }
    else if(jqXHR.status == 408){
        alert(strNetworkTimeOutErrorMessage);
    }
    errorHandler();
  });

  function errorHandler(){
    var template = document.querySelector('#myTemplt');
    setErrorTemplate(objTemplate);
  }

  /* click event on SoundBoard list1*/
  $('#list1').click(function() {
		$('#template_container #col').remove();
		renderSoundBoard(0, metaData);
	});

  /* click event on SoundBoard list2*/
	$('#list2').click(function() {
		$('#template_container #col').remove();
		renderSoundBoard(1, metaData);
	});
});

/* click event on audio play of each sound */
$('main').on('click','#btn',function() {
  var sound = $(this).siblings('audio')[0];
  if (sound.paused) {
    sound.play();
    $(this).attr('src',strPauseButton);
    $(this).fadeTo( 0 , 0.5, function() {});
  } else {
    sound.pause();
    $(this).attr('src',strPlayButton);
    $(this).fadeTo( 0 , 1, function() {});
  }
  sound.onended = function () {
    $(this).siblings('.pBtn').attr('src',strPlayButton);
    $(this).fadeTo( 0 , 1, function(){});
  }
});

/* animations of button change on mouse enter */
$('main').on('mouseenter','#btn',function() {
  if($(this).attr("src") === strPlayButton){
    $(this).attr("src", strPauseBtnAnime);
  } else if($(this).attr("src") === strPauseButton)
    $(this).css({"opacity": "0.8"});
  });

/* animations of button change on mouse leave */
$('main').on('mouseleave','#btn',function(){
  if($(this).attr("src") === strPauseBtnAnime){
    $(this).attr('src',strPlayButton);
  } else if($(this).attr("src") === strPauseButton){
    $(this).css({"opacity": "0.5"});
  }
});

/* render function for 3*4 grids of sounds */
function renderSoundBoard(list, metaData){
    if(typeof list == 'number'){
      $('#template_container #col').remove();
      var img = metaData[0][list];
      var sound = metaData[1][list];
      var name = metaData[2][list];
      for(var i = 0; i < iNumOfCells; i++){
          setTemplate(img[i], sound[i], strPlayButton, name[i], false);
      }
    }
}

function setLoadingTemplate(objTemplate, strImgLoadingGif){
  if(typeof objTemplate === 'object' && typeof strImgLoadingGif === 'string'){
    $('#template_container #col').remove();
    for(var i = 0; i < iNumOfCells; i++){
        setTemplate(strImgLoadingGif, "", "", strLoadingMessage, true);
    }
    setBackground();
  }
}

/* render function of error images for 3*4 grids of sounds */
function setErrorTemplate(objTemplate){
  if(typeof objTemplate === 'object'){
    $('#template_container #col').remove();
    for(var i = 0; i < iNumOfCells; i++){
        setTemplate(strErrorImg, "", "", strErrorSongName, true);
    }
    setBackground();
  }
}

/* helper function for render the template of each cell */
function setTemplate(strToImg, strToSound, strToBtn, strToName, bIsError){
  var myTemplate = $('#myTemplt').html().trim();
  var myTemplateClone = $(myTemplate);
  myTemplateClone.find('.soImg').attr('src',strToImg);
  myTemplateClone.find('audio').attr('src', strToSound);
  if(bIsError === true){
    myTemplateClone.find('#btn').css({"visibility" : "hidden"});
  } else {
    myTemplateClone.find('#btn').attr('src',strToBtn);
  }
  myTemplateClone.find('#songName').html(strToName);
  myTemplateClone.clone().appendTo('main');
}

/* set up the initial background of SoundBoard */
function setBackground(){
  $("#navB").css({"background-color": strInitNavBColor});
  $("body").css({"background-image": "url(" + strInitBackground + ")"});
}

/*
* This function handles theme change and view change between compact and regular
*/
$(function() {
  var checkedValue; //keep track of current mode of view
  var preColor; //keep track of previews color of nav bar
  $(".dropdown-content #light").click(function(){ //click event on theme change to light
    changeTheme("", strLightBG, "light.css");
    preColor = strInitGrey;
    checkedValue = true;
  });
  $(".dropdown-content #anime").click(function(){ //click event on theme change to hello kitty
    preColor = "url(" + strNavBImg + ")";
    changeTheme(strNavBImg, strAnimeBG, "anime.css");
    $("#navB").css({"background-size": "contain"});
    $("body").css({"background-size": "100%"});
    $("body").css({"background-attchment": "fixed"});
    checkedValue = true;
  });
  $(".dropdown-content #dark").click(function(){ //click event on theme change to dark
    changeTheme("", strInitBackground, "vanilla.css");
    $("#navB").css({"background-color":strInitNavBColor});
    preColor = $("#navB").attr('background-color');
    checkedValue = true;
  });
  $("#compact").click(function(){ ////click event on view change between compact and regular view
    oldColor = preColor;
    if(checkedValue === undefined){
      checkedValue = true; //first call
    }
    if(checkedValue === true){ //if changes to compact view
      oldBG = $("body").css('background-image');
      oldCSS = $("link").attr("href");
      changeView(oldColor, "compact.css", "Regular View");
      $("body").css({"background-size": "cover"});
      checkedValue = false;
    } else if (checkedValue == false) { //if changes to regular view
      changeView(oldColor, oldCSS, "Compact View");
      $("body").css({"background-size": "auto"});
      $("body").css({"background-image": OldBG});
      checkedValue = true;
    }
  });
});

/* helper function for theme change */
function changeTheme(strNavImg, strBdImg, strCssLink){
  if(typeof strNavImg === 'string' && typeof strBdImg === 'string' && typeof strCssLink == 'string'){
    if(strNavImg === ""){
      $("#navB").css({"background-image":strNavImg});
    } else {
      $("#navB").css({"background-image": "url(" + strNavImg + ")"});
    }
    $("body").css({"background-image":"url("+ strBdImg + ")"});
    $("link").attr("href", strCssLink);
    $("#compact").html("Compact View");
  }
}
/* helper function for view change */
function changeView(strOldColor, strCssLink, strView){
  if (typeof strOldColor === 'string' && typeof strCssLink === 'string' && typeof strView == 'string'){
    $("#navB").css({"background-color": strOldColor});
    $("link").attr("href", strCssLink);
    $("#compact").html(strView);
  }
}
