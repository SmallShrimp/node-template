/**
 * Created by Administrator on 2016/11/18.
 */
import type from '../../constants/ActionState';
import InitState from '../../store/InitState';

export default function (state = InitState, action) {
    var newState = state;
    switch (action.type){
        case type.Update:
            newState = Object.assign({},state,action.status);
            break;
        //......
    }
    return newState;
}