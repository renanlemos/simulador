$app.controller("ProcessosController",function($scope,$timeout,$rootScope,SimuladorService,ProcessosService){

    
    var addProcesso = function(pid,estado){
    	
    	/** Sorteia um número entre 100 e 300 **/
		var tempo_execucao = SimuladorService.getRandomInt(100,300);
		/** Cria o primeiro processo **/
		ProcessosService.addProcesso(pid,"Processo "+pid,tempo_execucao,estado);
    
    }
    /**
    *
    * Laço dos processos
    *
    * @params pid="integer"
    * @return void
    *
    **/ 
	var rowProcesso = function(pid){

		if(pid == 1){
			/** Sorteia um número entre 100 e 300 **/
			addProcesso(pid,1);
		}else{

			/** Sorteia um número entre 100 e 300 **/
			var sorteio = SimuladorService.getRandomInt(1,100);

			if(sorteio <= 10){
				addProcesso(pid,1);
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
		var pid             = typeof(pid) == "undefined" ? 1 : pid;
		var NumeroProcessos = params.processos;
		var TempoCiclo      = params.tempo_ciclos * 1000;

		if(pid <= NumeroProcessos){

			rowProcesso(pid);
			pid++;

			$timeout(function(){
				processos(pid);
			},TempoCiclo);

		}


	}
	$scope.reiniciar = function(){

		localStorage.clear();
		$rootScope.simuladorStatus = false;
		$scope.processos =  [];
	}
	/**
	*
	* Inicializa as funções
	*
	* @return void
	*
	**/
	var init = function(){
		processos(1);
		$scope.processos = ProcessosService.getProcessos();
	}
	init(); 

});  