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

// intialize variable for followMode in Story UI
var followModeOn = true;

$("#toggleFollowMode").click(function() {
	if(followModeOn) {
		$("#toggleFollowMode").text("Follow Mode Off");
		$("#toggleFollowMode").removeClass("btn-success").addClass("btn-default");
		followModeOn = false;
	} else {
		$("#toggleFollowMode").text("Follow Mode On");
		$("#toggleFollowMode").removeClass("btn-default").addClass("btn-success");
		followModeOn = true;
	}
});

var placesDB = [];
for (let i =0; i<placesDBobj.length;i++){
	let tempPlaceDetailsObj = JSON.stringify(placesDBobj[i][4]);
	placesDB.push([placesDBobj[i][0],placesDBobj[i][1],placesDBobj[i][2],placesDBobj[i][3],tempPlaceDetailsObj,placesDBobj[i][5]]);
}


// structure of storiesDB = [[storyID,x,y,z,{order:#,conditions:[],impacts:[],story:""}]]
//testing utility showStoriesByPlace looking up the storiesDBobj

//below is for the old jsonDB model; needs to be updated. to the object->array model.

var showStoriesByPlace = function(tempPlaceName) {
	if(tempPlaceName == undefined) {
		console.debug(storiesDBobj);
		return;
	}
	if (typeof tempPlaceName == 'number') {
		console.debug("StoryID #",tempPlaceName);
		storiesDBobj.forEach(function(storyElement,index){
			if(index == tempPlaceName) {
				console.debug(storyElement.story);
				console.debug('Order:',storyElement.order);
				console.debug('Conditions:');
				storyElement.conditions.forEach(function(conditionElement){
					console.debug('aspect:',conditionElement.aspect,'action:',conditionElement.action,'value:',conditionElement.value);
				});
				console.debug('Impacts:');
				storyElement.impacts.forEach(function(conditionElement){
					console.debug('aspect:',conditionElement.aspect,'action:',conditionElement.action,'value:',conditionElement.value);
				});			
			}
		});
	} else if (typeof tempPlaceName == 'string') {
		//console.debug(tempPlaceName," stories (if any):");
		storiesDBobj.forEach(function(storyElement,index){
			if(storyElement.location == tempPlaceName) {
				console.debug(index,storyElement.order,storyElement.story);
				console.debug(storyElement.conditions.length);
			}
		});	
	}	
}



var updateStoriesDB = function() {
	storiesDB = [];
	var tempIndex = 0;
	for (locationName in storiesDBobj) {
		for (let i=0; i<storiesDBobj[locationName].length;i++){
			let tempStoryDetailsObj = JSON.stringify(storiesDBobj[locationName][i]);
			storiesDB.push([tempIndex,locationName,tempStoryDetailsObj]);
			tempIndex++;
		}
	}
	
	
	/*
	for (let i=0; i<storiesDBobj.length;i++){
		let tempStoryDetailsObj = JSON.stringify(storiesDBobj[i]);
		storiesDB.push([i,storiesDBobj[i].location,tempStoryDetailsObj]);
	}
	*/
	console.log("storiesDB updated!");
}


updateStoriesDB();


// **** start of hidden.knownPlaces functions ************
var knownPlaces = function() {
	this.value = {};
}

knownPlaces.prototype.add = function(placeName) {
	let placeNameArray = placeName.split("|");

	this.value[placeNameArray[0]] = {"status": true}; 

	if(placeNameArray[1] || false) this.value[placeNameArray[0]]["displayName"] = placeNameArray[1];
	return this;
}

knownPlaces.prototype.remove = function(placeName) {
	if (placeName == undefined) return false;
	if (placeName == "_ALL_") {
		for (var currentKnownPlace in this.value) {
			this.value[currentKnownPlace].status = false;
		}
		return this.value;
	} else {
		this.value[placeName].status = false;  //if false then it means it was once known but no longer
		return this.value;
	}
	
}


