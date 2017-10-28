var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require('boom');

var server = new Hapi.Server();
server.connection({
	port: 8001
});

server.route({
	method: 'GET',
	path: '/search',
	handler: function(request, reply) {
		var originalWord = request.query.q;
		var lowerWord = originalWord.toLowerCase();

		if (lowerWord === 'command') {
			return reply({
				synonyms: [ 'Command', 'Directive', 'Operation', 'Order' ],
				relatedWords: [ 'Commander', 'Mission', 'Processor' ],
				abbreviations: [ 'Cmd' ],
				examples: [ ],
				definitions: [ ],
			});
		}

		return reply(Boom.notFound());
	},
	config: {
		validate: {
			query: {
				q: Joi.string().required().min(1)
			}
		}
	}
});

server.start(function(err) {
	if (err) {
		throw err;
	}
	console.log('Server running at:', server.info.uri);
});
