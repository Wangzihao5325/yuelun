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

const Tab = createBottomTabNavigator();

/** bottomTab 配置块 */
const optionArray = [
    {
        key: PageName.NORMAL_PAGE_GAME_HOME_PAGE,
        name: PageName.NORMAL_PAGE_GAME_HOME_PAGE,
        component: GameHomePage,
        options: {
            title: 'GameHomePage',
            tabBarIcon: ({ focused, color, size }) => {
                let iconSrc = focused ? require('../../resource/Image/icon_me.png') : require('../../resource/Image/icon_default_me.png');
                return <Image style={{ height: 20, width: 20 }} source={iconSrc} />
            }
        }
    },
    {
        key: PageName.BOTM_TAB_SECOND,
        name: PageName.BOTM_TAB_SECOND,
        component: SecondPage,
        options: {
            title: 'second',
            tabBarIcon: ({ focused, color, size }) => {
                let iconSrc = focused ? require('../../resource/Image/icon_me.png') : require('../../resource/Image/icon_default_me.png');
                return <Image style={{ height: 20, width: 20 }} source={iconSrc} />
            }
        }
    },
    {
        key: PageName.BOTM_TAB_THIRD,
        name: PageName.BOTM_TAB_THIRD,
        component: ThirdPage,
        options: {
            title: 'third',
            tabBarIcon: ({ focused, color, size }) => {
                let iconSrc = focused ? require('../../resource/Image/icon_me.png') : require('../../resource/Image/icon_default_me.png');
                return <Image style={{ height: 20, width: 20 }} source={iconSrc} />
            }
        }
    },
    {
        key: PageName.NORMAL_PAGE_MINE,
        name: PageName.NORMAL_PAGE_MINE,
        component: MinePage,
        options: {
            title: 'MinePage',
            tabBarIcon: ({ focused, color, size }) => {
                let iconSrc = focused ? require('../../resource/Image/icon_me.png') : require('../../resource/Image/icon_default_me.png');
                return <Image style={{ height: 20, width: 20 }} source={iconSrc} />
            }
        }
    },
];

export default class BottomTab extends Component {
    render() {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                {
                    optionArray.map((item) => {
                        return <Tab.Screen {...item} />
                    })
                }
            </Tab.Navigator>
        );
    }
}