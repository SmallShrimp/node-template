import React from 'react';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import {renderToString} from 'react-dom/server';
import Html from '../component/Html';


export default class RenderHelper {

    render(locals, baseComponent, path, initState) {
        var that = this;
        // console.log('baseComponent->', baseComponent)
        return renderToString(<Html path={path} body={that.renderBody(baseComponent)} locals={locals}
                                    props={initState}/>)
    }

    /**
     *
     * @param path /index
     */
    renderBody(component) {
        return renderToString(component);
    }

    getBaseComponent(path) {
        //require('/page')
    }


}
