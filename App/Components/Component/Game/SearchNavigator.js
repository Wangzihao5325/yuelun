import React ,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {SCREEN_WIDTH} from '../../../Config/UIConfig';
import * as UIConfig from '../../../Config/UIConfig';

export default class GameTitleItem extends Component{
    render(){
        return(
            <View style={styles.rootView}>
                <View style={styles.searchRootView}>
                    <View style={styles.searchLineStyle}>
                        <Image style={styles.searchIcon} source={require('../../../resource/Image/GameHomePage/search.png')}/>
                        <TextInput 
                            placeholder='输入游戏名称'
                            style={styles.searchInputStyle}
                            placeholderTextColor = {'#91ADD7'}
                            onChangeText = {(text)=>{
                                if(this.props.changeTheTextFunction){
                                    this.props.changeTheTextFunction(text);
                                }
                            }}
                            value = {this.props.searchText}
                            returnKeyType='search'
                            onEndEditing = {()=>{
                                if(this.props.onEndEditing){
                                    this.props.onEndEditing();
                                }
                            }}/>
                    </View>
                    <TouchableOpacity onPress={()=>{this.cancleFunction()}}>
                        <Text style={styles.cancleText}>取消</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    cancleFunction = () =>{
        if(this.props.cancleFunction){
            this.props.cancleFunction();
        }
    }
}

const styles = StyleSheet.create({
    rootView:{
        marginTop:0,
        marginLeft:0,
        width:UIConfig.SCREEN_WIDTH,
        height:UIConfig.NavigatorBarHeight,
        paddingTop:UIConfig.NavigatorTop,
        flexDirection:'row',
        backgroundColor:'#00132C'
    },
    searchRootView:{
        marginLeft:0,
        marginTop:0,
        height:UIConfig.NavigatorViewHeight,
        width:SCREEN_WIDTH,
        flexDirection:'row',
        alignItems:'center',
    },
    searchLineStyle:{
        flex:1,
        marginLeft:32,
        height:28,
        marginRight:5,
        borderRadius:14,
        backgroundColor:'#012451',
        flexDirection:'row',
        alignItems:'center'
    },
    searchIcon:{
        width:15,
        height:15,
        marginLeft:10
    },
    searchInputStyle:{
        padding:0,
        marginLeft:5,
        marginRight:5,
        flex:1,
        fontSize:14,
        color:'#91ADD7'
    },
    cancleText:{
        fontSize:15,
        color:'#91ADD7',
        paddingLeft:10,
        paddingRight:10
    }
});