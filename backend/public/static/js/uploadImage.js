const form = document.getElementById('uploadForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData);

    try {
        const response = await fetch(`/produtor/uploadFoto/${sessionStorage.ID_USUARIO}`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erro no upload:', error);
    }
});