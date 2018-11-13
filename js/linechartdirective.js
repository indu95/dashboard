'use strict';

DashboardApp
	.directive('modelLineChart', function ($filter) {
		return {
			restrict: 'EA',
			template: '<div></div>',
			scope: {
				score: '@',
				productname: '@'
			},
			compile: function (scope, element) {
				return {
					post: function (scope, element) {
						var base64Val =atob(scope.score);
						var productScore = JSON.parse(base64Val);
						var categoriesList=[];
						var values=[];
						for (var key in productScore) {
							if (productScore.hasOwnProperty(key)) {
								categoriesList.push(key);
								values.push(parseInt(productScore[key]));
							}
						}
						var chart = Highcharts.chart(element[0], {
							title: {
								text: scope.productname
							},
						
							subtitle: {
								text: ''
							},
							xAxis : {
								categories : categoriesList
							},
						
							yAxis: {
								title: {
									text: 'Availability(%)'
								}
							},
							legend: {
								layout: 'vertical',
								align: 'right',
								verticalAlign: 'middle'
							},
						
							plotOptions: {
								series: {
									label: {
										connectorAllowed: false
									},
									//pointStart: categoriesList[0]
								}
							},
						
							series: [{
								name: scope.productname,
								data: values
							}],
						
							responsive: {
								rules: [{
									condition: {
										maxWidth: 500
									},
									chartOptions: {
										legend: {
											layout: 'horizontal',
											align: 'center',
											verticalAlign: 'bottom'
										}
									}
								}]
							}
						})
					}
				}
			}
		}
	});