$app.directive("moduloModalCustom",function($compile,$rootScope){

	return{
		restrict: "AE",
		scope:true,
		link: function(scope,element,attrs,model){

			var _class    = typeof(attrs.class) != "undefined" ? attrs.class : "";
			var title     = typeof(attrs.title) != "undefined" ? attrs.title : "Login";
			var resizable = typeof(attrs.resizable) != "undefined" ? attrs.resizable : true;
			var width     = typeof(attrs.width) != "undefined" ? attrs.width : "auto";
			var height    = typeof(attrs.height) != "undefined" ? attrs.height : "auto";
			var efeito    = typeof(attrs.efeito) != "undefined" ? attrs.efeito : "slide";
			var is_modal  = typeof(attrs.modal) != "undefined" ? attrs.modal : true;
			var visible   = typeof(attrs.visible) != "undefined" ? attrs.visible : true;


			element.dialog({
				dialogClass: _class,
				modal: is_modal,
				title: title,
				width: width,
				height: height,
				disabled: false,
				autoOpen: false,
				closeOnEscape: false,
				resizable: resizable,
				show: {effect:efeito,duration:200},
				hide: {effect:efeito,duration:200},
				close: function(){
				}
			});
			attrs.$observe('visible',function(value){

				if(value == "true"){
                    element.dialog('open');
                }else{
               		element.dialog('close');
                }
                
            });
	
		}
	}
});
