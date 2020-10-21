const guessing_img = 'https://www.google.com/maps/embed?pb=!4v1603261479820!6m8!1m7!1sCAoSLEFGMVFpcFBLU1JFYUU4QjJVOXpNQlZOdm5sa1BnendSUldpaG5hbWhxd2FS!2m2!1d33.6449944!2d-117.8422998!3f103.28060675164178!4f0!5f0.7820865974627469';
const pic_container = document.querySelector(".guess-picture");
const pic_iframe = document.querySelector(".guess-picture iframe");

function insert_url(){
    pic_iframe.src = guessing_img;
}