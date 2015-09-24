var app = angular.module('app', []).

controller('formController', ['$scope','$http', function(scope,http){

	scope.submit = function(){

		var fd = new FormData();
		fd.append("email",scope.inputEmail);
		fd.append("phone",scope.inputPhone);

		http({
			method: "POST",
			url: "/signup",
			cache: false,
			data: fd
		}).success(function(data){
			console.log(data);
		});
	}
}]);