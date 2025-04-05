$(document).ready(function(){
    $(document).on("keyup", function(event){
        if (event.keyCode == 27) {
            document.getElementById("homeSection").scrollIntoView({ behavior: "smooth" });
        }
    }); 
});
