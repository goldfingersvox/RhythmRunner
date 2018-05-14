var express = require("express");
var formidable = require("formidable")
var router = express.Router();
var path=require("path")
var router = express.Router();
var fs=require("fs")
const fileUpload = require('express-fileupload');
var multer= require("multer")
//instructing multer where and how to save files
var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        console.log(file) 
        console.log("filename changed") 
        cb(null, file.originalname+ '-' + Date.now()+".mp3")
    }
})
      
  
var upload = multer({storage : storage} )


//the path to the newly uploded song
let songPath;
//route to homepage
router.get('/', function (req, res){
    res.render("index");
});

//upload route- once file is uploaded, it sends back the name of the file
router.post('/upload', upload.single('song'), function (req, res, next) {
    if(req.file){
    console.log(req.file);
    songPath=req.file.path;

    res.render("index", {file:req.file})


    }
    else if (req.uploadError){
        console.log(req.uploadError)
    }
    

  })
//route for the front end JS to get the songPath
router.get('/upload',function(req,res){
    if (songPath){
        res.send(songPath)
    }
    else{
        console.log("no file")
    }
})
//route link to song that was uploaded
router.get("/uploads/:fileName", function(req, res){
    var file = __dirname + '/../uploads/'+req.params.fileName;
    res.download(file)
    
})

module.exports = router;