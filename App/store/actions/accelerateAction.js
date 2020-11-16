import * as Types from '../actionTypes';

export function acc_type_change() {
    return { type: Types.ACCELERATE_TYPE_CHANGE };
}

export function acc_type_change_unsafe(value) {
    return { type: Types.ACCELERATE_TYPE_CHANGE_UNSAFE, value };
}