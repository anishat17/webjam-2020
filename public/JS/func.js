$(document).ready(function(){
    var x = document.getElementById("pop-up");
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
        change_background();
    });
});
        $(body).css("background","none");


    })
})
