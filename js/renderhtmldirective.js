'use strict';

DashboardApp
	.directive('renderLineChart', function ($compile) {
		return {
			restrict: 'E',
			scope: {
				product: '=',
				from: "=",
				to: "=",
				prodlist: "="

			},
			link: function (scope, element) {
				scope.$watch('product', function (newVal, oldVal) {
					if (newVal) {
						init(newVal, '', '', scope.prodlist);
					}
				});

				scope.$watch('from', function (newVal, oldVal) {
					if (newVal) {
						init(scope.product, newVal, scope.to, scope.prodlist);
					}
				});

				scope.$watch('to', function (newVal, oldVal) {
					if (newVal) {
						init(scope.product, scope.from, newVal, scope.prodlist);
					}
				});

				scope.$watch('prodlist', function (newVal, oldVal) {
					if (newVal) {
						init(scope.product, scope.from, scope.to, newVal);
					}
				});

				function init(product, from, to, prodlist) {

					var html = '';
					var scores;
					if (from == undefined && to == undefined && prodlist != undefined) {

						scores = scope.prodlist.result.overall.score;
						scores = JSON.stringify(scores)
						var base64scores = btoa(scores);

						html = html + '<div class="row graphWrap" ' + '" model-line-chart score="' + base64scores + '" productname="' + product + '"></div>';
					}
					else if (scope.product != "" && prodlist != undefined) {
						if (from == undefined || from == "") {

							for (var key in prodlist.result.overall.score) {
								if (prodlist.result.overall.score.hasOwnProperty(key)) {
									from = key;
									break;
								}
							}
						}

						if (to == undefined || to == "") {

							for (var key in prodlist.result.overall.score) {
								if (prodlist.result.overall.score.hasOwnProperty(key)) {
									to = key;

								}
							}
						}

						var fromDate=new Date(from);
						var toDate=new Date(to);
						if(toDate<=fromDate){
							html = html +'<div class="alert alert-danger"><strong>Danger!</strong>Invalid Date Range!! From date should always be less than To date</div>';
						}
						else{
							var categoriesList = [];
							var values = [];
							$.each(prodlist.result.overall.merchants, function (k, v) {
								if (k == scope.product) {
									scores = v;
	
									for (var key in scores) {
										if (scores.hasOwnProperty(key)) {
											var date = new Date(key);
											if (key >= from && key <= to) {
												categoriesList.push(key);
												values.push(parseInt(scores[key]));
											}
										}
									}
	
									var scores = {};
									var length = categoriesList.length;
									for (var i = 0; i < length; i++) {
										scores[categoriesList[i]] = values[i];
									}
									console.log(scores)
									scores = JSON.stringify(scores)
									var base64scores = btoa(scores);
	
									html = html + '<div class="row graphWrap" ' + '" model-line-chart score="' + base64scores + '" productname="' + product + '"></div>';
								}
							})
						}
						
					}

					element.html(html);
					$compile(element.contents())(scope);
				}
			}
		};
	});


