import React from 'react';
import router from '../router';
import App from '../container/App';

export default class Index extends React.Component {
    render() {
        return (typeof document !== 'undefined' ? router : <App/>);
    }
}

export const bound = {
    styles: [
        "//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css",
        "//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
    ],
    scripts: [
        "//cdn.bootcss.com/jquery/2.2.4/jquery.min.js",
        "//cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"
    ]
}
