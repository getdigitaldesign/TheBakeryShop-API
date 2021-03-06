
const Hapi = require('hapi');
 
const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: '0.0.0.0'
});
 
const routes = require('./routes');
server.route(routes);
 
const init = async () => {
 
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};
 
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
 
init();