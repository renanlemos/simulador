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


});