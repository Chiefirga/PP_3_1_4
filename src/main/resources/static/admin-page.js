const requestURL = 'http://localhost:8080/api/admin';

const allUserTable = document.getElementById("all-users-table")

const userPanelData = document.getElementById("user_panel-data");
const authorisedUserData = document.getElementById("authorised_user-data");

const addUserForm = document.querySelector(".add-user-form");

const addName = document.getElementById("name");
const addLastName = document.getElementById("last-name");
const addAge = document.getElementById("age");
const addEmail = document.getElementById("email");
const addPassword = document.getElementById("password");
const addRoles = document.getElementById("roles");

const navHomeTab = document.getElementById("nav-home-tab")

const modalEditExitBtn = document.getElementById("exit_btn-modal-edit");
const modalEditSubmitBtn = document.getElementById("submit_btn-modal-edit");
const editUsersRoles = document.getElementById("edit-rolesSelect");
const editRoleAdminOption = document.getElementById("edit-role_admin");
const editRoleUserOption = document.getElementById("edit-role_user");

const deleteRoleAdminOption = document.getElementById("delete-role_admin");
const deleteRoleUserOption = document.getElementById("delete-role_user");
const modalDeleteSubmitBtn = document.getElementById("submit_btn-modal-delete");
const modalDeleteExitBtn = document.getElementById("exit_btn-modal-delete");

const deleteUsersId = document.getElementById("delete-id")
const deleteUsersName = document.getElementById("delete-name")
const deleteUsersLastName = document.getElementById("delete-lastName")
const deleteUsersAge = document.getElementById("delete-age")
const deleteUsersEmail = document.getElementById("delete-email")

const editUsersId = document.getElementById("edit-id");
const editUsersName = document.getElementById("edit-name");
const editUsersLastName = document.getElementById("edit-lastName");
const editUsersAge = document.getElementById("edit-age");
const editUsersEmail = document.getElementById("edit-email");

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
                    <td> <button type="button" class="btn btn-info" style="color: white" id="btn-edit-modal-call" data-bs-toggle="modal" data-bs-target="#editModal"
                    data-id="${user.id}">
                    Edit</button></td>
                    <td><button type="button" class="btn btn-danger" id="btn-delete-modal-call" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#deleteModal">
                    Delete</button></td>
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
                        <td> ${user.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN")} </td>
                    </tr>
                `
                const formattedRoles = user.roles.map(role => role.role.replace("ROLE_", "")).join(", ");
                authorisedUserData.innerHTML = `
                    <strong>${user.email}</strong>
                <span class="ms-1">with roles: ${formattedRoles}</span>
            `;
            }
        })
}
currentUserAdmin();

function getRolesFromAddUserForm() {
    let roles = Array.from(addRoles.selectedOptions)
        .map(option => option.value);
    let rolesToAdd = [];
    if (roles.includes("1")) {
        let role1 = {
            id: 1,
            name: "Admin"
        }
        rolesToAdd.push(role1);
    }
    if (roles.includes("2")) {
        let role2 = {
            id: 2,
            name: "User"
        }
        rolesToAdd.push(role2);
    }
    return rolesToAdd;
}

function getRolesFromEditUserForm() {
    let roles = Array.from(editUsersRoles.selectedOptions)
        .map(option => option.value);
    let rolesToEdit = [];
    if (roles.includes("1")) {
        let role1 = {
            id: 1,
            name: "Admin"
        }
        rolesToEdit.push(role1);
    }
    if (roles.includes("2")) {
        let role2 = {
            id: 2,
            name: "User"
        }
        rolesToEdit.push(role2);
    }
    return rolesToEdit;
}

addUserForm.addEventListener("submit", (event) => {
    event.preventDefault();
    fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: addName.value,
            lastName: addLastName.value,
            age: addAge.value,
            email: addEmail.value,
            password: addPassword.value,
            roles: getRolesFromAddUserForm()
        })
    })
        .then(() => {
            allUsers()
            navHomeTab.click();
        });
})

allUserTable.addEventListener("click", e => {
        e.preventDefault();
        let delButtonIsPressed = e.target.id === 'btn-delete-modal-call';
        let editButtonIsPressed = e.target.id === 'btn-edit-modal-call';

        if (delButtonIsPressed) {
            let currentUserId = e.target.dataset.id;
            fetch(requestURL + "/" + currentUserId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(user => {
                    deleteUsersId.value = user.id;
                    deleteUsersName.value = user.name;
                    deleteUsersLastName.value = user.lastName;
                    deleteUsersAge.value = user.age;
                    deleteUsersEmail.value = user.email;

                    let deleteRoles = user.roles.map(i => i.role)
                    deleteRoles.forEach(
                        role => {
                            if (role === "ROLE_ADMIN") {
                                deleteRoleAdminOption.setAttribute('selected', "selected");

                            } else if (role === "ROLE_USER") {
                                deleteRoleUserOption.setAttribute('selected', "selected");
                            }
                        })
                })

            modalDeleteSubmitBtn.addEventListener("click", e => {
                    e.preventDefault();
                fetch(`${requestURL}/${currentUserId}`, {
                    method: 'DELETE',
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`Failed to delete user. Status: ${res.status} (${res.statusText})`);
                        }
                        return res.text();
                    })
                    .then(() => {
                        console.log("User successfully deleted");
                        allUsers();

                        modalDeleteExitBtn.click();
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error);
                        alert(`Failed to delete user: ${error.message}`);
                    });
                }
            )
        }

        if (editButtonIsPressed) {
            let currentUserId = e.target.dataset.id;
            fetch(requestURL + "/" + currentUserId, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(user => {
                    editUsersId.value = user.id;
                    editUsersName.value = user.name;
                    editUsersLastName.value = user.lastName;
                    editUsersAge.value = user.age;
                    editUsersEmail.value = user.email;

                    let editRoles = user.roles.map(i => i.role)
                    editRoles.forEach(
                        role => {
                            if (role === "ROLE_ADMIN") {
                                editRoleAdminOption.setAttribute('selected', "selected");

                            } else if (role === "ROLE_USER") {
                                editRoleUserOption.setAttribute('selected', "selected");
                            }
                        })
                })
            modalEditSubmitBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                let user = {
                    id: editUsersId.value,
                    name: editUsersName.value,
                    lastName: editUsersLastName.value,
                    age: editUsersAge.value,
                    email: editUsersEmail.value,
                    roles: getRolesFromEditUserForm()
                };
                try {
                    await fetch(`${requestURL}/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify(user)
                    });
                    await allUsers();

                    modalEditExitBtn.click();

                } catch (error) {
                    console.error("Error updating user:", error);
                    alert(`Error updating user: ${error.message}`);
                }
            });
        }
})





