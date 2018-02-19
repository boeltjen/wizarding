Array.prototype.remove = function(string) {
	var index = this.indexOf(string);
	if (index > -1) {
		this.splice(index, 1);
	}
}

/*var saveReturn = function(thisWizard,normalReturnObj) {
	wiz(thisWizard.nameID).saveToDB();
	return normalReturnObj;
}*/

var wizardDB = [];
// structure of wizardDB = [[nameID,x,y,z,{geo: , bag: , health: , money: , history: {places:[], stories:[], tags:[]}, etc..}]]


var storiesDB = [];
// structure of storiesDB = [[ID,placeName,{conditions:[],impacts:[],story:""}]]

var messagesDB = [];
// structure of mesagesDB = [[read/unread, toWizardName, type, {msgDateTime: , fromWizardName: ,  msgBody: }]]
// the {type} field states is it's a 'chat' message, a 'reaction' message, etc..

var placesDB = [];
// structure of placesDB = [[ID,x,y,z,{walls:{posX:,posY:,posZ:,negX:,negY:,negZ:,posXmsg=""}, placeDescription: {basic:, detailed:, returned:}, hideIfPlayedStory:storyID},'placeName']]  (note: hideIfPlayed is not present)

var teamsDB = [];
// structure of teamsDB = [[teamNameID,{members: [wizardIDs], teamAdmin: "wizardID", teamPassword: "password"}]]

var placesDB = [];
for (let i =0; i<placesDBobj.length;i++){
	let tempPlaceDetailsObj = JSON.stringify(placesDBobj[i][4]);
	placesDB.push([placesDBobj[i][0],placesDBobj[i][1],placesDBobj[i][2],placesDBobj[i][3],tempPlaceDetailsObj,placesDBobj[i][5]]);
}


// structure of storiesDB = [[storyID,x,y,z,{order:#,conditions:[],impacts:[],story:""}]]
//testing utility showStoriesByPlace looking up the storiesDBobj
var showStoriesByPlace = function(tempPlaceName) {
	if(tempPlaceName == undefined) {
		console.log(storiesDBobj);
		return;
	}
	if (typeof tempPlaceName == 'number') {
		console.log("StoryID #",tempPlaceName);
		storiesDBobj.forEach(function(storyElement,index){
			if(index == tempPlaceName) {
				console.log(storyElement.story);
				console.log('Order:',storyElement.order);
				console.log('Conditions:');
				storyElement.conditions.forEach(function(conditionElement){
					console.log('aspect:',conditionElement.aspect,'action:',conditionElement.action,'value:',conditionElement.value);
				});
				console.log('Impacts:');
				storyElement.impacts.forEach(function(conditionElement){
					console.log('aspect:',conditionElement.aspect,'action:',conditionElement.action,'value:',conditionElement.value);
				});			
			}
		});
	} else if (typeof tempPlaceName == 'string') {
		//console.log(tempPlaceName," stories (if any):");
		storiesDBobj.forEach(function(storyElement,index){
			if(storyElement.location == tempPlaceName) {
				console.log(index,storyElement.order,storyElement.story);
				console.log(storyElement.conditions.length);
			}
		});	
	}	
}

var storiesDB = [];
var updateStoriesDB = function() {
	storiesDB = [];
	for (let i=0; i<storiesDBobj.length;i++){
		let tempStoryDetailsObj = JSON.stringify(storiesDBobj[i]);
		storiesDB.push([i,storiesDBobj[i].location,tempStoryDetailsObj]);
	}
	return "storiesDB updated!";
}
updateStoriesDB();



// **** start of hidden.places functions ************
var places = function() {
	this.value = [];
}

places.prototype.add = function(placeID) {
	if(this.value[this.value.length - 1] != placeID) {
		this.value.push(placeID);
	}
	return this.value;
}

places.prototype.remove = function(placeID) {
	this.value.remove(placeID);
	return this.value;
}
// IF placeID type = num, then use actual placeID from placesDB.  If placeID type = string, then lookup string from placesDB and return for the function to act upon.
places.prototype.has = function(place) {
	
	if (typeof place == 'number') {
		let placeID = place;
		return (this.value.includes(placeID));

	} else if (typeof place == 'string') {
		
		let placeName = place;
		let placeID = map.returnPlaceID(placeName);
		return (this.value.includes(placeID));
	}
}

places.prototype.hasNot = function(place) {
	if (typeof place == 'number') {
		let placeID = place;
		return (!this.value.includes(placeID));
	} else if (typeof place == 'string') {
		let placeName = place;
		let placeID = map.returnPlaceID(placeName);
		return (!this.value.includes(placeID));
	}
}

// ******** end of hidden.places functions ********


// **** start of hidden.stories functions ************
var stories = function() {
	this.value = [];
}

