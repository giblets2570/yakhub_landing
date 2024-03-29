var app = angular.module('app', ['ngAnimate','mgcrea.ngStrap']).

controller('campaignController', ['$scope','$http','$window','$alert', function(scope,http,$window,$alert){

	scope.summary = "";

	scope.intitialDataEntered = false;

	scope.loading = $alert({
	    title: "Submitting response",
	    // content: 'Best check yo self, you\'re not looking too good.',
	    placement: 'floater-top-left',
	    type: 'info',
	    show: false
    });

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
		scope.loading.show();
		http({
			url:'/create-campaign',
			data:{
				name: scope.clientName,
				password: scope.clientPassword,
				email: scope.clientEmail,
				elevator: scope.elevator,
				summary : scope.summary,
				target : scope.target,
				pricing : scope.pricing,
				questions : scope.questions,
				faqs : scope.faqs
			},
			cache: false,
			method:"POST"
		}).success(function(data){
			scope.loading.hide();
			console.log(data);
			$window.location.href = '/thankyou';
		});
	}

}]);