// hides all screens except for screen 1
// Change to view an indiviudal screen
$("section:gt(0)").hide();

////GLOBAL VARS////////////////
// set initial screen number
let screenNum = 1;
// transition transDuration
let transDuration = 1;
// delay for starting screen animations
// initially set to 3s to allow the preloader to show and then updated in loadScreen1
let transDelay = 3;

// hide/show navigation functions
function hideNav() {
    gsap.to(".next",{
        duration: 0.25,
        right: -100,
        ease: "Power2.easeInOut"
    });

    gsap.to(".prev",{
        duration: 0.25,
        left: -100,
        ease: "Power2.easeInOut"
    });
}

function showNav() {

    gsap.to(".next",{
        duration: 0.25,
        right: 20,
        ease: "Power2.easeInOut"
    });

    gsap.to(".prev",{
        duration: 0.25,
        left: 20,
        ease: "Power2.easeInOut"
    });
   
}

// next and previous navigation functions
function showNextScreen()
{
    //target for the current screen
    let currentScreen = "#screen" + screenNum;
    // "#screen1"

    //add 1 to the screenNum
    // screenNum = screenNum + 1;
    screenNum++;

    //target for the next screen
    let nextScreen = "#screen" + screenNum;
    // "#screen2"

    //hide nav
    hideNav();

    //transition to current screen away
    gsap.fromTo(currentScreen, {
        duration: transDuration,
        x: 0
    },{
        duration: transDuration,
        delay: 0.5,
        x: -960,
        ease: "Power2.easeInOut"
    });

    //show next screen
    $(nextScreen).show();

    //transition next screen in
    gsap.fromTo(nextScreen,{
        duration: transDuration,
        x: 960
    },{
        duration: transDuration,
        delay: 0.5,
        x: 0,
        ease: "Power2.easeInOut",
        onComplete: function(){
            //hide current (prev) screen
            $(currentScreen).hide();
            //show nav
            showNav();
        }
    });

    // load the function that will animate screen contents
    window["loadScreen" + screenNum]();
   
    // pause the voice over when switching screens
    $("#voiceover").trigger("pause");
}

function showPrevScreen()
{
    //target for the current screen
    let currentScreen = "#screen" + screenNum;
    // "#screen2"

    //subtract 1 to the screenNum
    // screenNum = screenNum - 1;
    screenNum--;

    //target for the prev screen
    let prevSreen = "#screen" + screenNum;
    // "#screen1"

    //hide nav
    hideNav();

    //transition the current screen away
    gsap.fromTo(currentScreen,{
        duration: transDuration,
        x: 0
    },{
       duration: transDuration,
       delay: 0.5,
       x: 960,
       ease: "Power2.easeInOut"
    });

    //show prev screen
    $(prevSreen).show();
    //transition on the prev screen
    gsap.fromTo(prevSreen,{
        duration: transDuration,
        x: -960
    },{
       duration: transDuration,
       delay: 0.5,
       x: 0,
       ease: "Power2.easeInOut",
       onComplete: function(){
           //hide current (prev) screen
           $(currentScreen).hide();
           //show the nav
           showNav();
       }
    });

    // load the function that will animate screen contents
    window["loadScreen" + screenNum]();

    // pause the voice over when switching screens
    $("#voiceover").trigger("pause");
}

// next and previous button clicks
$('.next').click(showNextScreen);
$('.prev').click(showPrevScreen);

// LOADING SPECIFIC SCREEN VOICEOVER
function loadScreenAudio(){
    //set the src for #voiceover to the current screen number
    //                         "audio/screen2.mp3"
    $("#voiceover").attr("src", "audio/screen" + screenNum + ".mp3");
    //start audio at volume 0
    $("#voiceover").prop("volume", 0);
    //play voice over
    $("#voiceover").trigger("play");
    //animate volume of voice over
    $("#voiceover").animate({volume: 1}, 500);

}


// SET UP MAIN INTERFACE ///////////////////////////////////////
// fade on main div on page load and hide loading gif
gsap.from("main",{
    duration: transDuration,
    delay: transDelay -2.5,
    y: $(window).height(),
    ease: "Back.easeOut",
    onComplete: function(){
        $("#loading").hide();
    }
});

//BACKGROUND AUDIO CONTROLS
$("#playPause").click(function(){

    if ($(this).hasClass("play")){
        //start music
        $("#background").prop("volume", 0); //start music at 0 volume
        $("#background").trigger("play");  //start music
        $("#background").animate({volume: 0.05}, 2000); //fades on volume

        //change class to pause
        $(this).removeClass("play").addClass("pause");
    }else{
        //pause music
        $("#background").trigger("pause");

        //change class to play
        $(this).removeClass("pause").addClass("play");
    }


});

//sound effects functions for reusability
function playPop1(){
    $("#pop1").trigger("play");
}
function playPop2(){
    $("#pop2").trigger("play");
}
function playSwoosh1(){
    $("#swoosh1").trigger("play");
}
function playSwoosh2(){
    $("#swoosh2").trigger("play");
}