stories.prototype.add = function(storyID) {
	if(this.value[this.value.length - 1] != storyID) {
		this.value.push(storyID);
	}
	return this.value;
}

stories.prototype.remove = function(storyID) {
	this.items.remove(storyID);
	return this.value;
}

stories.prototype.has = function(storyID) {
	return (this.value.includes(storyID));
}

stories.prototype.hasNot = function(storyID) {
	return (!this.value.includes(storyID));
}
// ******** end of hidden.stories functions ********


// **** start of tags functions ************
var tags = function() {
	this.value = [];
}

tags.prototype.add = function(tagName) {
	this.value.push(tagName);
	return this.value;
}

tags.prototype.remove = function(tagName) {
	this.value.remove(tagName);
	return this.value;
}

tags.prototype.has = function(tagName) {
	return (this.value.includes(tagName));
}

tags.prototype.hasNot = function(tagName) {
	return (!this.value.includes(tagName));
}
// ******** end of hidden.tags functions ********


// **** start of history function ***********
var hidden = function() {
	this.places = new places();
	this.stories = new stories();
	this.tags = new tags();
}
// **** end of history function ***********



// **** start of bag functions ************
var bag = function(wizard) {
	var thisWizard = wizard;
	this.items = [];
	this.using = [];
	this.use = function(thing) {
		//return any items being used to the bag
		this.returnTo();
		thisWizard.log("@" + thisWizard.nameID + " tries to use the " + thing + ", ");
		if(this.has(thing)) {
			this.items.remove(thing);
			this.using.push(thing);
		} else {
			wizard.log("but doesn't have it in their bag...\n\n")
		}
		map.reactTo(thisWizard);
		return thisWizard.unread();

	};
}

bag.prototype.add = function(thing) {
	this.items.push(thing);
	return this.items;
}

/*bag.prototype.use = function(thing) {
	this.using.push(thing);
	return this.using;
}*/


bag.prototype.remove = function(thing) {
	if (this.using.includes(thing)) {
		this.using.remove(thing);
	} 
	else { 
		this.items.remove(thing);
	}
	return this.items;
}

bag.prototype.has = function(thing) {
	return (this.items.includes(thing) || this.using.includes(thing));
}

bag.prototype.hasNot = function(thing) {
	return (!this.items.includes(thing) && !this.using.includes(thing));
}

bag.prototype.returnTo = function(thing) {
	if (thing == undefined) {
		//return any items still being used items to bag (e.g. anything under using -> items)
		for (var i =0; i<this.using.length; i++) {
			var tempThing = this.using[i];	
			this.using.remove(tempThing);
			this.items.push(tempThing);
		}
	} 
	else if (this.using.includes(thing)) {
		this.using.remove(thing);
		this.items.push(thing);
	}
	return this.items;
}

bag.prototype.isUsing = function(thing) {
	return this.using.includes(thing);
}
// **** end of bag functions ************


// **** start of health functions ************
var health = function() {
	this.value = 0;
}

health.prototype.add = function(amount) {
	this.value = this.value + amount;
	return this.value;
}

health.prototype.remove = function(amount) {
	this.value = this.value - amount;
	return this.value;
}

health.prototype.has = function(amount) {
	return (this.value >= amount);
}

health.prototype.hasNot = function(amount) {
	return !(this.value >= amount);
}
// **** end of health functions ************


// **** start of money functions ************
var money = function() {
	this.value = 0;
}

money.prototype.add = function(amount) {
	this.value = this.value + amount;
	return this.value;
}

money.prototype.remove = function(amount) {
	this.value = this.value - amount;
	return this.value;
}

money.prototype.has = function(amount) {
	return (this.value >= amount);
}

money.prototype.hasNot = function(amount) {
	return !(this.value >= amount);
}
// **** end of money functions ************


// **** start of geo functions ************

