import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PageName from '../../Config/PageName';
import { themeColor } from '../../Config/UIConfig';

import BottomTab from '../BottomTab';
import PushPage from '../../Pages/pushPage';
import BridgePage from '../../Pages/BridgePage';
import NetworkPage from '../../Pages/NetworkPage';
import ToastPage from '../../Pages/ToastPage';
import FlatlistPage from '../../Pages/FlatlistPage';
import ProgressRatePage from '../../Pages/ProgressRatePage';

//个人信息页面
import PersonalInfoPage from '../../Pages/personalInfo';

const defaultHeaderOptions = {
    headerBackTitleVisible: false,
    headerStyle: {
        backgroundColor: themeColor.headerBgColor,
        //移除header底部分隔线 issue: https://github.com/react-navigation/react-navigation/issues/865
        shadowColor: 'transparent',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

const Stack = createStackNavigator();

/** normalStack 配置块 */
const optionArray = [
    {
        key: PageName.BOTM_TAB,
        name: PageName.BOTM_TAB,
        component: BottomTab,
        options: {
            title: 'Bottom_Home'
        }
    },
    {
        key: PageName.NORMAL_STACK_PUSH,
        name: PageName.NORMAL_STACK_PUSH,
        component: PushPage,
        options: {
            title: 'Push'
        }
    },
    {
        key: PageName.NORMAL_STACK_BRIDGE,
        name: PageName.NORMAL_STACK_BRIDGE,
        component: BridgePage,
        options: {
            title: 'Bridge'
        }
    },
    {
        key: PageName.NORMAL_STACK_NETWORK,
        name: PageName.NORMAL_STACK_NETWORK,
        component: NetworkPage,
        options: {
            title: 'Network'
        }
    },
    {
        key: PageName.NORMAL_STACK_TOAST,
        name: PageName.NORMAL_STACK_TOAST,
        component: ToastPage,
        options: {
            title: 'Toast'
        }
    },
    {
        key: PageName.NORMAL_STACK_FLATLIST,
        name: PageName.NORMAL_STACK_FLATLIST,
        component: FlatlistPage,
        options: {
            title: 'Flatlist'
        }
    },
    {
        key: PageName.NORMAL_PROGRESS_RATE,
        name: PageName.NORMAL_PROGRESS_RATE,
        component: ProgressRatePage,
        options: {
            title: 'ProgressRate'
        }
    },
    {
        key: PageName.NORMAL_PERSONAL_INFO,
        name: PageName.NORMAL_PERSONAL_INFO,
        component: PersonalInfoPage,
        options: Object.assign({ title: '更换手机号码' }, defaultHeaderOptions)
    },
];


export default class NormalStack extends Component {

    render() {
        return (
            <Stack.Navigator>
                {
                    optionArray.map((item) => {
                        return <Stack.Screen {...item} />
                    })
                }
            </Stack.Navigator>
        );
    }
}