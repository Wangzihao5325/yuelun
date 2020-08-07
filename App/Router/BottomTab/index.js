import React, { Component } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PageName from '../../Config/PageName';

import FirstPage from '../../Pages/TabPage/FirstPage';
import SecondPage from '../../Pages/TabPage/SecondPage';
import ThirdPage from '../../Pages/TabPage/ThirdPage';
import FourthPage from '../../Pages/TabPage/FourthPage';
import GameHomePage from '../../Pages/Page/GameHomePage';
import MinePage from '../../Pages/Mine/MinePage';
import acceleratorPage from '../../Pages/Page/acceleratorPage';

import CustomTabbar from './CustomTabbar';

const Tab = createBottomTabNavigator();

/** bottomTab 配置块 */
const optionArray = [
    {
        key: PageName.NORMAL_PAGE_GAME_HOME_PAGE,
        name: PageName.NORMAL_PAGE_GAME_HOME_PAGE,
        component: GameHomePage,
        options: {
            title: '游戏',
            tabBarIcon: ({ focused, color, size }) => {
                let iconSrc = focused ? require('../../resource/Image/BottomNavi/home_select.png') : require('../../resource/Image/BottomNavi/home_unselect.png');
                return <Image style={{ height: 20, width: 20 }} source={iconSrc} resizeMode='contain' />
            }
        }
    },
    {
        key: PageName.NORMAL_PAGE_ACCELERATOR,
        name: PageName.NORMAL_PAGE_ACCELERATOR,
        component: acceleratorPage,
        options: {
            title: '加速',
            tabBarIcon: ({ focused, color, size }) => {
                let iconSrc = focused ? require('../../resource/Image/BottomNavi/accelerate_select.png') : require('../../resource/Image/BottomNavi/accelerate_unselect.png');
                return <Image style={{ height: 20, width: 20 }} source={iconSrc} />
            }
        }
    },
    {
        key: PageName.NORMAL_PAGE_MINE,
        name: PageName.NORMAL_PAGE_MINE,
        component: MinePage,
        options: {
            title: '我的',
            tabBarIcon: ({ focused, color, size }) => {
                let iconSrc = focused ? require('../../resource/Image/BottomNavi/mine_select.png') : require('../../resource/Image/BottomNavi/mine_unselect.png');
                return <Image style={{ height: 20, width: 20 }} source={iconSrc} />
            }
        }
    },
];

export default class BottomTab extends Component {
    render() {
        return (
            <CustomTabbar
            tabBarStyle={{height:60}}
            // tabBarOptions={{
            //     activeTintColor: '#CDCE21',
            //     inactiveTintColor: '#8FADD7',
            //     style: {
            //         backgroundColor: '#00132D',
            //         borderTopWidth:0
            //     }
            // }}
            >
                {
                    optionArray.map((item) => {
                        return <Tab.Screen {...item} />
                    })
                }
            </CustomTabbar>
        );
    }
}