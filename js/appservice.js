'use strict';
DashboardApp
		.factory(
				'DashboardService',
				function($http, $q) {

					return {
						getData : function() {
							return $http({
								method : 'GET',
								url : 'http://analyticsapi-in.shortlyst.com/analytics-service/v1/insights/market/OSA/trend?brands=axe%2Cdove&type=EAN&fromDate=2018-10-15&toDate=2018-10-24&mode=lite'
								
							}).then(function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error while fetching Items');
								return $q.reject(errResponse);
							});
						}

					};
				});