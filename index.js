import 'babel-polyfill';
import config from './config.js';
import app from './src/server';


const server = app.listen(config.port, () => {
    const port = server.address().port;
    console.log('Listening at port->http://localhost:', port);
});