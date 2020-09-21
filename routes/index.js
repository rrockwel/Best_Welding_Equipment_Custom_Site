const express = require('express');
const router = express.Router();

// Render Home Page
router.get('/', (req,res, next)=>{
	res.render('index')
})

router.get('/MIG', (req,res,next)=>{
	res.render('mig')
})


module.exports = router;