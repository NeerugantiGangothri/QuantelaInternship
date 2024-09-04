const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024*1024*5 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
  
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Extension is invalid!');
    }
}

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/multiple',(req,res)=>{
    res.render('multiple');
})

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file); 
    if (!req.file) {
        return res.render('error', { errorMsg: 'No file selected!' });
    }
    res.render('success', { filename: req.file.filename });
});

app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
    console.log(req.files); 
    if (!req.files || req.files.length === 0) {
        return res.render('error', { errorMsg: 'No files selected!' });
    }
    res.render('success', { filenames: req.files.map(file => file.filename) });
});

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath=`uploads/${filename}`;
    res.download(filepath,(err)=>{
        if(err){
            res.status(404).send('File Not Found');
        }
        else{
            res.status(200).send('File Downloaded Successfully');
        }
    });
});


app.listen(3000, () => console.log('Server started on port 3000'));
