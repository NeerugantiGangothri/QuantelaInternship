$(document).ready(function(){
    $("#datepicker").datepicker();
    $("#list").sortable();
    myTasks=["Java","Javascript","HTML","Node Js","CSS","AJAX","Python","C","C++"];
    $("#task").autocomplete({
        source:myTasks
    });
    $("#btn").on('click',function(){
        var task=$("#task").val();
        var date=$("#datepicker").val();
        if(task && date){
            $("#list").append('<li>'+task+'-'+date+ '<button id="delete">Delete</button></li>');
            $("#task").val('');
            $("#datepicker").val('');
        }
    })
    $("#list").on('click','#delete',function(){
            $(this).parent().remove();
        });
        $("#hide").click(function(){
            $("#list").hide();
        });
        $("#show").click(function(){
            $("#list").show();
        });
});

