/**
 * BridgePage
 * Info:click and test the communication between local and react-native
 * Crate by Charlie on 2019-08-19
 * */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    Switch,
    ScrollView
} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Config/UIConfig';

export default class search extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            
        }
    }

    componentDidMount(){
       const { params } = this.props.route.params;
        
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.testStyle}>
                   <View style={styles.iconView}><Text>1</Text></View>
                   <View style={styles.iconView}><Text>2</Text></View>
                   <View style={styles.iconView}><Text>1</Text></View>
                   <View style={styles.iconView}><Text>3</Text></View>
                   <View style={styles.iconView}><Text>1</Text></View>
                   <View style={styles.iconView}><Text>4</Text></View>
                   <View style={styles.iconView}><Text>1</Text></View>
                   <View style={styles.iconView}><Text>5</Text></View>
                   <View style={styles.iconView}><Text>1</Text></View>
                </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    setViewRoot:{
        flex:1,
        marginTop:0,
        marginLeft:0,
        marginRight:0,
        width:SCREEN_WIDTH,
        backgroundColor:'white'
    },
    testStyle:{
        height:270,
        flexDirection:'column',
        justifyContent:'flex-start',
        flexWrap:'wrap',
        justifyContent:'space-between',
        backgroundColor:'yellow',
        paddingTop:10,
        paddingBottom:10
    },
    iconView:{
        width:100,
        height:100,
        backgroundColor:'red',
        marginLeft:15
    }
});