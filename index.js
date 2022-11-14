var express = require('express');
var app = express();
require("dotenv");

const multer = require("multer");
const upload = multer();





const port = process.env.PORT || 3000;

var allFiles =[]

app.use('/public', express.static(process.cwd() + '/public'));


const bodyParser = require("body-parser");
app.use(express.json());
const urlencoded = bodyParser.urlencoded({extended: false});



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/home.html');
});


app.get("/api/fileanalyse", (req, res)=>{

  res.send(allFiles)

})


app.post("/api/addFile", upload.single("upfile"), (req, res)=>{
     

  console.log("file uploaded");
  console.log(req.file);

    // res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.encoding});

     allFiles.push({name: req.file.originalname, type: req.file.mimetype, size: req.file.encoding});

     req.file = "";

})






app.post("/api/deleteFile", urlencoded, (req, res)=>{

  console.log("body");
  console.log(req.body);


  console.log("body");
  console.log(req.body.nameDelete);

  var dlt = req.body.nameDelete;

  for( var i = 0; i <  allFiles.length; i++){ 
                                   
    if (  allFiles[i].name == dlt ) { 
      allFiles.splice(i, 1); 
        i--; 
    }
}

  // res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.encoding});

  // allFiles.push({name: req.file.originalname, type: req.file.mimetype, size: req.file.encoding});

})




app.listen(port, function (){
  console.log('Your app is listening on port ' + port)
});
