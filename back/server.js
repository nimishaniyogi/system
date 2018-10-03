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
  //var user = new User(userData);
  nodemailer.createTestAccount((err, account) =>  {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport( {
      host:'smtp.gmail.com', 
      port:587, 
      secure:false, 
       auth: {
        user:`3dprintlibrarywsu@gmail.com`, // generated ethereal user
pass:`aamariwsu` // generated ethereal password
      }, 
      tls: {
        rejectUnauthorized:false, 
      }, 
    }); 
    // get file extension
    // setup email data with unicode symbols
    console.log('fileUser', user); 
    console.log('filePath', user.fileName); 
    let mailOptions =  {
      from:'"Register App 👻" <register@example.com>', // sender address
to:'3dprintlibrarywsu@gmail.com', // list of receivers
subject:'New document upoaded', // Subject line
text:'Hello, Following is the new document uploaded', // plain text body
html:` < b > Details: </b >  < h2 > Name:$ {user.name} </h2 >< br > `, // User Data : ${JSON.stringify(user)} // html body 
// for user email : user.email (for reference see your user model), for color: user.Color
attachments:[ {// file on disk as an attachment; get the same name from database saved event
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
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); 

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }); 
  }); 
  // ********************************************************************************
 var userData = req.body; 
  console.log('request body', req.body); 
  var user = new User(userData); 
  // var user=userData;

 user.save((err, result) =>  {
    if (err)
      console.log(err); 

    res.sendStatus(200)
  })
 })

// Form upload Endpoint
app.post('/upload/:name', function uploadAudio(req, res) {
  var fileName = req.params.name; 

  // Store the files in /upload folder inside root directory
  var tmpUploadsPath = './upload'
  var storage = multer.diskStorage( {
    destination:tmpUploadsPath, 
    filename:function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        // set filename to the passed filename in the endpoint
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
      // console.log(`upload-req-body:`);
      // console.log(req.body);
      req.files.forEach(function (item) {
        console.log(`upload - item:` + JSON.stringify(item)); 
        // move your file to destination
        // Moving file to destination End
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
   
  // var file = __dirname + '/upload/' + user.filename;
  var fileName = 'upload/' + reqFileName; 
  // var fileName = '/test/testFile.xlsx'; 


  res.download(fileName); // Set disposition and send it.
}); 


mongoose.connect('mongodb://sysinterface:system17@ds131312.mlab.com:31312/sys_interface', {
useNewUrlParser:true
  }, (err) =>  {
    if ( ! err)
      console.log('connected to mongo')
  })

  app.listen(3000)