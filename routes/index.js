var express = require('express');
var router = express.Router();
var broker = require('../src/broker');
/* GET home page. */
router.get('/', function (req, res, next) {
  let dxsmq = broker.create({ username: 'draxus', password: '123456' }, req.headers.host.split(':')[1]);
  dxsmq.createQueue('lithium');
  dxsmq.createQueue('Helium');
  dxsmq.createQueue('Oxygen');
  dxsmq.addToQueue('lithium', '{id:12341, x:3, y:2, z:3}');
  dxsmq.addToQueue('lithium', '{id:12341, x:5, y:3, z:4}');
  //console.log(dxsmq.getAllQueues());
  let message = dxsmq.pullFromQueue('lithium');
  console.log(dxsmq.getQueuesDepth('lithium'));
  res.render('index', {
    queues: dxsmq.getAllQueues(),
    msg: message
  });
});



module.exports = router;
