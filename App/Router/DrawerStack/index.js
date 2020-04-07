/**
 * Creat a Drawer Navigator structure
 * 
 * Creat by charlie 2020-03-30
*/

import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SecondPage from '../../Pages/TabPage/SecondPage';
import ThirdPage  from '../../Pages/TabPage/ThirdPage';
import FourthPage from '../../Pages/TabPage/FourthPage';
import normalStack from '../NormalStack';

const Drawer = createDrawerNavigator();

export default class DrawerStack extends Component{
    render(){
        return(
            <Drawer.Navigator initialRouteName="FirstPage">
                <Drawer.Screen name="FirstPage"  component={normalStack}/>
                <Drawer.Screen name="SecondPage" component={SecondPage}/>
                <Drawer.Screen name="ThirdPage"  component={ThirdPage}/>
                <Drawer.Screen name="FourthPage" component={FourthPage}/>
            </Drawer.Navigator>
        );
    }
}