// IF placeID type = num, then use actual placeID from placesDB.  If placeID type = string, then lookup string from placesDB and return for the function to act upon.
knownPlaces.prototype.has = function(placeName) {
	if(this.value[placeName] != undefined || this.value[placeName].status) {
		return this.value[placeName];
	} else {
		return {
			"status":false,
		};
	}
}

knownPlaces.prototype.hasNot = function(place) {
	if(this.value[placeName] != undefined || this.value[placeName].status) {
		return false;
	} else {
		return true;
	}
}

// ******** end of hidden.knownPlaces functions ********




// **** start of hidden.places functions ************
var places = function() {
	this.value = [];
}

places.prototype.add = function(placeName) {
	if(this.value[this.value.length - 1] != placeName) {
		this.value.push(placeName);
	}
	return this.value;
}

places.prototype.remove = function(placeName) {
	if (placeName == undefined) return false;
	if (placeName == "_ALL_") {
		this.value = [];
		return this.value;
	} else {
		this.value.remove(placeName);
		return this.value;
	}
}


// IF placeID type = num, then use actual placeID from placesDB.  If placeID type = string, then lookup string from placesDB and return for the function to act upon.
places.prototype.has = function(placeName) {
	
	/*if (typeof place == 'number') {
		let placeID = place;
		return (this.value.includes(placeID));

	} else if (typeof place == 'string') {
	*/	
		//let placeName = place;
		//let placeID = map.returnPlaceID(placeName);
		return (this.value.includes(placeName));
	//}
}

