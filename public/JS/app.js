$(document).ready(function(){
    var score = 0;
    var framecount = 0;
    var quit = false;
    var x = document.getElementById("start-pop-up");
    var y = document.getElementById("img_container");
    var range;
    function hideWindow(){
        x.style.display = "none";
    }          
    rangeGetter().then(data=>{
      range = data;
    });
  
    function mapiframe(){
      $(".map-container .loader").removeClass("hide");
      $(".map-container iframe").addClass("hide");
      return initializeRound(range).then(data=>{
        $(".map-container .loader").addClass("hide");
        $(".map-container iframe").replaceWith(`<iframe src="${data["link"]}" allowfullscreen="false" id="${data["mapid"]}"></iframe>`);
        $(data["locations"]).each(function(index){
          $(`option[value='${index+1}']`).html(this);
        });
        ++framecount;
        seconds = 30;
      });
    }

    function cycle(){
      console.log(framecount);
      if(score == 5 || framecount >= 5){
        quit = true;
        $("#gameover").trigger("endgame");
      }
    }

    $('#start-button').click(function(){
        hideWindow();
        y.style.background = "url(https://www.solidbackgrounds.com/images/1920x1080/1920x1080-gray-solid-color-background.jpg)";
        cycle();
        mapiframe().then(() => {
          $(".map-container").removeClass("hide");
          $(".bottom-bar").removeClass("hide");
          countdown = setInterval(timer, 1000);
        });
    })

    $("#guess-form").submit(event => {
      event.preventDefault();
      var mapId = $(".map-container iframe").attr("id");
      var option = $("#guess-dropdown option:selected").text();
      checkOption(mapId, option).then(correct => {
        if (correct){
          ++score;
          $("#score").html("Score: " + score + "/5");
        }
        if(!quit){
          cycle();
          mapiframe();
        }
      });
    });

    $("#countdown").on("timeup", e => {
      clock.innerHTML = "Time's Up!";
      clearInterval(countdown);
      setTimeout(() => {console.log("switching map");}, 2000);
      if(!quit){
        cycle();
        mapiframe().then(() => {
        countdown = setInterval(timer, 1000);
        })
      }
    });

    $("#gameover").on("endgame", e=> {
      $("#gameover").removeClass("hide");
      score = 0; 
      framecount = 0;
      clearInterval(countdown);
      $("#guess-form label").addClass("hide");
      $("#guess-form select").addClass("hide");
      $("#guess-form input").addClass("hide");
      $("#countdown").addClass("hide");
      $(".map-container").addClass("hide");
      $(".img-container").addClass("hide");
      y.style.background = "url(css/panorama.jpg)";
    });

    $('#restart-button').click(function(){
      location.reload();
    });
    var clock = document.getElementById("countdown");
    var seconds = 30;

    function timer(){
        if (seconds < 10) seconds= "0" + seconds;
        clock.innerHTML = seconds + " seconds left";
        seconds = seconds - 1;
        if (seconds === 0) {
          $("#countdown").trigger("timeup");
        }
    }

}); 
