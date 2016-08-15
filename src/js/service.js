app.factory('testService', function($http) {
    return {
	   	getStatus: function() {
	       return $http.get('/api/status').then( function (results) {	
				return results.data;
			});
	    }
	};
});

app.directive('angularModal', function () {
	return {
		restrict: 'A',
		scope: {
			value: '=ngModel'
		},
		link: function(scope, element, attrs) {
			scope.$watch('value', function() {
				if(scope.value) {
					element.modal('show');
				} else {
					element.modal('hide');
				}
			});

			scope.$on('$routeChangeStart', function(scope, next, current){
				element.modal('hide');
			});
		}
	};
});