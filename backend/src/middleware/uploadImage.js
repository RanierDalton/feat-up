const multer = require('multer');
const path = require('path');

// Configuração do destino e nome dos arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/static/assets/profiles/'); // Pasta onde os arquivos serão armazenados
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único
    }
});

// Inicialização do multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }
});

module.exports = upload;