var express = require('express');
var router = express.Router();

// var multer  = require('multer')
// var multerGridFs = require('multer-gridfs-storage');
// var Gridfs = require('gridfs-stream');

// const multerGridFsStorage = multerGridFs({
//    url: process.env.DB_URI
// });
// var upload = multer({ storage: multerGridFsStorage });

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');

router.post('/login', function(req, res, next) {
  const userName = req.body.sub;
  const userAlarm = req.body.sub + "Alarm";
  console.log(userAlarm);
  req.db.listCollections({name: userName})
    .next(function(err, collinfo) {
        if (collinfo) {
            console.log("accessed DB")
        }
        else{
          req.db.createCollection(userName);
        }
    });

    req.db.listCollections({name:userAlarm})
      .next(function(err, collinfo) {
          if (collinfo) {
              console.log("DBAlarm exist!!!!")
              res.json({
                data:"hasDBAlarm"
              });
          }
          else{
            req.db.createCollection(userAlarm);
            console.log("no Alarm!!")
            res.json({
            });
          }
      });
});

router.post('/uploadPic', function(req, res, next){
  const userName = req.body.name.sub;
  const pic = req.body.pic;
  var picConfig = {
    pic: pic
  }
  req.db.collection(userName).insertOne(picConfig);
  res.json({});
});

router.post('/addAlarm', function(req, res, next){
  const userName = req.body.name.sub + "Alarm";
  const alarmId = req.body.id;
  const alarmHour = req.body.hour;
  const alarmMinute = req.body.minute;
  const alarmRepeat = req.body.repeat;
  const alarmLabel = req.body.label;
  var alarmTime = [];
  console.log(alarmRepeat);
  alarmTime.push(alarmHour);
  alarmTime.push(alarmMinute);
  var alarmConfig = {
    id: alarmId,
    time: alarmTime,
    repeat: alarmRepeat,
    label: alarmLabel,
    status: true
  };
 req.db.collection(userName).insertOne(alarmConfig);
 res.json({});
});

router.post('/updateAlarm', function(req, res, next){
 const userName = req.body.name.sub + "Alarm";
 const alarmId = req.body.id;
 const alarmHour = req.body.hour;
 const alarmMinute = req.body.minute;
 const alarmRepeat = req.body.repeat;
 const alarmLabel = req.body.label;
 const alarmStatus = req.body.status;
 var alarmTime = [];
 alarmTime.push(alarmHour);
 alarmTime.push(alarmMinute);
 var alarmConfig = {
   id: alarmId,
   time: alarmTime,
   repeat: alarmRepeat,
   label: alarmLabel,
   status: true
 }
 req.db.collection(userName).updateOne({"id" : alarmId}, {$set: {
   'time': alarmTime,
   'repeat': alarmRepeat,
   'label': alarmLabel,
   'status': alarmStatus
 }});
 res.json({});
});

router.post('/getAlarm', function(req, res, next) {
 const userName = req.body.sub + "Alarm";
 req.db.collection(userName).find().toArray(function(err, result){
   res.json({
     alarmList: result
   });
 });
});

router.post('/deleteAlarm', function(req, res, next) {
 const userName = req.body.name.sub + "Alarm";
 const alarmId = req.body.id;
 console.log(alarmId, "here is the delete ID")
 req.db.collection(userName).deleteOne({
   'id': alarmId
 });
 res.json({});
});

router.post('/getData', function(req, res, next) {
  const userName = req.body.sub;
  req.db.collection(userName).find().toArray(function(err, result){
      res.json({
        pic: result
      });
  });
});

module.exports = router;
