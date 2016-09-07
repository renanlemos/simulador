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

		var processosData  = this.getFilaAptos();
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

        localStorage.setItem("simuladorProcessosAptos",JSON.stringify(processosData));

        
    }
    /**
    *
    * Verifica se tem um processo em execução
    *
    * @return boolean
    *
    **/
    this.hasExecutando = function(){

        return this.getFilaExecutando().length == 0 ? 0 : 1;

    }
	/**
    *
    * Retorna todos os Processos da fila de Aptos
    *
    * @return array
    *
    **/
    this.getFilaAptos = function(){

    	var data      = {data:[],count:0};
    	var processos = localStorage.getItem("simuladorProcessosAptos");

    	if(processos != null){
    		data = angular.fromJson(processos);
    	}	

    	return data;


    }
    /**
    *
    * Retorna todos os Processos da fila Executando
    *
    * @return array
    *
    **/
    this.getFilaExecutando = function(){

        var data      = [];
        var processos = localStorage.getItem("simuladorProcessosExecutando");

        if(processos != null){
            data = angular.fromJson(processos);
        }   

        return data;
    }
    /**
    *
    * Retorna todos os Processos da fila Executando
    *
    * @return array
    *
    **/
    this.addFilaExecutando = function(){

        var fila_aptos      = this.getFilaAptos();
        var fila_executando = this.getFilaExecutando();
        var processo        = typeof(fila_aptos.data[0]) == "undefined" ? null : fila_aptos.data[0];

        if(processo != null){
            processo.estado = 2;
            fila_aptos.data.splice(0,1);

            if(fila_executando.length == 0){
                    
                localStorage.setItem("simuladorProcessosExecutando",JSON.stringify([processo]));
                localStorage.setItem("simuladorProcessosAptos",JSON.stringify(fila_aptos));
            
            }else{


                fila_executando[0].estado = 1;    
                fila_aptos.data.push(fila_executando[0]);
                localStorage.setItem("simuladorProcessosAptos",JSON.stringify(fila_aptos));

                localStorage.setItem("simuladorProcessosExecutando",JSON.stringify([processo]));
                
            }
        }    

    }
    /**
    *
    * Adiciona o tempo n processo em execução
    *
    * @returb void
    *
    **/
    this.addTempoExecutando = function(){

        var processo = this.getFilaExecutando();

        processo[0].tempo_executado++;

        localStorage.setItem("simuladorProcessosExecutando",JSON.stringify(processo));

    }
    /**
    *
    * Retorna todos os Processos da fila de Bloqueados
    *
    * @return array
    *
    **/
    this.getFilaBloqueados = function(){

        var data      = {data:[],count:0};
        var processos = localStorage.getItem("simuladorProcessosBloqueados");

        if(processos != null){
            data = angular.fromJson(processos);
        }   

        return data;
    }
    /**
    *
    * Retorna todos os Processos da fila de Bloqueados
    *
    * @return array
    *
    **/
    this.getFilaDestruidos = function(){

        var data      = [];
        var processos = localStorage.getItem("simuladorProcessosDestruidos");

        if(processos != null){
            data = angular.fromJson(processos);
        }   

        return data;
    }
    /**
    *
    * Adiona o processo à fila de destruídos
    *
    * @return void
    *
    **/
    this.addFilaDestruidos = function(){

        var fila_destruidos = this.getFilaDestruidos();
        var processo        = this.getFilaExecutando();

        processo[0].estado  = 4;
        fila_destruidos.push(processo[0]);

        localStorage.setItem("simuladorProcessosDestruidos",JSON.stringify(fila_destruidos))    
        localStorage.setItem("simuladorProcessosExecutando",JSON.stringify([]));

        this.addProcessosDestruidos();

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
    /**
    *
    * Retorna o contador do tempo de execução do processo.
    *
    * @return integer
    *
    **/
    this.getCountTempoProcessador = function(){

        var count = localStorage.getItem("simuladorTempoExecucaoProcessador");

        if(count == null){
            return 0;
        }   
        return count;
    }
    /**
    *
    * Conta o tempo que o processo vai ficar executando no processador.
    *
    * @return void
    *
    **/
    this.countTempoProcessador = function(){

        var count = this.getCountTempoProcessador();
        count++;

        localStorage.setItem("simuladorTempoExecucaoProcessador",count);

    }
    /**
    *
    * Zera o tempo de execução do processo no processador.
    *
    * @return void
    *
    **/
    this.zeraTempoProcessador = function(){

        localStorage.setItem("simuladorTempoExecucaoProcessador",0);
    
    }
    /**
    *
    * Sorteia um Dispositivo
    *
    * @return void
    *
    **/
    this.getDispositivo = function(){

        var sorteio = SimuladorService.getRandomInt(1,3);

        switch(sorteio){
            case 1:
                return "HD";
            break;
            case 2:
                return "VIDEO";
            break;
            case 3:
                return "IMPRESSORA";
            break;
        }

    }
  


}); 