const express = require('express');
const multer = require('multer');
const path = require('path');
const {body,validationResult}=require('express-validator');

const app = express();
app.use(express.json());

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

app.post('/fileupload',upload.single('file'),
[
    body('fileDescription').notEmpty().withMessage('File description is required'),
],
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
         res.status(400).json({errors:errors.array()});
    }
    const file=req.file;
    if(!file){
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
        message:'File uploaded successfully',
    });
}
);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})