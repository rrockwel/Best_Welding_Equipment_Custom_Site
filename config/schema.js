const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	iDontLikeTheDesign:{
		type:String,
		required:false
	},
	iAmNotInterestedInWeldingProducts:{
		type:String,
		required:false
	},
	iNeedMoreInformation:{
		type:String,
		required:false
	},
	couldNotFindSpecifItem:{
		type:String,
		required:false
	},
	iHaveOtherFeedback:{
		type:String,
		required:false
	}

})

const User = mongoose.model("User", UserSchema);

module.exports = User;