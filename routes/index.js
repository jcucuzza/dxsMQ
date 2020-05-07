var express = require('express');
var router = express.Router();
var broker = require('../src/broker');
var dxsmq = broker.create({ username: 'test', password: '123456' }, 0);

dxsmq.createQueue('lithium');
dxsmq.createQueue('helium');
dxsmq.createQueue('vanadium');

var pull;

/* GET home page. */
router.get('/', function (req, res, next) {
  dxsmq.setPort(req.headers.host.split(':')[1]);
  res.render('index', {
    queues: dxsmq.getAllQueues(),
    port: dxsmq.port(),
    pull: pull
  });
});

router.post('/create-queue-index', function (req, res, next) {
  if (typeof req.body.qname != 'undefined')
    dxsmq.createQueue(req.body.qname);

  res.redirect('/');
})

router.post('/add-to-queue-index', function (req, res, next) {
  dxsmq.addToQueue(req.body.qname, req.body.qmessage);
  res.redirect('/');
});

router.post('/pull-from-queue-index', function (req, res, next) {
  pull = dxsmq.pullFromQueue(req.body.qname2);
  res.redirect('/');
});

//TODO: will have to create a list to store ip address that are pulled from draxusio server for security purposes and use those ip addresses in origin.
router.post('/add-to-queue', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  dxsmq.addToQueue(req.body.qname, req.body.qmessage);
  res.sendStatus(200);
});

router.post('/pull-from-queue', function (req, res, next) {
  res.json(dxsmq.pullFromQueue(req.body.qname));
})




module.exports = router;

