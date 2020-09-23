const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Render Home Page
router.get('/', (req,res, next)=>{
	res.render('index')
})

router.get('/helmets', (req,res,next)=>{
	res.render('helmets')
})

router.get('/gloves', (req,res,next)=>{
	res.render('gloves')
})

router.get('/Tools-and-Parts', (req,res,next)=>{
	res.render('tools-and-parts')
})

router.get('/MIG-welders', (req,res,next)=>{
	res.render('mig')
})

router.get('/TIG-welders', (req,res,next)=>{
	res.render('tig')
})

router.get('/Multi-welders', (req,res,next)=>{
	res.render('multi')
})

router.get('/about', (req,res,next)=>{
	res.render('about')
})

router.get('/contact', (req,res,next)=>{
	res.render('contact')
})




// Setup OAuth2 Client
const oauth2Client = new OAuth2(
	"884457304699-jvel3u2q0p2t3gl0tmsps0apnjddreg8.apps.googleusercontent.com",
	"k8mkRZCgtdkw1ipgSxniVkyo",
	"https://developers.google.com/oauthplayground"
	)

oauth2Client.setCredentials({
	refresh_token: '1//04a9PGO_yvLQ6CgYIARAAGAQSNwF-L9Ir1U6UrIEsEOfsGo_yl6t5vbp0uFNtm4PotgbCFCVO4UKwvIQRkXasJEql-w9s4vzO_qY'
});

const accessToken = oauth2Client.getAccessToken();

router.post('/contact', (req,res,next)=>{
	console.log('hello');
	// console.log(req.body)
	// // Setup SMTP Server
	// const smtpTrans = nodemailer.createTransport({
	// 	host: 'smtp.gmail.com',
	// 	port: 465,
	// 	secure: true,
	// 	auth:{
	// 		type: 'OAuth2',
	// 		user: 'bestweldingequipment@gmail.com',
	// 		clientId: '884457304699-jvel3u2q0p2t3gl0tmsps0apnjddreg8.apps.googleusercontent.com',
	// 		clientSecret: 'k8mkRZCgtdkw1ipgSxniVkyo',
	// 		refreshToken: '1//04a9PGO_yvLQ6CgYIARAAGAQSNwF-L9Ir1U6UrIEsEOfsGo_yl6t5vbp0uFNtm4PotgbCFCVO4UKwvIQRkXasJEql-w9s4vzO_qY',
	// 		accessToken: accessToken
	// 	}
	// })

	// // Email Structure
	// const mailOpts = {
	// 	from: '${req.body.email}',
	// 	to: 'bestweldingequipment@gmail.com',
	// 	subject: 'New User Message from Best Welding Equipment',
	// 	text: '${req.body.firstName} ${req.body.lastName} (${req.body.email}): ${req.body.message}'
	// }

	// // Attempt to Send Email
	// smtpTrans.sendMail(mailOpts, (err, res)=>{
	// 	if(err){
	// 		res.render('contact')
	// 		console.log(err);
	// 	}else{
	// 		res.render('contact')
	// 		console.log(res);
	// 	}
	// })
})



module.exports = router;