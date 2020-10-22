$(document).ready(function(){
    var x = document.getElementById("pop-up");
    var y = document.getElementById("img_container")
    function hideWindow(){
        x.style.display = "none";
    }
    function change_background()
        {
            $("#img_container").hide();
            //display(URL("css/red.jpeg"));
            $("#bgd").show();
            //$().css({"background-color": 'red', "z-index": "2"});
           // $("#img_container").css("background,", 'url("https://www.abc.net.au/radionational/image/6289622-4x3-340x255.png")');
           // $("img_container").css("animation,", 'none');

        }
    $('#close-popup').click(function(){
        hideWindow();
<<<<<<< HEAD
        y.style.background = "url(media/hess-13-irvine.jpg)";
        y.style.animation = "none";
=======
        change_background();
    });
});
        $(body).css("background","none");


>>>>>>> c2cf990db2be1ac82fab9cc16232f20aa18bf7a9
    })
})