places.prototype.hasNot = function(placeName) {
	/*if (typeof place == 'number') {
		let placeID = place;
		return (!this.value.includes(placeID));
	} else if (typeof place == 'string') {
		let placeName = place;
		let placeID = map.returnPlaceID(placeName);
		return (!this.value.includes(placeID));
	}*/
	return (!this.value.includes(placeName));
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
	this.knownPlaces = new knownPlaces();

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
		thisWizard.log("@" + thisWizard.nameID + " tries to use the " + thing + "... \n\n");
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
	//only add the item if the player doesn't already have it:
	if(!this.items.includes(thing)) this.items.push(thing);
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
	this.currentPlace = "";
	//this.placesHistory = new placesHistory();
	//this.storiesHistory = new storiesHistory();
	this.go = function(direction) {
		console.log(thisWizard);
		if(direction == undefined) {
			console.log("no direction provided to geo.go()");
			return false;
		}
		let knownPlaceTravellingTo = thisWizard.hidden.knownPlaces.has(direction);
		if(knownPlaceTravellingTo.status) {
			thisWizard.log("@" + thisWizard.nameID + " goes to the " + (knownPlaceTravellingTo.displayName || direction) + "...\n\n");
			thisWizard.geo.moveTo({"location" : direction});
			map.reactTo(thisWizard);			
		} else {
			thisWizard.log("@" + thisWizard.nameID + " tries to go to the " + (knownPlaceTravellingTo.displayName || direction) + "...\n\n");
			thisWizard.log("Wait - you have no idea where that is...");
		}
		return thisWizard.unread();
		/*
		//Trying a new approach - instead of a direction on a map, players can now jump to any place, but only ones that are known to them.  To learn about a place, the location has to be provided by authors as an impact of a story.
		
		************
		Modifying KnownPlaces slightly for simpler gameplay / easier programming.  Instead of the user building up a log of knownPlaces (map style), what I want to try instead is that knownPlaces act more like links.  Such that with every turn, a wizard gets "amnesia" and only has the options available from that story.  So each story must have a list of known places of where the player can go next.
		
		*************
		
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
			thisWizard.log("@" + thisWizard.nameID + " tries to walk " + direction + "...\n\n");
			thisWizard.log(hitWall);
		} else {
			thisWizard.log("@" + thisWizard.nameID + " walks " + direction + "...\n\n");
			map.reactTo(thisWizard);
		}
		return thisWizard.unread();
		*/
	};
	
	this.look = function() {
		thisWizard.log("@" + thisWizard.nameID + " looks around:\n\n");
		map.reactTo(thisWizard);
		return thisWizard.unread();
	};


	this.moveTo = function(xyzCoords) {
		if(xyzCoords == undefined) {
			return false;
		}
		//xyzCoords should be an object of the following structure:
		//{x:num,y:num,z:num} or {'location':str} or "home" or "back"
		if (xyzCoords == "home") {
			xyzCoords = {};
			xyzCoords.location = HOME_LOCATION_STR;
		} else if (xyzCoords == "back") {
			xyzCoords = {};
			var currentWizardsPlacesArray = thisWizard.hidden.places.value;
			console.log(currentWizardsPlacesArray);
			// check if this wizard has been anywhere yet, if not, return false
			if(currentWizardsPlacesArray.length > 0) {
				var wizardsLastLocationName = currentWizardsPlacesArray[currentWizardsPlacesArray.length - 1];
				//lookup location info from placesDB
				//var wizardsLastLocationData = placesDB[wizardsLastLocationID];
				//xyzCoords.x = wizardsLastLocationData[1];
				//xyzCoords.y = wizardsLastLocationData[2];
				//xyzCoords.z = wizardsLastLocationData[3];
				this.currentPlace = wizardsLastLocationName;

			} else {
				return false;
			}
		}
		if (xyzCoords.location != undefined) {
			
			this.currentPlace = xyzCoords.location;
			thisWizard.saveToDB();
			return true;
			/*
			//search through placesDB for this location name
			for (let i=0; i<placesDB.length; i++){
				if(placesDB[i][5] == xyzCoords.location) {
					xyzCoords.x = placesDB[i][1];
					xyzCoords.y = placesDB[i][2];
					xyzCoords.z = placesDB[i][3];
				}
			}
			*/
		} 
		if (xyzCoords.x != undefined && xyzCoords.y != undefined && xyzCoords.z != undefined ) {
			this.x = xyzCoords.x;
			this.y = xyzCoords.y;
			this.z = xyzCoords.z;
			thisWizard.saveToDB();
			return true;			
		} else {
			//no useful xyzCoords provided; Can't moveTo anything
			return false;
		}		
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
	//console.debug(unreadStoryMessages);
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
		tempWizardDetailsObj.currentPlace = this.geo.currentPlace;
		tempWizardDetailsObj.placesHistory = this.hidden.places.value;
		tempWizardDetailsObj.storiesHistory = this.hidden.stories.value;
		tempWizardDetailsObj.tags = this.hidden.tags.value;
		tempWizardDetailsObj.knownPlaces = this.hidden.knownPlaces.value;
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
				currentPlace: tempWizardDetailsObj.currentPlace,
				placesHistory: tempWizardDetailsObj.placesHistory,
				storiesHistory: tempWizardDetailsObj.storiesHistory,
				tags: tempWizardDetailsObj.tags,
				items: tempWizardDetailsObj.items,
				knownPlaces: tempWizardDetailsObj.knownPlaces,
				using: tempWizardDetailsObj.using,
				health: tempWizardDetailsObj.health,
				money: tempWizardDetailsObj.money
			};
				//console.debug(this.hidden);
			this.setParams(tempParams);
				//console.debug(this.hidden.places.value);

			return true;
		}
	}
	//console.debug("No wizard found in DB.  Try saving first.");
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
		this.geo.currentPlace = params.currentPlace;
		this.hidden.places.value = params.placesHistory;
		this.hidden.stories.value = params.storiesHistory;
		this.hidden.tags.value = params.tags;
		this.hidden.knownPlaces.value = params.knownPlaces;
	}
	return this.status();
}

