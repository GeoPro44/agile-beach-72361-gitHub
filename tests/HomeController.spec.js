describe('Hello World example ', function() {

	beforeEach(module('testApp'));
	var HomeController, $scope;
	
	beforeEach(inject(function($controller,  $rootScope) {
		// Note the use of the $new() function
		$scope = $rootScope.$new();

		// The new child scope is passed to the controller's constructor argument
		HomeController = $controller('HomeController', { $scope: $scope });
	}));		
	
	describe('test if running tests', function() {		
		it('1 equals 1', function() {
			expect(1).toEqual(1);
		});	  
	});	
	
	describe('home controller tests', function() {
		beforeEach(function() {
			$scope.number = 0;
			$scope.doubleIt(2);
		});
		
		it('checks name', function () {
			expect($scope.name).toEqual("Geo");
		});
		
		it('it doubles the number', function () {
			expect($scope.number).toEqual(4);
		});
	});

});