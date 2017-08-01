$(document).ready(function() {
  var metaData =[];
  var success = false;
    $.getJSON('https://firebasestorage.googleapis.com/v0/b/weeb-applications.appspot.com/o/load_config.json?alt=media&token=e1566b7a-cd9b-49ab-8147-aae7f6cd8173', function(responseText){
      $.each(responseText, function(key, val){
        $.each(val, function(i, result){
            metaData.push(result);
        });
      });
      success = true;
      hideSplashScreen();
      renderSoundBoard(0, metaData);
      setBackground();
    }).done(function() {
      success = true;
    console.log( "Success" );
  })
  setTimeout(function() {
  if (!success)
  {
      alert("exceeding loading time!");
      hideSplashScreen();
      var template = document.querySelector('#myTemplt');
      for(var i = 0; i < 12; i++){
        setErrorTemplate(template);
      }
    }
  }, 2500);
  $('#list1').click(function() {
		$('#template_container #col').remove();
		renderSoundBoard(0, metaData);
	});

	$('#list2').click(function() {
		$('#template_container #col').remove();
		renderSoundBoard(1, metaData);
	});
});

	$('main').on('click','#btn',function() {
		var sound = $(this).siblings('audio')[0];
		if (sound.paused) {
			sound.play();
			$(this).attr('src',"./media/pauseBtn.png");
			$(this).fadeTo( 0 , 0.5, function() {});
		} else {
			sound.pause();
			$(this).attr('src',"./media/playBtn.png");
			$(this).fadeTo( 0 , 1, function() {});
		}
		sound.onended = function () {
			$(this).siblings('.pBtn').attr('src',"./media/playBtn.png");
			$(this).fadeTo( 0 , 1, function(){});
		}
	});
	$('main').on('mouseenter','#btn',function() {
    if($(this).attr("src") === "./media/playBtn.png"){
      $(this).attr("src", "./media/pBtn2.png");
    } else if($(this).attr("src") === "./media/pauseBtn.png")
      $(this).css({"opacity": "0.8"});
    });

    $('main').on('mouseleave','#btn',function(){
      console.log($(this).attr('src'));
      if($(this).attr("src") === "./media/pBtn2.png"){
        $(this).attr('src',"./media/playBtn.png");
      } else if($(this).attr("src") === "./media/pauseBtn.png"){
        $(this).css({"opacity": "0.5"});
      }
    });
  	function renderSoundBoard(list, metaData){
		    var img = metaData[0][list];
		    var sound = metaData[1][list];
		    var name = metaData[2][list];

		    for(var i = 0; i < 12; i++){
			     var myTemplate = $('#myTemplt').html().trim();
			     var myTemplateClone = $(myTemplate);
			     myTemplateClone.find('.soImg').attr('src',img[i]);
			     myTemplateClone.find('audio').attr('src', sound[i]);
			     myTemplateClone.find('#btn').attr('src',"./media/playBtn.png");
			     myTemplateClone.find('#songName').html(name[i]);
			     myTemplateClone.clone().appendTo('main');
		   }
	}

	function setErrorTemplate(template){
		$('#template_container #col').remove();
		for(var i = 0; i < 12; i++){
				var myTemplate = $('#myTemplt').html().trim();
				var myTemplateClone = $(myTemplate);
				myTemplateClone.find('.soImg').attr('src',"./media/error-img.jpg");
				myTemplateClone.find('audio').attr('src', "");
				myTemplateClone.find('#btn').css({"visibility" : "hidden"});
				myTemplateClone.find('#songName').html(name[i]);
				myTemplateClone.clone().appendTo('main');
		}
    setBackground();
	}
  function setBackground(){
    $("#navB").css({"background-color": "#191414"});
    $("body").css({"background-image": "url('http://designwoop.com/uploads/2012/03/01_free_subtle_textures_apple_ios_linen_texture.jpg')"});
  }
  $(function() {
    var checkedValue;
    var preColor;
    $(".dropdown-content #light").click(function(){
      $("#navB").css({"background-image":""});
      $("body").css({"background-image":"url('./media/b14.jpg')"});
      $("link").attr("href", "light.css");
      $("#compact").html("Compact View");
      checkedValue = true;
      preColor = "rgb(120,120,120)";
    });
    $(".dropdown-content #anime").click(function(){
      $("#navB").css({"background-image":"url('./media/navbar.jpg')"});
      $("#navB").css({"background-size": "contain"});
      $("body").css({"background-image":"url('./media/b16.jpg')"});
      $("body").css({"background-size": "100%"});
      $("body").css({"background-attchment": "fixed"});
      $("link").attr("href", "anime.css");
      $("#compact").html("Compact View");
        checkedValue = true;
        preColor = "url('./media/navbar.jpg')";
        animeMode = true;
    });
    $(".dropdown-content #dark").click(function(){
      alert("here");
      $("#navB").css({"background-image":""});
      $("#navB").css({"background-color":"#191414"});
      $("body").css({"background-image":"url('http://designwoop.com/uploads/2012/03/01_free_subtle_textures_apple_ios_linen_texture.jpg')"});
      $("link").attr("href", "vanilla.css");
      preColor = $("#navB").attr('background-color');
      $("#compact").html("Compact View");
      console.log($("#compact").html());
      checkedValue = true;
    });
    $("#compact").click(function(){
      if(checkedValue === undefined){
        checkedValue = true; //first call
      }
      if(checkedValue === true){
        oldColor = preColor;
        oldBG = $("body").css('background-image');
        oldCSS = $("link").attr("href");
        $("#navB").css({"background-color": oldColor});
        $("link").attr("href", "compact.css");
        $("body").css({"background-size": "cover"});
        $("#compact").html("Regular View");
        checkedValue = false;
      } else if (checkedValue == false) {
        $("body").css({"background-size": "auto"});
        $("link").attr("href", oldCSS);
        checkedValue = true;
        $("#navB").css({"background-color":  oldColor});
        $("body").css({"background-image": oldBG});
        $("#compact").html("Compact View");
      }
    });
  });
