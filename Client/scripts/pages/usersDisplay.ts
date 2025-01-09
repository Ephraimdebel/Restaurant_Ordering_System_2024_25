interface Role {
    id: number;
    name: string;
}

interface User {
    user_id: number;
    name: string;
    email: string;
    phoneNumber: string | null;
    created_at: string;
    role: Role | null;
}

// const API_URL = 'http://localhost:3333/users';

        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:3333/users');
                const users = await response.json();
                renderUsers(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
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

        async function deleteUser(userId) {
            // const deleteUrl = `${API_URL}/${userId}`;
            const deleteUrl = `http://localhost:3333/users/${userId}`;
            try {
                const response = await fetch(deleteUrl, { method: 'DELETE' });
                if (response.ok) {
                    alert(`User ${userId} deleted successfully.`);
                    fetchUsers(); // Refresh the user list
                } else {
                    alert(`Failed to delete user ${userId}.`);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }

        // Fetch and display users when the page loads
        document.addEventListener('DOMContentLoaded', fetchUsers);