var geo = function(wizard) {
	var thisWizard = wizard;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	//this.placesHistory = new placesHistory();
	//this.storiesHistory = new storiesHistory();
	this.go = function(direction) {
		direction = direction.toLowerCase();
		var hitWallMsg = "Ow! you walked into a magical wall.";
		var hitWall = false;
		var tempWall = 1;
		switch(direction) {
			case 'north' : 
				tempWall = map.quadrant(thisWizard.geo).walls.posY;
				if(!tempWall.exists) this.y++; else hitWall = (tempWall.msg != "")? tempWall.msg : hitWallMsg;
				break;
			case 'south' : 
				tempWall = map.quadrant(thisWizard.geo).walls.negY;
				if(!tempWall.exists) this.y--; else hitWall = (tempWall.msg != "")? tempWall.msg : hitWallMsg;
				break;
			case 'east' : 
				tempWall = map.quadrant(thisWizard.geo).walls.posX;
				if(!tempWall.exists) this.x++; else hitWall = (tempWall.msg != "")? tempWall.msg : hitWallMsg;
				break;
			case 'west' : 
				tempWall = map.quadrant(thisWizard.geo).walls.negX;
				if(!tempWall.exists) this.x--; else hitWall = (tempWall.msg != "")? tempWall.msg : hitWallMsg;
				break;
			case 'up' : 
				tempWall = map.quadrant(thisWizard.geo).walls.posZ;
				if(!tempWall.exists) this.z++; else hitWall = (tempWall.msg != "")? tempWall.msg : hitWallMsg;
				break;
			case 'down' : 
				tempWall = map.quadrant(thisWizard.geo).walls.negZ;
				if(!tempWall.exists) this.z--; else hitWall = (tempWall.msg != "")? tempWall.msg : hitWallMsg;
				break;
		}
		if(hitWall) {
			thisWizard.log("@" + thisWizard.nameID + " tries to walk " + direction + ":\n\n");
			thisWizard.log(hitWall);
		} else {
			thisWizard.log("@" + thisWizard.nameID + " walks " + direction + ":\n\n");
			map.reactTo(thisWizard);
		}
		return thisWizard.unread();
	};
	this.look = function() {
		thisWizard.log("@" + thisWizard.nameID + " looks around:\n\n");
		map.reactTo(thisWizard);
		return thisWizard.unread();
	};


	this.moveTo = function(xCoord,yCoord,zCoord) {
		this.x = xCoord;
		this.y = yCoord;
		this.z = zCoord;
		thisWizard.saveToDB();
	};
}

//var test = new geo();

// **** end of geo functions ************



// **** start of wizard functions ************

var wizard = function () {
	var wizard = this;
	this.nameID;
	this.bag = new bag(wizard);
	this.health = new health();
	this.money = new money();
	this.geo = new geo(wizard);
	this.hidden = new hidden();
	//this.placesHistory = new placesHistory();
	//this.storiesHistory = new storiesHistory();
}

wizard.prototype.log = function (msgBody) {
	var tempDate = new Date();
	var currentDateTimeStr = tempDate.toDateString().slice(4,-5) + " " + tempDate.toTimeString().slice(0,8);
	var updatedMsgBody = msgBody;
	while (updatedMsgBody.indexOf('@wizard') + 1) {
		updatedMsgBody = (updatedMsgBody.slice(0,updatedMsgBody.indexOf('@wizard')) + "@" + this.nameID + updatedMsgBody.slice(updatedMsgBody.indexOf('@wizard')+7,updatedMsgBody.length));
	}
	var tempMessageObj = {
		fromWizardName: 'system',
		msgDateTime: currentDateTimeStr,
		msgBody: updatedMsgBody
	};
	messagesDB.push(['unread', this.nameID, 'story', JSON.stringify(tempMessageObj)]);
}

wizard.prototype.chat = function (sendToWizardID,msgBody) {
	var tempDate = new Date();
	var currentDateTimeStr = tempDate.toDateString().slice(4,-5) + " " + tempDate.toTimeString().slice(0,8);
	var tempMessageObj = {
		fromWizardName: this.nameID,
		msgDateTime: currentDateTimeStr,
		msgBody: msgBody
	};
	messagesDB.push(['unread', sendToWizardID, 'chat', JSON.stringify(tempMessageObj)]);
}

wizard.prototype.unread = function() {
	var unreadChatMessages = [];
	var unreadStoryMessages = [];
	var msgCounter = 0;
	for (let i=0; i < messagesDB.length; i++) {
		if(messagesDB[i][0] == 'unread' && messagesDB[i][1] == this.nameID){//&& messagesDB[i][2] == 'chat') {
			messagesDB[i][0] = 'read';
			if(messagesDB[i][2] == 'chat') {
				msgCounter++;
				let tempMessageObj = JSON.parse(messagesDB[i][3]);
				let msgLine = tempMessageObj.msgDateTime + " @" + tempMessageObj.fromWizardName + " says: " + tempMessageObj.msgBody;
				unreadChatMessages.push(msgLine);
			}
			if(messagesDB[i][2] == 'story') {
				let tempStoryObj = JSON.parse(messagesDB[i][3]);
				let msgLine = tempStoryObj.msgBody;
				unreadStoryMessages.push(msgLine);
			}
		}
	}
	//console.log(unreadStoryMessages);
	var returnString = '';
	for (let i=0; i < unreadStoryMessages.length; i++) {
		returnString += unreadStoryMessages[i];
	}
	if (unreadChatMessages.length > 0) returnString += "\n\nMessages:";
	for (let i=0; i < unreadChatMessages.length; i++) {
		returnString += "\n" + unreadChatMessages[i];
	}
	return (returnString);
}


