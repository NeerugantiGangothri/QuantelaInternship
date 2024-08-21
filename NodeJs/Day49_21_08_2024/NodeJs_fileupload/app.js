const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}` + path.extname(file.originalname)); 
  }
});


const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // limit file size to 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

app.get('/', (req, res) => {
    res.render('index'); 
  });


app.post('/upload', upload.single('myImage'), (req, res) => {
  if (req.file) {
    res.render('success', { filename: req.file.filename });
  } else {
    res.send('Error: No file selected');
  }
});


app.listen(3000, () => console.log('Server started on port 3000'));
