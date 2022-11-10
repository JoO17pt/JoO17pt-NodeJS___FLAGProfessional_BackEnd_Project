const multer  = require('multer');

// Generate random name for files =====================================================

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// Manage the file storage =========================================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/profilePics/')
    },
    filename: function (req, file, cb) {
      const file_type = file.mimetype.substring(file.mimetype.indexOf('/')+1)
      cb(null, generateString(30) + '.' + file_type)
    }
  })
  
const upload = multer({ storage: storage })

module.exports = upload;