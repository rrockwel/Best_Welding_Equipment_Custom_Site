const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const path = require('path');


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

router.get('/mig', (req,res,next)=>{
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

router.get('/welding-safety-equipment', (req,res,next)=>{
	res.render('welding-safety-equipment')
})


// Routes for article pages

router.get('/access-to-a-welder', (req,res,next)=>{
	res.render('articles/How-to-Learn-to-Weld/access-to-a-welder');
})

router.get('/protective-equipment', (req,res,next)=>{
	res.render('articles/How-to-Learn-to-Weld/protective-equipment');
})

router.get('/learning-materials', (req,res,next)=>{
	res.render('articles/How-to-Learn-to-Weld/learning-materials');
})

router.get('/how-and-what-to-practice', (req,res,next)=>{
	res.render('articles/How-to-Learn-to-Weld/how-and-what-to-practice');
})


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