wizard.prototype.saveToDB = function() {
	if(this.nameID == undefined) {
		return "Sorry, can't save until you have a name.";
	}
	else {
		var tempWizardDetailsObj = {};
		tempWizardDetailsObj.placesHistory = this.hidden.places.value;
		tempWizardDetailsObj.storiesHistory = this.hidden.stories.value;
		tempWizardDetailsObj.tags = this.hidden.tags.value;
		tempWizardDetailsObj.items = this.bag.items;
		tempWizardDetailsObj.using = this.bag.using;
		tempWizardDetailsObj.health = this.health.value;
		tempWizardDetailsObj.money = this.money.value;
		var tempWizardDetailsObjJSON = JSON.stringify(tempWizardDetailsObj);

		var tempWizardArray = [];
		tempWizardArray[0] = this.nameID;
		tempWizardArray[1] = this.geo.x;
		tempWizardArray[2] = this.geo.y;
		tempWizardArray[3] = this.geo.z;
		tempWizardArray[4] = tempWizardDetailsObjJSON;

		// find matching wizard to save data to
		var wizardFound = false;
		let i;
		for (i=0;i<wizardDB.length;i++) {
			if(wizardDB[i][0] == tempWizardArray[0]) {
				wizardFound = true;
				break;
			}
		}
		if (wizardFound) {
			wizardDB[i] = tempWizardArray;
			return wizardDB;
		} else {
			//nameID not found in wizardDB
			wizardDB.push(tempWizardArray);
			return wizardDB;
		}
	}
}

wizard.prototype.loadFromDB = function() {
	for (let i=0;i<wizardDB.length;i++) {
		if(wizardDB[i][0] == this.nameID) {
			var tempWizardDetailsObj = JSON.parse(wizardDB[i][4]);
			var tempParams = {
				x: wizardDB[i][1],
				y: wizardDB[i][2],
				z: wizardDB[i][3],
				placesHistory: tempWizardDetailsObj.placesHistory,
				storiesHistory: tempWizardDetailsObj.storiesHistory,
				tags: tempWizardDetailsObj.tags,
				items: tempWizardDetailsObj.items,
				using: tempWizardDetailsObj.using,
				health: tempWizardDetailsObj.health,
				money: tempWizardDetailsObj.money
			};
				//console.log(this.hidden.places.value);
			this.setParams(tempParams);
				//console.log(this.hidden.places.value);

			return true;
		}
	}
	//console.log("No wizard found in DB.  Try saving first.");
	return false;
}

wizard.prototype.setParams = function(params) {
	if(params != undefined) {
		this.bag.items = params.items.slice(0);
		this.bag.using = params.using.slice(0);
		this.health.value = params.health;
		this.money.value = params.money;
		this.geo.x = params.x;
		this.geo.y = params.y;
		this.geo.z = params.z;
		this.hidden.places.value = params.placesHistory;
		this.hidden.stories.value = params.storiesHistory;
		this.hidden.tags.value = params.tags;
	}
	return this.status();
}

wizard.prototype.name = function(suggestedName) {
	if(this.nameID != undefined) {
		return "You already have a name.  It's "+this.nameID;
	}
	if(suggestedName == undefined) {
		return "Please enter a name";
	}		
	else {
		var wizardDBIndex = wizardDB.map(function(obj) { return obj.nameID; }).indexOf(suggestedName);
		if (wizardDBIndex == -1) {
			this.nameID = suggestedName;
			return true;
		} else {
			return false;
		}
	}
}

wizard.prototype.status = function() {
	return "name: "+this.nameID + ", health: "+this.health.value+", money: "+this.money.value+", geo: x:"+this.geo.x+", y:"+this.geo.y +", z:" + this.geo.z + ", using: "+ this.bag.using + "\nitems: "+this.bag.items;
}

// **** end of wizard functions ************




// **** start of teamsDB **********


// structure of teamsDB = [{teamNameID:{members: [wizardIDs], teamAdmin: "wizardID", teamPassword: "password"}}]

