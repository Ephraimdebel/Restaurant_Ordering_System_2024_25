const form = document.getElementById('add-admin-form') as HTMLFormElement;

interface Admin {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  roleId: number;
}

form.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  // Extract form data
  const formData = new FormData(form);
  const adminData: Admin = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    roleId: 1, // Role ID for admin
  };

  try {
    // Send data to the backend
    const response = await fetch('http://localhost:3333/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    });

    if (response.ok) {
      const result = await response.json();
      alert('Admin added successfully!');
      console.log('Server response:', result);

      // Reset the form after successful submission
      form.reset();
    } else {
      const error = await response.json();
      alert('Error adding admin: ' + (error.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Request failed:', error);
    alert('Failed to add admin. Please try again.');
  }
});
