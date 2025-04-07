$(document).ready(function(){
    let interValID;
    let isgameOver = false;
    let score = 0;
    let tempScore;
    let isPauseOrStart = true;
    let level = 1;
    let enemyCar1Interval, enemyCar2Interval, enemyCar3Interval, enemyCar4Interval;
    $("#continueIco").css("display","none") 
    

    // go to home section
    $(document).on("keyup", function(event){
        if (event.keyCode == 27) {
            pauseAnimation();
            isgameOver = true;
            clearInterval(interValID)
            clearInterval(enemyCar1Interval);
            clearInterval(enemyCar2Interval);
            clearInterval(enemyCar3Interval);
            clearInterval(enemyCar4Interval);
            const alertAudio = $("#gobackBox audio")[0]
            console.log(alertAudio)
            alertAudio.play();
            $("#gobackBox").css("right","0%")
            tempScore = score;
    

        }
        
    });
    
    // pause and continue
    $(document).on("keydown", function(event) {
        tempScore = score;
        if (event.keyCode == 32) { 
            if (!isPauseOrStart) {
                if ($("#continueIco").is(":visible")) {
                    $("#continueIco").fadeOut(200, function() {
                        isgameOver = false;
                        $("#pauseIco").fadeIn(200);
                        score = tempScore;
                        startAnimations();
                        calcualteScore(isCarCrashed);
                        
                    });
                } else {
                    $("#pauseIco").fadeOut(200, function() {
                        $("#continueIco").fadeIn(200);
                        pauseAnimation();
                        isgameOver = true;
                        clearInterval(interValID)
                        clearInterval(enemyCar1Interval);
                        clearInterval(enemyCar2Interval);
                        clearInterval(enemyCar3Interval);
                        clearInterval(enemyCar4Interval);
                    });
                }
            }
        }
    });
    


    $("#btnYes").on("click",function(){
        document.getElementById("homeSection").scrollIntoView({ behavior: "smooth" });

        setTimeout(function(){
            location.reload();
        }, 700); 

    });



    $("#btnNo").on("click",function(){
        $("#gobackBox").css("right","-100%")
        score = tempScore;
        startAnimations();
        isgameOver = false;
        calcualteScore(isCarCrashed);
        
        
    });

    let y = 5
    let x = 50


    // car move function
    $(document).on("keydown",function(event){

        if (!isgameOver) {
            if (event.keyCode == 87 || event.keyCode == 38) {
                if (y < 75) {
                    y += 3;
                }
    
            }else if (event.keyCode == 65 || event.keyCode == 37) {
                if (x > 33) {
                    x -= 3;
                }
            } else if (event.keyCode == 83 || event.keyCode == 40) {
                if (y > 1) {
                    y -= 3;
                }
    
            }else if (event.keyCode == 68 || event.keyCode == 39) {
                if (x < 67) {
                    x += 3;
                }
            }
            
            $("#myCar").css({
                "bottom": `${y}%`,
                "left": `${x}%`,
            });
    
        }
  
    });


    // start game
    $("#btnStart").on("click",function(){
        $("#btnStart").css("display", "none");
        isPauseOrStart = false;
        startAnimations();

        carPositionChange();

        calcualteScore(isCarCrashed);

    });



    $(".close").on("click",function(){
        $("#gameOver").css("top","-100%")
    });
        

    $("#restart").on("click",function(startAnimations){
        $("#gameOver").css("top","-100%")

        location.reload();
            
    });

    
    $("#GoHome").on("click",function(){
        document.getElementById("homeSection").scrollIntoView();
        setTimeout(function(){
            location.reload();
        }, 700); 
        
    });

    // play horn
    $(document).on("keydown", function(event){
        if (event.keyCode === 81) {
            $("#hornSound")[0].play();
        }
    });


    // restart
    $(document).on("keydown",function(event){
        if (event.keyCode == 82) {
            $(".rs").css("top",`${2}%`)
            pauseAnimation();
            pauseAnimation();
            isgameOver = true;
            isPauseOrStart = true;
            clearInterval(interValID)
            clearInterval(enemyCar1Interval);
            clearInterval(enemyCar2Interval);
            clearInterval(enemyCar3Interval);
            clearInterval(enemyCar4Interval);
    
            setTimeout(function(){
                location.reload();
            },1500);
        }
    });


    // win page click
    $("#win").on("click",function(){
        $("#win").css("top","-100%")
        $("#volDown").show();
        $("#volUp").hide();
    });


    function Car(selector) {
        this.selector = selector;
    }
    
    Car.prototype.getPosition = function () {
        let rect = $(this.selector)[0].getBoundingClientRect();
        return {
            top: Math.abs(rect.y),
            bottom: Math.abs(rect.bottom),
            left: Math.abs(rect.x),
            right: Math.abs(rect.right)
        };
    };


    const myCar = new Car("#myCar");

    const enemyCars = [
        new Car(".enimiCar-1"),
        new Car(".enimiCar-2"),
        new Car(".enimiCar-3"),
        new Car(".enimiCar-4")
    ];

    

    function getRndPosition(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function isGameOver(eCarLeft, eCarRight, eCarTop, eCarBottom, myCarLeft, myCarRight, myCarTop, myCarBottom) {
        return (
            ((eCarLeft < myCarLeft && myCarLeft < eCarRight) || (eCarLeft < myCarRight && myCarRight < eCarRight)) &&
            ((eCarTop < myCarTop && myCarTop < eCarBottom) || (eCarTop < myCarBottom && myCarBottom < eCarBottom))
        );
    }

    function pauseAnimation(){
        $("#road").css("animation-play-state", "paused");
        for (let i = 0 ; i < 4 ; i++) {
            $(`.enimiCar-${i+1}`).css("animation-play-state", "paused");
        }  
    }

    function carPositionChange(){
        enemyCar1Interval = setInterval(()=>{
            $(".enimiCar-1").css("left",`${getRndPosition(34,29)}%`)            
        },3000);
    
        enemyCar2Interval = setInterval(()=>{
            $(".enimiCar-2").css("left",`${getRndPosition(45,42)}%`)            
        },5000);
    
        enemyCar3Interval = setInterval(()=>{
            $(".enimiCar-3").css("left",`${getRndPosition(53,52)}%`)            
        },3000);
    
        enemyCar4Interval = setInterval(()=>{
            $(".enimiCar-4").css("left",`${getRndPosition(65,60)}%`)            
        },2000);
    }
    
    function calcualteScore(chekCarCrash){
        score;
        interValID = setInterval(() => {
            if ((level === 1) && (score+1===250)) {
                clearInterval(interValID);  
                pauseAnimation();
                isgameOver = true;
                $("#winSound")[0].play();
                $("#win").css("top" ,"0%");
                backGroundAudio.pause();
                $("#volDown").hide();
                $("#volUp").hide();
    
                clearInterval(interValID);
                clearInterval(enemyCar1Interval);
                clearInterval(enemyCar2Interval);
                clearInterval(enemyCar3Interval);
                clearInterval(enemyCar4Interval);
            }
            if ((score > 0) && (score%250 === 0)) {
                level++;
                $("#level").text(`Level : ${level}`)
                $("#lvUp")[0].play();
                
              
            }
            score++;
            $("#score").text(`Score : ${score}`);
            chekCarCrash();

        },75);
    }

    function isCarCrashed() {
        const myPos = myCar.getPosition();
    
        for (let enemy of enemyCars) {
            const ePos = enemy.getPosition();
            if (isGameOver(ePos.left, ePos.right, ePos.top, ePos.bottom,
                           myPos.left, myPos.right, myPos.top, myPos.bottom)) {
    
                isgameOver = true;
                isPauseOrStart = true;
                $("#carBlastSound")[0].play();
                pauseAnimation();
                backGroundAudio.pause();
                $("#volDown").show();
                $("#volUp").hide();
    
                clearInterval(interValID);
                clearInterval(enemyCar1Interval);
                clearInterval(enemyCar2Interval);
                clearInterval(enemyCar3Interval);
                clearInterval(enemyCar4Interval);
    
                $("#gameOver").css("top", "50%");
                $("#gameOver p:nth-of-type(2)").text(`Your Score : ${score}`);
                break;
            }
        }
    }
    

    function startAnimations(){
        $("#road").css("animation","roadMove 18s linear infinite")
        $(".enimiCar-1").css("animation","enimiCar1-move 3s infinite linear")
        $(".enimiCar-2").css("animation","enimiCar2-move 5s infinite linear")
        $(".enimiCar-3").css("animation","enimiCar3-move 3s infinite linear")
        $(".enimiCar-4").css("animation","enimiCar4-move 2s infinite linear")
    }

    
    
    
});
