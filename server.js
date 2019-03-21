// server.js
// where your node app starts
var myApp = require('./myApp');

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string', (req, res) => {
  var date_string = req.params.date_string
  var unix
  var utc
  if(Number(date_string)){
    unix = Number(date_string)
    utc = new Date(unix).toUTCString()
  }else{
    console.log(new Date(date_string))
    if(new Date(date_string) != 'Invalid Date'){  
      var date = new Date(date_string)
      unix = date.getTime()
      utc = date.toUTCString()
    }else{
      return res.json({
        error: "Invalid Date"
      })
    }
  }
  
  res.json({
    unix : unix,
    utc: utc
  })

})

app.get('/api/timestamp', (req, res) => {
 
  var date = new Date()
  
  
  res.json({
    unix : date,
    utc: date
  })

})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});