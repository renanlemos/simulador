$app.controller("ProcessosController",function($scope,$timeout,$rootScope,SimuladorService,ProcessosService){

    
    /**
    *
    * Laço dos processos
    *
    * @params pid="integer"
    * @return void
    *
    **/ 
	var rowProcesso = function(){

		var processos = ProcessosService.getProcessos();

		if(processos.count == 0){
			/** Cria um processos **/
			ProcessosService.createProcesso();

		}else{

			/** Sorteia um número entre 100 e 300 **/
			var sorteio = SimuladorService.getRandomInt(1,100);

			if(sorteio <= 10){
				ProcessosService.createProcesso();
			}else{

			}
		}

		$scope.processos = ProcessosService.getProcessos();

	}
    /**
    *
    * Laço dos processos
    *
    * @params pid="integer"
    * @return void
    *
    **/ 
	var processos = function(pid){

		var params          = SimuladorService.getParams();
		var NumeroProcessos = params.processos;
		var TempoCiclo      = params.tempo_ciclos * 1000;

		if($scope.destruidos <= NumeroProcessos){

			rowProcesso();

			$timeout(function(){
				processos();
			},TempoCiclo);

		}


	}
	$scope.reiniciar = function(){

		localStorage.clear();
		$rootScope.simuladorStatus = false;
		$scope.processos           =  {data:[],count:0};;
	}
	/**
	*
	* Inicializa as funções
	*
	* @return void
	*
	**/
	var init = function(){
		
		$scope.destruidos    = ProcessosService.countProcessosDestruidos();
		processos();
		$scope.processos      = ProcessosService.getProcessos();

		console.log($scope.processos);
	
	}
	init(); 

});  