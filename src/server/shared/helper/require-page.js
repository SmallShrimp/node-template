import cache from 'memory-cache';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import _global from '../constants/global';

const pagePath = path.join(process.cwd(), '/src/shared');
function earchPages(_path) {
    var files = fs.readdirSync(_path, {encoding: 'utf8'});
    return files;
}

function create(result, files, _path, _subPath) {
    //console.log("_subPath:", _subPath)
    _subPath = _subPath.replace('\\', "/");
    for (var i = 0; i < files.length; i++) {
        var item = files[i];
        var basePath = path.join(pagePath, _path, item);
        var stat = fs.lstatSync(basePath);
        if (stat.isDirectory()) {
            result[item] = {};
            create(result[item], earchPages(basePath), _path + "/" + item, path.join(_subPath, item).toString());
        } else {
            var name = item;
            name = name.substring(0, name.lastIndexOf('.'));
            var requirePath = "pages/" + _subPath + "/" + item.substring(0, item.lastIndexOf('.'));
            //console.log(requirePath)
            result[name] = require("pages/" + (!!_subPath ? _subPath + "/" : "") + item.substring(0, item.lastIndexOf('.')));
        }
    }


}

function createPages() {
    try {
        // var files = earchPages(pagePath);
        var result = {};
        create(result, earchPages(path.join(pagePath, 'pages')), "pages", "");
        console.log('最终结果：', result);
        cache.put(_global.page_cache_key, result, _global.cache_timeout, (key, value)=> {
            cache.put(key, value);
        });
        return result;
    } catch (error) {
        console.log(error);
        return {};
    }
}
export default createPages();