/*
var teamsDB = [];

var teamsDBobj = {testTeam:{members: ["boeltjen","yrokach","sdewing"], teamAdmin: "boeltjen", teamPassword: "password"}};

var team = function() {
	this.members = [];
	this.teamAdmin = "";
	this.teamPassword = "";
}

var team.prototype.submit = function(submittedTeamName,submittedTeamPassword) {
	if( (submittedTeamName == undefined) || (submittedTeamPassword == undefined) ) {
		console.log("Invalid team name and/or password.  Please try again.");
		return;
	}
	if (teamDBobj.hasOwnProperty(submittedTeamName)) {
		if (submittedTeamName.teamPassword != undefined) {
			if (submittedTeamName.teamPassword == submittedTeamPassword) {
				submitTeamName.members.push('boeltjen');
				console.log("Welcome to team submittedTeamName!  These are the other members of your team:");
				for (var i=0; i < submittedTeamName.members.length; i++) {
					console.log(submittedTeamName.members[i]);
				}
				console.log("This team name already exists, but the password is wrong.  To join, please recheck the team name and password that you entered.  Or to create your own team, please try another name");
			}
			console.log("error - team password undefined...")
		}
	} else {
		console.log("Thanks for starting a team!");
		console.log("As the leader of team '"+submittedTeamName+"', you're job is to invite others to join.");
		console.log("Tell them to use your team name: '"+submittedTeamName+"', and your password: '"+submittedTeamPassword+"'");
	}
	return;
};
*/



// **** end of teamDB **********






// **** start of quad functions ************

// **** end of quad functions ************



// **** start of map functions ************

// **** end of map functions ************





var startingParams = {
	items: ['wooden staff', 'pointy hat', 'useless spellbook','pizza'],
	using:[],
	placesHistory:[],
	storiesHistory:[],
	tags:[],
	health:85,
	money:120,
	x:0,
	y:0,
	z:0
};
var startingParams2 = {
	items: ['wooden staff', 'pointy hat', 'useless spellbook','pizza'],
	using:[],
	placesHistory:[],
	storiesHistory:[],
	tags:[],
	health:85,
	money:120,
	x:0,
	y:0,
	z:0
};

//var activeWizards = [];

/*var init = function(loginName) {
	var wizardNameIndex = activeWizards.map(function(obj) { return obj.nameID; }).indexOf(loginName);
	if (wizardNameIndex == -1) {
		var tempWizard = new wizard();
		tempWizard.setParams(startingParams);
		tempWizard.name(loginName);
		activeWizards.push(tempWizard);
		return "Welcome '"+ loginName +"' to Wizarding at City Hall!  Go forth and multiply!\n\n" + tempWizard.status();
	} else {
		return "wizard: '"+loginName+"' is already active.  Go and do something!";
	}
}*/

var wiz = function(wizardName) {
	/*var wizardNameIndex = activeWizards.map(function(obj) { return obj.nameID; }).indexOf(wizardName);
	if (wizardNameIndex != -1) {
		return activeWizards[wizardNameIndex];
	} 
	else {
		*/
	if(wizardName == undefined || wizardName == "") return false;
	var tempWizard = new wizard();
	tempWizard.name(wizardName);
	
	var wizardFoundInDB = tempWizard.loadFromDB();
	if(!wizardFoundInDB) {
		tempWizard.setParams(startingParams);
		tempWizard.saveToDB();
		tempWizard.log("Welcome '"+ wizardName +"' to Wizarding at City Hall!  Go forth and multiply!\n\n");// + tempWizard.status()+"\n\n");
	}
	//tempWizard.geo.look();
	//else {
		//console.log("Welcome Back '"+ wizardName +"'!  We misseed you!!  Go forth and multiply!\n\n" + tempWizard.status()+"\n\n");
	//}
	//var newIndex = activeWizards.push(tempWizard);
	//return activeWizards[newIndex-1];
	
	return tempWizard;

}

//init('boeltjen');
//init('stacy');
//var boeltjen = new wizard(startingParams);
//boeltjen.setParams(startingParams);
//boeltjen.name('boeltjen');

//var stacy = new wizard(startingParams);
//stacy.start(startingParams);
//stacy.name('stacy');
//console.log(boeltjen.status());
//boeltjen.money.add(200);
//console.log(boeltjen.status());
//boeltjen.health.add(200);
//console.log(boeltjen.status());
//boeltjen.bag.add("fork");
//console.log(boeltjen.status());
//boeltjen.geo.moveTo(3,2);
//console.log(boeltjen.status());

//console.log(boeltjen.bag.hasNot('fork'));

//boeltjen.bag.use('useless spellbook');
//boeltjen.bag.returnTo('useless spellbook');
//console.log(boeltjen.status());



/*for (let i =0; i<storiesDB.length; i++){
	storiesDB
	this.stories.push(storiesDB[i]);
}*/


/*
var Quad = function(params){
	this.geo = params.geo;
	this.walls = params.walls;
	this.stories = params.stories;//[];
	/*for (var i=0;i<params.stories.length;i++) {
			this.stories[i] = params.stories[i]
	}
};*/


//var q0000 = new Quad(quad0000params);
//var q0001 = new Quad(quad0001params);
//var q00n01 = new Quad(quad00n01params);
//var q0100 = new Quad(quad0100params);
//console.log(q0000);

//console.log(q0000.reactTo(boeltjen));

