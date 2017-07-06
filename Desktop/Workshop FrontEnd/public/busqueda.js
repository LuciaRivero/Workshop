$.get("/productos", function(data){
	for (var i = 0; i < data.data.length; i++) {
		var html="";

		
		html +=	'<div class="busqueda">';
		html +=	'<a href="/detalle?user=' + data.data[i].id +'"><img src="' + data.data[i].avatar + '"/></a>';
		html +=	'<p>Nombre y apellido: ' +  data.data[i].first_name + ' ' + data.data[i].last_name + '</p>';
		html +=  '</div>';


		$("#contenedor").append(html);
		$('#cargando').hide();
	}
});