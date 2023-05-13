const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
})

app.post('/v1/api/upload' , upload.single('file') , (req,res)=>{
    const file = req.file;
    console.log(file);
    res.status(200).json(file?.filename);
})
app.use('/v1/api/posts' , postRoutes);
app.use('/v1/api/auth' , authRoutes);
app.use('/v1/api/users' , usersRoutes);




app.listen(PORT , ()=>console.log(`Server is running on ${PORT}`));