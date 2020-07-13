/**
 * Time Manager
 * Crate by Charlie on 2020-03-24
*/

import { isNumber } from "lodash";

export const getTheCurrentTime = () =>{
    let time = Date.parse(new Date());
    return time;
}