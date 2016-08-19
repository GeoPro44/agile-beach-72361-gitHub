//app.controller('HomeController', function ($scope, testService, $http) {    
app.controller('HomeController', function ($scope) {    
	var self = this;  
	$scope.name = "Geo";
	$scope.lions = false;
	$scope.cranes = false;
	$scope.number;
	
	$scope.blah = [{name: 'geo', money: 4}, {name: 'bob', money: 3}];
	$scope.headerInfo = [];
	
	// testService.getStatus().then(function(r) {				
		// console.log('r: ' + JSON.stringify(r));
		// $scope.st = r;
	// });
	
	$scope.save = function() {
		var msg = {'newMsg': $scope.newMsg};
		
		// $http.post('/api/msgs', msg).then(function() {
			// console.log('saved');
			// init();
		// });
	};
	
	$scope.doubleIt = function(num) {
		$scope.number = $scope.number * 2;
	};
		
	$scope.test = function() {	
		
		// bootbox.prompt({
		  // title: "What is your name?",
		  // value: "geo",
		  // callback: function(result) {
			// if (result === null) {
			  // console.log("Prompt dismissed");
			// } else {
			  // console.log("Hi <b>"+result+"</b>");
			// }
		  // }
		// });
		
		bootbox.dialog({
		  message: "I am a custom dialog",
		  title: "Custom title",
		  buttons: {
			success: {
			  label: "Success!",
			  className: "btn-success",
			  callback: function() {
				console.log("great success");
			  }
			},
			danger: {
			  label: "Danger!",
			  className: "btn-danger",
			  callback: function() {
				console.log("uh oh, look out!");
			  }
			},
			main: {
			  label: "Click ME!",
			  className: "btn-primary",
			  callback: function() {
				console.log("Primary button");
			  }
			}
		  }
		}); 
		
	};
	
	var init = function() {		
		// $http.get('/api/msgs').then(function(results) {
			// $scope.Messages = results.data;
		// });

		$scope.headerInfo = _.keys($scope.blah[0]);		
	};
	
	init();
});

app.controller('Page2Controller', function ($scope) {
	$scope.name = "Geo2";
	$scope.showModal = false;
	$scope.num = 0;
	
	$scope.test = function() {
		//console.log('test click');
		$scope.showModal = true;
	};
	
	$scope.doubleIt = function() {
		$scope.num = $scope.num + $scope.num;
	};
 });	