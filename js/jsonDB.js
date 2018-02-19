/*var testStory = {
		location: "smellyCorridor",
		story: "You look around and find yourself in a long blue, and very smelly, corridor with completely impractical 70's style architecture. There's a stone stairway leading up to a cave with a faint light. You have the strange feeling that you've been here before...",
		order: 5,
		conditions: [
			{aspect:"bag",action:"has",value:"tiny troll"}
		],
		impacts: [
		]
};*/

var aspectsActionsValuesObj = {
	'condition' : {
		'bag' :  {
			'has': {
				'_ascii_':true
			},
			'hasNot': {
				'_ascii_':true
			},
			'using': {
				'_ascii_':true
			},
			'notUsing': {
				'_ascii_':true
			}
		},
		'places' : {
			'has':{
				'this':true,
				'_ascii_':true,
				'_num_':true
			},
			'hasNot':{
				'this':true,
				'_ascii_':true,
				'_num_':true
			},
		},
		'stories' : {
			'has':{
				'this':true,
				'_num_':true
			},
			'hasNot':{
				'this':true,
				'_num_':true
			},
		},
		'tags' :{
			'has': {
				'_ascii_':true
			},
			'hasNot': {
				'_ascii_':true
			}
		},
		'money' : {
			'has': {
				'_num_':true
			},
			'hasNot': {
				'_num_':true
			},
		},
		'health' : {
			'has': {
				'_num_':true
			},
			'hasNot': {
				'_num_':true
			},
		}
	},
	'impact' : {
		'bag' :  {
			'has': {
				'_ascii_':true
			},
			'hasNot': {
				'_ascii_':true
			},
			'using': {
				'_ascii_':true
			},
			'notUsing': {
				'_ascii_':true
			}
		},
		'places' : {
			'has':{
				'this':true,
				'_ascii_':true,
				'_num_':true
			},
			'hasNot':{
				'this':true,
				'_ascii_':true,
				'_num_':true
			},
		},
		'stories' : {
			'has':{
				'this':true,
				'_num_':true
			},
			'hasNot':{
				'this':true,
				'_num_':true
			},
		},
		'tags' :{
			'has': {
				'_ascii_':true
			},
			'hasNot': {
				'_ascii_':true
			}
		},
		'money' : {
			'has': {
				'_num_':true
			},
			'hasNot': {
				'_num_':true
			},
		},
		'health' : {
			'has': {
				'_num_':true
			},
			'hasNot': {
				'_num_':true
			},
		}
	}
};

