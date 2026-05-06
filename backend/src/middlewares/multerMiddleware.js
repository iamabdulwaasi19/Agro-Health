// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// // Ensure upload directory exists
// const uploadDir = path.join(__dirname, '../uploads/');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads/')); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images are allowed!'), false);
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }
// });

// module.exports = upload;


// // const multer = require('multer');
// // const fs = require('fs');
// // const path = require('path');

// // // Ensure upload directory exists
// // const uploadDir = 'uploads/';
// // if (!fs.existsSync(uploadDir)) {
// //     fs.mkdirSync(uploadDir, { recursive: true });
// // }

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, uploadDir);
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + '-' + file.originalname);
// //   }
// // });

// // const upload = multer({ storage });
// // module.exports = upload;

const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Use a path relative to the root of your project
const uploadDir = 'uploads'; 

// Ensure directory exists synchronously on startup
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    // Keep it simple to avoid special character issues in URLs
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;