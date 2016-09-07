$app.filter('filter_estado', function() {
    return function(estado) {
        
        console.log(estado);	

        switch(estado){
        	case 1:
        		return "Apto";
        	break;
        	case 2:
        		return "Executando";
        	break;
        	case 3:
        		return "Bloqueado";
        	break;
        	case 4:
        		return "Destruído";
        	break;
        }   

    }
});