var placesDBobj = [
	[0,0,-1,0,{ 
		walls: {
			posX:{exists:0,msg:""},
			negX:{exists:0,msg:""},
			posY:{exists:0,msg:""},
			negY:{exists:0,msg:""},
			posZ:{exists:0,msg:""},
			negZ:{exists:1,msg:""}
		}},
		"smellyCorridor"		
	],
	[1,0,0,0,{ walls: {
			posX:{exists:0,msg:""},
			negX:{exists:0,msg:""},
			posY:{exists:0,msg:""},
			negY:{exists:0,msg:""},
			posZ:{exists:1,msg:""},
			negZ:{exists:1,msg:""}
		}},
		"openField"
	],
	[2,0,-1,1,{ walls: {
			posX:{exists:1,msg:""},
			negX:{exists:1,msg:""},
			posY:{exists:1,msg:""},
			negY:{exists:1,msg:""},
			posZ:{exists:1,msg:""},
			negZ:{exists:0,msg:""}
		}},
		"caveAboveCorridor"
	],
	[3,0,1,0,{ walls: {
			posX:{exists:0,msg:""},
			negX:{exists:0,msg:""},
			posY:{exists:0,msg:""},
			negY:{exists:0,msg:""},
			posZ:{exists:1,msg:""},
			negZ:{exists:1,msg:""}
		}},
		"wolfField"
	],
	[5,0,2,0,{ walls: {
			posX:{exists:0,msg:""},
			negX:{exists:0,msg:""},
			posY:{exists:0,msg:""},
			negY:{exists:0,msg:""},
			posZ:{exists:1,msg:""},
			negZ:{exists:1,msg:""}
		},
		placeDescription: {
			basic:"Basic Open Field2",
			detailed:"Detailed Open Field2" ,
			returned:"Returned Open Field2" 
		}},
		"openField2"
	],
	[6,0,-3,0,{ walls: {
			posX:{exists:1,msg:""},
			negX:{exists:1,msg:""},
			posY:{exists:1,msg:""},
			negY:{exists:1,msg:""},
			posZ:{exists:1,msg:""},
			negZ:{exists:1,msg:""}
		}},
		"theVoid"
	],	
	[7,0,-2,0,{ walls: {
			posX:{exists:1,msg:""},
			negX:{exists:1,msg:""},
			posY:{exists:1,msg:""},
			negY:{exists:1,msg:""},
			posZ:{exists:1,msg:""},
			negZ:{exists:1,msg:""}
		}},
		"portalToCave"
	],	
	[7,100,100,10,{ walls: {
			posX:{exists:1,msg:"That's quite a drop, I wouldn't go there if I were you."},
			negX:{exists:1,msg:"That's quite a drop, I wouldn't go there if I were you."},
			posY:{exists:1,msg:"That's quite a drop, I wouldn't go there if I were you."},
			negY:{exists:1,msg:"That's quite a drop, I wouldn't go there if I were you."},
			posZ:{exists:1,msg:"Unlike those eagles, you haven't yet learned to fly."},
			negZ:{exists:0,msg:""}
		}},
		"caveOfDestiny"
	],		
	[8,100,100,9,{ walls: {
			posX:{exists:1,msg:"That's quite a drop, I wouldn't go there if I were you."},
			negX:{exists:1,msg:"That's quite a drop, I wouldn't go there if I were you."},
			posY:{exists:1,msg:"That's quite a drop, I wouldn't go there if I were you."},
			negY:{exists:1,msg:"That's quite a drop, I wouldn't go there if I were you."},
			posZ:{exists:0,msg:""},
			negZ:{exists:0,msg:""}
		}},
		"cliffUnderPedestle"
	],		
	[9,1,-1,0,{ walls: {
			posX:{exists:1,msg:""},
			negX:{exists:1,msg:""},
			posY:{exists:1,msg:""},
			negY:{exists:1,msg:""},
			posZ:{exists:1,msg:""},
			negZ:{exists:1,msg:""}
		}},
		"lockedRoomInEast"
	],
	[10,-1,0,0,{ walls: {
			posX:{exists:1,msg:"Door is Locked!"},
			negX:{exists:1,msg:"Solid Wall that way."},
			posY:{exists:1,msg:"Solid Wall that way."},
			negY:{exists:1,msg:"Solid Wall that way."},
			posZ:{exists:1,msg:"Eww, look at all those cobwebs - I'm not going that way!"},
			negZ:{exists:1,msg:"Sorry, Ground is too hard to go through"}
		}},
		"houseWithTrap"
	],	
];	

