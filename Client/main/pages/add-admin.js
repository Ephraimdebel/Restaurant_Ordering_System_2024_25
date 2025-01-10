var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById('add-admin-form');
form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
    e.preventDefault();
    // Extract form data
    const formData = new FormData(form);
    const adminData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        phoneNumber: formData.get('phoneNumber'),
        roleId: 1, // Role ID for admin
    };
    try {
        // Send data to the backend
        const response = yield fetch('http://localhost:3333/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData),
        });
        if (response.ok) {
            const result = yield response.json();
            alert('Admin added successfully!');
            console.log('Server response:', result);
            // Reset the form after successful submission
            form.reset();
        }
        else {
            const error = yield response.json();
            alert('Error adding admin: ' + (error.message || 'Unknown error'));
        }
    }
    catch (error) {
        console.error('Request failed:', error);
        alert('Failed to add admin. Please try again.');
    }
}));
