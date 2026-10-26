// // install the express library 
// const express = require('express');

// const multer = require('multer');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// // after importing the multer library, and also give the destination folder where the files will be stored, and also give the name of the file that will be stored in the destination folder
// //  and also we have diskstorage method that will be used to store the files in the destination folder
// // ds = disk storage 
// const ds = multer.diskStorage({
//     destination:'uploads/',
//     filename:(req,file,cb)=>{
//         cb(null,Date.now() + '-'+file.originalname)
//     }
// })

// const multerInstance = multer({
//     storage:ds
// });
// const port = 3000;

// app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`);
// })

// // for single file: multer.single('file') // for single file upload
// // for multiple files: multer.array('file', 5) // for multiple file upload, 5 is the maximum number of files that can be uploaded at once
// // for multiple files with different field names: multer.fields([{name:'file1', maxCount:1}, {name:'file2', maxCount:1}]) 
// // // for multiple file upload with different field names    

// app.post('/uploads',multerInstance.single('avatar'),(req,res)=>{
//     res.send('File uploaded successfully');
// });




// ----------------------------------------------
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());

// Storage Configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + "-" + file.originalname);

    }

});

const upload = multer({
    storage: storage,
     limits: {
        fileSize: 2 * 1024 * 1024   // 2 MB
    }
});

// Upload API
app.post("/upload", upload.single("avatar"), (req, res) => {

    res.json({

        success: true,
        message: "File uploaded successfully",

        file: req.file

    });

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});








// //  for multiple files:
// app.post("/upload", upload.array("avatar", 5), (req, res) => {

//     console.log(req.files);

//     res.json({

//         success: true,
//         message: "Files uploaded successfully",

//         files: req.files

//     });

// });