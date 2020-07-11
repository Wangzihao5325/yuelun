import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PageName from '../../Config/PageName';

import BottomTab from '../BottomTab';
import PushPage from '../../Pages/pushPage';
import BridgePage from '../../Pages/BridgePage';
import NetworkPage from '../../Pages/NetworkPage';
import ToastPage from '../../Pages/ToastPage';
import FlatlistPage from '../../Pages/FlatlistPage';
import ProgressRatePage from '../../Pages/ProgressRatePage';

import acceleratorPage from '../../Pages/Page/acceleratorPage';
import setting from '../../Pages/Page/setting';
import suggestion from '../../Pages/Page/suggestion';
import GameHomePage from '../../Pages/Page/GameHomePage';

const Stack = createStackNavigator();

/** normalStack 配置块 */
const optionArray = [
    {
        key: PageName.BOTM_TAB,
        name: PageName.BOTM_TAB,
        component: BottomTab,
        options: {
            headerShown: false,
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
        key: PageName.NORMAL_PAGE_ACCELERATOR,
        name: PageName.NORMAL_PAGE_ACCELERATOR,
        component: acceleratorPage,
        options: {
            title: 'acceleratorPage'
        }
    },
    {
        key: PageName.NORMAL_PAGE_SETTING,
        name: PageName.NORMAL_PAGE_SETTING,
        component: setting,
        options: {
            title: '设置'
        }
    }
    ,
    {
        key: PageName.NORMAL_PAGE_SUGGESTION,
        name: PageName.NORMAL_PAGE_SUGGESTION,
        component: suggestion,
        options: {
            title: '意见反馈'
        }
    },
    {
        key: PageName.NORMAL_PAGE_GAME_HOME_PAGE,
        name: PageName.NORMAL_PAGE_GAME_HOME_PAGE,
        component: GameHomePage,
        options: {
            headerShown: false,
        }
    }
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