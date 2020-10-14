const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const path = require('path');
const mongoose = require('mongoose');

// Set up mongoose for use with exit survey
// MongoDB Config Information
const db = process.env.MONGODB_URL || "mongodb+srv://RichRock:Snowman1!@exitsurveycluster.brdk9.mongodb.net/exitSurveyDB?retryWrites=true&w=majority"
// Schema
const User = require('../config/schema');
console.log("User Schema: " + User)
// Connect to Mongoose
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true})
	.then(()=>{console.log("mongodb connected")})
	.catch((err)=>{console.log(err)});

// Submit Exit Survey
router.post('/exitSurvey', (req, res, next)=>{
	const { iDontLikeTheDesign, iAmNotInterestedInWeldingProducts, iNeedMoreInformation, couldNotFindSpecifItem, iHaveOtherFeedback } = req.body;
	console.log( iDontLikeTheDesign, iAmNotInterestedInWeldingProducts )
	console.log(req.body);
	const newUser = new User({
		iDontLikeTheDesign,
		iAmNotInterestedInWeldingProducts,
		iNeedMoreInformation,
		couldNotFindSpecifItem,
		iHaveOtherFeedback
	})
	console.log(newUser);

	newUser.save()

	res.render('index')
})

// Render Home Page
router.get('/', (req,res, next)=>{
	res.render('index');
});

router.get('/helmets', (req,res,next)=>{
	res.render('helmets');
});

router.get('/gloves', (req,res,next)=>{
	res.render('gloves');
});

router.get('/Tools-and-Parts', (req,res,next)=>{
	res.render('tools-and-parts');
});

router.get('/MIG-welders', (req,res,next)=>{
	res.render('mig');
});

router.get('/TIG-welders', (req,res,next)=>{
	res.render('tig');
});

router.get('/Multi-welders', (req,res,next)=>{
	res.render('multi');
});

router.get('/about', (req,res,next)=>{
	res.render('about');
});

router.get('/contact', (req,res,next)=>{
	res.render('contact');
});

router.get('/legal', (req,res,next)=>{
	res.render('privacy_disclosure_methods');
});

router.get('/sitemap.xml', (req,res,next)=>{
	res.sendFile(path.join(__dirname, "../public", "sitemap.xml"));
});







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
	const { firstName, lastName, email, message } = req.body;
	let errors = [];
	if(!firstName){
		errors.push({ msg : "Please let us know who you are."})
	} 
	if(!email){
		errors.push({ msg : "Please provide your email so we can get back to you."})
	}
	if(!message){
		errors.push({ msg : "Please let us know what you think by including a message." })
	}
	if(errors.length>0){
		res.render('contact', { errors, firstName, lastName, email, message });
	}else{

		// Setup SMTP Server
		const smtpTrans = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth:{
				type: 'OAuth2',
				user: 'bestweldingequipment@gmail.com',
				clientId: '884457304699-jvel3u2q0p2t3gl0tmsps0apnjddreg8.apps.googleusercontent.com',
				clientSecret: 'k8mkRZCgtdkw1ipgSxniVkyo',
				refreshToken: '1//04a9PGO_yvLQ6CgYIARAAGAQSNwF-L9Ir1U6UrIEsEOfsGo_yl6t5vbp0uFNtm4PotgbCFCVO4UKwvIQRkXasJEql-w9s4vzO_qY',
				accessToken: accessToken
			},
			logger: true,
			debug: true
		})

		// Email Structure
		const mailOpts = {
			from: `${req.body.email}`,
			to: 'bestweldingequipment@gmail.com',
			subject: 'New User Message from Best Welding Equipment',
			text: `${req.body.firstName} ${req.body.lastName} (${req.body.email}) says: ${req.body.message}`
		}

		// Attempt to Send Email
		smtpTrans.sendMail(mailOpts, (error, response)=>{
			if(response){
				console.log("response: " + res);
				res.render('contact-success')
			}else{
				console.log("error: " + error);
			}
		})
	}
	
})



module.exports = router;