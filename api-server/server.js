var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require('boom');

var dbFilename = process.env.DB_FILENAME || './test-data.json';
var dbJson = require(dbFilename);

var server = new Hapi.Server();
server.connection({
	port: 8001
});

server.route({
	method: 'GET',
	path: '/search',
	handler: function(request, reply) {
		var originalTerm = request.query.q;
		var normalizedTerm = normalizeTerm(originalTerm);

		var result = {
			searchTerm: normalizedTerm,
			resultTerms: []
		};

		result.resultTerms = dbJson.terms.filter(function(term) {
			return term.name === normalizedTerm;
		});

		return reply(result);
	},
	config: {
		cors: {
			origin: ['*']
		},
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

// Converts terms of different naming standards to a standard, space-separated,
// lowercase, letter-only naming standard.
//
// Examples conversions:
//   someVar   -> some var
//   SomeVar   -> some var
//   some_var  -> some var
//   some-var  -> some var
//   some-var4 -> some var
//   some$var  -> some var
function normalizeTerm(term) {
	var normTerm = String(term);

	// Convert kebab-case
	normTerm = normTerm.replace(/-/g, ' ');

	// Convert underscore_case
	normTerm = normTerm.replace(/_/g, ' ');

	// Strip non-letters
	normTerm = normTerm.replace(/[^a-zA-Z]/g, ' ');

	// Convert TitleCase
	normTerm = normTerm.replace(/([a-z])([A-Z])/g, '$1 $2');

	// Convert everything that's left to lowercase, and condense/trim whitespace
	return normTerm.toLowerCase().replace(/\s+/g, ' ').trim();
}
