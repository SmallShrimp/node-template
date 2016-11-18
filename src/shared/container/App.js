/**
 * Created by Administrator on 2016/11/18.
 */

import '../stylesheet/normalize.less';
import React from 'react';
var {connect} = require('react-redux');

class App extends React.Component {

    render() {
        return (<div>
            App index
        </div>);
    }
}


if (typeof(window) == 'undefined')
    module.exports = App;
else
    module.exports = connect((state)=> {
        return state;
    })(App);
