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
    Switch
} from 'react-native';
import CustomButton from '../../Components/Component/CustomButton';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Config/UIConfig';

export default class setting extends Component {
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
                <View style={styles.setViewRoot}>
                    {this.renderTheAcceleratorAutoItem()}
                    {this.renderTheSuggestionItem()}
                </View>
                <View style={styles.logoutRoot}>
                    <TouchableOpacity 
                        onPress = {()=>{console.log('logout-----');}}>
                            <View style={styles.logoutBtnBtn}>
                                 <Text style={{color:'yellow'}}>退出登录</Text>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderTheAcceleratorAutoItem = () =>{
        return(
            <View style={styles.setRootView}>
                <Text>下次启动自动加速</Text>
                <Switch/>
            </View>
        );
    }

    renderTheSuggestionItem = () =>{
        return(
            <TouchableOpacity>
                <View style={styles.setRootView}>
                    <Text>意见反馈</Text>
                    <Image style={styles.setIcon}/>
                </View>
            </TouchableOpacity>
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
    logoutRoot:{
        marginLeft:0,
        marginRight:0,
        marginBottom:0,
        width:SCREEN_WIDTH,
        height:90,
        alignItems:'center',
        backgroundColor:'blue'
    },
    logoutBtnBtn:{
        borderWidth:1.0,
        borderRadius:4,
        borderColor:'yellow',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:30,
        marginRight:30,
        width:SCREEN_WIDTH-60,
        height:50,
    },
    setRootView:{
        marginTop:0,
        marginLeft:0,
        width:SCREEN_WIDTH,
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15
    },
    setIcon:{
        width:10,
        height:20,
        backgroundColor:'red'
    }
});