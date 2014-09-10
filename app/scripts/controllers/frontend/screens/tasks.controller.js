app.controller("TasksCtrl", ['$scope', '$rootScope', 'webServices', '$location', 'localStorageService', function($scope, $rootScope, webServices, $location, localStorageService){
		$scope.selectedTask = null;
		$scope.direction_hour = "strict";
		$scope.direction_cost = "strict";
		$scope.categories = [
			{
				name: "Employés",
				items: [
					{
						id: 1,
						name: "Pierre",
						available_hours: 2,
						image: "http://localhost/luditeam/images/man-default-avatar.png",
						skills: [
							{
								name: "achats",
								value: 10
							},
							{
								name: "ventes",
								value: 80
							},
							{
								name: "RH",
								value: 40
							},
						]
					},
					{
						id: 2,
						name: "Audrey",
						available_hours: 6,
						image: "http://localhost/luditeam/images/woman-default-avatar.png",
						skills: [
							{
								name: "achats",
								value: 10
							},
							{
								name: "ventes",
								value: 80
							},
						]
					},
					{
						id: 3,
						name: "Jaques",
						available_hours: 1,
						image: "http://localhost/luditeam/images/man-default-avatar.png",
						skills: [
							{
								name: "achats",
								value: 10
							},
							{
								name: "RH",
								value: 40
							},
						]
					}
				]
			},
			{

				name: "Prestataires",
				items: [
					{
						id: 4,
						name: "Pauline",

						cost: 50,
						image: "http://localhost/luditeam/images/woman-default-avatar.png",
						skills: [
							{
								name: "achats",
								value: 10
							}
						]
					},
					{
						id: 5,
						name: "Jean",
						cost: 150,
						image: "http://localhost/luditeam/images/man-default-avatar.png",
						skills: [
							
							{
								name: "ventes",
								value: 80
							},
							{
								name: "RH",
								value: 40
							},
						]
					},
					{
						id: 6,
						name: "Léa",
						cost: 120,
						image: "http://localhost/luditeam/images/woman-default-avatar.png",
						skills: [
							{
								name: "achats",
								value: 10
							}
						]
					}
				]
			}
		];

		$scope.tasks = [



			




			{
				"id": "123",
				"name": "Vendre hamburger",
				"ua_needed": 10,
				"ua_assigned": 10,
				"skill": "Ventes",
				"volontary": false,
				"assigned": [
					{
						"image": "http://localhost/luditeam/images/man-default-avatar.png",
						"name": "Jean",
						"cost": 150,
						"skill": 100,
						"hour_assigned": 5,
						"hour_available": 5
					},
					{
						"image": "http://localhost/luditeam/images/woman-default-avatar.png",
						"name": "Audrey",
						"skill": 20,
						"hour_assigned": 5,
						"hour_available": 5
					}
				]
			},

			{
				"id": "456",
				"name": "acheter de la salade",
				"ua_needed": 5,
				"ua_assigned": 4,

				"skill": "Achat",
				"assigned": [
					{
						"image": "http://localhost/luditeam/images/man-default-avatar.png",
						"name": "Pierrre",
						"cost": 150,
						"skill": 100,
						"hour_assigned": 4,
						"hour_available": 5
					}
				]
			}
		]
		$scope.toggleFade = function(id){
			$(".fade-"+id).toggle("slow");
		}


		$scope.addPerson = function(task){
			$scope.selectedTask = task;
			$('.overlay').popup({
	            opacity: 0.9,
	            onclose: function(){
	            	$scope.selectedTask = null;
	            }

	        }).popup('show');
		}

		$scope.closeOverlay = function(){
			$('.overlay').popup('hide');
		}

		$scope.selectPerson = function(person){
			var task = $scope.selectedTask;
			//call service add_person
			for (var i = 0; i < $scope.tasks.length; i++){
				if(task.id == $scope.tasks[i])
				{
					$scope.tasks[i].push();
					break;
				}
			}
			$scope.closeOverlay();
		}

}])