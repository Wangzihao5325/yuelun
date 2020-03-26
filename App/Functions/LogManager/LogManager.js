/**
 * Log manager, manager and save the user event log
 * Crate by Charlie on 2020-03-25
 * */

import * as TimerManager from '../Time/TimeManager';

export const recordTheClickEvent = (clickType) =>{
    let currentTime = TimerManager.getTheCurrentTime();
    console.log('获取点击事件的记录：类型：',clickType,'时间戳：',currentTime);
}

export const recordThePagePushLog = (rootPageName = '',targetPageName = '',type = '') =>{
    let currentTime = TimerManager.getTheCurrentTime();
    console.log('页面路径日志：从页面：',rootPageName,type,'到页面：',targetPageName,'时间戳：',currentTime);
}