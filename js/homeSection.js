$(document).ready(function(){
    const audio = $("#backgroundMusic")[0];

    let volUp = $("#volUp");
    let volDown =  $("#volDown");

    volUp.css("display","none");

    volUp.on("click",function(){
        volUp.css("display","none");
        volDown.css("display","block");
        audio.pause();
    });

    volDown.on("click",function(){
        volUp.css("display","block");
        volDown.css("display","none");
        audio.play();
    });

    $("#playBtn").on("click",function(){
       const clickSound =  $("#clickSound")[0]
       clickSound.play();
    });


});
