document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('addRow').addEventListener('click', function () {
                let name = document.getElementById('nameInput').value;
                let fname = document.getElementById('fnameInput').value;
                let age = document.getElementById('ageInput').value;
                let dob = document.getElementById('dobInput').value;
                let gender = document.getElementById('gender').value;
                let graduate = document.querySelector('input[name="graduate"]:checked') ? document.querySelector('input[name="graduate"]:checked').value : '';
                let skills = document.getElementById('skills').value;

                if (name && fname && age && dob && gender && graduate && skills) {
                    if (!isDuplicate(name, fname, age, dob, gender, graduate, skills)) {
                        let table = document.getElementById('table').getElementsByTagName('tbody')[0];
                        let row = table.insertRow();
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        let cell4 = row.insertCell(3);
                        let cell5 = row.insertCell(4);
                        let cell6 = row.insertCell(5);
                        let cell7 = row.insertCell(6);
                        let cell8 = row.insertCell(7);
                        cell1.textContent = name;
                        cell2.textContent = fname;
                        cell3.textContent = age;
                        cell4.textContent = dob;
                        cell5.textContent = gender;
                        cell6.textContent = graduate;
                        cell7.textContent = skills;

                        let deleteButton = document.createElement('button');
                        deleteButton.textContent = "Delete";
                        deleteButton.addEventListener('click', function () {
                            let rowDelete = this.parentNode.parentNode;
                            table.removeChild(rowDelete);
                        });
                        cell8.appendChild(deleteButton);

                        let editButton = document.createElement('button');
                        editButton.textContent = "Edit";
                        editButton.addEventListener('click', function () {
                            let rowEdit = this.parentNode.parentNode;
                            document.getElementById('nameInput').value = rowEdit.cells[0].textContent;
                            document.getElementById('fnameInput').value = rowEdit.cells[1].textContent;
                            document.getElementById('ageInput').value = rowEdit.cells[2].textContent;
                            document.getElementById('dobInput').value = rowEdit.cells[3].textContent;
                            document.getElementById('gender').value = rowEdit.cells[4].textContent;
                            document.querySelector(`input[name="graduate"][value="${rowEdit.cells[5].textContent}"]`).checked = true;
                            document.getElementById('skills').value = rowEdit.cells[6].textContent;

                            // update edited value
                            let saveButton = document.createElement('button');
                            saveButton.textContent = "Save";
                            saveButton.addEventListener('click', function () {
                                rowEdit.cells[0].textContent = document.getElementById('nameInput').value;
                                rowEdit.cells[1].textContent = document.getElementById('fnameInput').value;
                                rowEdit.cells[2].textContent = document.getElementById('ageInput').value;
                                rowEdit.cells[3].textContent = document.getElementById('dobInput').value;
                                rowEdit.cells[4].textContent = document.getElementById('gender').value;
                                rowEdit.cells[5].textContent = document.querySelector('input[name="graduate"]:checked').value;
                                rowEdit.cells[6].textContent = document.getElementById('skills').value;

                                saveButton.remove(); // Remove the save button after saving
                            });
                            cell8.appendChild(saveButton);
                        });
                        cell8.appendChild(editButton);

                        clearFields();
                    } else {
                        alert("Duplicate values are not allowed");
                    }
                } else {
                    alert("Please fill all the fields");
                }
            });

            document.getElementById('clear').addEventListener('click', clearFields);

            function clearFields() {
                document.getElementById('nameInput').value = '';
                document.getElementById('fnameInput').value = '';
                document.getElementById('ageInput').value = '';
                document.getElementById('dobInput').value = '';
                document.getElementById('gender').value = '';
                const graduate = document.querySelector('input[name="graduate"]:checked');
                if (graduate) graduate.checked = false;
                document.getElementById('skills').value = '';
            }

            function isDuplicate(name, fname, age, dob, gender, graduate, skills) {
                let table = document.getElementById('table').getElementsByTagName('tbody')[0];
                for (let i = 0; i < table.rows.length; i++) {
                    let row = table.rows[i];
                    if (
                        row.cells[0].textContent === name &&
                        row.cells[1].textContent === fname &&
                        row.cells[2].textContent === age &&
                        row.cells[3].textContent === dob &&
                        row.cells[4].textContent === gender &&
                        row.cells[5].textContent === graduate &&
                        row.cells[6].textContent === skills
                    ) {
                        return true;
                    }
                }
                return false;
            }
        });