
    const apiUrl = 'https://6697989902f3150fb66e4358.mockapi.io/Gangothri/Employee';

    function postEmpDetails() {
        var empId = document.getElementById("empid").value;
        var name = document.getElementById("name").value;
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;

        if (!empId || !name || !username || !email || !phone) {
            alert("Please fill all the fields");
        } else {
            var postreq = new XMLHttpRequest();
            let data = {
                id: empId,
                name: name,
                username: username,
                email: email,
                phone: phone
            };

            postreq.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 201 || this.status == 200) {
                        var currentTime = new Date();
                        document.getElementById("post").innerHTML = "Employee: " + name + " Checked in at " + currentTime;
                        alert("Employee Checked in Successfully");
                        clearForm();
                        setTimeout(function () {
                            document.getElementById("post").innerHTML = "";
                        }, 3000);
                        getEmpDetails(); // Refresh employee list
                    } else {
                        alert("Error posting employee details. Please try again.");
                    }
                }
            };

            postreq.open('POST', apiUrl, true);
            postreq.setRequestHeader('Content-Type', 'application/json');
            postreq.send(JSON.stringify(data));
        }
    }

    function deleteEmpDetails() {
        var empId = document.getElementById("empid").value;
        var delreq = new XMLHttpRequest();
        delreq.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var currentTime = new Date();
                    document.getElementById("delete").innerHTML = "Employee: " + name + " Checked out at " + currentTime;
                    alert("Employee Checked Out Successfully");
                    clearForm();
                    setTimeout(function () {
                        document.getElementById("delete").innerHTML = "";
                    }, 3000);
                    getEmpDetails(); // Refresh employee list
                } else {
                    alert("Error deleting employee. Please try again (or) Employee May checked out already.");
                }
            }
        };

        delreq.open('DELETE', `${apiUrl}/${empId}`, true);
        delreq.send();
    }
    function updateEmpDetails() {
        var empId = document.getElementById("empid").value;
        var name = document.getElementById("name").value;
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
    
        if (!empId) {
            alert("Please enter Employee ID to update.");
            return;
        }
    
        var putreq = new XMLHttpRequest();
        let data = {
            name: name,
            username: username,
            email: email,
            phone: phone
        };
    
        putreq.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    alert("Employee details updated successfully");
                    clearForm();
                    getEmpDetails(); // Refresh employee list
                } else {
                    alert("Error updating employee details. Please try again.");
                }
            }
        };
    
        putreq.open('PUT', `${apiUrl}/${empId}`, true);
        putreq.setRequestHeader('Content-Type', 'application/json');
        putreq.send(JSON.stringify(data));  
    }

    function getEmpDetails() {
        var getreq = new XMLHttpRequest();
        getreq.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var employees = JSON.parse(this.responseText);
                    displayEmployees(employees);
                } else {
                    alert("Error fetching employee details. Please try again.");
                }
            }
        };

        getreq.open('GET', apiUrl, true);
        getreq.send();
    }

    function displayEmployees(employees) {
        var table = "<table border='1'>";
        table += "<tr><th>Check In No</th><th>Name</th><th>Username</th><th>Email</th><th>Phone</th></tr>";
        employees.forEach(function (employee) {
            table += "<tr>";
            table += "<td >" + employee.id + "</td>";
            table += "<td>" + employee.name + "</td>";
            table += "<td>" + employee.username + "</td>";
            table += "<td>" + employee.email + "</td>";
            table += "<td>" + employee.phone + "</td>";
            table += "</tr>";
        });
        table += "</table>";

        document.getElementById("get").innerHTML = table;
    }

    function clearForm() {
        document.getElementById("form").reset();
    }
