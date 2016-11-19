/**
 * express route
 */
import React from 'react';
import {Router} from 'express';
import _ from 'lodash';
import RenderHelper from 'helper/render';
import PageHandle from 'helper/page-handle';
var pageHandle = new PageHandle();
//临时
// import Index from 'pages/page-index';

var renderHelper = new RenderHelper();
const route = new Router();


route.get("/*",
    async(req, res, next)=> {
        //服务端渲染
        var PageResult = pageHandle.get(req.path);
        var Page = PageResult.default;
        var PageBound = PageResult.bound;
        var _path = req.path;
        if (_.startsWith(_path, '/')) {
            _path = _path.substr(1, _path.length);
        }
        if (!!PageBound) {
            var styles = PageBound.styles;
            var scripts = PageBound.scripts;

            for (var i = styles.length - 1; i >= 0; i--) {
                res.locals.header.unshift({
                    tag: 'link',
                    props: {
                        rel: 'stylesheet',
                        type: 'text/css',
                        href: `${styles[i]}`
                    }
                });
            }
            for (var i = scripts.length - 1; i >= 0; i--) {
                res.locals.footer.unshift({
                    tag: 'script',
                    props: {
                        src: `${scripts[i]}`
                    }
                });
            }
        }
        var html = renderHelper.render(res.locals, <Page/>, _path, {});
        res.locals.html = html;
        next();
    }, async(req, res, next)=> {
        //返回结果
        res.send(res.locals.html).end();
    });
export default route;