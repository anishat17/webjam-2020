$(document).ready(function(){
    var x = document.getElementById("pop-up");
    var y = document.getElementById("img_container")
    function hideWindow(){
        x.style.display = "none";
    }

    $('#close-popup').click(function(){
        hideWindow();
        y.style.background = "url(media/hess-13-irvine.jpg)";
        y.style.animation = "none";
    })

    function timer(){
      var clock = document.getElementById("countdown");
      var seconds = 60;
      while (seconds != 0) {
        if (seconds < 10) seconds="0" + seconds;
        clock.innerHTML = seconds + " seconds left";
      }
      clock.innerHTML = "Time's Up!";

    }
})

