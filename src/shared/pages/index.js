import React from 'react';
import router from '../router';
import App from '../container/App';

export default class Index extends React.Component {
    render() {
        return (typeof document !== 'undefined' ? router : <App/>);
    }
}

