/**
 * @license AngularJS v1.5.8
 * 
 * 
 */
var simulador = angular.module("ngSimulador",[]);

simulador.directive("simuladorInit",function(){
	return{
		restrict: "AE",
		scope: true,
		link: function(scope,element,attrs,model){
			element.html("<h1>TEST SIMULADOR INIT</h1>");
		}
	}
});