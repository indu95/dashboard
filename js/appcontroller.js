'use strict';
DashboardApp
	.controller(
		'dashboardController',
		[
			'$scope',
			'DashboardService',
			'$interval', '$location',
			function($scope, DashboardService, $interval, $location) {
				$scope.products=[];
				$scope.scores;
				$scope.dates=[];
				$scope.prodSelected=false;
				$scope.productName="overall";
				
				$scope.onload=function(){
					DashboardService
										.getData()
										.then(
												function(d) {
													if (angular
															.isDefined(d.errorMessage)
															&& !angular
																	.equals(
																			d.errorMessage,
																			null)) {
														
														$scope.errorMessage = d.errorMessage;
													} else {
														$scope.data = d;
														var scores=$scope.data.result.overall.score
														console.log(d);
														$.each($scope.data.result.overall.merchants,function(key,value){
															$scope.products.push(key);
															
														});
														for (var key in scores) {
															if (scores.hasOwnProperty(key)) {
																$scope.dates.push(key);
															}
														}
													}
													

												},
												function(errResponse) {
													$scope.errorMessage = "Something went wrong. please contact support Team."
													
												});
				}
				$scope.onload();
				$scope.selectProduct=function(prodName){
				  $scope.prodSelected=true;
				  $scope.productName=prodName;
				  $scope.fromDate="";
				  $scope.toDate="";
				}

				$scope.setFromDate=function(date){
                   $scope.fromDate=date;
				}

				$scope.setToDate=function(date){
                   $scope.toDate=date;
				}

				$scope.filter=function(){
					
				 }

					
				
				
} ]);



