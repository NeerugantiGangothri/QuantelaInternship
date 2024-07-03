let cnt = 1;
function addRow() {
    let name=document.getElementById('nameInput').value;
    let fname=document.getElementById('fnameInput').value;
    let age=document.getElementById('ageInput').value;
    let dob=document.getElementById('dobInput').value;
    let gender=document.getElementById('gender').value;
    let graduate=document.querySelector('input[name="graduate"]:checked');
    let skills=document.getElementById('skills').value;

    if (!name || !fname || !age || !dob || !gender || !graduate || !skills) {
        alert('Please fill all the fields');
     
    }
    if (isDuplicate(name, fname, age, dob, gender, graduate, skills)) {
        alert('Duplicates are not allowed');
       
    }
    let newRow = `<tr>
        <td>${cnt}</td>
        <td>${name}</td>
        <td>${fname}</td>
        <td>${age}</td>
        <td>${dob}</td>
        <td>${gender}</td>
        <td>${graduate.value}</td>
        <td>${skills}</td>
        <td>
            <button onclick="deleteRow(this)">Delete</button>
            <button onclick="editRow(this)">Edit</button>
        </td>
    </tr>`;

    document.getElementById('Details').innerHTML += newRow;
    cnt++;

    // Reset form fields after adding row
    document.getElementById('nameInput').value = '';
    document.getElementById('fnameInput').value = '';
    document.getElementById('ageInput').value = '';
    document.getElementById('dobInput').value = '';
    document.getElementById('gender').value = 'Male'; 
    document.getElementById('yes').checked = false; 
    document.getElementById('no').checked = false;
    document.getElementById('skills').value = '';
}
function deleteRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    cnt--;
}
function editRow(button) {
    let row = button.parentNode.parentNode;
    let cells = row.querySelectorAll('td');

    // Populate form fields with row data for editing
    document.getElementById('nameInput').value=cells[1].textContent;
    document.getElementById('fnameInput').value=cells[2].textContent;
    document.getElementById('ageInput').value=cells[3].textContent;
    document.getElementById('dobInput').value=cells[4].textContent;
    document.getElementById('gender').value=cells[5].textContent;
    if (cells[6].textContent === 'Yes') {
        document.getElementById('yes').checked = true;
    } else {
        document.getElementById('no').checked = true;
    }

    document.getElementById('skills').value = cells[7].textContent;

    // Remove the row from the table after editing
    row.parentNode.removeChild(row);
    cnt--; // Adjust the counter accordingly
}

function isDuplicate(name, fname, age, dob, gender, graduate, skills) {
    let table = document.getElementById('Details');
    let rows = table.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].querySelectorAll('td');
        if (cells[1].textContent === name &&
            cells[2].textContent === fname &&
            cells[3].textContent === age &&
            cells[4].textContent === dob &&
            cells[5].textContent === gender &&
            cells[6].textContent === graduate &&
            cells[7].textContent === skills) {
            return true;
        }
    }
    return false;
}