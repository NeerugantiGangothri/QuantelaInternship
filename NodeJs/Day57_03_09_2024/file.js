const express = require('express');
const multer = require('multer');

const app = express();

//setting storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

//middleware for file upload
const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

//route to upload files
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully!');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
