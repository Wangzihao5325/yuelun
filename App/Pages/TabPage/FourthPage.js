import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';


export default class FourthPage extends Component{
    /** tabbar的icon设置 */
    // static navigationOptions = {
    //     showIcon: true,
    //     tabBarIcon : ({focused})=>{
    //         if(focused){
    //             return (
    //                 <Image style={styles.tabBarIcon} source={require('../../resource/Image/icon_me.png')}/>
    //         );
    //         }else{
    //             return (
    //                 <Image style={styles.tabBarIcon} source={require('../../resource/Image/icon_default_me.png')}/>
    //         );
    //         }
            
    //     }
    // }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    第四页
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});