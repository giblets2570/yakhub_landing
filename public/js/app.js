var app = angular.module('app', []).

controller('campaignController', ['$scope','$http','$location', function(scope,http,location){

	scope.summary = "";

	scope.intitialDataEntered = false;

	scope.wordCount = function(){
		var count = 0;
		for(var i = 1; i < scope.summary.length; i++){
			if(scope.summary[i] == " " && scope.summary[i-1] != " "){
				count += 1;
			}
		}
		return count;
	}

	scope.switch = function(){
		if(!scope.intitialDataEntered){
			if(scope.clientName == "" || scope.clientName == null){
				alert("Name field cannot be empty!");
				return;
			}
			if(scope.clientEmail == "" || scope.clientEmail == null){
				alert("Email field incorrectly input");
				return;
			}
			if(scope.clientPassword == "" || scope.clientPassword == null){
				alert("Password field cannot be empty!")
				return;
			}
			if(scope.clientConfPassword == "" || scope.clientConfPassword == null){
				alert("Confirm your password!");
				return;
			}
			if(scope.clientConfPassword != scope.clientPassword){
				alert("Passwords don't match!");
				return;
			}
			scope.intitialDataEntered = true;
		}else{
			scope.intitialDataEntered = false;
		}
		scope.showName = !scope.showName;
	}

	scope.faqs = [{
		question:"",
		answer: ""
	}];

	scope.questions = [{
		question:"",
		description: ""
	}];

	scope.addQuestions = function(){
		if(scope.questions.length >= 6){
			alert("Max 6 questions");
			return;
		}
		scope.questions.push({
			question:"",
			description: ""
		});
	}

	scope.addFAQ = function(){
		scope.faqs.push({
			question:"",
			answer: ""
		});
	}

	scope.removeQuestion = function(index){
		scope.questions.splice(index,1);
	}

	scope.removeFAQ = function(index){
		scope.faqs.splice(index,1);
	}

	scope.getNumber = function(array) {
		num = array.length;
		result = []
		for(var i = 0; i < num; i++){
			result.push(i);
		}
	    return result;
	}

	scope.submit = function(){
		http({
			url:'/api/clients',
			data:{
				name: scope.clientName,
				password: scope.clientPassword,
				email: scope.clientEmail
			},
			cache: false,
			method:"POST"
		}).success(function(data){
			console.log(data);
			http({
				url:'/api/clients/'+data.id,
				data:{
					summary : scope.summary,
					target : scope.target,
					pricing : scope.pricing,
					questions : scope.questions,
					faqs : scope.faqs
				},
				cache: false,
				method:"PUT"
			}).success(function(data){
				console.log(data);
				location.path('/thankyou');
			});
		});
	}

}]);