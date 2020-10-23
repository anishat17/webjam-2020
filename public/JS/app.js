$(document).ready(function(){
    var score = 0;
    var framecount = 0;
    var quit = false;
    var x = document.getElementById("start-pop-up");
    var y = document.getElementById("img_container");
    var z = document.getElementById("gameover");
    var range;
    function hideWindow(){
        x.style.display = "none";
    }          
    rangeGetter().then(data=>{
      range = data;
    });
  
    function mapiframe(){
      ++framecount;
      return initializeRound(range).then(data=>{
        $(".map-container iframe").replaceWith(`<iframe src="${data["link"]}" allowfullscreen="false" id="${data["mapid"]}"></iframe>`);
        $(data["locations"]).each(function(index){
          $(`option[value='${index+1}']`).html(this);
        });
        seconds = 10;
      });
    }

    function cycle(){
      console.log(framecount);
      if(score == 5 || framecount >= 5){
        console.log("ru here");
        quit = true;
        $("#gameover").trigger("endgame");
      }
    }

    $('#start-button').click(function(){
        hideWindow();
        y.style.background = "url(media/hess-13-irvine.jpg)";
        y.style.animation = "none";
        cycle();
        mapiframe().then(() => {
          $(".map-container").removeClass("hide");
          $("#countdown").removeClass("hide");
          countdown = setInterval(timer, 1000);
        });
    })

    $("#guess-form").submit(event => {
      event.preventDefault();
      var mapId = $(".map-container iframe").attr("id");
      var option = $("#guess-dropdown option:selected").text();
      console.log(mapId, option);
      checkOption(mapId, option).then(correct => {
        if (correct){
          ++score;
          $("#score").html("Score: " + score + "/5");
        }
        else{
          //incorrect ans popup, call iframe again
          console.log('incorrect');
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
    });

    $('#restart-button').click(function(){
      location.reload();
    });
    var clock = document.getElementById("countdown");
    var seconds = 10;

    function timer(){
        if (seconds < 10) seconds= "0" + seconds;
        clock.innerHTML = seconds + " seconds left";
        seconds = seconds - 1;
        if (seconds === 0) {
          $("#countdown").trigger("timeup");
        }
    }

}); 
