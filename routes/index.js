var express = require('express');
var router = express.Router();
var broker = require('../src/broker');
var dxsmq = broker.create({ username: 'test', password: '123456' }, 0);

/* GET home page. */
router.get('/', function (req, res, next) {
  dxsmq.setPort(req.headers.host.split(':')[1]);
  res.render('index', {
    queues: dxsmq.getAllQueues()
  });
});

router.post('/create-queue', function (req, res, next) {
  if (typeof req.body.qname != 'undefined')
    dxsmq.createQueue(req.body.qname);

  res.redirect('/');
})

router.post('/add-to-queue', function (req, res, next) {
  dxsmq.addToQueue(req.body.qname, req.body.qmessage);
  res.redirect('/');
});

router.get('/pull-from-queue', function (req, res, next) {
  dxsmq.pullFromQueue();
});


module.exports = router;

