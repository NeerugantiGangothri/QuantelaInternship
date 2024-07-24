$(document).ready(function(){
    $("#btn").on('click',function(){
        let newTask=$("#task").val();
        if(newTask){
            $("#list").append('<li>'+ newTask +'  <button id="complete">Completed</button> <button id="delete">Delete</button></li>');
            $("#task").val('');
        }
    });
    $("#list").on('click','#complete',function(){
        $(this).parent().css('text-decoration','line-through');
    });
    $("#list").on('click','#delete',function(){
        $(this).parent().remove();
        });
});