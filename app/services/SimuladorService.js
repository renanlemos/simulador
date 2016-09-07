$app.service("SimuladorService",function($rootScope){

	/**
	*
	* Retorna o Status do simulador - (true) está simulando ps processos - (false) mostra a tela inicial do form para iniciar os processos 
	*
	* @return boolean
	*
	**/
	this.status = function(){

		var status = localStorage.getItem("simuladorStatus");

		if(status == null){
			return 0;
		}else{
			return status;
		}

	}
	/**
	*
	* Seta o status para o Simulador
	*
	* @param option="boolean"
	* @return void
	*
	**/
	this.setStatus = function(option){
		localStorage.setItem("simuladorStatus",option);
		$rootScope.simuladorStatus = option;
	}
	/**
	*
	* Seta os parâmetros para o simulador
	*
	* @param {"processos":"integer","tempo_ciclo":"integer"} 
	* @return void
	*
	**/
	this.setParams = function(params){
		localStorage.setItem("simuladorParams",JSON.stringify(params));
	}
	/**
	*
	* Seta os parâmetros para o simulador
	*
	* @return array
	*
	**/
	this.getParams = function(){

		var result = {processos:0,tempo_ciclo:0};
		var data   = localStorage.getItem("simuladorParams");

		if(data != null){
			result = angular.fromJson(data);
		}

		return result;

	}
	/**
	*
	* Sorteia um número entre dois números
	*
	* @param min="integer",max="integer"
	* @return numeric
	*
	**/
	this.getRandomInt = function(min,max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}


});