// functions for loading on content of each screen
// LOAD SCREEN 1 ///////////////////////////////////////////////
function loadScreen1()
{
    
     gsap.from("#headerfont",{
        duration: 0.75,
        delay: 1.25,
        scale: 0,
        ease: "Power2.easeOut"
    });
}

// animate on content of screen 1 on page load
loadScreen1();

// LOAD SCREEN 2 ///////////////////////////////////////////////
function loadScreen2()
{
    // animate content on with delays
    
    
    gsap.from("#cd1",{
        duration: 0.5,
        delay: transDelay + 0.25,
        scale: 0,
        ease: "easeInQuint"
    });
    
    gsap.from("#cd3",{
        duration: 0.5,
        delay: transDelay + 0.5,
        scale: 0,
        ease: "easeInQuint"
    });
    
    gsap.from("#cd2",{
        duration: 0.5,
        delay: transDelay + 0.75,
        scale: 0,
        ease: "easeInQuint"
    });
    
    gsap.from("#fact1head",{
        duration: 0.5,
        delay: transDelay + 1.0,
        scale: 0,
        ease: "easeInOut"
    });

    //play sound effect for ele1
    gsap.delayedCall(transDelay + 0.25, playPop1);

    gsap.from("#ele2",{
        duration: 0.5,
        delay: transDelay + 0.5,
        scale: 0,
        ease: "Power2.easeOut"
    });

    //play sound effect for ele2
    gsap.delayedCall(transDelay + 0.5, playPop2);

    gsap.from("#ele3",{
        duration: 0.5,
        delay: transDelay + 0.75,
        scale: 0,
        ease: "Power2.easeOut"
    });

    //play sound effect for ele3
    gsap.delayedCall(transDelay + 0.75, playPop1);

    gsap.from("#ele4",{
        duration: 0.5,
        delay: transDelay + 1,
        scale: 0,
        ease: "Power2.easeOut"
    });

    //play sound effect for ele4
    gsap.delayedCall(transDelay + 1, playPop2);

    // load voiceover for screen2
    gsap.delayedCall(transDelay + 1.5, loadScreenAudio);
}

// LOAD SCREEN 3 ///////////////////////////////////////////////
function loadScreen3()
{
    // animate content on with delays
    gsap.from("#ele5",{
        duration: 0.5,
        delay: transDelay,
        opacity: 0,
        ease: "Power2.easeOut"
    });
    
//    gsap.from("#twit1",{
//        duration: 0.5,
//        delay: transDelay + 0.25,
//        scale: 0,
//        ease: "easeInQuint"
//    });
    
    gsap.from("#twithead",{
        duration: 0.5,
        delay: transDelay + 0.5,
        scale: 0,
        ease: "easeInQuint"
    });
    
    gsap.from("#twitinfo",{
        duration: 0.5,
        delay: transDelay + 1.0,
        scale: 0,
        ease: "easeInQuint"
    });

//    $("#twit1").hover(function(){
//        gsap.to("#ele5",{
//            duration: 0.5,
//            scale: 5
//        })
//    })

//    gsap.from("#twithead",{
//        duration: 0.5,
//        delay: transDelay,
//        opacity: 0,
//        ease: "Power2.easeOut"
//    });

    // $("#ele6").hover(function(){
            //hover in
    // }, function(){
            //hover out
    // })

    $("#twithead").hover(function(){ //hoverIn
        gsap.to("#ele6",{
            duration: 0.5,
            width: 200,
            height: 200,
        });

        //play swoosh when mouse enters
        playSwoosh1();

        gsap.to("#ele6content",{
            duration: 0.5,
            delay: 0.5,
            opacity: 1
        });
    }, function(){//hoverOut
        gsap.to("#ele6content",{
            duration: 0.25,
            opacity: 0
        });

        //play swoosh when mouse leaves
        playSwoosh2();

        gsap.to("#ele6",{
            duration: 0.5,
            delay: 0.2,
            width: 100,
            height: 100,
        });
    });

    // load voiceover for screen3
    gsap.delayedCall(transDelay + 0.5, loadScreenAudio);

}

