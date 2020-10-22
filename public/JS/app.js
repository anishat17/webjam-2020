$(document).ready(function(){
    var x = document.getElementById("pop-up");
    var y = document.getElementById("img_container")
    function hideWindow(){
        x.style.display = "none";
    }
    function showElements(){
        
    }
    $('#close-popup').click(function(){
        hideWindow();
        y.style.background = "url(media/hess-13-irvine.jpg)";
        y.style.animation = "none";
    })

    var yourDateToGo = new Date(); 
    yourDateToGo.setDate(yourDateToGo.getDate() + 1);

    var timing = setInterval( 
      function () {

        var currentDate = new Date().getTime(); 
        var timeLeft = yourDateToGo - currentDate;

        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        if (seconds < 10) seconds="0"+seconds;

        document.getElementById("countdown").innerHTML = seconds + " seconds left";

        if (seconds == 0) {
          clearInterval(timing);
          document.getElementById("countdown").innerHTML = "Time's Up!";
        }
      }, 1000);
})

