var testConditions = [{aspect:"places",action:"hasNot",value:"this"},{aspect:"places",action:"hasNot",value:"this"}];
var app = angular.module('myApp', []);

app.directive('emitLastRepeaterElement', function() {
	return function(scope) {
		if (scope.$last){
			scope.$emit('LastRepeaterElement');
		}
	};
});


app.controller('storyCtrl', function($scope) {
	
	/*
	structure of $scope = {
		stories: [
			{
				placeName: "caveAboveCooridor",
				conditions: [{aspect:"places",action:"hasNot",value:"this"}],
				impacts: [{aspect:"bag",action:"add",value:"potion"}],
				order: 4,
				story: "once upon a time..."
			}
		]
	}
	*/
	//intialize $scope.stories array
	$scope.stories = storiesDBobj; //this line would be replaced with a DB call to get everything maybe for now..
	//var testStory = storiesDBobj[6];
	
	//set default story to load:
	$scope.storySelectSelected = $scope.stories[3];
	//$scope.storySelectSelected.id = 12;
	//$("#loadedStoryIndex").val(12);
	
	$scope.aspectsActionsValues = aspectsActionsValuesObj;

	$scope.storiesLocations = {};

	$scope.testgroupby = ["caveOfDestiny","cliffUnderPedestle","lockedRoomInEast","openField","portalToCave","smellyCorridor","theVoid","wolfField"];
	
	//intialize condition and impact selector ng-models:
	$scope.selectedItemAspect = {
			'condition' : false,
			'impact' : false 		
	};
	$scope.selectedItemAction = {
			'condition' : false,
			'impact' : false 		
	};
	$scope.selectedItemValue = {
			'condition' : false,
			'impact' : false 		
	};
	$scope.selectedImpactAspect = false;
	$scope.selectedImpactAction = false;
	$scope.selectedImpactValue = false;

	
    var blankStory = {
		location: "",
		story: "",
		order: "",
		conditions: [],
		impacts: [],
	};
	//updateImpacts Functions
	
	$scope.createNewStory = function() {
		var tempLocationName = $story.storySelectSelected.location;
		tempLocationName = prompt("Please enter the location name for your story",tempLocationName);
		console.log(tempLocationName);
		blankStory.location = tempLocationName;
		var newStoryID = $scope.stories.push(blankStory);
		$scope.cancelItem('condition');
		$scope.cancelItem('impact');
		$scope.storySelectSelected = $scope.stories[newStoryID-1];
		console.log("created a blank story, ID#" + (newStoryID-1));
		var newStoryID = $scope.stories.push(blankStory);

	}
	
	
	$scope.showDB = function() {
		console.log(storiesDBobj);
		
		
	}

	$scope.updateStoriesLocations = function(obj) {
		console.log(obj);
		return (obj.location);
		/*$scope.storiesLocations = {};
		$scope.stories.forEach( function(storyElement) {
			$scope.storiesLocations[storyElement.location] = true;			
		});

		console.log($scope.storiesLocations);		*/
	}	
	
	$scope.addItem = function(itemType) {
		let blankItemObj = {
				aspect: "",
				action: "",
				value: ""
		};
		if (itemType == undefined) {
			console.log("what is the item type?");
		} else {
			switch(itemType) {
				case "condition":
					$scope.cancelItem(itemType);

					$scope.storySelectSelected.conditions.push(blankItemObj);
					//$scope.$on('LastRepeaterElement', function(){console.log($("#conditionIndex3").parent().parent().html());});
					
					//console.log($("#conditionIndex2").parent().parent().html());
					//$scope.editItem("condition",$scope.storySelectSelected.conditions.length-1);
					break;
				case "impact":
					$scope.cancelItem(itemType);
					$scope.storySelectSelected.impacts.push(blankItemObj);
					//$scope.editItem("impact",$scope.storySelectSelected.impacts.length);
					break;
			}
		}
	}
	
	
	//updateConditions Functions
	//$("#updateCondition").click(function(){
	$scope.updateItem = function(itemType) {
		var editIndex = false;
		var updatedItemObj = false;
		if (itemType == undefined) {
			console.log("what is the item type?");
		} else {
			switch(itemType) {
				case "condition":
					var itemSelectors = $("#"+itemType+"Selectors");
					editIndex = Number(itemSelectors.find(".editItemIndex").text());
					console.log(itemSelectors.find(".editItemIndex").html());
					if (!$scope.selectedItemAspect[itemType] || !$scope.selectedItemAction[itemType] || !$scope.selectedItemValue[itemType] || (itemSelectors.find(".itemSelectorsRow").find(":selected").text().indexOf("Select ")+1)) {
						alert("please select at least one "+itemType+" aspect, action and value.");
						// note the extra indexOf check is to find errors when the data in the $scope doesn't match one of the drop-down items.
					
					} else {
						updatedItemObj = {
							aspect: $scope.selectedItemAspect[itemType],
							action: $scope.selectedItemAction[itemType],
							value: $scope.selectedItemValue[itemType]
						};
						$scope.selectedItemAspect[itemType] = false; 
						$scope.selectedItemAction[itemType] = false;
						$scope.selectedItemValue[itemType] = false;
					}
					if(updatedItemObj) {
						if(!editIndex) { // new item
							$scope.storySelectSelected.conditions.push(updatedItemObj);
							console.log("condition saved!");
						} else { // edited item

							//move controls back out of ng-repeat
							itemSelectors.find("tbody").prepend(itemSelectors.find(".itemSelectorsRow"));
							itemSelectors.find(".itemSelectorsRow").addClass("d-none");
							
							//reshow hidden table row
							var selectedConditionRow = itemSelectors.find(".itemIndex"+(editIndex)).parent();
							selectedConditionRow.removeClass("d-none");

							$scope.storySelectSelected.conditions[editIndex-1] = updatedItemObj;
							itemSelectors.find(".itemIndex"+(editIndex)).parent().show();
							itemSelectors.find(".editItemIndex").text("");
							itemSelectors.find(".updateItem").text("");
							itemSelectors.find(".cancelUpdateItem").addClass("d-none");
							console.log("condition updated!");
						}
						//resetItemSelects("condition");
					}
					break;
				case "impact":
					editIndex = Number($("#editImpactIndex").text());
					if (!$scope.selectedImpactAspect || !$scope.selectedImpactAction || !$scope.selectedImpactValue || ($("#impactSelectorsRow").find(":selected").text().indexOf("Select ")+1)) {
						alert("please select at least one "+itemType+" aspect, action and value.");
					} else {
						updatedItemObj = {
							aspect: $scope.selectedImpactAspect,
							action: $scope.selectedImpactAction,
							value: $scope.selectedImpactValue
						};
						$scope.selectedImpactAspect = false; 
						$scope.selectedImpactAction = false;
						$scope.selectedImpactValue = false;
					}					
					if(updatedItemObj) {
						if(!editIndex) { // new item
							$scope.storySelectSelected.impacts.push(updatedItemObj);
							console.log("impact saved!");
						} else { // edited item
						
							//move controls back out of ng-repeat
							$("#impactSelectors").find("tbody").prepend($("#impactSelectorsRow"));
							$("#impactSelectorsRow").addClass("d-none");
							
							//reshow hidden table row
							var selectedImpactRow = $("#impactIndex"+(editIndex)).parent();
							selectedImpactRow.removeClass("d-none");

							$scope.storySelectSelected.impacts[editIndex-1] = updatedItemObj;
							$("#impactIndex"+(editIndex)).parent().show();
							$("#editImpactIndex").text("");
							$("#updateImpact").text("Add Impact");
							$("#cancelUpdateImpact").addClass("d-none");
							console.log("impact updated!");
						
						

						}
						//resetItemSelects("impact");
					}
					break;					
				default:
				
			}
			// $digest() doesn't seem to be needed when the function is an object of the $scope.
			//$scope.$digest();
		}
		//console.log($scope.storySelectSelected);		
	}
	
	$scope.saveStory = function() {
		//$scope.stories[$("#loadedStoryIndex").val()] = $scope.storySelectSelected;

		/*
		$("#storyBody").val(testStory.story).trigger("change");
		$("#storyLocation").val(testStory.location).trigger("change");
		$("#storyOrder").val(testStory.order).trigger("change");	
		*/
		//console.log($scope.storySelectSelected);
	}

	$scope.loadNextStory = function() {
		let currentStoryID = Number($("#storySelect").find(":selected").text());
		let nextStoryID = (currentStoryID + 1 >= $scope.stories.length) ? currentStoryID : currentStoryID+1;
		$scope.cancelItem('condition');
		$scope.cancelItem('impact');
		$scope.storySelectSelected = $scope.stories[nextStoryID];
		console.log("loaded next story, ID# " + nextStoryID);
	}
	
	$scope.loadPrevStory = function() {
		let currentStoryID = Number($("#storySelect").find(":selected").text());
		let prevStoryID = (currentStoryID > 0 ) ? currentStoryID - 1 : currentStoryID;
		$scope.cancelItem('condition');
		$scope.cancelItem('impact');
		$scope.storySelectSelected = $scope.stories[prevStoryID];
		console.log("loaded previous story, ID# " + prevStoryID);
	}
	
	$scope.editItem = function (itemType,inputtedIndex) {
		if (itemType == undefined) {
			console.log("what is the item type?");
		} else {
			switch(itemType) {
				case "condition":
					var itemSelectors = $("#"+itemType+"Selectors");

					//cancel any previous open edits
					$scope.cancelItem(itemType);				
					//hide selected row and replace with the select drop downs
					//console.log(inputtedIndex);	
					var selectedItemRow = itemSelectors.find(".itemIndex"+(inputtedIndex + 1)).parent();
					//console.log(selectedItemRow.html());
					selectedItemRow.addClass("d-none");
					//alert("pause");
					//console.log(itemSelectors.find(".itemSelectorsRow").html());
					itemSelectors.find(".itemSelectorsRow").insertAfter(selectedItemRow);
					itemSelectors.find(".itemSelectorsRow").removeClass("d-none");
					
					
					
					itemSelectors.find(".editItemIndex").text(inputtedIndex + 1);
					itemSelectors.find(".updateItem").text("Update");
					itemSelectors.find(".cancelUpdateItem").removeClass("d-none");
					$scope.selectedItemAspect[itemType] = $scope.storySelectSelected[""+itemType+"s"][inputtedIndex].aspect; 
					$scope.selectedItemAction[itemType] = $scope.storySelectSelected[""+itemType+"s"][inputtedIndex].action;
					$scope.selectedItemValue[itemType] = $scope.storySelectSelected[""+itemType+"s"][inputtedIndex].value;
					break;
				case "impact":
					//cancel any previous open edits
					$scope.cancelItem(itemType);


					//hide selected row and replace with the select drop downs
					var selectedImpactRow = $("#impactIndex"+(inputtedIndex + 1)).parent();
					selectedImpactRow.addClass("d-none");
					$("#impactSelectorsRow").insertAfter(selectedImpactRow);
					$("#impactSelectorsRow").removeClass("d-none");

					$("#editImpactIndex").text(inputtedIndex + 1);
					$("#updateImpact").text("Update");
					$("#cancelUpdateImpact").removeClass("d-none");
					$scope.selectedImpactAspect = $scope.storySelectSelected.impacts[inputtedIndex].aspect; 
					$scope.selectedImpactAction = $scope.storySelectSelected.impacts[inputtedIndex].action;
					$scope.selectedImpactValue = $scope.storySelectSelected.impacts[inputtedIndex].value;
					break;
				default:
				
			}			
		}			
		//console.log($scope.storySelectSelected);		
	}

	$scope.cancelItem = function (itemType) {
		if (itemType == undefined) {
			console.log("what is the item type?");
		} else {
			var editIndex = false;
			switch(itemType) {
				case "condition":
					var itemSelectors = $("#"+itemType+"Selectors");
					var capitalizedItemName = itemType.charAt(0).toUpperCase() + itemType.slice(1);

					editIndex = Number(itemSelectors.find(".editItemIndex").text());
					
					//return selector row back to top out of ng-repeat (else ng-repeat will eat it), hide it, and reshow the selected table record
					
					itemSelectors.find("tbody").prepend(itemSelectors.find(".itemSelectorsRow"));
					//console.log("put itemSelectorRow out of ng-repeat so it doesn't get eaten!")
					itemSelectors.find(".itemSelectorsRow").addClass("d-none");
					var selectedConditionRow = itemSelectors.find(".itemIndex"+(editIndex)).parent();
					selectedConditionRow.removeClass("d-none");
					
					itemSelectors.find(".editItemIndex").text("");
					itemSelectors.find(".updateItem").text("");
					itemSelectors.find(".cancelUpdateItem").addClass("d-none");
					itemSelectors.find(".itemIndex"+(editIndex+1)).parent().show();
					$scope.selectedItemAspect[itemType] = false; 
					$scope.selectedItemAction[itemType] = false;
					$scope.selectedItemValue[itemType] = false;
					console.log(capitalizedItemName + " update Cancelled!");
					break;
				case "impact":
					editIndex = Number($("#editImpactIndex").text()	);
					
					//return selector row back to top out of ng-repeat, hide it, and reshow the selected table record
					
					$("#impactSelectors").find("tbody").prepend($("#impactSelectorsRow"));
					$("#impactSelectorsRow").addClass("d-none");
					var selectedImpactRow = $("#impactIndex"+(editIndex)).parent();
					selectedImpactRow.removeClass("d-none");

					$("#editImpactIndex").text("");
					$("#updateImpact").text("Add Impact");
					$("#cancelUpdateImpact").addClass("d-none");
					$("#impactIndex"+(editIndex+1)).parent().show();
					$scope.selectedImpactAspect = false; 
					$scope.selectedImpactAction = false;
					$scope.selectedImpactValue = false;
					console.log("Impact update Cancelled!");
					break;
				default:
				
			}
		}
		//console.log($scope.storySelectSelected);		
	}
	
	$scope.removeItem = function (itemType,inputtedIndex) {
		if (itemType == undefined) {
			console.log("what is the item type?");
		} else {
			switch(itemType) {
				case "condition":
					var itemSelectors = $("#"+itemType+"Selectors");
					var capitalizedItemName = itemType.charAt(0).toUpperCase() + itemType.slice(1);


					//cancel any previous open edits
					$scope.cancelItem(itemType);
					
					console.log(capitalizedItemName + " removed!");
					console.log($scope.storySelectSelected[itemType + "s"][inputtedIndex]);
					$scope.storySelectSelected[itemType + "s"].splice(inputtedIndex,1);
					itemSelectors.find(".editItemIndex").text("");
					itemSelectors.find(".updateItem").text("");
					itemSelectors.find(".cancelItemCondition").addClass("d-none");
					break;
				case "impact":
					//cancel any previous open edits
					$scope.cancelItem(itemType);
					

					console.log("Impact "+$scope.storySelectSelected.impacts[inputtedIndex]+" removed!");
					$scope.storySelectSelected.impacts.splice(inputtedIndex,1);
					$("#editImpactIndex").text("");
					$("#updateImpact").text("Add Impact");
					$("#cancelImpaCondition").addClass("d-none");
					break;
				default:
				
			}			
		}
		//console.log($scope.storySelectSelected);

	}		
});
