describe('Hello World example ', function() {

	beforeEach(module('testApp'));
	var HomeController, scope;

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		HomeController = $controller('HomeController', {
			$scope: scope
		});
	}));
	
	describe('test if running tests', function() {		
		it('1 equals 1', function() {
			expect(1).toEqual(1);
		});	  
	});
	
	it('checks name', function () {
		expect(scope.name).toEqual("Geo");
	});

});