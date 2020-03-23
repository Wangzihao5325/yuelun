import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Config/UIConfig';

//import MapView from 'react-native-maps';
//import Marker from 'react-native-maps';

export default class ThirdPage extends Component{
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
       let lanth = {lat: 37.785834, lng: -122.406417}; 

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    第三页
                </Text>
                {/* <MapView
                style={styles.mapStyle}
                showsUserLocation={true}     //是否开启用户定位
                >
                    <Marker
                    coordinate = {lanth}
                    title="TEST LOCATION"
                    />
                    </MapView> */}
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
    },
    mapStyle:{
        width:SCREEN_WIDTH,
        height:300,
    }
});