// LOAD SCREEN 4 ///////////////////////////////////////////////
function loadScreen4()
{
    // animate content on with delays
    gsap.from("#ele7",{
        duration: 0.5,
        delay: transDelay,
        opacity: 0,
        ease: "Power2.easeOut"
    });
    
     gsap.from("#snaphead",{
        duration: 0.5,
        delay: transDelay,
        opacity: 0,
        ease: "Power2.easeOut"
    });
    
    gsap.from("#snapcharac",{
        duration: 0.5,
        delay: transDelay + 0.75,
        scale: 0,
        ease: "easeInQuint"
    });
    
    gsap.from("#snapgraphs",{
        duration: 0.5,
        delay: transDelay + 1.25,
        scale: 0,
        ease: "easeInQuint"
    });

    function showNumber(currentBar){
        //"#bar2 p"
        gsap.fromTo(currentBar + " p",{
            delay: 0.75,
            duration: 0.5,
            marginTop: 0
        },{
            opacity: 1,
            marginTop: -20
        })
    }

    //bargraph click
    $("#ele7").click(function(){

        //play pop
        playPop1();

        //check if already clicked
        if ($(this).attr("data-click-state") == 1){
            //do nothing
        }else{
            //add click state attribute
            $(this).attr("data-click-state", 1);
            //animation for bars
            //animate each one by one
            gsap.fromTo("#ele7 #bar1",{
                duration: 1,
                height: 5
            },{
                height: 120,
                ease: "Power2.easeOut",
                onComplete: showNumber("#bar1")
            });

            gsap.fromTo("#ele7 #bar2",{
                delay: 0.25,
                duration: 1,
                height: 5
            },{
                height: 50,
                ease: "Power2.easeOut",
                onComplete: showNumber("#bar2")
            });

            gsap.fromTo("#ele7 #bar3",{
                delay: 0.5,
                duration: 1,
                height: 5
            },{
                height: 15,
                ease: "Power2.easeOut",
                onComplete: showNumber("#bar3")
            });

            gsap.fromTo("#ele7 #bar4",{
                delay: 0.75,
                duration: 1,
                height: 5
            },{
                height: 150,
                ease: "Power2.easeOut",
                onComplete: showNumber("#bar4")
            });

            gsap.fromTo("#ele7 #bar5",{
                delay: 1,
                duration: 1,
                height: 5
            },{
                height: 44,
                ease: "Power2.easeOut",
                onComplete: showNumber("#bar5")
            });     
        } 
    });

    // load voiceover for screen4
    gsap.delayedCall(transDelay + 0.5, loadScreenAudio);
}

// LOAD SCREEN 5 ///////////////////////////////////////////////
function loadScreen5()
{
    // animate content on with delays
    gsap.from("#ele8",{
        duration: 1,
        delay: transDelay,
        scale: 0,
        rotate: -800,
        ease: "Power2.easeInOut"
    })

    gsap.from("#ele9",{
        duration: 1,
        delay: transDelay,
        scale: 0,
        rotate: 800,
        ease: "Power2.easeInOut"
    })
    
    gsap.from("#fbhead1",{
        duration: 0.5,
        delay: transDelay,
        opacity: 0,
        ease: "Power2.easeOut"
    });
    
    gsap.from("#fbcharac",{
        duration: 0.5,
        delay: transDelay + 0.75,
        scale: 0,
        ease: "easeInQuint"
    });
    
    gsap.from("#whatsappicon",{
        duration: 0.5,
        delay: transDelay + 1.0,
        scale: 0,
        ease: "easeInQuint"
    });
    
    gsap.from("#fbinfo",{
        duration: 0.5,
        delay: transDelay + 1.25,
        scale: 0,
        ease: "easeInQuint"
    });
    
    gsap.from("#fbfct2",{
        duration: 0.5,
        delay: transDelay + 1.50,
        scale: 0,
        ease: "easeInQuint"
    });
    
    gsap.from("#fbgraph",{
        duration: 0.5,
        delay: transDelay + 1.75,
        scale: 0,
        ease: "easeInQuint"
    });
    
    //click ele8
//    $("#ele8").click(function(){
//        $("#ele8content").show();
//
//        gsap.fromTo("#ele8content",{
//            opacity: 0
//        },{
//            opacity: 1,
//            duration: 0.25
//        });
//
//        //close button click
//        $("#ele8content .close").click(function(){
//
//            gsap.to("#ele8content",{
//                duration: 0.25,
//                opacity: 0,
//                onComplete: function(){
//                    $("#ele8content").hide();
//                }
//            })
//        });
//    });

    //click ele9
//    $("#ele9").click(function(){
//        $("#ele9content").show();
//
//        gsap.fromTo("#ele9content",{
//            scale: 0
//        },{
//            scale: 1,
//            duration: 0.25
//        });
//
//        //close button click
//        $("#ele9content .close").click(function(){
//
//            gsap.to("#ele9content",{
//                duration: 0.25,
//                scale: 0,
//                onComplete: function(){
//                    $("#ele9content").hide();
//                }
//            });
//        });
//    });





    // load voiceover for screen3
    gsap.delayedCall(transDelay + 0.5, loadScreenAudio);
}

// LOAD SCREEN 6 ///////////////////////////////////////////////
function loadScreen6()
{
    // animate content on with delays
    gsap.from("#ele10", {
        duration: 0.5,
        delay: transDelay,
        opacity: 0,
        ease: "Power2.easeInOut",
        onComplete: function(){

            gsap.to("#ele10", {
                duration: 1,
                rotate: 360,
                repeat: -1, //-1 = forever
                ease: "Power2.easeInOut"
            })

        }
    });

    gsap.fromTo("#ele11", {
        opacity: 0,
    },{
        duration: 0.5,
        delay: transDelay,
        opacity: 1,
        rotate: -45,
        ease: "Power2.easeInOut",
        onComplete: function(){

            gsap.fromTo("#ele11", {
                rotate: -45
            },{
                rotate: 45,
                duration: 1, 
                repeat: -1,
                yoyo: true,
                ease: "Power2.easeInOut"
            })

        }
    });

    // load voiceover for screen3
    gsap.delayedCall(transDelay + 0.5, loadScreenAudio);
    
}