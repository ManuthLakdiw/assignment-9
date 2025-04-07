$(document).ready(function(){
    let interValID;
    let isgameOver = false;
    let score = 0;
    let tempScore;
    let isPauseOrStart = true;
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


    function getElementPosition(selector) {
        let rect = $(selector)[0].getBoundingClientRect();
        return {
            top: Math.abs(rect.y),
            bottom: Math.abs(rect.bottom),
            left: Math.abs(rect.x),
            right: Math.abs(rect.right)
        };
    }

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
            score++;
            $("#score").text(`Score : ${score}`);

            chekCarCrash();

        },70);
        
       
    }

    function isCarCrashed(){

        let eCar1Top = getElementPosition(".enimiCar-1").top;
        let eCar1Bottom = getElementPosition(".enimiCar-1").bottom;
        let eCar1Left = getElementPosition(".enimiCar-1").left;
        let eCar1Right = getElementPosition(".enimiCar-1").right;

        let eCar2Top = getElementPosition(".enimiCar-2").top;
        let eCar2Bottom = getElementPosition(".enimiCar-2").bottom;
        let eCar2Left = getElementPosition(".enimiCar-2").left;
        let eCar2Right = getElementPosition(".enimiCar-2").right;


        let eCar3Top = getElementPosition(".enimiCar-3").top;
        let eCar3Bottom = getElementPosition(".enimiCar-3").bottom;
        let eCar3Left = getElementPosition(".enimiCar-3").left;
        let eCar3Right = getElementPosition(".enimiCar-3").right;


        let eCar4Top = getElementPosition(".enimiCar-4").top;
        let eCar4Bottom = getElementPosition(".enimiCar-4").bottom;
        let eCar4Left = getElementPosition(".enimiCar-4").left;
        let eCar4Right = getElementPosition(".enimiCar-4").right;


        let myCarTop = getElementPosition("#myCar").top;
        let myCarBottom = getElementPosition("#myCar").bottom;
        let myCarLeft = getElementPosition("#myCar").left;
        let myCarRight = getElementPosition("#myCar").right;

        if (
            isGameOver(eCar1Left, eCar1Right, eCar1Top, eCar1Bottom, myCarLeft, myCarRight, myCarTop, myCarBottom) || 
            isGameOver(eCar2Left, eCar2Right, eCar2Top, eCar2Bottom, myCarLeft, myCarRight, myCarTop, myCarBottom) || 
            isGameOver(eCar3Left, eCar3Right, eCar3Top, eCar3Bottom, myCarLeft, myCarRight, myCarTop, myCarBottom) || 
            isGameOver(eCar4Left, eCar4Right, eCar4Top, eCar4Bottom, myCarLeft, myCarRight, myCarTop, myCarBottom)
        ) {
            isgameOver = true;
            isPauseOrStart = true;
            const carBalstSound = $("#carBlastSound")[0]
            carBalstSound.play();
            pauseAnimation();
            backGroundAudio.pause();
            $("#volDown").css("display","block")
            $("#volUp").css("display","none")

            clearInterval(interValID)
            clearInterval(enemyCar1Interval);
            clearInterval(enemyCar2Interval);
            clearInterval(enemyCar3Interval);
            clearInterval(enemyCar4Interval);


            $("#gameOver").css("top","50%")
            $("#gameOver p:nth-of-type(2)").text(`Your Score : ${score}`)

        }            
    }

    function startAnimations(){
        $("#road").css("animation","roadMove 20s linear infinite")
        $(".enimiCar-1").css("animation","enimiCar1-move 3s infinite linear")
        $(".enimiCar-2").css("animation","enimiCar2-move 5s infinite linear")
        $(".enimiCar-3").css("animation","enimiCar3-move 3s infinite linear")
        $(".enimiCar-4").css("animation","enimiCar4-move 2s infinite linear")
    }
    
    
});
