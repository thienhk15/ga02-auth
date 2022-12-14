const express = require('express');
const router = express.Router();


 
router.get('/', function(req, res, next)
{
    res.render('admin/accounts/adminProfile', {layout: 'layoutAdmin.hbs'});
})


module.exports = router;