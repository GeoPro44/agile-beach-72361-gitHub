//app.controller('HomeController', function ($scope, testService, $http) {    
app.controller('HomeController', function ($scope, $http) {    
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
		
		$http.post('/api/msgs', msg).then(function() {
			console.log('saved');
			init();
		});
	};
	
	$scope.doubleIt = function(num) {
		$scope.number = $scope.number * 2;
	};
		
	$scope.test = function() {	
		
		/*bootbox.prompt({
		  title: "What is your name?",
		  value: "geo",
		  callback: function(result) {
			if (result === null) {
			  console.log("Prompt dismissed");
			} else {
			  console.log("Hi <b>"+result+"</b>");
			}
		  }
		});*/
		
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
		$http.get('/api/msgs').then(function(results) {
			$scope.Messages = results.data;
		});

		$scope.headerInfo = _.keys($scope.blah[0]);		
	};
	
	init();
});

app.controller('Page2Controller', function ($scope, $http) {
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
	
	$scope.getSecureStuff = function() {
		$http.get('/api/secure/test').then(function(results) {
			$scope.testData = results.data;
		});
	};
 });	
 
 app.controller('AdminController', function ($scope, $http, $window) {
	$scope.user;
	
	$scope.getSecureStuff = function() {
		$http.get('/api/secure/test').then(function(results) {
			$scope.message = results.data;
		});
	};
	
	$scope.submit = function () {
		$http
		  .post('/authenticate', $scope.user)
		  .success(function (data, status, headers, config) {
			$window.localStorage.token = data.token;
			$scope.isAuthenticated = true;
			var encodedProfile = data.token.split('.')[1];
			$scope.user = JSON.parse(url_base64_decode(encodedProfile));
			$scope.welcome = 'Welcome ' + $scope.user.first_name + ' ' + $scope.user.last_name;
		  })
		  .error(function (data, status, headers, config) {
			// Erase the token if the user fails to log in
			delete $window.localStorage.token;
			$scope.isAuthenticated = false;

			// Handle login errors here
			$scope.error = 'Error: Invalid user or password';
			$scope.welcome = '';
		  });
	};
	
	$scope.logout = function () {
		$scope.welcome = '';
		$scope.message = '';
		$scope.isAuthenticated = false;
		delete $window.localStorage.token;
	};

	init = function() {
		var token = $window.localStorage.token;
		
		if (token) {			
			$scope.isAuthenticated = true;
			var encodedProfile = token.split('.')[1];
			$scope.user = JSON.parse(url_base64_decode(encodedProfile));
			$scope.welcome = 'Welcome ' + $scope.user.first_name + ' ' + $scope.user.last_name;			
		}
	};
	
	init();
	
 });
 
 //this is used to parse the profile
function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}