var storiesDBobj = [
	{
		location: "smellyCorridor",
		story: "You look around and find yourself in a long blue, and very smelly, corridor with completely impractical 70's style architecture. There's a stone stairway leading up to a cave with a faint light. You have the strange feeling that you've been here before...",
		order: 5,
		conditions: [
			{aspect:"bag",action:"has",value:"tiny troll"}
		],
		impacts: [
		],
	},
	{
		location: "smellyCorridor",
		story: "You look around and find yourself in a long blue, and very smelly, corridor with completely impractical 70's style architecture.  There's a stone stairway leading up to a cave with a faint light.  On the south side there is an odd looking black mirror. There's a torch on the wall.  You decide to grab the torch and light it. At the end of the corridor you see a large grey troll looking thing.  Behind it you can see the glint of gold McNuggets.",
		order: 1,
		conditions: [
			{aspect:"places",action:"hasNot",value:"this"},			
		],
		impacts: [
			{aspect:"bag",action:"add",value:"torch"},
		],
	},
	{
		location: "smellyCorridor",
		story: "You're in a familliar looking long blue, and very smelly, corridor.  There's a stone stairway leading up to a cave with a faint light and a black mirror on the south wall.  Troll not far, and that gold is looking tempting. Maybe try using something useful from your bag?",
		order: 4,
		conditions: [
			{aspect:"places",action:"has",value:"this"},
			{aspect:"bag",action:"hasNot",value:"tiny troll"}
		],
		impacts: [
		],
	},
	{
		location: "smellyCorridor",
		story: "The stink of the cooridor brings back your childhood memories of your classes with Professor Snape, and you suddenly get an idea of what that glowing potion does.  You uncork the potion and throw it at the Troll...  The troll begins to turn and spin and faster and faster.  Five seconds later the troll has shrunken to the size of a shopkin!  You tie him up and place him amongst your things.  You also grab the gold behind him!",
		order: 2,
		conditions: [
			{aspect:"bag",action:"hasNot",value:"tiny troll"},
			{aspect:"bag",action:"using",value:"potion"},
		],
		impacts: [
			{aspect:"bag",action:"remove",value:"potion"},
			{aspect:"money",action:"add",value:500},
			{aspect:"bag",action:"add",value:"tiny troll"}
		],
	},
	{
		location: "smellyCorridor",
		story: "You decide that you can't leave without the gold and think that there might be something useful in your 'useless spellbook'.  You quickly shuffle through it and find the perfect spell - invisibility!  You begin the incantation...  Ah-lah-ka-kaa-ah-Choo! Oh no, instead of turning invisible, you placed a truth charm on the troll.  It begins to speak:  'I am Grog.  The Gross.  I can't find a job, so instead I spend my time trolling people on the nets.  And now I will troll you!  Quick - Do Something!!",
		order: 3,
		conditions: [
			{aspect:"bag",action:"using",value:"useless spellbook"},
			{aspect:"bag",action:"hasNot",value:"tiny troll"}
		],
		impacts: [
		],
	},
	{
		location: "caveAboveCorridor",
		story: "You carefully climb the slippery stone steps into the cave.  On the floor is a chest containing several small glowing vials.  You pick it one up and put it in your bag.",
		order: 0,
		conditions: [
			{aspect:"bag",action:"hasNot",value:"potion"}
		],
		impacts: [
			{aspect:"bag",action:"add",value:"potion"}
		],
	},
	{
		location: "openField",
		story: "You're in an open field.  The sun is shinning.  The birds are singing.  The world is your oyster.",
		order: 0,
		conditions: [
			{aspect:"places",action:"hasNot",value:"this"}
		],
		impacts: [
		]
	},
	{
		location: "wolfField",
		story: "@wizard is in the middle of another the field. You decide to take a break and eat your delicious pizza. Suddenly a huge Wolf emerges from the trees. He obviously smelled @wizard's pizza and is very hungry.  The Wolf eats you and the pizza in one huge bite.",
		order: 0,
		conditions: [
			{aspect:"bag",action:"has",value:"pizza"}
		],
		impacts: [
			{aspect:"bag",action:"remove",value:"pizza"},
			{aspect:"health",action:"remove",value:"100"},
			{aspect:"tags",action:"add",value:"bite marks"}
		]
	},
	{
		location: "openField",
		story: "Back in the field again.  Look's like a storm's coming...",
		order: 0,
		conditions: [
			{aspect:"places",action:"has",value:"this"}
		],
		impacts: [
		]
	},
	{
		location: "openField",
		story: "Legend has it that a big bad wolf lives to the north of here...  be prepared.",
		order: 0,
		conditions: [
			{aspect:"places",action:"has",value:"this"},
			{aspect:"stories",action:"hasNot",value:"this"},
			{aspect:"places",action:"hasNot",value:"wolfField"}
		],
		impacts: [
		]
	},
	{
		location: "wolfField",
		story: "As you walk into a large clearing, a small green man comes over to you and sits and your feet in lotus.  'I am Yoada, cousin to the great Jedi warrior Yoda.  I can see in your aura that you have been to the cave above the corridor.  Tell me - why did you go there? was not the stairs very slippery?  Was the potion not enough to stop Grog?",
		order: 0,
		conditions: [
			{aspect:"places",action:"has",value:"caveAboveCorridor"},
			{aspect:"bag",action:"hasNot",value:"tiny troll"}
		],
		impacts: [

		]
	},	
	{
		location: "wolfField",
		story: "You barely take a step into the open field when Yoada cartwheels into the field.  'Yes!!  You did it!!'  Yoada waves his three fingered hand and the tiny troll flies out of your bag and into Yoada's hand.  Yoada begins to yell at the little troll in his hand: 'Ha!  I told you I'd have my revenge Grog!  Never again will you steal my lunch milk.  Never Again!!!!!\n\n as for you young padawan,  I am grateful for your help.  In exchange for your efforts, I grant upon you the sword of uke.  Keep it safe, and it will do the same in return.",
		order: 0,
		conditions: [
			{aspect:"places",action:"has",value:"caveAboveCorridor"},
			{aspect:"bag",action:"has",value:"tiny troll"}
		],
		impacts: [
			{aspect:"bag",action:"remove",value:"tiny troll"},
			{aspect:"bag",action:"add",value:"sword of uke"}			
		]
	},
	{
		location: "caveAboveCorridor",
		story: "As you climb the steps again you hear a small scratching sound.  As you walk into the cave you are startled to see a cloud of smoke with two glowing bright red eyes.  It begins to speak in a slow hissing whisper that send chills down your spine... 'the wolf has bitten you and yet here you stand.  Interesting...  You may pay the price to live, or continue as you are wandering for eternity... \n\n yes, yes, I can see it in your eyes.  I hope your soul is stronger than you are...' \n\nThe smoke begins to envelope your legs, your torso, your neck, and then blackness.  All you can hear is a the faint sound of a cackle and then 'The price is paid!'",
		order: 0,
		conditions: [
			{aspect:"tags",action:"has",value:"bite marks"},
			{aspect:"health",action:"hasNot",value:0}
		],
		impacts: [
			{aspect:"tags",action:"remove",value:"bite marks"},
			{aspect:"tags",action:"add",value:"mark of oblivion"},
			{aspect:"health",action:"add",value:"75"}

		],
	},	
	{
		location: "theVoid",
		story: "You've somehow wandered into the void.  A giant swirling hole sucks you in and everything goes black...\n\n",
		order: 0,
		conditions: [
		],
		impacts: [
			{aspect:"teleport",action:"",value:"0,0,0"}
		],
	},
	{
		location: "portalToCave",
		story: "You carefully reach out to the black mirror.  The surface feels strange, almost like...  your whole hand suddenly slips INTO the mirror.  Waves of light ripple around your forearm.  You tentatively push further in, but as you do you lose your balance and begin to fall forward.  Before you know what happened you've fallen completely into the mirror.  Around you the world begins to spin and everything goes black...\n\n",
		order: 0,
		conditions: [
			{aspect:"tags",action:"has",value:"mark of oblivion"}		
		],
		impacts: [
			{aspect:"teleport",action:"",value:"100,100,10"}
		],
	},		
	{
		location: "portalToCave",
		story: "You walk over to the mirror.  You look good - nice hair!  \n\n",
		order: 0,
		conditions: [
		],
		impacts: [
			{aspect:"teleport",action:"",value:"back"}
		],		
	},		
	{
		location: "caveOfDestiny",
		story: "You feel strong winds cutting across your face.  As you look around, you can't believe what you are seeing.  You are standing atop a pedestle of stone, hundreds of metres up in the air.  Around you lies a dried red land, cracked with large rifts, and almost no vegetation, for miles and miles around. \n\nFrom above you can see great eagles gliding in the air above.",
		order: 0,
		conditions: [
		],
		impacts: [
			
		],		
	},		
	{
		location: "cliffUnderPedestle",
		story: "You carefully try to climb down the stone pedestle.  For a few feet all goes well, until you step on a loose rock.  Your foot slips.  You quickly grasp onto the ledge above.  Hanging for dear life, you make a silent prayer to your god.  Unfortunately, it looks like it wasn't listening, as a second later the ledge breaks off and you begin to fall to your doom.\n\nEverything goes black...\n\n",
		order: 0,
		conditions: [
		],
		impacts: [
			{aspect:"teleport",action:"",value:"0,0,0"}
		],	
	},
	{
		location: "lockedRoomInEast",
		story: "Sorry, the door is locked.\n\n",
		order: 0,
		conditions: [
		],
		impacts: [
			{aspect:"teleport",action:"",value:"back"}
		],		
	}
];	
