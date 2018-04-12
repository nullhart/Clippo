var HID = require("node-hid");
const { exec } = require('child_process');
var crypto = require("crypto");
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const configuration = new FileSync("./configuration.json");
const db = low(configuration);
db.defaults({ configuration: [] }).write();


// var devices = HID.devices();
// console.log('devices:', HID.devices());
// var device = new HID.HID(1452, 632);
var device = new HID.HID(
  "\\\\?\\hid#vid_0079&pid_0006#6&2c8b1625&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}"
);

var state;
device.on("data", function(data) {
    //generate hash from selected bytes
  var cr = crypto
    .createHash("md5")
    .update(data.slice(4, 9))
    .digest("hex");

    if (cr == "efdefc7c2e2639ed20af48608f82d019" && cr != state) {
      console.log('button1')
      exec('vlc -f --video-on-top --freetype-opacity=0 --no-qt-fs-controller --play-and-exit "./vids/alive.mp4"')
      state = cr
    }
    if (cr == "b2ed7d1b9c76d8778297fd3215e1de95" && cr != state) {
      exec('vlc -f --video-on-top --freetype-opacity=0 --no-qt-fs-controller --play-and-exit "./vids/idk_something_amazing.mp4"')
      console.log('button2')
      state = cr
    }

    if (cr == "c6450bcb7fdfc82c8048efe59c650b35" && cr != state) {
      exec('vlc -f --video-on-top  --freetype-opacity=0 --no-qt-fs-controller --play-and-exit "./vids/yeahbaby.mp4"')
      console.log('button3')
      state = cr
    }
    if (cr == "899c07f8dbbac6a10a35db421a07d0e9" && cr != state) {
      exec('vlc -f --video-on-top  --freetype-opacity=0 --no-qt-fs-controller --play-and-exit "./vids/not_bad.mp4"')
      console.log('button4')
      state = cr
    }
    if (cr == "20dfa10acb36cdc8c2406ff53d1c3965" && cr != state) {
      exec('vlc -f --video-on-top  --freetype-opacity=0 --no-qt-fs-controller --play-and-exit "./vids/woops.mp4"')

      setTimeout(() => {
        exec("Taskkill /IM VLC.exe")
      }, 7000);
      console.log('button5')
      state = cr
    }
    if (cr == "a23316f26470cc05e5d000c85e06cabb" && cr != state) {
      exec('vlc -f --video-on-top  --freetype-opacity=0 --no-qt-fs-controller --play-and-exit "./vids/fuckedup.mp4"')
      state = cr
      console.log('button6')
    }
    state = cr

});


device.on("error", function(err) {
  console.log(err);
  return;
});