//console.log(boeltjen.status());
//boeltjen.bag.use('useless spellbook');
//console.log(boeltjen.status());
//console.log(q0000.reactTo(boeltjen));
//console.log(boeltjen.status());

//boeltjen.bag.use('potion');
//console.log(q0000.reactTo(boeltjen));
//console.log(boeltjen.status());


var map = {
	//quads: [],
	returnPlaceID: function(placeName) {
		
		if (placeName == undefined) {
			return false;
		}
		for (let i=0; i<placesDB.length; i++){
			if(placesDB[i][5] == placeName) {
				let placeID = placesDB[i][0];
				return placeID;
			}
		}
		return false;
	},
	quadrant: function(xyzCoords) {
		if (xyzCoords == undefined) return false;
		placeWizardIsInExists = false;
		var tempPlace = {
			placeID:0,
			stories: [],
			geo: {},
			walls: {
				posX:{exists:0,msg:""},
				negX:{exists:0,msg:""},
				posY:{exists:0,msg:""},
				negY:{exists:0,msg:""},
				posZ:{exists:0,msg:""},
				negZ:{exists:0,msg:""}
			},
			placeName:""
		};
		//find base place object for current Wizards location {xyzCoords: {x=,y=,z=}} and load it into tempPlace
		// structure of placesDB = [[ID,x,y,z,{walls:{posX:,posY:,posZ:,negX:,negY:,negZ:,posXmsg=""}}, 'placeName']]
		for (let i=0; i<placesDB.length; i++){
			let iPlace = placesDB[i];
			if(iPlace[1]==xyzCoords.x && iPlace[2]==xyzCoords.y && iPlace[3]==xyzCoords.z) {
				tempPlace.placeID = iPlace[0];
				tempPlace.geo.x = iPlace[1];
				tempPlace.geo.y = iPlace[2];
				tempPlace.geo.z = iPlace[3];
				let iPlaceObj = JSON.parse(iPlace[4]);
				tempPlace.placeDescription = iPlaceObj.placeDescription;
				tempPlace.walls = iPlaceObj.walls;
				tempPlace.placeName = iPlace[5];
				placeWizardIsInExists = true;
			}
		}
		if(placeWizardIsInExists) {
			//add to basic stories array using real-time data from stories DB - pulling all stories by their placeName
			// structure of storiesDB = [[ID,placeName,{conditions:[],impacts:[],story:""}]]
			for (let i =0; i<storiesDB.length; i++){
				let iStory = storiesDB[i];
				if(iStory[1]==tempPlace.placeName) {
					tempStory = JSON.parse(iStory[2]);
					tempStory.storyID = iStory[0];
					tempStory.placeName = iStory[1];
					tempPlace.stories.push(tempStory);
				}
			}
			return tempPlace;
			} else {
			return placeWizardIsInExists;
		}
	}/*,
	reactTo: function(wizard) {
		var quadWizardIsIn = this.quadrant(wizard.geo);
		if (quadWizardIsIn) {
			quadWizardIsIn.reactTo(wizard);
		} 
		else {
			wizard.geo.moveTo(0,0,0);
			wizard.log("You somehow wandered into the other void.  A giant swirling hole sucks you in and everything goes black...\n\n"); this.quadrant(wizard.geo).reactTo(wizard);			
		}
		return;
	}*/

};



