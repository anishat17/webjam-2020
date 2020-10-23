$(document).ready(function(){
   
    var x = document.getElementById("pop-up");
    var y = document.getElementById("img_container");
    var range;
    function hideWindow(){
        x.style.display = "none";
    }          
    rangeGetter().then(data=>{
      range = data;
    });
  
    function mapiframe(){
      return initializeRound(range).then(data=>{
        $(".map-container iframe").replaceWith(`<iframe src="${data["link"]}" allowfullscreen="false" id="${data["mapid"]}"></iframe>`);
        $(data["locations"]).each(function(index){
          $(`option[value='${index+1}']`).html(this);
        });
        seconds = 60;
      });
    }



    $('#start-button').click(function(){
        hideWindow();
        y.style.background = "url(media/hess-13-irvine.jpg)";
        y.style.animation = "none";
        mapiframe().then(() => {
          $(".map-container").removeClass("hide");
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
          //increment score by one!
        }
        else{
          //incorrect ans popup, call iframe again
          console.log('incorrect');
        }
        mapiframe();
      });
    });

    $("#countdown").on("timeup", e => {
      clock.innerHTML = "Time's Up!";
      clearInterval(countdown);
      setTimeout(() => {console.log("switching map");}, 2000);
      mapiframe().then(() => {
        countdown = setInterval(timer, 1000);
      });
    });


    var clock = document.getElementById("countdown");
    var seconds = 60;

    function timer(){
        if (seconds < 10) seconds= "0" + seconds;
        clock.innerHTML = seconds + " seconds left";
        seconds = seconds - 1;
        if (seconds === 0) {
          $("#countdown").trigger("timeup");
        }
    }

}); 
