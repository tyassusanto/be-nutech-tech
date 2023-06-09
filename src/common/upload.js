const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.PATH_UPLOAD || './upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
    storage,
    fileFilter : (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg") {
            cb(null, true)
        } else {
            cb(new Error('File harus berupa gambar dengan tipe jpg atau png dengan maksimum ukuran 100kb'), false)
        }
    },
    limits: {
        fieldSize: 1000
    }
 });

module.exports = upload