describe('Home Controller Test', function() {   
	
	beforeEach(angular.mock.module('testApp'));
	
	var ctrl, $scope;
	
	beforeEach(inject(function($controller,  $rootScope) {
	//beforeEach(inject(function() {
		//Note the use of the $new() function
		$scope = $rootScope.$new();

		// The new child scope is passed to the controller's constructor argument
		ctrl = $controller('HomeController', { $scope: $scope });
	}));	
	
	
	describe('validate the controller', function () {
		it('tests should be running', function () {
			expect(1).toEqual(1);
		});	
		
		it('should exist', function () {
			expect(ctrl).toBeTruthy();
		});
		
		it('should have the name set to geo', function () {			
			expect($scope.name).toBe("Geo");
		});	
	});
	
	describe('validate the controller logic', function () {

		it('should double it', function() {
			$scope.number = 2;
			$scope.doubleIt();
			expect($scope.number).toEqual(4);
		});
	});
});