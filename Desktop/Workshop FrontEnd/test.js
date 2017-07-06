var express = require('express');
var https = require('https');
var app = express();

app.use('/lib', express.static(__dirname + '/node_modules'))
app.use('/public', express.static(__dirname + '/public'))
app.get('/', function (req, res) {
	console.log(req.query);
  	res.sendFile(__dirname + '/public/index.html');
});
app.get('/buscar', function (req, res) { //endpoint. No subir los node_modules ponerlo en git ignore
	console.log(req.query);
	res.sendFile(__dirname + '/public/busqueda.html');
});
app.get('/productos/:user_id', function (req, res) { //endpoint. No subir los node_modules ponerlo en git ignore

	https.get("https://reqres.in/api/users/1" + req.params.user_id, function(response){//aca modificamos y mostramos de un solo usuario

		var body ='';
		response.on('data', function(d){
			body +=d
		}); //leo json lo modifico y recien lo muestro
		response.on('end', function(){
			body = JSON.parse(body);
			res.send(body)
		});
	});
});

app.get('/productos', function(req, res){
	https.get("https://reqres.in/api/users", function(response){
		var body ='';
		response.on('data', function(d){
			body +=d
		}); //leo json lo modifico y recien lo muestro
		response.on('end', function(){
			body = JSON.parse(body);

			for (var i = 0; i < body.data.length; i++) {
				var persona = body.data[i]; 
				var personaNueva = {};
				personaNueva.id = persona.id;
				console.log(personaNueva.id);
				personaNueva.avatar = persona.avatar;
				personaNueva.full_name = persona.first_name + " " + persona.last_name;
				body.data[i] = personaNueva;
			}
			res.send(body)
		});
	});
});
app.get('/detalle', function (req, res) { //endpoint. No subir los node_modules ponerlo en git ignore
	res.sendFile(__dirname + '/public/detalle.html');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
