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

export function UpdateDate(dispatch, getState) {
    return dispatch({
        type: type.UpdateDate,
        date: (new Date()).now
    })
}