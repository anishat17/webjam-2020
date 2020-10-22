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
})

