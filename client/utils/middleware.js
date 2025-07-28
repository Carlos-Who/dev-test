
export function protectPage() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        window.location.href = '/index.html';
    }
}

export function logout() {
    localStorage.removeItem('userId')
    window.location.href = '/index.html'
}