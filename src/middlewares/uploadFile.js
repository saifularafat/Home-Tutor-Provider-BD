const multer = require('multer')

const {
    ALLOWED_FILE_TYPES,
    MAX_FILE_SIZE,
} = require("../config");

const userStorage = multer.memoryStorage();


// const userStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, UPLOAD_USER_IMG_DIRECTORY);
//     },

//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

const fileFilter = (req, file, cb) => {

    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed'), false)
    }

    if (file.size > MAX_FILE_SIZE) {
        return cb(new Error('File size exceeds the maximum limit'), false)
    }

    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        return cb(new Error('File type is not allowed'), false)
    }
    cb(null, true)
}
const userImageUpload = multer({
    storage: userStorage,
    fileFilter: fileFilter,
})

module.exports = {
    userImageUpload,
};