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
      initializeRound(range).then(data=>{
        console.log(data["link"]);
        $(".map-container").append(`<iframe src="${data["link"]}" allowfullscreen="false"></iframe>`);
        $(data["locations"]).each(function(index){
          $(`option[value='${index+1}']`).html(this);
        });
      });
    }

    $('#start-button').click(function(){
        hideWindow();
        y.style.background = "url(media/hess-13-irvine.jpg)";
        y.style.animation = "none";
        mapiframe();
        $(".map-container").removeClass("hide");
    })

    var clock = document.getElementById("countdown");
    var seconds = 60;

    function timer(){
        if (seconds < 10) seconds= "0" + seconds;
        clock.innerHTML = seconds + " seconds left";
        seconds = seconds - 1;
    }

    setInterval(timer, 1000);
}); 
