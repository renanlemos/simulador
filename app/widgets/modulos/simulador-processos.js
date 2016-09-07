$app.directive("simuladorProcessos",function(BASE_TEMPLATE){
	return{
		restric: "AE",
		controller: "ProcessosController",
		templateUrl: BASE_TEMPLATE+"modulos/simulador-processos.html",
		link: function(scope,element,attrs,model){
			
		}

	}
}); 