wizard.prototype.name = function(suggestedName) {
	if(this.nameID != undefined) {
		return "Yo	u already have a name.  It's "+this.nameID;
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
		console.debug("Invalid team name and/or password.  Please try again.");
		return;
	}
	if (teamDBobj.hasOwnProperty(submittedTeamName)) {
		if (submittedTeamName.teamPassword != undefined) {
			if (submittedTeamName.teamPassword == submittedTeamPassword) {
				submitTeamName.members.push('boeltjen');
				console.debug("Welcome to team submittedTeamName!  These are the other members of your team:");
				for (var i=0; i < submittedTeamName.members.length; i++) {
					console.debug(submittedTeamName.members[i]);
				}
				console.debug("This team name already exists, but the password is wrong.  To join, please recheck the team name and password that you entered.  Or to create your own team, please try another name");
			}
			console.debug("error - team password undefined...")
		}
	} else {
		console.debug("Thanks for starting a team!");
		console.debug("As the leader of team '"+submittedTeamName+"', you're job is to invite others to join.");
		console.debug("Tell them to use your team name: '"+submittedTeamName+"', and your password: '"+submittedTeamPassword+"'");
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
	knownPlaces:{},
	health:85,
	money:120,
	x:0,
	y:0,
	z:0,
	currentPlace: HOME_LOCATION_STR,
};
var startingParams2 = {
	items: ['wooden staff', 'pointy hat', 'useless spellbook','pizza'],
	using:[],
	placesHistory:[],
	storiesHistory:[],
	tags:[],
	knownPlaces:{},
	health:85,
	money:120,
	x:0,
	y:0,
	z:0,
	currentPlace: HOME_LOCATION_STR,

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
		//console.debug("Welcome Back '"+ wizardName +"'!  We misseed you!!  Go forth and multiply!\n\n" + tempWizard.status()+"\n\n");
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
//console.debug(boeltjen.status());
//boeltjen.money.add(200);
//console.debug(boeltjen.status());
//boeltjen.health.add(200);
//console.debug(boeltjen.status());
//boeltjen.bag.add("fork");
//console.debug(boeltjen.status());
//boeltjen.geo.moveTo(3,2);
//console.debug(boeltjen.status());

//console.debug(boeltjen.bag.hasNot('fork'));

//boeltjen.bag.use('useless spellbook');
//boeltjen.bag.returnTo('useless spellbook');
//console.debug(boeltjen.status());



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
//console.debug(q0000);

//console.debug(q0000.reactTo(boeltjen));

//console.debug(boeltjen.status());
//boeltjen.bag.use('useless spellbook');
//console.debug(boeltjen.status());
//console.debug(q0000.reactTo(boeltjen));
//console.debug(boeltjen.status());

//boeltjen.bag.use('potion');
//console.debug(q0000.reactTo(boeltjen));
//console.debug(boeltjen.status());


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
		var placeWizardIsInExists = false;
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
			
			//////*****************************
			//////*****************************
			
			// need to consider if I'm maintaining a PlaceDB anymore.  if not, then I don't need any of the below.
			// for now, I'm going to drop it.
			
			//////*****************************
			//////*****************************
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
	},
	placeStories: function(placeName) {
		if (placeName == undefined) return false;
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
			placeName:placeName
		};
		//find base place object for current Wizards location {xyzCoords: {x=,y=,z=}} and load it into tempPlace
		// structure of placesDB = [[ID,x,y,z,{walls:{posX:,posY:,posZ:,negX:,negY:,negZ:,posXmsg=""}}, 'placeName']]
		/*
		for (let i=0; i<placesDB.length; i++){
			let iPlace = placesDB[i];
			
			//////*****************************
			//////*****************************
			
			// need to consider if I'm maintaining a PlaceDB anymore.  if not, then I don't need any of the below.
			// for now, I'm going to drop it.
			
			//////*****************************
			//////*****************************
			/*
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
		}*/
		
		//add to basic stories array using real-time data from stories DB - pulling all stories by their placeName
		// structure of storiesDB = [[ID,placeName,{conditions:[],impacts:[],story:""}]]
		for (let i =0; i<storiesDB.length; i++){
			let iStory = storiesDB[i];
			if(iStory[1]==tempPlace.placeName) {
				placeWizardIsInExists = true;
				tempStory = JSON.parse(iStory[2]);
				tempStory.storyID = iStory[0];
				tempStory.placeName = iStory[1];
				tempPlace.stories.push(tempStory);
			}
		}
		if(placeWizardIsInExists) {
			return tempPlace;
		} else {
			return placeWizardIsInExists;
		}
	}/*,
	reactTo: function(wizard) {
		var placeWizardIsIn = this.quadrant(wizard.geo);
		if (placeWizardIsIn) {
			placeWizardIsIn.reactTo(wizard);
		} 
		else {
			wizard.geo.moveTo(0,0,0);
			wizard.log("You somehow wandered into the other void.  A giant swirling hole sucks you in and everything goes black...\n\n"); this.quadrant(wizard.geo).reactTo(wizard);			
		}
		return;
	}*/

};



