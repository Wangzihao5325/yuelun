import React ,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {SCREEN_WIDTH} from '../../../Config/UIConfig';

export default class GameTitleItem extends Component{
    render(){
        return(
            <TouchableOpacity 
                onPress = {()=>{
                    if(this.props.clickFunction){
                        this.props.clickFunction();
                    }
                }}
                style={styles.container}>
                <Image
                    resizeMode={'contain'}
                    source={this.props.iconSource} 
                    style={styles.iconStyle}/>
                <Text style={styles.titleStyle}>{this.props.title}</Text>
                <Image
                    source={require('../../../resource/Image/GameHomePage/more.png')} 
                    style={styles.functionIconStyle}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:0,
        marginLeft:0,
        width:SCREEN_WIDTH,
        height:30,
        flexDirection:'row',
        paddingLeft:15,
        paddingRight:15,
        alignItems:'center'
    },
    iconStyle:{
        width:29.5,
        height:17
    },
    titleStyle:{
        marginLeft:4,
        fontSize:15,
        color:'#FFFFFF',
        flex:1
    },
    functionIconStyle:{
        width:7.5,
        height:14
    }
});