$app.service("ProcessosService",function($rootScope){
    
    /**
    *
    * Adiciona um processo para a fila
    *
    * @param pid="integer",nome="string",tempo="integer",estado="integer"
    * @return void
    *
    **/
	this.addProcesso = function(pid,nome,tempo,estado){

		var processos = this.getProcessos();
        
        var processo  = {
            pid:pid,
            nome:nome,
            tempo_total:tempo,
            tempo_executado:0,
            estado:estado
        };

        processos.push(processo);

        localStorage.setItem("simuladorProcessos",JSON.stringify(processos));

	}
	/**
    *
    * Retorna todos os Processos
    *
    * @return array
    *
    **/
    this.getProcessos = function(){

    	var data      = [];
    	var processos = localStorage.getItem("simuladorProcessos");

    	if(processos != null){
    		data = angular.fromJson(processos);
    	}	

    	return data;


    }


}); 