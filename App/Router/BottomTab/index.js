import React, { Component } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PageName from '../../Config/PageName';

import FirstPage from '../../Pages/TabPage/FirstPage';
import SecondPage from '../../Pages/TabPage/SecondPage';
import ThirdPage from '../../Pages/TabPage/ThirdPage';
import FourthPage from '../../Pages/TabPage/FourthPage';

const Tab = createBottomTabNavigator();

/** bottomTab 配置块 */
const optionArray = [
    {
        key: PageName.BOTM_TAB_FIRST,
        name: PageName.BOTM_TAB_FIRST,
        component: FirstPage,
        options: {
            title: 'first',
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
        key: PageName.BOTM_TAB_FOURTH,
        name: PageName.BOTM_TAB_FOURTH,
        component: FourthPage,
        options: {
            title: 'fourth',
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