interface UserRole {
  id: number;
  name: string;
}

interface UserStatusResponse {
  user_id: number;
  name: string;
  email: string;
  phoneNumber: string;
  created_at: string;
  deletedAt: string | null;
  role: UserRole;
  iat: number;
  exp: number;
}

// Function to check if the user is logged in and if they are an admin
const checkUserStatus = async (): Promise<{ loggedIn: boolean; isAdmin: boolean }> => {
  const token = sessionStorage.getItem('authToken');

  if (!token) {
    // If no token is found in session storage, the user is not logged in
    return { loggedIn: false, isAdmin: false };
  }

  try {
    // Make a request to the backend to get the user's status
    const response = await fetch('http://localhost:3333/auth/status', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData: UserStatusResponse = await response.json();

    // Check if the user's role is "Admin"
    const isAdmin = userData.role.name === 'Admin';

    return { loggedIn: true, isAdmin };
  } catch (error) {
    console.error('Error fetching user status:', error);

    // If the request fails, consider the user not logged in
    return { loggedIn: false, isAdmin: false };
  }
};

// Modify the header based on the user's login status
const modifyHeader = async (): Promise<void> => {
  const logoutButton = document.querySelector('.logoutButton') as HTMLAnchorElement;
  const dashboardLink = document.querySelector('.contactButton') as HTMLAnchorElement;

  if (!logoutButton || !dashboardLink) {
    console.error('Required elements not found in the DOM.');
    return;
  }

  const status = await checkUserStatus();

  if (status.loggedIn) {
    // If the user is logged in, set the button to logout functionality
    logoutButton.textContent = 'Logout';
    logoutButton.href = '#';
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.removeItem('authToken');
      window.location.href = './index.html';
    });

    // Show the dashboard link only if the user is an admin
    if (status.isAdmin) {
      dashboardLink.style.display = 'block';
    } else {
      dashboardLink.style.display = 'none';
    }
  } else {
    // If the user is not logged in, set the button to redirect to login
    logoutButton.textContent = 'Sign In';
    logoutButton.href = './pages/login.html';

    // Hide the dashboard link for non-logged-in users
    dashboardLink.style.display = 'none';
  }
};

// Call the function on page load
document.addEventListener('DOMContentLoaded', modifyHeader);
