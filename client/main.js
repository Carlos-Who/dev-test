import './styles.css'

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error');

    errorMessage.classList.add('hidden')

    try {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log('Login response:', data);

        if (!res.ok) {
            errorMessage.classList.remove('hidden');
            return;
        }

        localStorage.setItem('userId', data._id);
        window.location.href = './pages/user/user-profile.html';
    } catch (err) {
        console.error('Login error:', err);
        errorMessage.textContent = 'Something went wrong. Please try again.';
        errorMessage.classList.remove('hidden');
    }
})