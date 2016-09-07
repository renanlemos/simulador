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

		var fila_aptos            = ProcessosService.getFilaAptos();
		var countTempoProcessador = ProcessosService.getCountTempoProcessador(); 

		if(fila_aptos.count == 0){
			/** Cria um novo processo **/
			ProcessosService.createProcesso();
		}else{

			/** 
			
				Sorteia um número entre 1 e 100.
				Caso cair nos 10% e o número de processos criados for menor
				que o número de processos requisitado pelo usuário será criado 
				um novo processo.
			
			**/
			var sorteio = SimuladorService.getRandomInt(1,100);

			if(sorteio <= 10 && fila_aptos.count < $scope.NumeroProcessos){
				/** Cria um novo processo **/
				ProcessosService.createProcesso();
			}else{
				
				/**
				*
				* Verifica se tem um processo em execução
				*
				**/
				if(ProcessosService.hasExecutando()){

					// Pega o processo em execução
					var processoExecutando = ProcessosService.getFilaExecutando(); 

					/**
					*
					* Verifica se o tempo que o processo está executando já atingiu
					* 50 ciclos.
					*
					**/
					if(countTempoProcessador < 50){

						// Adiciona 1 ao tempo de execução do processo current
						ProcessosService.addTempoExecutando(); 
						// Adiciona 1 ao contador de ciclos do processador
						ProcessosService.countTempoProcessador(); 


						/**
						*  
						* Sorteia um número entre 1 e 100.
						* Se o número for igual a 1 então solicita um dispositivo de E/S.
						*
						**/
						var sorteio = SimuladorService.getRandomInt(1,100);
						
						if(sorteio == 1){

							var dispositivo = ProcessosService.getDispositivo();
							console.log(dispositivo);

						}

					}else{
						
						// Verifica se o tempo do processo expirou e destroi o processo
						if(processoExecutando[0].tempo_total == processoExecutando[0].tempo_executado){

							// Destroi o processo
							ProcessosService.addFilaDestruidos();
						}
						// Adiciona 1 um novo processo para a execução
						ProcessosService.addFilaExecutando();
						// Zera o Contador do Processador
						ProcessosService.zeraTempoProcessador(); 
					}
						
				}else{
					// Adiciona 1 um novo processo para a execução
					ProcessosService.addFilaExecutando();
				}

			}
		}

		$scope.fila_aptos      = ProcessosService.getFilaAptos();
		$scope.fila_executando = ProcessosService.getFilaExecutando();

	}
    /**
    *
    * Laço dos processos
    *
    * @params pid="integer"
    * @return void
    *
    **/ 
	var processos = function(){

		if($rootScope.simuladorStatus == false){
			return false;
		}

		var params             = SimuladorService.getParams();
		$scope.NumeroProcessos = params.processos;
		$scope.TempoCiclo      = params.tempo_ciclos * 1000;

		if($scope.destruidos <= $scope.NumeroProcessos){

			rowProcesso();

			$timeout(function(){
				processos();
			},$scope.TempoCiclo);

		}


	}
	$scope.reiniciar = function(){

		localStorage.clear();
		$rootScope.simuladorStatus = false;
		$scope.Fila_aptos =  {data:[],count:0};
	}
	/**
	*
	* Inicializa as funções
	*
	* @return void
	*
	**/
	var init = function(){
		
		$scope.destruidos = ProcessosService.countProcessosDestruidos();
		processos();
		$scope.fila_aptos      = ProcessosService.getFilaAptos();
		$scope.fila_executando = ProcessosService.getFilaExecutando();
		$scope.fila_bloqueados = ProcessosService.getFilaBloqueados();
		$scope.fila_destruidos = ProcessosService.getFilaDestruidos();

	
	}
	init(); 

});  