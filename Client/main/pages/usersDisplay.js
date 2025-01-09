var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const API_URL = 'http://localhost:3333/users';
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3333/users');
            const users = yield response.json();
            renderUsers(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    });
}
function renderUsers(users) {
    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${user.user_id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phoneNumber || 'N/A'}</td>
                    <td>${user.role ? user.role.name : 'N/A'}</td>
                    <td>${new Date(user.created_at).toLocaleString()}</td>
                    <td><button onclick="deleteUser(${user.user_id})">Delete</button></td>
                `;
        tableBody.appendChild(row);
    });
}
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // const deleteUrl = `${API_URL}/${userId}`;
        const deleteUrl = `http://localhost:3333/users/${userId}`;
        try {
            const response = yield fetch(deleteUrl, { method: 'DELETE' });
            if (response.ok) {
                alert(`User ${userId} deleted successfully.`);
                fetchUsers(); // Refresh the user list
            }
            else {
                alert(`Failed to delete user ${userId}.`);
            }
        }
        catch (error) {
            console.error('Error deleting user:', error);
        }
    });
}
// Fetch and display users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);
