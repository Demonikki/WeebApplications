const database = "https://firebasestorage.googleapis.com/v0/b/weeb-applications.appspot.com/o/load_config.json?alt=media&token=e1566b7a-cd9b-49ab-8147-aae7f6cd8173";
const initBackground = './media/darkbg.jpg';
const initNavBColor = "#191414";
const initGrey = "rgb(120,120,120)";
const playButton = "./media/playBtn.png";
const pauseButton = "./media/pauseBtn.png";
const pauseBtnAnime = "./media/pBtn2.png";
const errorImg = "./media/error-img.jpg";
const lightBG = './media/b14.jpg';
const navBImg = './media/navbar.jpg';
const animeBG = './media/b16.jpg';
const kImgLoading = './media/Spinner.gif';
const kErrorSongName = 'Loading Error';
const numOfCells = 12;

function hideSplashScreen() {
   $("#splash").fadeOut(4000);
}
$(document).ready(function() {
  var metaData =[];
  var success = false;

  var template = document.querySelector('#myTemplt');
  setLoadingTemplate(template, kImgLoading);

  //fectch the json file from firebase server
  $.getJSON(database, function(responseText){
    $.each(responseText, function(key, val){
      $.each(val, function(i, result){
          metaData.push(result); // array that has array of images and sounds at each index
      });
    });
    success = true;
    hideSplashScreen();
  })
  .done(function() {
    console.log( "Success" );
    renderSoundBoard(0, metaData);//render the soundbaord when page loads
    setBackground();
    success = true;
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    if(jqXHR.status == 404){
        alert("404 Not Found:\n\nThe requested page could not be found on the server.");
        success = true;
    }
    if(jqXHR.status == 500){
        alert("Error 500: \n\nServer is down. Please try again later.");
        success = true;
    }
  });

  /*
  * This function promotes the error message and displays
  * error images when the fetch of json file from server is not successful
  * within 2.5 seconds.
  */
  setTimeout(function() {
  if (!success)
  {
      alert("exceeding loading time!");
      hideSplashScreen();
      var template = document.querySelector('#myTemplt');
      for(var i = 0; i < numOfCells; i++){
        setErrorTemplate(template);
      }
    }
  }, 2500);

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
    $(this).attr('src',pauseButton);
    $(this).fadeTo( 0 , 0.5, function() {});
  } else {
    sound.pause();
    $(this).attr('src',playButton);
    $(this).fadeTo( 0 , 1, function() {});
  }
  sound.onended = function () {
    $(this).siblings('.pBtn').attr('src',playButton);
    $(this).fadeTo( 0 , 1, function(){});
  }
});

/* animations of button change on mouse enter */
$('main').on('mouseenter','#btn',function() {
  if($(this).attr("src") === playButton){
    $(this).attr("src", pauseBtnAnime);
  } else if($(this).attr("src") === pauseButton)
    $(this).css({"opacity": "0.8"});
  });

/* animations of button change on mouse leave */
$('main').on('mouseleave','#btn',function(){
  console.log($(this).attr('src'));
  if($(this).attr("src") === pauseBtnAnime){
    $(this).attr('src',playButton);
  } else if($(this).attr("src") === pauseButton){
    $(this).css({"opacity": "0.5"});
  }
});

/* render function for 3*4 grids of sounds */
function renderSoundBoard(list, metaData){
    $('#template_container #col').remove();
    var img = metaData[0][list];
    var sound = metaData[1][list];
    var name = metaData[2][list];
    for(var i = 0; i < numOfCells; i++){
        setTemplate(img[i], sound[i], playButton, name[i], false);
    }
}

function setLoadingTemplate(template, imgLoadingGif){
  $('#template_container #col').remove();
  for(var i = 0; i < numOfCells; i++){
      setTemplate(imgLoadingGif, "", "", "Loading... ", true);
  }
  setBackground();
}

/* render function of error images for 3*4 grids of sounds */
function setErrorTemplate(template){
  $('#template_container #col').remove();
  for(var i = 0; i < numOfCells; i++){
      setTemplate(errorImg, "", "", kErrorSongName, true);
  }
  setBackground();
}

/* helper function for render the template of each cell */
function setTemplate(toImg, toSound, toBtn, toName, isError){
  var myTemplate = $('#myTemplt').html().trim();
  var myTemplateClone = $(myTemplate);
  myTemplateClone.find('.soImg').attr('src',toImg);
  myTemplateClone.find('audio').attr('src', toSound);
  if(isError === true){
    myTemplateClone.find('#btn').css({"visibility" : "hidden"});
  } else {
    myTemplateClone.find('#btn').attr('src',toBtn);
  }
  myTemplateClone.find('#songName').html(toName);
  myTemplateClone.clone().appendTo('main');
}

/* set up the initial background of SoundBoard */
function setBackground(){
  $("#navB").css({"background-color": initNavBColor});
  $("body").css({"background-image": "url(" + initBackground + ")"});
}

/*
* This function handles theme change and view change between compact and regular
*/
$(function() {
  var checkedValue; //keep track of current mode of view
  var preColor; //keep track of previews color of nav bar
  $(".dropdown-content #light").click(function(){ //click event on theme change to light
    changeTheme("", lightBG, "light.css");
    preColor = initGrey;
    checkedValue = true;
  });
  $(".dropdown-content #anime").click(function(){ //click event on theme change to hello kitty
    preColor = "url(" + navBImg + ")";
    changeTheme(navBImg, animeBG, "anime.css");
    $("#navB").css({"background-size": "contain"});
    $("body").css({"background-size": "100%"});
    $("body").css({"background-attchment": "fixed"});
    checkedValue = true;
  });
  $(".dropdown-content #dark").click(function(){ //click event on theme change to dark
    changeTheme("", initBackground, "vanilla.css");
    $("#navB").css({"background-color":initNavBColor});
    preColor = $("#navB").attr('background-color');
    checkedValue = true;
  });
  $("#compact").click(function(){ ////click event on view change between compact and regular view
    if(checkedValue === undefined){
      checkedValue = true; //first call
    }
    if(checkedValue === true){ //if changes to compact view
      oldColor = preColor;
      oldBG = $("body").css('background-image');
      oldCSS = $("link").attr("href");
      changeView(oldColor, "compact.css", "Regular View");
      $("body").css({"background-size": "cover"});
      checkedValue = false;
    } else if (checkedValue == false) { //if changes to regular view
      changeView(oldColor, oldCSS, "Compact View");
      $("body").css({"background-size": "auto"});
      $("body").css({"background-image": oldBG});
      checkedValue = true;
    }
  });
});
/* helper function for theme change */
function changeTheme(navImg, bdImg, cssLink){
  if(navImg === ""){
    $("#navB").css({"background-image":navImg});
  } else {
    $("#navB").css({"background-image": "url(" + navImg + ")"});
  }
  $("body").css({"background-image":"url("+ bdImg + ")"});
  $("link").attr("href", cssLink);
  $("#compact").html("Compact View");
}
/* helper function for view change */
function changeView(oldColor, cssLink, view){
  $("#navB").css({"background-color": oldColor});
  $("link").attr("href", cssLink);
  $("#compact").html(view);
}
