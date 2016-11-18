/**
 * server express
 */
import express from 'express';
import router from './route';
import path from 'path';
import config from '../../config';
const app = express();

app.use(express.static(path.resolve('public')));
app.use(['favicon.ico', '/images*', '/media*', '/css*', '/fonts*', '/assets*'], (req, res) => {
    res.status(404).end();
});

app.use(async(req,res,next)=>{
    try {
        res.locals.header = [];

        var loader = ()=> {
            res.locals.header.push({
                tag: 'script',
                props: {
                    src: `${res.baseScriptsURL}/libs/pace/pace.min.js`
                }, first: true
            });
            res.locals.header.push({
                tag: 'script',
                props: {
                    src: `${res.baseScriptsURL}/libs/pace/pace.event.js`
                }, first: true
            });
            res.locals.header.push({
                tag: 'link',
                props: {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: `${res.baseScriptsURL}/libs/pace/themes/blue/pace-theme-loading-bar.css`
                }, first: true
            });
        };
        if (process.env.NODE_ENV !== 'production') {
            res.baseScriptsURL = `http://localhost:${config.devPort}`;
            //console.log(process.env.NODE_ENV);
            loader();
        } else {
            res.baseScriptsURL = '';
            loader();
            res.locals.header.push({
                tag: 'link',
                props: {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: `${res.baseScriptsURL}/assets/main.css`
                }
            });
        }

        res.locals.header.push({
            tag: 'link',
            props: {
                id: "load_plugins_before"
            }
        });

        res.locals.header.push({
            tag: 'title',
            content: config.appTitle
        });
        res.locals.header.push({
            tag: 'link',
            props: {
                rel: 'stylesheet',
                type: 'text/css',
                href: `${res.baseScriptsURL}/assets/public.css`
            }
        });

        res.locals.footer = [{
            tag: 'script',
            props: {
                src: `${res.baseScriptsURL}/assets/common.js`
            }
        },
            {
                tag: 'script',
                props: {
                    src: `${res.baseScriptsURL}/assets/public.js`
                }
            }];
        next();
    } catch (error) {
        next(error);
    }
});

app.use(router);

app.use((req, res) => {
    res.status(404).end();
});

app.use((error, req, res) => {
    const statusCode = error.statusCode || 500;
    const err = {
        error: statusCode,
        message: error.message
    };
    if (!res.headersSent) {
        res.status(statusCode).send(err);
    }
});

export default app;