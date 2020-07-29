import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { themeColor } from '../../Config/UIConfig';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

// export default class AboutUs extends Component {
//     render() {
//         const { bgColor } = themeColor;
//         return (
//             <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
//                 <View style={{ alignSelf: 'center',marginTop:20 }}>
//                     <Icon name='twitter' size={80} color="#666" />
//                 </View>
//                 <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>V1.0</Text>
//                 <Text style={{ color: 'white', marginHorizontal: 15, marginTop: 20 }}>说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字</Text>
//             </SafeAreaView>
//         );
//     }
// }

export default class AboutUs extends Component {
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ display:'none',flex: 1, backgroundColor: bgColor, paddingTop: 0,flexDirection:'row' ,justifyContent:'space-between',position:'relative'}}>
                    <View style={{position:'absolute',top:0,left:0,width:'30%',height:70,backgroundColor:'red'}}/>
                    <View style={{position:'absolute',marginLeft:'30%',width:'30%',height:90,backgroundColor:'green'}}/>
                    <View style={{position:'absolute',marginLeft:'60%',width:'30%',height:100,backgroundColor:'blue'}}/>
            </SafeAreaView>
        );
    }
}