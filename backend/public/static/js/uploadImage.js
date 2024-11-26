const form = document.getElementById('uploadForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData);

    fetch(`/produtor/uploadFoto/${sessionStorage.ID_USUARIO}`, {
        method: 'POST',
        body: formData,
    })
    .then((res) => {
        res.json()
        .then((e) => {
            sessionStorage.PATH_FOTO = e.path;
            fotoPerfil.src = sessionStorage.PATH_FOTO;
            imgPerfil.src = sessionStorage.PATH_FOTO;
        })
    })
    .catch((err) => {
        console.log(`#ERRO: ${err}`);
    });

    
});