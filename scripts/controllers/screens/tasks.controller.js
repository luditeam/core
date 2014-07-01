app.controller("TasksCtrl", ['$scope', '$rootScope', 'webServices', '$location', 'localStorageService', 'userPrefs', function($scope, $rootScope, webServices, $location, localStorageService, userPrefs){
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
						competences: [
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
						competences: [
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
						competences: [
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
						competences: [
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
						competences: [
							
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
						competences: [
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
				"name": "Vendre hamburger",
				"ua_needed": 10,
				"ua_assigned": 10,
				"competence": "Ventes",
				"assigned": [
					{
						"image": "http://localhost/luditeam/images/man-default-avatar.png",
						"name": "Jean",
						"cost": 150,
						"competence": 100,
						"hour_assigned": 5,
						"hour_available": 5
					},
					{
						"image": "http://localhost/luditeam/images/woman-default-avatar.png",
						"name": "Audrey",
						"competence": 20,
						"hour_assigned": 5,
						"hour_available": 5
					}
				]
			},

			{
				"name": "acheter de la salade",
				"ua_needed": 5,
				"ua_assigned": 4,

				"competence": "Achat",
				"assigned": [
					{
						"image": "http://localhost/luditeam/images/man-default-avatar.png",
						"name": "Pierrre",
						"cost": 150,
						"competence": 100,
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

	        }).popup('show');
		}

		$scope.closeOverlay = function(){
			$('.overlay').popup('hide');
		}

}])