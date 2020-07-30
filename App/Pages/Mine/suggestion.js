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
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import CustomButton from '../../Components/Component/CustomButton';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Config/UIConfig';

export default class suggestion extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            suggestion:'',
            contactValue:'',
        }
    }

    componentDidMount(){
       const { params } = this.props.route.params;
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>告诉我们您遇到的问题</Text>
                <View style={styles.suggestionRoot}>
                    <TextInput
                       placeholder = '请填写'
                       placeholderTextColor = {'#BBBBBB'}
                       style={styles.problemInput}
                       onChangeText = {(text)=>{
                           this.setState({suggestion:text})
                       }}
                       value = {this.state.suggestion}
                       maxLength = {200}
                       multiline = {true}
                    />
                    <View style={styles.inputNumRoot}>
                        <Text style={{color:'#BBBBBB'}}>{this.state.suggestion.length + '/200字'}</Text>
                    </View>
                </View>
                <KeyboardAvoidingView 
                     keyboardVerticalOffset={30}
                     behavior={Platform.OS == "ios" ? "position" : "height"}>
                {this.renderTheTelItem()}
                </KeyboardAvoidingView>
            </View>
        );
    }

    renderTheTelItem = () =>{
        return(
            <View style={styles.contactRoot}>
                <Text style={styles.textStyle}>您的联系方式</Text>
                <TextInput 
                     placeholder='请留下QQ/电话哦'
                     style={styles.contactItem}
                     placeholderTextColor = {'#BBBBBB'}
                     onChangeText = {(text)=>{
                        this.setState({contactValue:text})
                     }}
                    value = {this.state.contactValue}
                />
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#00132D'
    },
    setViewRoot:{
        flex:1,
        marginTop:0,
        marginLeft:0,
        marginRight:0,
        width:SCREEN_WIDTH,
    },
    suggestionRoot:{
        marginLeft:15,
        marginTop:15,
        width:SCREEN_WIDTH-30,
        borderRadius:5,
        backgroundColor:'#042045',
        height:300,
    },
    problemInput:{
        marginLeft:15,
        marginRight:15,
        marginTop:10,
        marginBottom:20,
        flex:1,
        color:'#BBBBBB'
    },
    inputNumRoot:{
        marginTop:0,
        marginLeft:15,
        marginRight:15,
        marginBottom:0,
        height:20,
        width:SCREEN_WIDTH-60,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    contactRoot:{
        marginTop:20,
        marginRight:15
    },
    contactItem:{
        marginTop:15,
        marginLeft:15,
        borderRadius:5,
        height:50,
        width:SCREEN_WIDTH-30,
        backgroundColor:'#042045ed',
        color:'#BBBBBB'
    },
    textStyle:{
        marginLeft:15,
        marginTop:15,
        fontSize:14,
        color:'white'
    }
});