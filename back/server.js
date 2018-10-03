var express = require('express')
var app = express()
var cors = require('cors')
var mongoose = require('mongoose')
var multer = require('multer')
var User = require('./models/user'); 
var bodyPaser = require('body-parser'); 
var crypto = require('crypto'); 
var mime = require('mime'); 
var nodemailer = require('nodemailer'); 


app.use(cors()); 
app.use(bodyPaser.json())

app.get('/', (req, res) =>  {
  res.send('hello world')
}); 

// get all users
app.get('/user', (req, res) =>  {
  User.find( {}, (err, users) =>  {
console.log(users); 
res.send(users); 
  })
 })

app.post('/create', (req, res) =>  {
 
  var user = req.body; 
  console.log('user req body', user); 
  
  nodemailer.createTestAccount((err, account) =>  {
   
    let transporter = nodemailer.createTransport( {
      host:'smtp.gmail.com', 
      port:587, 
      secure:false, 
       auth: {
        user:` `, // generated ethereal user
pass:` ` // generated ethereal password
      }, 
      tls: {
        rejectUnauthorized:false, 
      }, 
    }); 
  
    console.log('fileUser', user); 
    console.log('filePath', user.fileName); 
    let mailOptions =  {
      from:'" ', // sender address
to:' ', // list of receivers
subject:'New document upoaded', // Subject line
text:'Hello, Following is the new document uploaded', // plain text body
html:` < b > Details: </b >  < h2 > Name:$ {user.name} </h2 >< br > `, 
attachments:[ {
filename:user.filename, 
        path:__dirname + '/upload/' + user.filename // stream this file
      }]
    }; 

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) =>  {
      if (error) {
        return console.log(error); 
      }
      console.log('Message sent: %s', info.messageId); 
      
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); 
    }); 
  }); 
 
 var userData = req.body; 
  console.log('request body', req.body); 
  var user = new User(userData); 


 user.save((err, result) =>  {
    if (err)
      console.log(err); 

    res.sendStatus(200)
  })
 })

// Form upload Endpoint
app.post('/upload/:name', function uploadAudio(req, res) {
  var fileName = req.params.name; 

  var tmpUploadsPath = './upload'
  var storage = multer.diskStorage( {
    destination:tmpUploadsPath, 
    filename:function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        
        console.log(`fname:`, fileName); 
        cb(null, fileName); 
      }); 
    }
  }); 
  var upload = multer( {
    storage:storage
  }).any(); 

  upload(req, res, function (err) {
    if (err) {
      console.log(err); 
      return res.end('Error'); 
    }else {
     
      req.files.forEach(function (item) {
        console.log(`upload - item:` + JSON.stringify(item)); 
        
      }); 
      res.end('File uploaded'); 
    }
  }); 
}); 
// Form upload End point End
// Create Endpoint End 

//download file
app.get('/download/:fileName', function(req, res) {
  let reqFileName = req.params.fileName;
  var fileName = 'upload/' + reqFileName; 
 res.download(fileName); 
}); 

// link of the database
mongoose.connect('mongodb://<dbuser>:<dbpassword>@link', {
useNewUrlParser:true
  }, (err) =>  {
    if ( ! err)
      console.log('connected to mongo')
  })

  app.listen(3000)