map.reactTo = function(wizard) {
	console.debug(this);
	if(wizard == undefined) return false;
	var wizardTeleported = true;
	while(wizardTeleported) {
		wizardTeleported = false;
		//get the place Obj containing both the place name, the xyzCoords, the walls AND the placeID (for history) and the *stories*
		//var placeWizardIsIn = this.quadrant(wizard.geo);
		var placeWizardIsIn = this.placeStories(wizard.geo.currentPlace);
		console.log(placeWizardIsIn);
		var wizardOnMap = false;
		var savePlace = true;
		var storiesIDsWhereUsingDidSomething = {};
		if (placeWizardIsIn != false) {
			wizardOnMap = true;
		} else {
			wizard.geo.moveTo("home");
			//wizard.geo.moveTo({x:0,y:0,z:0});
			//placeWizardIsIn = this.quadrant(wizard.geo);
			wizard.log("You've somehow wandered into the void.  A giant swirling hole sucks you in and everything goes black...\n\n"); 
			wizardTeleported = true;
			continue;
			//wizardOnMap = true;
		}
		if(wizardOnMap) {
			console.debug(placeWizardIsIn);
			console.log("wizard is in : '" + placeWizardIsIn.placeName + "'");
			
			var firstStoryK_WithAllConditionsTrueMostConditions = false;
			var impactMessages = "";
			var bulletSymbol = "\n\n=> ";
			//var passingStoryWithMostConditions = {'storyK':false,'numConditions':false,'conditionsAllTrue':false,'storyOrder':false};
			for (var k=0;k<placeWizardIsIn.stories.length;k++){
				var evaluatedConditions = true;
				var numConditionsInStory = placeWizardIsIn.stories[k].conditions.length;
				for (var i=0;i<numConditionsInStory;i++){
					switch(placeWizardIsIn.stories[k].conditions[i].aspect) {
						case 'bag':
							switch(placeWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									evaluatedConditions = (evaluatedConditions && wizard.bag.has(placeWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'hasNot':
									evaluatedConditions = (evaluatedConditions && wizard.bag.hasNot(placeWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'using':
									console.debug('k:',k,wizard.bag.isUsing(placeWizardIsIn.stories[k].conditions[i].value));
									if(wizard.bag.isUsing(placeWizardIsIn.stories[k].conditions[i].value)) {
										storiesIDsWhereUsingDidSomething[k] = true;
									};
									evaluatedConditions = (evaluatedConditions && wizard.bag.isUsing(placeWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'notUsing':
									evaluatedConditions = (evaluatedConditions && !wizard.bag.isUsing(placeWizardIsIn.stories[k].conditions[i].value));
									break;		
							}
							break;
						case 'money':
							switch(placeWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									evaluatedConditions = (evaluatedConditions && wizard.money.has(placeWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'hasNot':
									evaluatedConditions = (evaluatedConditions && wizard.money.hasNot(placeWizardIsIn.stories[k].conditions[i].value));
									break;
							}
							break;
						case 'health':
							switch(placeWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									evaluatedConditions = (evaluatedConditions && wizard.health.has(placeWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'hasNot':
									evaluatedConditions = (evaluatedConditions && wizard.health.hasNot(placeWizardIsIn.stories[k].conditions[i].value));
									break;
							}
							break;
						case 'places': //add lookup to search by the current place / current story, and place name
							switch(placeWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									if(placeWizardIsIn.stories[k].conditions[i].value == "this") {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.places.has(placeWizardIsIn.placeName));
										break;
									}
									else {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.places.has(placeWizardIsIn.stories[k].conditions[i].value));
										break;
									}
								case 'hasNot':
									if(placeWizardIsIn.stories[k].conditions[i].value == "this") {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.places.hasNot(placeWizardIsIn.placeName));
										break;
									}
									else {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.places.hasNot(placeWizardIsIn.stories[k].conditions[i].value));
										break;
									}
							}
							break;
						case 'stories':
							switch(placeWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									if(placeWizardIsIn.stories[k].conditions[i].value == "this") {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.stories.has(placeWizardIsIn.stories[k].storyID));
										break;
									}
									else {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.stories.has(placeWizardIsIn.stories[k].conditions[i].value));
										break;
									}
								case 'hasNot':
									if(placeWizardIsIn.stories[k].conditions[i].value == "this") {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.stories.hasNot(placeWizardIsIn.stories[k].storyID));
										break;
									}
									else {
										evaluatedConditions = (evaluatedConditions && wizard.hidden.stories.hasNot(placeWizardIsIn.stories[k].conditions[i].value));
										break;
									}
							}
							break;
						case 'tags':
							switch(placeWizardIsIn.stories[k].conditions[i].action) {
								case 'has':
									evaluatedConditions = (evaluatedConditions && wizard.hidden.tags.has(placeWizardIsIn.stories[k].conditions[i].value));
									break;
								case 'hasNot':
									evaluatedConditions = (evaluatedConditions && wizard.hidden.tags.hasNot(placeWizardIsIn.stories[k].conditions[i].value));
									break;
							}
							break;
						
					}
				}
				
				
				//dropping the below for now to keep things simpler.  If story order matters, then authors can simply reorder them in the code.  Possibly create a UI element for reordering the stories per story.  Also, I don't think there will ever be that many stories per location, so would actually shift the code to be an array in an object.
				
				/*
				//amongst a set of stories where all conditions are met, select the lowest order:
				if(evaluatedConditions) {
					if(!passingStoryWithMostConditions.numConditions) {
						passingStoryWithMostConditions = {'storyK':k,'numConditions':numConditionsInStory,'conditionsAllTrue':true,'storyOrder':placeWizardIsIn.stories[k].order};
					} else if(placeWizardIsIn.stories[k].order < passingStoryWithMostConditions.storyOrder) {
						passingStoryWithMostConditions = {'storyK':k,'numConditions':numConditionsInStory,'conditionsAllTrue':true, 'storyOrder':placeWizardIsIn.stories[k].order};
					}
				}
				console.debug('passingStoryWithMostConditions',passingStoryWithMostConditions);
				*/
				
				
				//instead -> just present the first story that passes all of the conditons.
				
				if(evaluatedConditions) {
					firstStoryK_WithAllConditionsTrueMostConditions = k;
					break;
				}
				

				
				
				/*
				if(evaluatedConditions) {
					if(!passingStoryWithMostConditions.numConditions) {
						passingStoryWithMostConditions = {'storyK':k,'numConditions':numConditionsInStory,'conditionsAllTrue':true};
					} else if(numConditionsInStory > passingStoryWithMostConditions.numConditions) {
						passingStoryWithMostConditions = {'storyK':k,'numConditions':numConditionsInStory,'conditionsAllTrue':true};
					}
				}
				console.debug('passingStoryWithMostConditions',passingStoryWithMostConditions);
				*/

			}
			console.log
			//if at least one story passed, execute it's impacts:
			if(firstStoryK_WithAllConditionsTrueMostConditions !== false) {
			//if(passingStoryWithMostConditions.conditionsAllTrue) {
				console.log(placeWizardIsIn.stories[firstStoryK_WithAllConditionsTrueMostConditions]);

				var k = firstStoryK_WithAllConditionsTrueMostConditions;

				//reset all knownPlaces from the player.  This requires that each story have it's own set of knownPlaces to add to the player to choose from.  If none are provided, the player is trapped (until perhaps they do so action which triggers a different story and thus set of knownPlaces)
				wizard.hidden.knownPlaces.remove("_ALL_");
				
				for (var i=0;i<placeWizardIsIn.stories[k].impacts.length;i++){
					switch(placeWizardIsIn.stories[k].impacts[i].aspect) {
						case 'bag':
							switch(placeWizardIsIn.stories[k].impacts[i].action) {
								case 'add':
									wizard.bag.add(placeWizardIsIn.stories[k].impacts[i].value);
									impactMessages += bulletSymbol + placeWizardIsIn.stories[k].impacts[i].value + " has been added to your bag.";
									break;
								case 'remove':
									wizard.bag.remove(placeWizardIsIn.stories[k].impacts[i].value);
									break;
							}
							break;
						case 'money':
							switch(placeWizardIsIn.stories[k].impacts[i].action) {
								case 'add':
									wizard.money.add(placeWizardIsIn.stories[k].impacts[i].value);
									impactMessages += bulletSymbol + placeWizardIsIn.stories[k].impacts[i].value + " has been added to your purse.";

									break;
								case 'remove':
									wizard.money.remove(placeWizardIsIn.stories[k].impacts[i].value);
									break;
							}
							break;
						case 'health':
							switch(placeWizardIsIn.stories[k].impacts[i].action) {
								case 'add':
									wizard.health.add(placeWizardIsIn.stories[k].impacts[i].value);
									impactMessages += bulletSymbol + placeWizardIsIn.stories[k].impacts[i].value + " has been added to your health.";
									break;
								case 'remove':
									wizard.health.remove(placeWizardIsIn.stories[k].impacts[i].value);
									break;
							}
							break;
						case 'tags':
							switch(placeWizardIsIn.stories[k].impacts[i].action) {
								
								case 'add':
									wizard.hidden.tags.add(placeWizardIsIn.stories[k].impacts[i].value);
									break;
								case 'remove':
									wizard.hidden.tags.remove(placeWizardIsIn.stories[k].impacts[i].value);
									break;
							}
							break;
						case 'knownPlaces':
							switch(placeWizardIsIn.stories[k].impacts[i].action) {
								
								case 'add':
									wizard.hidden.knownPlaces.add(placeWizardIsIn.stories[k].impacts[i].value);
									break;
								case 'remove':
									wizard.hidden.knownPlaces.remove(placeWizardIsIn.stories[k].impacts[i].value);
									break;
								case 'removeAll':
									wizard.hidden.knownPlaces.remove("_ALL_");
									break;								
							}
							break;
						case 'places':
							switch(placeWizardIsIn.stories[k].impacts[i].action) {
								case 'add':
									wizard.hidden.places.add(placeWizardIsIn.stories[k].impacts[i].value);
									break;
								case 'remove':
									wizard.hidden.places.remove(placeWizardIsIn.stories[k].impacts[i].value);
									break;
								case 'removeAll':
									wizard.hidden.places.remove("_ALL_");
									break;								
							}
							break;
						case 'teleport':
							if(placeWizardIsIn.stories[k].impacts[i].value.toLowerCase() == "back") {
								wizard.geo.moveTo("back");
								wizardTeleported = true;
								savePlace = false;
								
							} else if(placeWizardIsIn.stories[k].impacts[i].value.toLowerCase() == "home") {
								wizard.geo.moveTo("home");
								//wizard.geo.moveTo(parseInt(locationToTeleportTo[0]),parseInt(locationToTeleportTo[1]),parseInt(locationToTeleportTo[2]));
								wizardTeleported = true;
								savePlace = false;
							} else {
								// assume that if none of the above, then it must be the name of the location.  (note, dropping the exact coordinates, as not really relevant for a story teller - the map creator will be used to organzize the various locations.)
								
								var locationToTeleportToString = placeWizardIsIn.stories[k].impacts[i].value;
								wizard.geo.moveTo({"location":locationToTeleportToString});

								//get x,y,z coordinates of the location name for moveTo
								//var locationToTeleportTo = returnPlaceCoord(locationToTeleportToString);
																
								
								wizardTeleported = true;
								savePlace = true;
								
								if(followModeOn) {
									//angular.element("#storyUIapp").scope().loadStoryByID(placeWizardIsIn.stories[k].storyID);
									//angular.element("#storyUIapp").scope().$apply();
									//console.log("wizard teleporting to: "+ locationToTeleportTo);
									//alert("hold");
								}
							}
							break;
						
						
						
						default:
					}
				}
				//wizard.bag.returnTo();
				//wizard.hidden.places.add(placeWizardIsIn.placeID);
				//wizard.hidden.stories.add(placeWizardIsIn.stories[k].storyID);
				//wizard.saveToDB();
				//wizard.log(placeWizardIsIn.stories[k].story);
				//console.debug(wizardTeleported);
				//return;// wizard.unread();
				
			}
			
			if(savePlace) wizard.hidden.places.add(placeWizardIsIn.placeName);

			console.debug(storiesIDsWhereUsingDidSomething,k);
			if(!storiesIDsWhereUsingDidSomething.hasOwnProperty(k) && wizard.bag.using.length) {
				wizard.log('but nothing happens...\n\n');
			}
			//console.debug('k:',k,passingStoryWithMostConditions.conditionsAllTrue); 
			
			if(firstStoryK_WithAllConditionsTrueMostConditions !== false) {
				wizard.hidden.stories.add(placeWizardIsIn.stories[k].storyID);
				console.debug(placeWizardIsIn.stories[k].story);
				wizard.log(placeWizardIsIn.stories[k].story);
				wizard.log(impactMessages);

				// if user has activated StoryID "followMode", then switch storyID's story to the correct StoryID
				if(followModeOn) {
					angular.element("#storyUIapp").scope().loadStoryByID(placeWizardIsIn.stories[k].storyID);
					angular.element("#storyUIapp").scope().$apply();
				}
			} else {
				var noStoriesMessage = "Nothing Here.  Boring...";
				if(placeWizardIsIn.placeDescription != undefined) {
					if(placeWizardIsIn.placeDescription.basic != undefined) {
						noStoriesMessage = placeWizardIsIn.placeDescription.basic;
					}
				}
				wizard.log(noStoriesMessage);
			}	
			//return any using items back into their bag
			wizard.bag.returnTo();

			//Removing the below, as switching to knownPlaces model that assumes the opposite.  the player knows nothing unless explicitly provided by the story (link style).
			/*
			//add the currentPlace to knownPlaces, with the assumpion that one always knows where they are.
			wizard.hidden.knownPlaces.add(wizard.geo.currentPlace);
			*/
			
			wizard.saveToDB();
			console.log("synchronizing...");
			
			angular.element("#playUIapp").scope().wizards[wizard.nameID] = JSON.parse(JSON.stringify(wizard));
			//alert(angular.element("#playUIapp").scope().wizards);
			
			console.log(wizard);
			//angular.element("#playUIapp").scope().$apply();
			
			/*var noStoriesMessage = "Nothing happens.";
			if(placeWizardIsIn.placeDescription != undefined) {
				if(placeWizardIsIn.placeDescription.basic != undefined) {
					noStoriesMessage = placeWizardIsIn.placeDescription.basic;
				}
			}
			wizard.log(noStoriesMessage);*/
			//return;
		}
		else
		{
			console.log("wizard is off the map.  location cannot be found.");
		}
		//console.debug(wizardTeleported);

	}
};

var getStoriesByLocation = function(locationName) {
	var storiesToReturn = [];
	storiesDB.forEach(function(storyArray) {
		if(locationName == undefined || storyArray[1] == locationName) {
			var tempStoryObj = {};
			tempStoryObj = JSON.parse(storyArray[2]);
			tempStoryObj.storyID = storyArray[0];
			storiesToReturn.push(tempStoryObj);
		}
	});
	return storiesToReturn;		
}
//map.quads.push(q0000); 
//map.quads.push(q0001);
//map.quads.push(q00n01);
//map.quads.push(q0100);
//console.debug(boeltjen.status());
//console.debug(map);
//console.debug(map.quadrant(boeltjen.geo));

//console.debug(map.reactTo(boeltjen));
/*
console.debug(map.reactTo(boeltjen));
boeltjen.geo.moveTo(0,1);

console.debug(map.reactTo(boeltjen));
console.debug(boeltjen.status());
var sdewing = new wizard('stacy',startingParams);
console.debug(sdewing.status());

*/
var boeltjen = new wizard('stacy',startingParams);
