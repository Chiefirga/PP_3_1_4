const requestURL = 'http://localhost:8080/api/admin';
const allUserTable = document.getElementById("all-users-table")
const leftMenuAdminP      = document.getElementById("leftMenuAdmin");

const infoUsers = (users) => {
    if (users.length !== 0) {
        let temp = '';
        users.forEach((user) => {
            temp += `
            <tr>
                    <td> ${user.id} </td>
                    <td> ${user.name} </td>
                    <td> ${user.lastName} </td>
                    <td> ${user.age} </td>
                    <td> ${user.email} </td>
                    <td>${user.roles.map(role => role.role.replace("ROLE_", "")).join(", ")}</td>
                    <td> <button type="button" class="btn btn-info" style="color: white" id="btn-edit-modal-call" data-toggle="modal" data-target="modal-edit"
                    data-id="${user.id}">Edit</button></td>
                    <td> <button type="button" class="btn btn-danger" id="btn-delete-modal-call" 
                    data-id="${user.id}">Delete</button></td>
                </tr>`
        })
        allUserTable.innerHTML = temp;
    }
}

function allUsers () {
    fetch(requestURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            infoUsers(data)
        })
}
allUsers();

const userPanelData      = document.getElementById("user_panel-data");
const authorisedUserData = document.getElementById("authorised_user-data");

let currentUserAdmin = () => {
    fetch ("http://localhost:8080/api/user", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(user => {
            if (user != null) {
                userPanelData.innerHTML = `
                    <tr>
                        <td> ${user.id} </td>
                        <td> ${user.name} </td>
                        <td> ${user.lastName} </td>
                        <td> ${user.age} </td>
                        <td> ${user.email} </td>
                        <td> ${user.roles.map((role) => role.name === "ROLE_USER" ? " Юзер" : " Админ")} </td>
                    </tr>
                `
                const formattedRoles = user.roles.map(role => role.role.replace("ROLE_", "")).join(", ");
                authorisedUserData.innerHTML = `
                    <strong>${user.email}</strong>
                <span class="ms-1">with roles: ${formattedRoles}</span>
            `;
                const currentPath = window.location.pathname;
                let menuItems = '';
                 menuItems += `
                    <li class="list-group-item ${currentPath.includes("/admin") ? "active" : ""}" style="border: none">
                        <a href="/admin" class="text-decoration-none ${currentPath.includes("/admin") ? "text-white" : ""}">
                            Admin
                        </a>
                    </li>
                    <li class="list-group-item ${currentPath.includes("/user") ? "active" : ""}" style="border: none">
                        <button class="text-decoration-none ${currentPath.includes("/user") ? "text-white" : ""}" id="user-button">
                            User
                        </button>
                    </li>
                `;
                leftMenuAdminP.innerHTML = `<ul class="list-group bordered" style="margin-top: 20px;">${menuItems}</ul>`;
            }
        })
}
currentUserAdmin();