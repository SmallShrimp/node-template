/**
 * Created by Administrator on 2016/11/18.
 */

import '../stylesheet/normalize.less';
import React from 'react';
var {connect} = require('react-redux');

import {UpdateDate} from '../action/index';

class App extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        var {dispatch} =this.props;
        setInterval(function () {
            dispatch(UpdateDate);
        }, 1000);
    }

    static propTypes = {
        date: React.PropTypes.string
    };

    render() {
        console.log(this)
        var props = this.props;
        var date = !props.main ? new Date() : props.main.date;
        console.log(props.main)
        return (<div>
            { date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
        </div>);
    }
}


if (typeof(window) == 'undefined')
    module.exports = App;
else
    module.exports = connect((state)=> {
        return state;
    })(App);
