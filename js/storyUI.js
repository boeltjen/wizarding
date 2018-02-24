var testConditions = [{aspect:"places",action:"hasNot",value:"this"},{aspect:"places",action:"hasNot",value:"this"}];
var app = angular.module('storyUIapp', []);

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
		location: "blankStory",
		story: "",
		order: "",
		conditions: [],
		impacts: [],
	};
	//updateImpacts Functions
	
	$scope.createNewStory = function(updateCreate) {
		var tempLocationName = $scope.storySelectSelected.location;
		tempLocationName = prompt("Please enter the location name for your story",tempLocationName);
		//if user cancelled or entered blank, then do nothing, else:
		if(tempLocationName) {
			if(updateCreate == 'update') {
				$scope.storySelectSelected.location = tempLocationName;
				//run this hack to update the story select dropdown
				var tempStoryID = $scope.stories.push(blankStory);
				setTimeout(function(){
					//added a slight timedelay here to allow the DOM to render so that the optGroups update with the locations.  For some reason it makes all the difference.  It's a hack (on top of a hack of creating new and deleting), so feel free to update with a better solution.
					$scope.stories.splice((tempStoryID-1),1);
				}, 1);
				//******************
				console.debug("updated location name to " + tempLocationName);
			} else if(updateCreate == 'duplicate') {
				var duplicateStory = JSON.parse(JSON.stringify($scope.storySelectSelected));
				duplicateStory.location = tempLocationName;
				var newStoryID = $scope.stories.push(duplicateStory);
				$scope.loadStoryByID(newStoryID-1);
				console.debug("Duplicated current story.  New story ID#" + (newStoryID-1));
			} else {
				blankStory.location = tempLocationName;
				var newStoryID = $scope.stories.push(blankStory);
				$scope.loadStoryByID(newStoryID-1);
				console.debug("created a blank story, ID#" + (newStoryID-1));	
			}
		}
	}
	
	$scope.loadStoryByID = function(storyIDNum) {
		$scope.cancelItem('condition');
		$scope.cancelItem('impact');
		$scope.storySelectSelected = $scope.stories[storyIDNum];
	}
	
	$scope.showDB = function() {
		console.debug(storiesDBobj);
		
		
	}

	$scope.updateStoriesLocations = function(obj) {
		//console.debug(obj);
		return (obj.location);
		/*$scope.storiesLocations = {};
		$scope.stories.forEach( function(storyElement) {
			$scope.storiesLocations[storyElement.location] = true;			
		});

		console.debug($scope.storiesLocations);		*/
	}	
	
	$scope.addItem = function(itemType) {
		let blankItemObj = {
				aspect: "",
				action: "",
				value: ""
		};
		if (itemType == undefined) {
			console.debug("what is the item type?");
		} else {
			switch(itemType) {
				case "condition":
					$scope.cancelItem(itemType);

					$scope.storySelectSelected.conditions.push(blankItemObj);
					//$scope.$on('LastRepeaterElement', function(){console.debug($("#conditionIndex3").parent().parent().html());});
					
					//console.debug($("#conditionIndex2").parent().parent().html());
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
			console.debug("what is the item type?");
		} else {
			switch(itemType) {
				case "condition":
					var itemSelectors = $("#"+itemType+"Selectors");
					editIndex = Number(itemSelectors.find(".editItemIndex").text());
					//console.debug(itemSelectors.find(".editItemIndex").html());
					if (!$scope.selectedItemAspect[itemType] || !$scope.selectedItemAction[itemType] || !$scope.selectedItemValue[itemType] || (itemSelectors.find(".itemSelectorsRow").find(":selected").text().indexOf("Select ")+1)) {
						alert("please provide at least one "+itemType+" aspect, action and value.");
						// note the extra indexOf check is to find errors when the data in the $scope doesn't match one of the drop-down items.
					
					} else {
						if (!isNaN($scope.selectedItemValue[itemType])) {
							$scope.selectedItemValue[itemType] = Number($scope.selectedItemValue[itemType]);
							console.debug("found Number - saved as a number not a string");
						}
							
							
						//itemSelectors.find(".valueInput").find("input").val();//removeClass(".d-none");
						
						//if($scope.selectedItemValue[itemType] == "_ascii_" || $scope.selectedItemValue[itemType] == "_num_") {
							//var tempValue = itemSelectors.find(".valueInput").find("input").val();//removeClass(".d-none");
							//var tempValue = prompt("Please enter a value of type: " + $scope.selectedItemValue[itemType],$scope.selectedItemValue[itemType]);
							
							/*
							if (!tempValue) {
								return;	
							}
							if ($scope.selectedItemValue[itemType] == "_ascii_" && tempValue != "_ascii_" && tempValue) {	
								$scope.selectedItemValue[itemType] = tempValue;
							} else if ($scope.selectedItemValue[itemType] == "_num_" && tempValue != "_num_" && tempValue) {
								$scope.selectedItemValue[itemType] = Number(tempValue);
							} else {
								alert("Invalid Value - Please try again.")
								return;
							}
							*/
						
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
							console.debug("condition saved!");
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
							console.debug("condition updated!");
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
							console.debug("impact saved!");
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
							console.debug("impact updated!");
						
						

						}
						//resetItemSelects("impact");
					}
					break;					
				default:
				
			}
			// $digest() doesn't seem to be needed when the function is an object of the $scope.
			//$scope.$digest();
		}
		//console.debug($scope.storySelectSelected);		
	}
	
	$scope.saveStory = function() {
		//$scope.stories[$("#loadedStoryIndex").val()] = $scope.storySelectSelected;
		console.log("received");
		/*
		$("#storyBody").val(testStory.story).trigger("change");
		$("#storyLocation").val(testStory.location).trigger("change");
		$("#storyOrder").val(testStory.order).trigger("change");	
		*/
		//console.debug($scope.storySelectSelected);
	}

	$scope.loadNextStory = function() {
		let currentStoryID = Number($("#storySelect").find(":selected").text());
		let nextStoryID = (currentStoryID + 1 >= $scope.stories.length) ? currentStoryID : currentStoryID+1;
		$scope.loadStoryByID(nextStoryID);
		console.debug("loaded next story, ID# " + nextStoryID);
	}
	
	$scope.loadPrevStory = function() {
		let currentStoryID = Number($("#storySelect").find(":selected").text());
		let prevStoryID = (currentStoryID > 0 ) ? currentStoryID - 1 : currentStoryID;
		$scope.loadStoryByID(prevStoryID);
		console.debug("loaded previous story, ID# " + prevStoryID);
	}
	
	$scope.editItem = function (itemType,inputtedIndex) {
		if (itemType == undefined) {
			console.debug("what is the item type?");
		} else {
			switch(itemType) {
				case "condition":
					var itemSelectors = $("#"+itemType+"Selectors");

					//cancel any previous open edits
					$scope.cancelItem(itemType);				
					//hide selected row and replace with the select drop downs
					//console.debug(inputtedIndex);	
					var selectedItemRow = itemSelectors.find(".itemIndex"+(inputtedIndex + 1)).parent();
					//console.debug(selectedItemRow.html());
					selectedItemRow.addClass("d-none");
					//alert("pause");
					//console.debug(itemSelectors.find(".itemSelectorsRow").html());
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
		//console.debug($scope.storySelectSelected);		
	}

	$scope.cancelItem = function (itemType) {
		if (itemType == undefined) {
			console.debug("what is the item type?");
		} else {
			var editIndex = false;
			switch(itemType) {
				case "condition":
					var itemSelectors = $("#"+itemType+"Selectors");
					//console.log(itemSelectors.html());
					//alert("poause");
					var capitalizedItemName = itemType.charAt(0).toUpperCase() + itemType.slice(1);

					editIndex = Number(itemSelectors.find(".editItemIndex").text());
					
					//return selector row back to top out of ng-repeat (else ng-repeat will eat it), hide it, and reshow the selected table record
					
					itemSelectors.find("tbody").prepend(itemSelectors.find(".itemSelectorsRow"));
					//console.debug("put itemSelectorRow out of ng-repeat so it doesn't get eaten!")
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
					console.debug(capitalizedItemName + " update Cancelled!");
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
					console.debug("Impact update Cancelled!");
					break;
				default:
				
			}
		}
		//console.debug($scope.storySelectSelected);		
	}
	
	$scope.removeItem = function (itemType,inputtedIndex) {
		if (itemType == undefined) {
			console.debug("what is the item type?");
		} else {
			switch(itemType) {
				case "condition":
					var itemSelectors = $("#"+itemType+"Selectors");
					var capitalizedItemName = itemType.charAt(0).toUpperCase() + itemType.slice(1);


					//cancel any previous open edits
					$scope.cancelItem(itemType);
					
					console.debug(capitalizedItemName + " removed!");
					console.debug($scope.storySelectSelected[itemType + "s"][inputtedIndex]);
					$scope.storySelectSelected[itemType + "s"].splice(inputtedIndex,1);
					itemSelectors.find(".editItemIndex").text("");
					itemSelectors.find(".updateItem").text("");
					itemSelectors.find(".cancelItemCondition").addClass("d-none");
					break;
				case "impact":
					//cancel any previous open edits
					$scope.cancelItem(itemType);
					

					console.debug("Impact "+$scope.storySelectSelected.impacts[inputtedIndex]+" removed!");
					$scope.storySelectSelected.impacts.splice(inputtedIndex,1);
					$("#editImpactIndex").text("");
					$("#updateImpact").text("Add Impact");
					$("#cancelImpaCondition").addClass("d-none");
					break;
				default:
				
			}			
		}
		//console.debug($scope.storySelectSelected);

	}
	
	
	//set default story to load:
	//$scope.loadStoryByID(3);
	$scope.storySelectSelected = $scope.stories[3];

});

// ************** Functions out of $scope ****************
/*	var promptForValue = function () {
		var tempValue = "";
		tempValue = prompt("Please enter your Value");
		
		
		
	}	
*/
