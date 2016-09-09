app.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
		  //console.log('setting token');
        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
      } else {
		  //console.log('NOT setting token');
	  }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
      }
      return $q.reject(rejection);
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

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