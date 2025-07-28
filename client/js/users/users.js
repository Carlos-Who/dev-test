
export async function loadUserProfile() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
        const res = await fetch(`/user/profile?userId=${userId}`);
        const data = await res.json();

        if (!res.ok) {
            console.error('Failed to fetch user:', data.message);
            return;
        }


        const heading = document.querySelector('h3');
        if (heading) {
            heading.textContent = `Welcome ${data.name.first}.`;
        }


        const fields = [
            ['company', data.company],
            ['fullName', `${data.name.first} ${data.name.last}`],
            ['isActive', data.isActive ? 'Yes' : 'No'],
            ['age', data.age],
            ['eyeColor', data.eyeColor],
            ['email', data.email],
            ['phone', data.phone],
            ['address', data.address],
            ['balance', data.balance]
        ];

        fields.forEach(([field, value]) => {
            const el = document.querySelector(`[data-field="${field}"]`);
            if (el) {
                el.textContent = value ?? '[N/A]';
            }
        });


        const profileImages = document.querySelectorAll('.profile-pic');
        const fallback = 'https://placehold.co/64x64?text=Img';

        if (!profileImages.length) {
            console.warn('No se encontraron elementos con la clase .profile-pic en el DOM.');
        }

        profileImages.forEach(img => {
            img.src = data.picture ?? fallback;
        });

    } catch (error) {
        console.error('Error loading profile:', error);
    }
}


export async function populateEditForm() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
        const res = await fetch(`/user/profile?userId=${userId}`);
        const data = await res.json();

        if (!res.ok) {
            console.error('Failed to fetch user:', data.message);
            return;
        }

        const isActiveEl = document.getElementById('isActive');

        document.getElementById('profile-preview')?.setAttribute('src', data.picture ?? 'https://placehold.co/96x96?text=Img');
        document.getElementById('company')?.setAttribute('value', data.company ?? '');
        document.getElementById('first-name')?.setAttribute('value', data.name?.first ?? '');
        document.getElementById('last-name')?.setAttribute('value', data.name?.last ?? '');
        if (isActiveEl) {
            isActiveEl.value = data.isActive ? 'Yes' : 'No';
        }
        document.getElementById('age')?.setAttribute('value', data.age ?? '');
        document.getElementById('eye-color')?.setAttribute('value', data.eyeColor ?? '');
        document.getElementById('email')?.setAttribute('value', data.email ?? '');
        document.getElementById('phone-number')?.setAttribute('value', data.phone ?? '');
        document.getElementById('street-address')?.setAttribute('value', data.address ?? '');

    } catch (err) {
        console.error('Error populating edit form:', err);
    }
}

function getBase64Image(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function setupImagePreview() {
    const fileInput = document.getElementById('picture');
    const previewImage = document.getElementById('profile-preview');

    if (!fileInput || !previewImage) return;

    const originalSrc = previewImage.src;

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file) {
            previewImage.src = originalSrc;
            return;
        }

        const reader = new FileReader();
        reader.onload = e => {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}


export function handleEditFormSubmit() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        if (!userId) return;

        let base64Image = document.getElementById('profile-preview').src;
        const fileInput = document.getElementById('picture');
        if (fileInput?.files?.[0]) {
            base64Image = await getBase64Image(fileInput.files[0]);
        }

        const payload = {
            userId,
            company: document.getElementById('company')?.value,
            firstName: document.getElementById('first-name')?.value,
            lastName: document.getElementById('last-name')?.value,
            isActive: document.getElementById('isActive')?.value,
            age: document.getElementById('age')?.value,
            eyeColor: document.getElementById('eye-color')?.value,
            email: document.getElementById('email')?.value,
            phone: document.getElementById('phone-number')?.value,
            address: document.getElementById('street-address')?.value,
            picture: base64Image,
        };

        try {
            const res = await fetch('/user/profile/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (!res.ok) {
                console.error('Error updating user:', result.message);
                return;
            }

            window.location.href = '../user/user-profile.html';
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    });
}