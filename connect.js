const mysql = require('mysql');
const http = require('http');

const connection = mysql.createConnection({
	host : 'localhost',
	port : 8889,
	user : 'root',
	password: 'root',
	database: 'upnext'
});

connection.connect();

http.createServer(function(request, response) {
	var headers = request.headers;
	var method = request.method;
	var url = request.url;
	var body = [];
	request.on('error', function() {
		console.log(err);
	}).on('data', function(chunk) {
		body.push(chunk);
	}).on('end', function() {
		body = Buffer.concat(body).toString();
	});

	response.on('error', function(err) {
		console.log(err);
	});
	response.writeHead(200, {'Content-Type' : 'application/json'});

	var responseBody = {
		headers : headers,
		method: method,
		url : url,
		body: body
	};

	response.write(JSON.stringify(responseBody));
	response.end();
}).listen(8888);

connection.query();


connection.end();
