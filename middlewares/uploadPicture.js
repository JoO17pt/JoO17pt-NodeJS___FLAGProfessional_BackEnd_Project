// 1. Variables Declaration =================================================================

const multer  = require('multer');

// 2. Generate random name for files ========================================================

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// 3. Manage the file storage ===============================================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      switch (req.originalUrl) {
        case "/user/register":
          cb(null, './public/profilePics/')
          break;
        case "/user/update":
          cb(null, './public/profilePics/')
          break;
        case "/product/new":
          cb(null, './public/productPics/')
          break;
      }
    },
    filename: function (req, file, cb) {
      const file_type = file.mimetype.substring(file.mimetype.indexOf('/')+1)
      cb(null, (generateString(30) + '.' + file_type).trim())
    }
  })
  
const upload = multer({ storage: storage })

module.exports = upload;