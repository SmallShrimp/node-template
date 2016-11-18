/**
 * 页面父组件
 */

import React, {PropTypes} from 'react';
import serialize from 'serialize-javascript';

export default class Html extends React.Component {

    static defaultProps = {
        props: {}
    };
    static propTypes = {
        body: React.PropTypes.string.isRequired,
        locals: React.PropTypes.object.isRequired,
        props: React.PropTypes.object,
        path: React.PropTypes.string.isRequired
    };

    render() {
        return (
            <html>
            <head>
                {this.renderHeader()}
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
            </head>
            <body>
            <div id='view' dangerouslySetInnerHTML={{__html: this.props.body}}/>
            <script dangerouslySetInnerHTML={{__html: `window.__path='${this.props.path}'`}}/>
            <script dangerouslySetInnerHTML={{__html: `window.__initialState = ${serialize(this.props.props)};`}}/>
            {this.renderFooter()}
            </body>
            </html>
        );
    }


    sortBound(arr) {
        var first = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (!!item.first) {
                first.unshift(item);
            }
        }
        for (var i = 0; i < first.length; i++) {
            var item = first[i];
            var index = arr.indexOf(item);
            arr.splice(index, 1);
            arr.unshift(item);
        }
    }

    renderHeader() {
        if (this.props.locals && this.props.locals.header) {
            //console.log(this.props.locals.header)
            this.sortBound(this.props.locals.header);
            return this.props.locals.header.map(this.renderTag, this);
        }
    }

    renderFooter() {
        if (this.props.locals && this.props.locals.footer) {
            this.sortBound(this.props.locals.footer);
            return this.props.locals.footer.map(this.renderTag, this);
        }
    }

    renderTag(tag, i) {
        const tagProps = Object.assign({}, tag.props || {});
        if (tag.content) {
            tagProps.dangerouslySetInnerHTML = {__html: tag.content};
        }
        return (
            <tag.tag key={i} {...tagProps}/>
        );
    }
}