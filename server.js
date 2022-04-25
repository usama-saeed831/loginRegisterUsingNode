var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
global.registerUsers = [];

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   // res.send('Hello App');
   console.log("registerUsers ===", registerUsers);
   res.sendFile(__dirname + '/static/login.html');
})

app.get('/protectedPage', function (req, res) {
   console.log("Got a GET request for the protectedPage");
   // res.send('Hello App');
   res.sendFile(__dirname + '/static/protected.html');
})

// This responds a POST request for the homepage
app.post('/register', function (req, res) {
   console.log("Got a POST request for the register");
   /* validation */

   let name=req.body.username;  
   let password=req.body.password;   
   let email=req.body.email;   
   let matchString = /^([?=.*\d]?)(?=.*[a-z])(?=.*[A-Z]).{6,6}$/;
   let p_flag = false;
   let e_flag = false;
   if(password.match(matchString)) 
   { 
      p_flag = true 
   }
   else
   { 
      console.log('password is wrong');
   }

   const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (validateEmail(email)) {
      e_flag = true
    } else {
      console.log('email is wrong');
   }

   if(p_flag && e_flag){
      global.registerUsers.push(req.body);
      console.log("req ===", JSON.stringify(req.body));
      res.redirect('/');
   }else{
      console.log("p_flag", p_flag);
      console.log("e_flag", e_flag);
      console.log("else req ===", JSON.stringify(req.body));
      res.send('email or password is incorrect');
   }

   
})

// This responds a POST request for the homepage
app.get('/registerForm', function (req, res) {
   console.log("Got a GET request for the registerForm");
   res.sendFile(__dirname + '/static/register.html');
})

// This responds a GET request for the /login page.
app.post('/login', function (req, res) {
   console.log("Got a GET request for login");
   //res.send('login');
   let username = req.body.username;
   let password = req.body.password;

   let obj = global.registerUsers.find((o, i) => {
      if (o.username === username && o.password === password) {
         // res.send(`Username: ${username} Password: ${password} correct`);
         res.sendFile(__dirname + '/static/protected.html');
         return true; // stop searching
      }
  });

  console.log("obj ===", obj);
  if(obj === undefined){
   res.send(`Username: ${username} Password: ${password} is incorrect`);
  }

   
})

// This responds a POST request for the homepage
app.get('/test', function (req, res) {
   console.log("req ===", JSON.stringify(req));
   console.log("test ===", global.registerUsers);
   res.send("test");
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})