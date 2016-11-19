/**
 * 获取指定页面
 */
import _global  from '../constants/global';
import cache from 'memory-cache';
import NoMatch from '../component/NoMatch';
import _ from 'lodash';
var pages = require('./require-page').default;

export default class PageHandle {
    constructor() {
        this._pages = pages;
    }

    /**
     * 根据请求url获取请求的页面
     * @param url /index , /auth/login
     */
    get(url) {
        var that = this, _pages = that._pages;
        if (url == '/' || url == '')url = 'index';
        if (_.startsWith(url, '/')) {
            url = url.substring(1, url.length);
        }
        if (url.indexOf('/') == -1) {
            var r = _pages[url];
            return (!r || !r.default) ? NoMatch : r;
        }
        var urlSplit = url.split('/');
        var r = that.searchPage(urlSplit, _pages);
        return !r ? NoMatch : r;
    }

    searchPage(urlSplit, curPages) {
        // console.log('-------->', curPages)
        var that = this;
        try {
            if (urlSplit.length == 0 && !!curPages.default) {
                return curPages;
            }
            var key = urlSplit[0];
            for (var k in curPages) {
                if (k === key) {
                    //匹配
                    var p = curPages[k];
                    var cloneU = urlSplit.concat();
                    cloneU.shift();
                    return that.searchPage(cloneU, p);
                }
            }
        } catch (e) {
            console.log('获取页面错误:', e);
            return NoMatch;
        }
    }

}