map.reactTo = function(wizard) {
	console.log(this);
	if(wizard == undefined) return false;
	var wizardTeleported = true;
	while(wizardTeleported) {
		wizardTeleported = false;
		var quadWizardIsIn = this.quadrant(wizard.geo);
		var wizardOnMap = false;
		var savePlace = true;
		var storiesIDsWhereUsingDidSomething = {};
		if (quadWizardIsIn != false) {
			wizardOnMap = true;
		} else {
			wizard.geo.moveTo(0,0,0);
			//quadWizardIsIn = this.quadrant(wizard.geo);
			wizard.log("You've somehow wandered into the void.  A giant swirling hole sucks you in and everything goes black...\n\n"); 
			wizardTeleported = true;
			continue;
			//wizardOnMap = true;
		}
		if(wizardOnMap) {
			console.log(quadWizardIsIn);
			var passingStoryWithMostConditions = {'storyK':false,'numConditions':false,'conditionsAllTrue':false,'storyOrder':false};
			for (var k=0;k<quadWizardIsIn.stories.length;k++){
				var evaluatedConditions = true;
				var numConditionsInStory = quadWizardIsIn.stories[k].conditions.length;
				for (var i=0;i<numConditionsInStory;i++){
					switch(quadWizardIsIn.stories[k].conditions[i].aspect) {
						case 'bag':
							switch(quadWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									evaluatedConditions = (evaluatedConditions && wizard.bag.has(quadWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'hasNot':
									evaluatedConditions = (evaluatedConditions && wizard.bag.hasNot(quadWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'using':
									console.log('k:',k,wizard.bag.isUsing(quadWizardIsIn.stories[k].conditions[i].value));
									if(wizard.bag.isUsing(quadWizardIsIn.stories[k].conditions[i].value)) {
										storiesIDsWhereUsingDidSomething[k] = true;
									};
									evaluatedConditions = (evaluatedConditions && wizard.bag.isUsing(quadWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'notUsing':
									evaluatedConditions = (evaluatedConditions && !wizard.bag.isUsing(quadWizardIsIn.stories[k].conditions[i].value));
									break;		
							}
							break;
						case 'money':
							switch(quadWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									evaluatedConditions = (evaluatedConditions && wizard.money.has(quadWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'hasNot':
									evaluatedConditions = (evaluatedConditions && wizard.money.hasNot(quadWizardIsIn.stories[k].conditions[i].value));
									break;
							}
							break;
						case 'health':
							switch(quadWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									evaluatedConditions = (evaluatedConditions && wizard.health.has(quadWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'hasNot':
									evaluatedConditions = (evaluatedConditions && wizard.health.hasNot(quadWizardIsIn.stories[k].conditions[i].value));
									break;
							}
							break;
						case 'places': //add lookup to search by the current place / current story, and place name
							switch(quadWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									if(quadWizardIsIn.stories[k].conditions[i].value == "this") {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.places.has(quadWizardIsIn.placeID));
										break;
									}
									else {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.places.has(quadWizardIsIn.stories[k].conditions[i].value));
										break;
									}
								case 'hasNot':
									if(quadWizardIsIn.stories[k].conditions[i].value == "this") {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.places.hasNot(quadWizardIsIn.placeID));
										break;
									}
									else {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.places.hasNot(quadWizardIsIn.stories[k].conditions[i].value));
										break;
									}
							}
							break;
						case 'stories':
							switch(quadWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									if(quadWizardIsIn.stories[k].conditions[i].value == "this") {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.stories.has(quadWizardIsIn.stories[k].storyID));
										break;
									}
									else {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.stories.has(quadWizardIsIn.stories[k].conditions[i].value));
										break;
									}
								case 'hasNot':
									if(quadWizardIsIn.stories[k].conditions[i].value == "this") {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.stories.hasNot(quadWizardIsIn.stories[k].storyID));
										break;
									}
									else {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.stories.hasNot(quadWizardIsIn.stories[k].conditions[i].value));
										break;
									}
							}
							break;
						case 'tags':
							switch(quadWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									evaluatedConditions = (evaluatedConditions && wizard.hidden.tags.has(quadWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'hasNot':
									evaluatedConditions = (evaluatedConditions && wizard.hidden.tags.hasNot(quadWizardIsIn.stories[k].conditions[i].value));
									break;
							}
							break;
						
					}
				}
				//amongst a set of stories where all conditions are met, select the lowest order:
				if(evaluatedConditions) {
					if(!passingStoryWithMostConditions.numConditions) {
						passingStoryWithMostConditions = {'storyK':k,'numConditions':numConditionsInStory,'conditionsAllTrue':true,'storyOrder':quadWizardIsIn.stories[k].order};
					} else if(quadWizardIsIn.stories[k].order < passingStoryWithMostConditions.storyOrder) {
						passingStoryWithMostConditions = {'storyK':k,'numConditions':numConditionsInStory,'conditionsAllTrue':true, 'storyOrder':quadWizardIsIn.stories[k].order};
					}
				}
				console.log('passingStoryWithMostConditions',passingStoryWithMostConditions);
				
				/*
				if(evaluatedConditions) {
					if(!passingStoryWithMostConditions.numConditions) {
						passingStoryWithMostConditions = {'storyK':k,'numConditions':numConditionsInStory,'conditionsAllTrue':true};
					} else if(numConditionsInStory > passingStoryWithMostConditions.numConditions) {
						passingStoryWithMostConditions = {'storyK':k,'numConditions':numConditionsInStory,'conditionsAllTrue':true};
					}
				}
				console.log('passingStoryWithMostConditions',passingStoryWithMostConditions);
				*/

			}
			if(passingStoryWithMostConditions.conditionsAllTrue) {
				var k = passingStoryWithMostConditions.storyK;
				for (var i=0;i<quadWizardIsIn.stories[k].impacts.length;i++){
					switch(quadWizardIsIn.stories[k].impacts[i].aspect) {
						case 'bag':
							switch(quadWizardIsIn.stories[k].impacts[i].action) {
								case 'add':
									wizard.bag.add(quadWizardIsIn.stories[k].impacts[i].value);
									break;
								case 'remove':
									wizard.bag.remove(quadWizardIsIn.stories[k].impacts[i].value);
									break;
							}
							break;
						case 'money':
							switch(quadWizardIsIn.stories[k].impacts[i].action) {
								case 'add':
									wizard.money.add(quadWizardIsIn.stories[k].impacts[i].value);
									break;
								case 'remove':
									wizard.money.remove(quadWizardIsIn.stories[k].impacts[i].value);
									break;
							}
							break;
						case 'health':
							switch(quadWizardIsIn.stories[k].impacts[i].action) {
								case 'add':
									wizard.health.add(quadWizardIsIn.stories[k].impacts[i].value);
									break;
								case 'remove':
									wizard.health.remove(quadWizardIsIn.stories[k].impacts[i].value);
									break;
							}
							break;
						case 'tags':
							switch(quadWizardIsIn.stories[k].impacts[i].action) {
								
								case 'add':
									wizard.hidden.tags.add(quadWizardIsIn.stories[k].impacts[i].value);
									break;
								case 'remove':
									wizard.hidden.tags.remove(quadWizardIsIn.stories[k].impacts[i].value);
									break;
							}
							break;
						case 'teleport':
							if(quadWizardIsIn.stories[k].impacts[i].value.toLowerCase() == "back") {
								var currentWizardsPlaces = wizard.hidden.places.value;
								var wizardsLastLocationID = currentWizardsPlaces[currentWizardsPlaces.length - 1];
								var wizardsLastLocationData = placesDB[wizardsLastLocationID];
								
								wizard.geo.moveTo(wizardsLastLocationData[1],wizardsLastLocationData[2],wizardsLastLocationData[3]);
								
								wizardTeleported = true;
								savePlace = false;
							} else if(quadWizardIsIn.stories[k].impacts[i].value.toLowerCase() == "start") {
								wizard.geo.moveTo(0,0,0);
								wizardTeleported = true;
								savePlace = false;
							} else {
								var locationToTeleportTo = quadWizardIsIn.stories[k].impacts[i].value.split(",")
								wizard.geo.moveTo(parseInt(locationToTeleportTo[0]),parseInt(locationToTeleportTo[1]),parseInt(locationToTeleportTo[2]));
								wizardTeleported = true;
							}
							break;
						
						
						
						default:
					}
				}
				//wizard.bag.returnTo();
				//wizard.hidden.places.add(quadWizardIsIn.placeID);
				//wizard.hidden.stories.add(quadWizardIsIn.stories[k].storyID);
				//wizard.saveToDB();
				//wizard.log(quadWizardIsIn.stories[k].story);
				//console.log(wizardTeleported);
				//return;// wizard.unread();
				
			}
			
			if(savePlace) wizard.hidden.places.add(quadWizardIsIn.placeID);

			console.log(storiesIDsWhereUsingDidSomething,k);
			if(!storiesIDsWhereUsingDidSomething.hasOwnProperty(k) && wizard.bag.using.length) {
				wizard.log('but nothing happens...\n\n');
			}
			console.log('k:',k,passingStoryWithMostConditions.conditionsAllTrue); 
			
			if(passingStoryWithMostConditions.conditionsAllTrue) {
				wizard.hidden.stories.add(quadWizardIsIn.stories[k].storyID);
				console.log(quadWizardIsIn.stories[k].story);
				wizard.log(quadWizardIsIn.stories[k].story);
			} else {
				var noStoriesMessage = "Nothing Here.  Boring...";
				if(quadWizardIsIn.placeDescription != undefined) {
					if(quadWizardIsIn.placeDescription.basic != undefined) {
						noStoriesMessage = quadWizardIsIn.placeDescription.basic;
					}
				}
				wizard.log(noStoriesMessage);
			}	
			wizard.bag.returnTo();
			wizard.saveToDB();
			
			/*var noStoriesMessage = "Nothing happens.";
			if(quadWizardIsIn.placeDescription != undefined) {
				if(quadWizardIsIn.placeDescription.basic != undefined) {
					noStoriesMessage = quadWizardIsIn.placeDescription.basic;
				}
			}
			wizard.log(noStoriesMessage);*/
			//return;
		}
		else
		{
		
		}
		//console.log(wizardTeleported);

	}
};
//map.quads.push(q0000); 
//map.quads.push(q0001);
//map.quads.push(q00n01);
//map.quads.push(q0100);
//console.log(boeltjen.status());
//console.log(map);
//console.log(map.quadrant(boeltjen.geo));

//console.log(map.reactTo(boeltjen));
/*
console.log(map.reactTo(boeltjen));
boeltjen.geo.moveTo(0,1);

console.log(map.reactTo(boeltjen));
console.log(boeltjen.status());
var sdewing = new wizard('stacy',startingParams);
console.log(sdewing.status());

*/