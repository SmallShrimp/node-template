import {Router, Route, browserHistory, IndexRoute, hashHistory} from 'react-router';
import React from 'react';
import NoMatch from '../component/NoMatch';
import App from '../container/App';

export default (
    <Router history={hashHistory}>
        <Route path="/" component={App}>

        </Route>
        <Route path="*" component={NoMatch}/>
    </Router>
);
