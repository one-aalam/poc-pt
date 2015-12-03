const Hapi = require('hapi');
const Marko = require('hapi-marko');

const server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000
});

server.register(
  {
    register: Marko,
    options: {
      templatesDir: __dirname + '/templates'
    }
  },
  function(){}
);

server.route({
	method: 'GET',
	path:'/hello/{param}',
	handler: function(req, reply){
		reply.marko('index', {params: req.params});
	}
});

server.inject(
  {method: 'GET', url: '/hello'},
  function(response) {
    console.log(response.result); // <p>foobar</p> 
  }
);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});