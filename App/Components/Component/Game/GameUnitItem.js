import React, { Component } from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity} from 'react-native'

export default class GameUnitItem extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.infomationRootView}>
                    <View style={styles.imageRoot}>
                        <Image
                            source={this.props.source} 
                            style={styles.ImageStyle}/>
                    </View>
                    <View style={styles.infoRoot}>
                        <Text style={styles.nameText}>{this.props.nameText}</Text>
                        <TouchableOpacity style={styles.buttonStyle}>
                            <Image
                                source = {require('../../../resource/Image/GameHomePage/lightning.png')} 
                                style={styles.iconStyle}/>
                            <Text style={styles.activeText}>加速</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:180,
        height:120,
    },
    ImageStyle:{
        width:60,
        height:60,
        borderRadius:30,
        borderWidth:2,
        borderColor:'rgba(215,197,159,1.0)',
        marginTop:-6.5,
        marginLeft:-5,
        backgroundColor:'#0A264C',
    },
    infomationRootView:{
        marginLeft:5,
        marginTop:6.5,
        flex:1,
        flexDirection:'row',
        borderRadius:10
    },
    imageRoot:{
        flex:1,
        backgroundColor:'#0A264C',
        borderTopLeftRadius:11,
        borderBottomLeftRadius:11
    },
    infoRoot:{
        flex:2,
        backgroundColor:'#0A264C',
        borderTopRightRadius:11,
        borderBottomRightRadius:11,
        justifyContent:'center',
        paddingLeft:5
    },
    nameText:{
        color:'white',
        fontSize:14,
        textAlign:'left'
    },
    buttonStyle:{
       width:90,
       height:30,
       borderRadius:15,
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#F5CC00',
       marginTop:16.5
    },
    iconStyle:{
        width:9.5,
        height:16.5,
    },
    activeText:{
        marginLeft:3,
        fontSize:15,
        color:'#4F2F00'
    }
});