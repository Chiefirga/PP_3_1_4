const currentUserPanelData = document.getElementById("current_user_panel-data");
const currentAuthorisedUserData = document.getElementById("current_authorised_user-data");
const leftMenu = document.getElementById("leftMenu");

let currentUser = () => {
    fetch("http://localhost:8080/api/user", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(user => {
            if (user != null && user.roles) {
                currentUserPanelData.innerHTML = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(role => role.role.replace("ROLE_", "")).join(", ")}</td>
                </tr>
            `;
                const formattedRoles = user.roles.map(role => role.role.replace("ROLE_", "")).join(", ");
                currentAuthorisedUserData.innerHTML = `
                <strong>${user.email}</strong>
                <span class="ms-1">with roles: ${formattedRoles}</span>
            `;
            }
                leftMenu.innerHTML = `<ul class="list-group" style="margin-top: 20px">
                        <li class="list-group-item active">
                        <a>
                            User
                        </a>
                        </li></ul>`;
        })
        .catch(error => console.error("Error fetching user data:", error));
};
currentUser()
