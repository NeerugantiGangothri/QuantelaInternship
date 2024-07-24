$(document).ready(function(){
    $("#form").on('submit',function(event){
        event.preventDefault();
        let solutions={
            q1:'stringify()',
            q2:'Both',
            q3:'All Of The Above',
            q4:'const',
            q5:'//'
        }
        let score=0;
        for (let question in solutions) {
            let userAnswer = $(`input[name=${question}]:checked`).val();
            if (userAnswer === solutions[question]) {
                score++;
            }
        }
        let result= `Your score is ${score} !!.`;
        $('#result').text(result);
       // alert(result);
       // clearForm();
    });
});
// function clearForm() {
//     $("#form").trigger("reset");
// }