const multer = require('multer');

// Define the Multer middleware configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const cityName = req.body.selectedCityName; 
    const folderPath = `F:/Plantify/client/public/images/${cityName}`;
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, 'image_' + Date.now() + '.' + ext);
  },
});

const upload = multer({ storage });

module.exports = upload;
