/*var testStory = {
		location: "smellyCave",
		story: "You look around and find yourself in a long blue, and very smelly, cave with completely impractical 70's style architecture. There's a stone stairway leading up to a cave with a faint light. You have the strange feeling that you've been here before...",
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

var HOME_LOCATION_STR = "openField";
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
		"smellyCave"		
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
		"caveAbove"
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
		"mirrorOnTheWall"
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

var storiesDBobj = {
	"smellyCave": [
		{
			location: "smellyCave",
			story: "Grog starts running (well, more like a fast walk..) towards you.  You try waving the torch around hoping it will scare the troll off.  Grog starts to slow and you think this might work.  But instead of pulling back in fear, Grog starts to follow the pattern of your torch swinging.  Grog begins to sway aback and forth, hypnotized by the moving light.  A second later Grog the Gross very ungracefully flops to the floor, back asleep.  You watch the peaceful troll for a moment, a bit mezmerized yourself... \n\nUntil Grog starts to twitch again!!",
			order: 3,
			conditions: [
				{aspect:"tags",action:"has",value:"angryGrog"},
				{aspect:"bag",action:"using",value:"torch"},
				{aspect:"bag",action:"hasNot",value:"tiny troll"},
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"openField|West"},
				{aspect:"knownPlaces",action:"add",value:"caveAbove|Stairway"},
				{aspect:"knownPlaces",action:"add",value:"mirrorOnTheWall|Mirror"},
			],
		},
		{
			location: "smellyCave",
			story: "Better think fast or you'll soon become Grog soup!!",
			order: 3,
			conditions: [
				{aspect:"tags",action:"has",value:"angryGrog"},
				{aspect:"bag",action:"hasNot",value:"tiny troll"},
				{aspect:"bag",action:"notUsing",value:"potion"},
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"openField|West"},
				{aspect:"knownPlaces",action:"add",value:"caveAbove|Stairway"},
				{aspect:"knownPlaces",action:"add",value:"mirrorOnTheWall|Mirror"},
			],
		},
		{
			location: "smellyCave",
			story: "The stink of the cooridor brings back your childhood memories of your classes with Professor Snape, and you suddenly get an idea of what that glowing potion does.  You uncork the potion and throw it at the Troll...  The troll begins to turn and spin and faster and faster.  Five seconds later the troll has shrunken to the size of a shopkin!  You tie him up and place him amongst your things.  You also grab the gold behind him!",
			order: 2,
			conditions: [
				{aspect:"bag",action:"hasNot",value:"tiny troll"},
				{aspect:"bag",action:"using",value:"potion"},
			],
			impacts: [
				{aspect:"bag",action:"remove",value:"potion"},
				{aspect:"money",action:"add",value:500},
				{aspect:"bag",action:"add",value:"tiny troll"},
				{aspect:"tags",action:"remove",value:"angryGrog"},
				{aspect:"knownPlaces",action:"add",value:"openField|East"},
				{aspect:"knownPlaces",action:"add",value:"caveAbove|Stairway"},
				{aspect:"knownPlaces",action:"add",value:"mirrorOnTheWall|Mirror"},
				

			],
		},
		{
			location: "smellyCave",
			story: "You decide that you can't leave without the gold and think that there might be something useful in your 'useless spellbook'.  You quickly shuffle through it and find the perfect spell - invisibility!  You begin the incantation...  Ah-lah-ka-kaa-ah-Choo! Oh no, instead of turning invisible, you placed a truth charm on the troll.  It begins to speak:  'I am Grog.  The Gross.  I can't find a job, so instead I spend my time trolling people on the nets.  And now I will troll you! \n\n\ Quick - Do Something!!",
			order: 3,
			conditions: [
				{aspect:"bag",action:"using",value:"useless spellbook"},
				{aspect:"bag",action:"hasNot",value:"tiny troll"}
			],
			impacts: [
				{aspect:"tags",action:"add",value:"angryGrog"},
				{aspect:"knownPlaces",action:"add",value:"openField|West"},
				{aspect:"knownPlaces",action:"add",value:"caveAbove|Stairway"},
				{aspect:"knownPlaces",action:"add",value:"mirrorOnTheWall|Mirror"},
				

			],
		},
		{
			location: "smellyCave",
			story: "You look around and find yourself in a long blue, and very smelly, cave with completely impractical 70's style architecture. There's a stone stairway leading up to a cave with a faint light. You have the strange feeling that you've been here before...",
			order: 5,
			conditions: [
				{aspect:"bag",action:"has",value:"tiny troll"}
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"mirrorOnTheWall|Mirror"},
				{aspect:"knownPlaces",action:"add",value:"openField|East"},
				{aspect:"knownPlaces",action:"add",value:"caveAbove|Stairway"},
			],
		},
		{
			location: "smellyCave",
			story: "You're in a familliar looking long blue, and very smelly, cave.  There's a stone stairway leading up to a cave with a faint light and a black mirror on the south wall.  Troll not far, and that gold is looking tempting. Maybe try using something useful from your bag?",
			order: 4,
			conditions: [
				{aspect:"places",action:"has",value:"this"},
				{aspect:"bag",action:"hasNot",value:"tiny troll"}
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"openField|East"},
				{aspect:"knownPlaces",action:"add",value:"caveAbove|Stairway"},
				{aspect:"knownPlaces",action:"add",value:"mirrorOnTheWall|Mirror"},

			
			],
		},
		{
			location: "smellyCave",
			story: "You look around and find yourself in a long blue, and very smelly, cave with completely impractical 70's style architecture.  There's a stone stairway leading up to a cave with a faint light.  On the south side there is an odd looking black mirror. There's a torch on the wall.  You decide to grab the torch and light it. At the end of the cave you see a large grey troll looking thing.  Behind it you can see the glint of gold McNuggets.",
			order: 10,
			conditions: [
				{aspect:"bag",action:"hasNot",value:"tiny troll"},
			],
			impacts: [
				{aspect:"bag",action:"add",value:"torch"},
				{aspect:"knownPlaces",action:"add",value:"mirrorOnTheWall|Mirror"},
				{aspect:"knownPlaces",action:"add",value:"openField|East"},
				{aspect:"knownPlaces",action:"add",value:"caveAbove|Stairway"},

			],
		},
		
	],
	"caveAbove" : [
		{
			location: "caveAbove",
			story: "You carefully climb the slippery stone steps into the cave.  On the floor is a chest containing several small glowing vials.  You pick it one up and put it in your bag.",
			order: 0,
			conditions: [
				{aspect:"bag",action:"hasNot",value:"potion"}
			],
			impacts: [
				{aspect:"bag",action:"add",value:"potion"},
				{aspect:"knownPlaces",action:"add",value:"smellyCave"},

			],
		},
		{
			location: "caveAbove",
			story: "As you climb the steps again you hear a small scratching sound.  As you walk into the cave you are startled to see a cloud of smoke with two glowing bright red eyes.  It begins to speak in a slow hissing whisper that send chills down your spine... 'the wolf has bitten you and yet here you stand.  Interesting...  You may pay the price to live, or continue as you are wandering for eternity... \n\n yes, yes, I can see it in your eyes.  I hope your soul is stronger than you are...' \n\nThe smoke begins to envelope your legs, your torso, your neck, and then blackness.  All you can hear is a the faint sound of a cackle and then 'The price is paid!'",
			order: 0,
			conditions: [
				{aspect:"tags",action:"has",value:"bite marks"},
				{aspect:"health",action:"hasNot",value:0}
			],
			impacts: [
				{aspect:"tags",action:"remove",value:"bite marks"},
				{aspect:"tags",action:"add",value:"mark of oblivion"},
				{aspect:"health",action:"add",value:"75"},
				{aspect:"knownPlaces",action:"add",value:"smellyCave"},

			],
		},
		{
			location: "caveAbove",
			story: "You carefully climb back up the slippery stone steps again.  Why are you doing this? Don't you know that it's not safe to go into dark caves!  Hey look!  To your surprise, there is still a chest on the floor with a bunch of potions! ...right where you left it...   sigh... you grab another vial and put it in your pocket.",
			order: 0,
			conditions: [
				{aspect:"bag",action:"hasNot",value:"potion"},
				{aspect:"places",action:"has",value:"this"},			
			],
			impacts: [
				{aspect:"bag",action:"add",value:"potion"},
				{aspect:"knownPlaces",action:"add",value:"smellyCave"},

			],
		},
		{
			location: "caveAbove",
			story: "You carefully climb back up the slippery stone steps again.  Nothing new here, boring...",
			order: 0,
			conditions: [	
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"smellyCave"},

			],
		},
	],
	"openField": [
		{
			location: "openField",
			story: "You're in an open field.  The sun is shinning.  The birds are singing.  The world is your oyster.",
			order: 0,
			conditions: [
				{aspect:"places",action:"hasNot",value:"this"},

			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"smellyCave|West"},
				{aspect:"knownPlaces",action:"add",value:"wolfField|North"},
				{aspect:"knownPlaces",action:"add",value:"lockedRoomInEast|East"},
				
			]
		},
		{
			location: "openField",
			story: "Legend has it that a big bad wolf lives to the north of here...  be prepared.",
			order: 0,
			conditions: [
				//{aspect:"places",action:"has",value:"this"},
				//{aspect:"stories",action:"hasNot",value:"this"},
				{aspect:"places",action:"hasNot",value:"wolfField"}
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"smellyCave|West"},
				{aspect:"knownPlaces",action:"add",value:"wolfField|North"},
				{aspect:"knownPlaces",action:"add",value:"lockedRoomInEast|East"},
			
			]
		},		
		
		{
			location: "openField",
			story: "Back in the field again.  Look's like a storm's coming...",
			order: 0,
			conditions: [
				//{aspect:"places",action:"has",value:"this"}
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"smellyCave|West"},
				{aspect:"knownPlaces",action:"add",value:"wolfField|North"},
				{aspect:"knownPlaces",action:"add",value:"lockedRoomInEast|East"},

			]
		},
	],
	"wolfField": [
		{
			location: "wolfField",
			story: "As you walk into a large clearing, a small green man comes over to you and sits and your feet in lotus.  'I am Yoada, cousin to the great Jedi warrior Yoda.  I can see in your aura that you have been to the cave above the cave.  Tell me - why did you go there? was not the stairs very slippery?  Was the potion not enough to stop Grog?",
			order: 0,
			conditions: [
				{aspect:"stories",action:"hasNot",value:"this"},
				{aspect:"places",action:"has",value:"caveAbove"},
				{aspect:"bag",action:"hasNot",value:"tiny troll"}
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"openField|South"},
				
			]
		},	
		{
			location: "wolfField",
			story: "You barely take a step into the open field when Yoada cartwheels into the field.  'Yes!!  You did it!!'  Yoada waves his three fingered hand and the tiny troll flies out of your bag and into Yoada's hand.  Yoada begins to yell at the little troll in his hand: 'Ha!  I told you I'd have my revenge Grog!  Never again will you steal my lunch milk.  Never Again!!!!!\n\n as for you young padawan,  I am grateful for your help.  In exchange for your efforts, I grant upon you the sword of uke.  Keep it safe, and it will do the same in return.",
			order: 0,
			conditions: [
				{aspect:"stories",action:"hasNot",value:"this"},			
				{aspect:"places",action:"has",value:"caveAbove"},
				{aspect:"bag",action:"has",value:"tiny troll"}
			],
			impacts: [
				{aspect:"bag",action:"remove",value:"tiny troll"},
				{aspect:"bag",action:"add",value:"sword of uke"},
				{aspect:"knownPlaces",action:"add",value:"openField|South"},
				
			]
		},
		{
			location: "wolfField",
			story: "@wizard is in the middle of another the field. You decide to take a break and eat your delicious pizza. Suddenly a huge Wolf emerges from the trees. He obviously smelled @wizard's pizza and is very hungry.  The Wolf eats you and the pizza in one huge bite.",
			order: 0,
			conditions: [
				{aspect:"stories",action:"hasNot",value:"this"},				
				{aspect:"bag",action:"has",value:"pizza"},
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"openField"},

				{aspect:"bag",action:"remove",value:"pizza"},
				{aspect:"health",action:"remove",value:"100"},
				{aspect:"tags",action:"add",value:"bite marks"}
			]
		},
		{
			location: "wolfField",
			story: "@wizard walks into another large field, but surrounded by dark forests. Very dark forests...  you get the feeling that maybe you shouldn't stick around here much longer...",
			order: 0,
			conditions: [
				{aspect:"places",action:"hasNot",value:"this"},				
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"openField"},
			]
		},
		{
			location: "wolfField",
			story: "Back in another field.  Nothing here right now.  Boring...",
			order: 0,
			conditions: [
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"openField"},
			]
		},
	
	],
	"theVoid": [		
		{
			location: "theVoid",
			story: "You've somehow wandered into the void.  A giant swirling hole sucks you in and everything goes black...\n\n",
			order: 0,
			conditions: [
			],
			impacts: [
				{aspect:"teleport",action:"",value:"home"}
			],
		},
	],
	"mirrorOnTheWall": [		
		{
			location: "mirrorOnTheWall",
			story: "You carefully reach out to the black mirror.  The surface feels strange, almost like...  your whole hand suddenly slips INTO the mirror.  Waves of light ripple around your forearm.  You tentatively push further in, but as you do you lose your balance and begin to fall forward.  Before you know what happened you've fallen completely into the mirror.  Around you the world begins to spin and everything goes black...\n\n",
			order: 0,
			conditions: [
				{aspect:"tags",action:"has",value:"mark of oblivion"}		
			],
			impacts: [
				{aspect:"teleport",action:"",value:"caveOfDestiny"}
			],
		},		
		{
			location: "mirrorOnTheWall",
			story: "You walk over to the mirror.  You look good - nice hair!  \n\n",
			order: 0,
			conditions: [
			],
			impacts: [
				{aspect:"teleport",action:"",value:"back"}
			],		
		},		
	],
	"caveOfDestiny": [			
		{
			location: "caveOfDestiny",
			story: "You feel strong winds cutting across your face.  As you look around, you can't believe what you are seeing.  You are standing atop a pedestle of stone, hundreds of metres up in the air.  Around you lies a dried red land, cracked with large rifts, and almost no vegetation, for miles and miles around. \n\nFrom above you can see great eagles gliding in the air above.",
			order: 0,
			conditions: [
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"cliffUnderPedestle|Down"},

			],		
		},
	],
	"cliffUnderPedestle": [			
		{
			location: "cliffUnderPedestle",
			story: "You carefully try to climb down the stone pedestle.  For a few feet all goes well, until you step on a loose rock.  Your foot slips.  You quickly grasp onto the ledge above.  Hanging for dear life, you make a silent prayer to your god.  Unfortunately, it looks like it wasn't listening, as a second later the ledge breaks off and you begin to fall to your doom.\n\nEverything goes black...\n\n",
			order: 0,
			conditions: [
			],
			impacts: [
				{aspect:"teleport",action:"",value:"home"}
			],	
		},
	],
	"lockedRoomInEast": [			
		{
			location: "lockedRoomInEast",
			story: "You pull out the sword of uke and slash at the glowing door!\n\nIt cut through like butter - better be careful not to cut yourself...\n\nYou push aside the broken door and walk into a glorious (but tiny - ...it is still a hut) room filled with treasures of the simple kind and with another open door at the back.    \n\nYou sit down and partake in the tasty treasure of dried fruit, water, and a nice cup o' joe.  Ahh, this is the life.\n\n",
			order: 0,
			conditions: [
				{aspect:"places",action:"has",value:"this"},
				{aspect:"bag",action:"using",value:"sword of uke"}
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"openField|Outside"},
				{aspect:"knownPlaces",action:"add",value:"upstairs.lockedRoomInEast|Upstairs"},
				{aspect:"tags",action:"add",value:"unlocked.lockedRoomInEast"}	
			
			],		
		},
		{
			location: "lockedRoomInEast",
			story: `You try smashing on the front doors with your wooden staff.  It doesn't seem to help though.  In frustration you throw your staff against the glowing door.  For once in your life your shot is perfect, it hits directly in the middle of the strange door and sinks in partway with a 'slup' spound.  For a second the door holds the staff like a javelin - and you get excited that maybe you found a way out!  The door then unappologetically spits the thing back out.  You barely have time to say 'oh sh--'..

			Your world goes black.
			
			`,
			order: 0,
			conditions: [
				{aspect:"bag",action:"using",value:"wooden staff"},
				{aspect:"places",action:"has",value:"this"},
			],
			impacts: [
				{aspect:"teleport",action:"",value:"home"},
				{aspect:"places",action:"remove",value:"_ALL_"},
				{aspect:"stories",action:"remove",value:"_ALL_"},
				{aspect:"knownPlaces",action:"add",value:"upstairs.lockedRoomInEast|Upstairs"},
			],		
		},		
		{
			location: "lockedRoomInEast",
			story: `Still stuck in a hut...
			`,
			order: 0,
			conditions: [
				{aspect:"places",action:"has",value:"this"},			
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"upstairs.lockedRoomInEast|Upstairs"},
			],		
		},			
		{
			location: "lockedRoomInEast",
			story: `You walk into a small hut surrounded by some light shrubbery.  The room is very plain and dull, but there is a door that seems to be glowing in the back wall.
			
			As you begin to walk over to it, you hear a light 'click' and notice that the front door has shut behind you.
			
			You run over and try the door, but no surprise, the door is locked.
			
			Look like you're trapped...
			
			
			`,
			order: 0,
			conditions: [
			],
			impacts: [
				{aspect:"knownPlaces",action:"add",value:"upstairs.lockedRoomInEast|Balcony"},
			],		
		},

	
	],
	
	"upstairs.lockedRoomInEast": [			
		{
			location: "lockedRoomInEast",
			story: `You look around for the stairs to the upstairs.  Can't find any though.

			Duh - it's a hut, you can almost reach across the place with your arms!
			
			`,
			order: 0,
			conditions: [
			],
			impacts: [
				{aspect:"teleport",action:"",value:"back"},		
			],		
		},
	],
};	
