const apiUrl="https://6697989902f3150fb66e4358.mockapi.io/Gangothri/Employee";
function postEmpDetails(){
    let empId = $("#empid").val();
    let name = $("#name").val();
    let username = $("#username").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    //let checkinTime = new Date().toLocaleString();

    let data={
        empId:empId,
        name:name,
        username:username,
        email:email,
        phone:phone,
        //checkinTime:checkinTime
    }
    $.ajax({
        url: apiUrl,
        method: "GET",
        success: function(response) {
            let userExists = response.some(emp => emp.username === username);
            if (userExists) {
                alert("Employee with this username already checked in.");
            } else {
                // Post new employee details
                $.ajax({
                    url: apiUrl,
                    method: "POST",
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function(response) {
                        currentTime=new Date();
                        $("#post").html("Employee: " + name + " Checked in at " + currentTime);
                        alert("Employee Checked in Successfully");
                        clearForm();
                        getEmpDetails();
                    },
                    error: function() {
                        alert("Error posting employee details. Please try again.");
                    }
                });
            }
        },
        error: function() {
            alert("Error checking existing employees. Please try again.");
        }
    });
}

function deleteEmpDetails() {
    var empId = $("#empid").val();

    $.ajax({
        url: `${apiUrl}/${empId}`,
        type: 'DELETE',
        success: function(response) {
            var currentTime = new Date();
            $("#delete").html("Employee: " + response.name + " Checked out at " + currentTime);
            alert("Employee Checked Out Successfully");
            clearForm();
            getEmpDetails(); 
        },
        error: function() {
            alert("Error deleting employee. Please try again (or) Employee may have already checked out.");
        }
    });
}

function updateEmpDetails(){
    let empId = $("#empid").val();
    let name = $("#name").val();
    let username = $("#username").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let data={
        empId:empId,
        name:name,
        username:username,
        email:email,
        phone:phone
    }
    $.ajax({
        url:apiUrl+"/"+empId,
        method:"PUT",
        contentType:'application/json',
        data:JSON.stringify(data),
        success:function(response){
         alert("Employee Details Updated Successfully");
         clearForm();
         getEmpDetails();
         },
         error: function(){
            alert("Error updating employee details. Please try again.");
         }
         });
}
function getEmpDetails(){
    $.ajax({
        url:apiUrl,
        method:"GET",
        success:function(response){
            displayEmployees(response);
        },
        error: function() {
            alert("Error getting employee details. Please try again.");
            }
            });
    }
    function displayEmployees(response){
        var table = "<table border='1'>";
            table += "<tr><th>Check In No</th><th>Name</th><th>Username</th><th>Email</th><th>Phone</th></tr>";
            response.forEach(function (employee) {
                table += "<tr>";
                table += "<td >" + employee.id + "</td>";
                table += "<td>" + employee.name + "</td>";
                table += "<td>" + employee.username + "</td>";
                table += "<td>" + employee.email + "</td>";
                table += "<td>" + employee.phone + "</td>";
              //  table += "<td>"+checkinTime+"</td>";
                table += "</tr>";
            });
            table += "</table>";

            $("#get").html(table);
        }
    function searchEmployees() {
            let searchTerm = $("#search").val().toLowerCase();
            $.ajax({
                url: apiUrl,
                method: "GET",
                success: function(response) {
                    let filteredEmployees = response.filter(emp => 
                        emp.name.toLowerCase().includes(searchTerm) || 
                        emp.username.toLowerCase().includes(searchTerm) || 
                        emp.email.toLowerCase().includes(searchTerm)
                    );
                    displayEmployees(filteredEmployees);
                },
                error: function() {
                    alert("Error getting employee details. Please try again.");
                }
            });
        }
    function clearForm() {
             $("#form").trigger("reset");
        }
