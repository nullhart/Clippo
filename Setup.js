
const express = require('express')
const app = express()
var HID = require("node-hid");
var exec = require("child_process").exec;
var crypto = require("crypto");
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const configuration = new FileSync("./configuration.json");
const readline = require('readline');
const bodyParser = require("body-parser");
const db = low(configuration);
db.defaults({ configuration: [] }).write();

//select usb device
var device = new HID.HID(
  "\\\\?\\hid#vid_0079&pid_0006#6&2c8b1625&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}"
);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

app.get('/', (req, res) => res.send(`<form action="/" method="post">
Purpose:<br>
<input type="text" name="purpose" value="">
<br>
Command:<br>
<input type="text" name="command" value="">
<br><br>
<input type="submit" value="Submit">
</form> `))

app.post('/', (req, res) => {
    console.log(req.body )
    console.log(state)
    let newCommand = db
    .get("configuration")
    .push(req.body)
    .last()
    .write();
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))


var state;

device.on("data", function(data) {
    //generate hash from selected bytes
  var cr = crypto
    .createHash("md5")
    .update(data.slice(4, 9))
    .digest("hex");
    //only allows to assign a new value to state to avoid unnecessary updates
    if (cr == "55b2a64d39488fdca9c3750344fe1997" || cr == state) {
        return;
    }
    state = cr
    console.log(cr)
});

device.on("error", function(err) {
  console.log(err);
  return;
});



