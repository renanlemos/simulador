$app.service('ValidationService',function($http,$rootScope,$location){
	
  var validation_errors = [];

  this.require = function(input,campo,message){
    input = input == null ? "" : input;
    if(input.toString() == "" && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }
  }
  this.valid_dados_ultimo_login = function(user,campo,message){

    var loginLastParams = angular.fromJson(localStorage.getItem("loginLastParams"));
  
    if((loginLastParams.cpf != user.cpf) || (loginLastParams.senha != user.senha)){
      if(this.in_array(campo) == true){
        validation_errors.push({campo:campo,message:message});
      }  
    }
  }
  this.valid_cpf = function(cpf,campo,message){
    if(this.check_cpf(cpf) == false && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }  
  }
  this.check_cpf = function(cpf){
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11){
      return false;
    }  
    for (i = 0; i < cpf.length - 1; i++){
      if (cpf.charAt(i) != cpf.charAt(i + 1)){
        digitos_iguais = 0;
        break;
      }
    }  
    if (!digitos_iguais){
          numeros = cpf.substring(0,9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--){
            soma += numeros.charAt(10 - i) * i;
          }      
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0)){
            return false;
          }  
          numeros = cpf.substring(0,10);
          soma = 0;
          for (i = 11; i > 1; i--){
            soma += numeros.charAt(11 - i) * i;
          }
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1)){
            return false;
          }      
          return true;
    }else{
      return  false;
    }
  }
  this.is_int = function(input,campo,message){
   
    if(isInt(input) == false && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }

    function isInt(x) {
       var y = parseInt(x,10);
       return !isNaN(y) && x == y && x.toString() == y.toString();
    }
  }
  /**
  *
  * Verifica se o input é maior que o value
  *
  * @param input="number",campo="string",message="string"
  * @return void
  *
  **/
  this.maior_que = function(input,value,campo,message){

    if(!(input > value) && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }
  }
  /**
  *
  * Verifica se o input é menor que o value
  *
  * @param input="number",campo="string",message="string"
  * @return void
  *
  **/
  this.menor_que = function(input,value,campo,message){

    if(!(input < value) && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }
  }
  /**
  *
  * Verifica se o número é positivo
  *
  * @param input="number",campo="string",message="string"
  * @return void
  *
  **/
  this.is_positivo = function(input,campo,message){

    if(input < 0 && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }
  }
  /**
  *
  * Verifica se o número de passageiros é o mesmo da lista de passageiros
  *
  * @param servico="array",campo="string",message="string"
  * @return void
  *
  **/
  this.check_number_pax = function(servico,campo,message){
    
    var lista_paxs = 0; 
    var soma_paxs  = parseInt(servico.Adt) + parseInt(servico.Chd) + parseInt(servico.Inf);

    angular.forEach(servico.Listapaxs,function(value,key){

      if(value.ativo){
        lista_paxs++;
      }

    });

    if((lista_paxs != soma_paxs) && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }
  }
  this.valid_date = function(input,campo,message){
    var pattern = new RegExp("([0-9]{2})[-]([0-9]{2})[-]([0-9]{4})");
  
    if(pattern.test(input) == false && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }else{
      var data = input.split('-');
      var result = new Date(data[2]+"-"+data[1]+"-"+data[0]);

      if(result == "Invalid Date" && this.in_array(campo) == true){
        validation_errors.push({campo:campo,message:message});
      }
    }
  }
  this.valid_frequencia = function(input,frequencia,campo,message){
    
    var pattern = new RegExp("([0-9]{2})[-]([0-9]{2})[-]([0-9]{4})");
  
    if(pattern.test(input) == false && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:"- A Data deve ter esse formato: 99-99-9999."});
    }else{
      var data   = input.replace("-","/").replace("-","/");
      var result = false;

      if($.inArray(data,frequencia) != -1) {
        result = true;
      }else{
        result  = false;
      }

      if(result == false && this.in_array(campo) == true){
        validation_errors.push({campo:campo,message:message});
      }
    }
  }
  this.date_fim = function(input,data_fim,campo,message){

    var data = input.split("-");
    var data_fim = data_fim.split("-");
    var input_data = new Date(data[2]+"-"+data[1]+"-"+data[0]);
    var data_fim = new Date(data_fim[2]+"-"+data_fim[1]+"-"+data_fim[0]);

    if((input_data > data_fim) && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }
  }
  this.date_inicio = function(input,campo,message){

    var data = input.split("-");
    var input_data = new Date(data[2]+"-"+data[1]+"-"+data[0]);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    
    var dia = dd.toString().length == 1 ? "0"+dd.toString() : dd.toString();
    var mes = mm.toString().length == 1 ? "0"+mm.toString() : mm.toString();

    var data_inicio = new Date(yyyy+"-"+mes+"-"+dia);
    
    if((input_data < data_inicio) && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }
  }
  this.format_date = function(input,campo,message){
    var pattern = new RegExp("([0-9]{2})[-]([0-9]{2})[-]([0-9]{4})");

    if(pattern.test(input) == false && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }
  }
  /**
  *
  * Valida o horário
  *
  * 
  * @param  input="string",campo="string",message="string"
  * @return void 
  *
  **/
  this.valid_hora = function(input,campo,message){
    
    var pattern = new RegExp("([0-9]{2})[:]([0-9]{2})");
    var status  = true;
  
    if(pattern.test(input) == false && this.in_array(campo) == true){
    
      validation_errors.push({campo:campo,message:message});
    
    }else{
      
      var horario = input.split(':');
      var hora    = horario[0]; 
      var minutos = horario[1]; 
      
      if((hora < 0 || hora > 23) || (minutos < 0 || minutos > 59)){
        status = false; 
      }


      if(status == false && this.in_array(campo) == true){
        validation_errors.push({campo:campo,message:message});
      }
    }

  }
  /**
  *
  * Verifica se todos os itens do array está preenchido
  *
  * 
  * @param  input="array",campo="string",message="string"
  * @return void 
  *
  **/
  this.require_array = function(input,campo,message){
    
    var result = true; 
    
    angular.forEach(input,function(value,key){

      if(value == ""){
        result = false;
      }

    });

    if(result == false && this.in_array(campo) == true){
      validation_errors.push({campo:campo,message:message});
    }

  }
  this.in_array = function(campo){
    var resultado = true;
    if(validation_errors.length > 0 && resultado == true){
      angular.forEach(validation_errors,function(value,key){
        if(value.campo == campo){
          resultado =  false;
         }
      })
    }
    return resultado;
  }
  this.getErrors = function(){
    return validation_errors;
  }
  this.errors = function(){
    if(validation_errors.length > 0){
      return true;
    }else{
      return false;
    }
  }
  this.clearErrors = function(){
    validation_errors= [];
  }
  /**
  *
  * Retorna os erros formatados para exibição
  *
  * @return html
  *
  **/
  this.getErrorsHtml = function(){
    
    var messages = "";

    angular.forEach(validation_errors,function(value,key){
      messages += value.message+"<br>";
    });

    return messages;

  }

}); 