$(document).ready(function(){
    const backGroundAudio = $("#backgroundMusic")[0];

    let volUp = $("#volUp");
    let volDown =  $("#volDown");

    volUp.css("display","none");

    volUp.on("click",function(){
        backGroundAudio.pause();
        volUp.css("display","none");
        volDown.css("display","block");
    });

    volDown.on("click",function(){
        backGroundAudio.play(); 
        volUp.css("display","block");
        volDown.css("display","none");
     
    });

    $("#playBtn").on("click",function(){
       const clickSound =  $("#clickSound")[0]
       clickSound.play();
    });


});
