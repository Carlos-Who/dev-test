
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const data = await res.json();
            return alert(data.message || 'Login failed');
        }

        const redirectUrl = res.url;
        window.location.href = redirectUrl;
    } catch (err) {
        console.error('Login error:', err);
        alert('Something went wrong');
    }
});