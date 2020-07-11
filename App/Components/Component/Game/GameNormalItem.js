import React, { Component } from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity} from 'react-native'

export default class GameNormalItem extends Component{
    render(){
        return(
            <View>
                <View style={styles.container}>
                    <Image
                        source={this.props.source} 
                        style={styles.ImageStyle}/>
                    <Text style={styles.textStyle}>{this.props.title}</Text>
                </View>
                  {
                      this.props.showFavoratorIcon
                      ?
                      <Image
                            resizeMode={'contain'}
                            source = {this.props.favorator ? require('../../../resource/Image/GameHomePage/hot.png'):require('../../../resource/Image/GameHomePage/search.png')} 
                            style={styles.favoratorIcon}/>
                      :
                      null
                  }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:90,
        height:100,
        alignItems:'center'

    },
    ImageStyle:{
        width:64,
        height:64,
        borderRadius:5,
        backgroundColor:'#0A264C',
    },
    textStyle:{
        marginTop:6,
        fontSize:12,
        height:28,
        flex:1,
        color:'white',
        textAlign:'center'
    },
    favoratorIcon:{
        width:20.5,
        height:18.5,
        position:'absolute',
        marginLeft:55.5,
        marginTop:46.5
    }
});