$app = angular.module('Simulador',["ngRoute","ngSanitize"]);
$app.constant("BASE_TEMPLATE","app/views/");

$app.config(function($routeProvider,$httpProvider,$locationProvider,BASE_TEMPLATE){
	
	$httpProvider.defaults.headers.common['X-Frame-Options'] = "*";
  	$httpProvider.defaults.useXDomain = true;
  	$locationProvider.hashPrefix('');
  	$locationProvider.html5Mode(true); 

	$routeProvider.when('/',{
      templateUrl: BASE_TEMPLATE+'index.html'
    });
    $routeProvider.otherwise({redirectTo: '/'});

});
$app.run(function(SimuladorService,$rootScope){

	$rootScope.simuladorStatus = SimuladorService.status();
	

}); 


