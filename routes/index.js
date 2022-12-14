var express = require('express');
const connection = require('../components/connectDB');
var router = express.Router();
const db = require('../components/connectDB');

/* GET home page. */
router.get('/', async function(req, res, next) {
  //throw new Error('Unknown error!');
  // const poolPromise = db.promise();
  // const result = await poolPromise.query('select * from user');
  // console.log(result[0]);
  res.render('indexFrontEnd');
});

router.post('/', function(req, res, next) {
  //throw new Error('Unknown error!');
  res.render('indexFrontEnd');
});
module.exports = router;
