import * as React from 'react';
import * as LogManager from '../Functions/LogManager/LogManager';
import PageName from '../Config/PageName';
import store from '../store';

/** 为无法访问到navigation的地方提供路由能力 */
export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export const alert = (payload) => {
    navigate(PageName.MODAL_ALERT, payload)
}

export const alertBottom = (payload) => {
    navigate(PageName.MODAL_ALERT_BOTTOM, payload)
}

/** 集中处理路由跳转 ??函数组件无法使用 */
export function jump(component, routeName, params) {
    if (!params) {
        params = {};
    }

    let navi;
    let route;
    if (component && component.props.navigation && component.props.route) {
        navi = component.props.navigation;
        route = component.props.route;
    } else {
        navi = navigationRef.current;
    }

    if (navi && routeName) {
        //对加速详情页特别处理，需要判断是否登录
        if (routeName === PageName.ACCELERATE_DETAILS_PAGE && !store.getState().user.isLogin) {
            navi?.navigate(PageName.NORAML_LOGIN_PAGE);
        } else {
            navi?.navigate(routeName, params);
        }
        if (route) {
            RecordPagePathData(route.name, routeName);
        }
    }
}

export function back(component) {
    let navi;
    if (component && component.props.navigation) {
        navi = component.props.navigation;
    }

    if (navi) {
        navi.goBack();
    }
};

RecordPagePathData = (rootPageName = '', targetPageName = '', type = 'jump') => {
    LogManager.recordThePagePushLog(rootPageName, targetPageName, type);
    // console.log('页面路径日志：从页面：', rootPageName, '跳转到页面：', targetPageName);
}