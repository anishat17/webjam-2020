$(document).ready(function(){
    var x = document.getElementById("pop-up");
    function hideWindow(){
        x.style.display = "none";
    }
    $('#close-popup').click(function(){
        hideWindow();
    })
})
