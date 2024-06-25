$("document").ready(function(){
    $("#hide").click(function(){
      $("#img1").hide(2000);
    })
    $("#show").click(function(){
        $("#img1").show(2000);
    })
    $("#fadeIn").click(function(){
        $("#img1").fadeIn(3000);
    })
    $("#fadeOut").click(function(){
        $("#img1").fadeOut(3000);
        })
    $("#slideUp").click(function(){
        $("#img1").slideUp(2000);
    })
    $("#slideDown").click(function(){
        $("#img1").slideDown(2000);
    })
    $("#toggle").click(function(){
        $("#img1").toggle(2000);
    })
    $("#Animate").click(function(){
        $("#img1").animate({
            opacity: 0.5,
            height: '500px',
            width: '500px'
            },'slow', function(){
                alert("Animation complete");
                });
    })
});