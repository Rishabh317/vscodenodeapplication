var express = require('express');
var router = express.Router();
var fs = require('fs')
/* GET home page. */
router.get('/',function(req,res){
  fs.readdir('./uploads', function(err,files){
    res.render('index', {files:files, action: ''})
  })
})

router.post('/filecreation', function(req ,res){
  var fileName = `./uploads/${req.body.filename}`
  fs.writeFile(fileName, " " ,function(err){
    fs.readdir('./uploads', function(err,files){
      res.render('index', {files:files , action:'New File Created !'})
    })
  })
})


router.get('/fileopen/:filesname',function(req,res){
  fs.readdir('./uploads', function(err,files){
    var  fileAdress =  `./uploads/${req.params.filesname}`
    fs.readFile(fileAdress,'utf8', function(err,filedata){
    res.render('fileopen', {files:files ,  filedata: filedata , filesname: req.params.filesname ,action: req.params.filesname+" File Opened"} )   
    })
  })
})

router.post('/savefile/:filesname',function(req,res){
  var fileadress = `./uploads/${req.params.filesname}`
  fs.writeFile(fileadress,req.body.filedata,function(err,filedata){
    fs.readdir('./uploads', function(err,files){
      res.render('index', {files:files, action: req.params.filesname+' File saved!'})
    })
  })
}) 


module.exports = router;
