import 'babel-polyfill';
import express from 'express';
const app = express();

app.use('*', async function (req, res, next) {
    res.send('node template!').end();
});


const server = app.listen(9898, () => {
    const port = server.address().port;
    console.log('Listening at port->http://localhost:', port);
});