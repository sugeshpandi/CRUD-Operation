
// Get references to form elements
const form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    post = document.getElementById("post"),
    sDate = document.getElementById("startdate"),  // Corrected ID
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];

let isEdit = false, editId;
showInfo();

// Handle new user button click
newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "Fill the Form";
    isEdit = false;
    imgInput.src = "./image/Profile Icon.webp";
    form.reset();
});

// Handle file input change
file.onchange = function() {
    if (file.files[0].size < 1000000) {
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            const imgUrl = e.target.result;
            imgInput.src = imgUrl;
        };
        fileReader.readAsDataURL(file.files[0]);
    } else {
        alert("This file is too large!");
    }
};

// Display user information
function showInfo() {
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove());
    getData.forEach((element, index) => {
        const createElement = `
            <tr class="employeeDetails">
                <td>${index + 1}</td>
                <td><img src="${element.picture}" alt="" width="50" height="50"></td>
                <td>${element.employeeName}</td>
                <td>${element.employeeAge}</td>
                <td>${element.employeeCity}</td>
                <td>${element.employeeEmail}</td>
                <td>${element.employeePhone}</td>
                <td>${element.employeePost}</td>
                <td>${element.employeeStartDate}</td>
                <td>
                    <button class="btn btn-primary mx-1" onclick="editUser(${index})" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger mx-1" onclick="deleteUser(${index})"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-success mx-1" onclick="readUser(${index})" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-person"></i></button>
                </td>
            </tr>`;
        userInfo.innerHTML += createElement;
    });
}

// Handle form submit
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const userProfile = {
        picture: imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeePost: post.value,
        employeeStartDate: sDate.value,  // Corrected ID
    };

    if (!isEdit) {
        getData.push(userProfile);
    } else {
        getData.splice(editId, 1, userProfile);
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));
    showInfo();
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
    form.reset();
});

// Edit user
function editUser(index) {
    isEdit = true;
    editId = index;
    submitBtn.innerText = 'Update';
    modalTitle.innerText = "Edit Profile";

    imgInput.src = getData[index].picture;
    userName.value = getData[index].employeeName;
    age.value = getData[index].employeeAge;
    city.value = getData[index].employeeCity;
    email.value = getData[index].employeeEmail;
    phone.value = getData[index].employeePhone;
    post.value = getData[index].employeePost;
    sDate.value = getData[index].employeeStartDate;
}

// Delete user
function deleteUser(index) {
    getData.splice(index, 1);
    localStorage.setItem('userProfile', JSON.stringify(getData));
    showInfo();
}

// Read user details
function readUser(index) {
    document.querySelector(".showImg").src = getData[index].picture;
    document.getElementById("showName").value = getData[index].employeeName;
    document.getElementById("showAge").value = getData[index].employeeAge;
    document.getElementById("showCity").value = getData[index].employeeCity;
    document.getElementById("showEmail").value = getData[index].employeeEmail;
    document.getElementById("showPhone").value = getData[index].employeePhone;
    document.getElementById("showPost").value = getData[index].employeePost;
    document.getElementById("showsDate").value = getData[index].employeeStartDate;
}
