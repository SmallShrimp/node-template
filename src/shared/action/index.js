/**
 * Created by Administrator on 2016/11/18.
 */

import type from '../constants/ActionState';

export function Update(model) {
    return (dispatch, getState)=> {
        return dispatch({
            type: type.Update,
            status: true
        });
    }
}