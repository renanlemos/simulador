$app.service("ProcessosService",function($rootScope,SimuladorService){
    
    /**
    *
    * Adiciona um processo para a fila
    *
    * @param pid="integer",nome="string",tempo="integer",estado="integer"
    * @return void
    *
    **/
	this.createProcesso = function(){

		var processosData  = this.getProcessos();
        var tempo_execucao = SimuladorService.getRandomInt(100,300);

        processosData.count++;

        var processo  = {
            pid:processosData.count,
            nome:"Processo "+processosData.count,
            tempo_total:tempo_execucao,
            tempo_executado:0,
            estado:1
        };

        processosData.data.push(processo);
        
        localStorage.setItem("simuladorProcessos",JSON.stringify(processosData));

	}
	/**
    *
    * Retorna todos os Processos
    *
    * @return array
    *
    **/
    this.getProcessos = function(){

    	var data      = {data:[],count:0};
    	var processos = localStorage.getItem("simuladorProcessos");

    	if(processos != null){
    		data = angular.fromJson(processos);
    	}	

    	return data;


    }
    /**
    *
    * Contador dos processos destruídos
    *
    * @return integer
    *
    **/
    this.countProcessosDestruidos = function(){

        var count = localStorage.getItem("simuladorCountDestruidos");

        if(count == null){
            return 0;
        }   

        return count;


    }
    /**
    *
    * Adiciona 1 ao contador dos processos destruidos
    *
    * @return void
    *
    **/
    this.addProcessosDestruidos = function(){

        var count = localStorage.getItem("simuladorCountDestruidos");

        if(count != null){
            localStorage.setItem("simuladorCountDestruidos",1);
        }else{
            count++;
            localStorage.setItem("simuladorCountDestruidos",count);
        }   
    }
  


}); 