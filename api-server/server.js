var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
	port: 8001
});

server.route({
	method: 'GET',
	path: '/search',
	handler: function(request, reply) {
		return reply({
			words: [
				'bar',
				'fizzBuzz',
				'foo',
				'stackOverflow',
				'steal',
			]
		});
	}
});

server.start(function(err) {
	if (err) {
		throw err;
	}
	console.log('Server running at:', server.info.uri);
});
