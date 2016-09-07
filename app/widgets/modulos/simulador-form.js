$app.directive("simuladorForm",function(BASE_TEMPLATE,ValidationService,SimuladorService){
	return{
		restric: "AE",
		templateUrl: BASE_TEMPLATE+"modulos/simulador-form.html",
		link: function(scope,element,attrs,model){

			/**
			*
			* Inicia o Simulador
			*
			* @return void
			*
			**/
			scope.simuladorInit = function(){

				try{

					ValidationService.clearErrors();
					ValidationService.require(scope.dataItem.processos,'processos','Informe o número de processos.');
					ValidationService.is_int(scope.dataItem.processos,'processos','Processos deve ser um número inteiro.');
					ValidationService.maior_que(scope.dataItem.processos,0,'processos','Processos deve ser um número maior que 0.');
					ValidationService.menor_que(scope.dataItem.processos,1000,'processos','Processos deve ser um número menor que 1000.');
					ValidationService.require(scope.dataItem.tempo_ciclos,'tempo_ciclos','Informe o tempo do Ciclo.');
					ValidationService.is_int(scope.dataItem.tempo_ciclos,'tempo_ciclos','Tempo de Ciclo deve ser um número inteiro.');
					ValidationService.maior_que(scope.dataItem.processos,0,'tempo_ciclos','Tempo de Ciclo deve ser um número maior que 0.');

					if(ValidationService.errors()){
					
						scope.messages           = {data:ValidationService.getErrorsHtml(),class:"btn btn-danger"};		
						scope.window.modal_info.open();
					
					}else{

						SimuladorService.setStatus(1);
						SimuladorService.setParams(scope.dataItem);
						
					}	
				
				}catch(e){
					scope.messages           = {data:e.message,class:"btn btn-danger"};		
					scope.window.modal_info.open();
				}

			}
			/**
			*
			* Configuração para o Modal
			*
			* @return void
			*
			**/
			scope.window = {
				modal_info:{
					open: function(){
						scope.modal_info = true;
					},
					close: function(){
						scope.modal_info = false;
					}
				}
			}

			scope.teste = function(){
				scope.window.modal_info.open();
			}

			var init = function(){
				
				scope.dataItem = {
					processos: 0,
					tempo_ciclos: 0
				}
				scope.messages = {data:"",class:""};
				scope.window.modal_info.close();
			
			}
			init();

		}
	}	
});