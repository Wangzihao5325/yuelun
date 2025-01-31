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
    AsyncStorage,
    KeyboardAvoidingView
} from 'react-native';
import CustomButton from '../../Components/Component/CustomButton';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Config/UIConfig';
import * as ApiModule from '../../Functions/NativeBridge/ApiModule';
import * as NavigationService from '../../Router/NavigationService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Loading } from '../../Components/Toast/Loading';
import { Toast } from '../../Components/Toast/Toast';

export default class suggestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestion: '',
            contactValue: '',
            onFocus: false,
        }
    }

    componentDidMount() {
        const { params } = this.props.route.params;
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => { this.sendTheSuggestion() }}
                    title="发送"
                    color={Platform.OS === 'ios' ? "white" : "transparent"}
                />)
        });
    }

    render() {
        return (
            <View style={[styles.container, { marginTop: this.state.onFocus ? -130 : 0 }]}>
                <KeyboardAwareScrollView>
                    <Text style={styles.textStyle}>告诉我们您遇到的问题</Text>
                    <View style={styles.suggestionRoot}>
                        <TextInput
                            placeholder='请填写'
                            placeholderTextColor={'#BBBBBB'}
                            style={styles.problemInput}
                            onChangeText={(text) => {
                                this.setState({ suggestion: text })
                            }}
                            value={this.state.suggestion}
                            maxLength={200}
                            multiline={true}
                        />
                        <View style={styles.inputNumRoot}>
                            <Text style={{ color: '#BBBBBB' }}>{this.state.suggestion.length + '/200字'}</Text>
                        </View>
                    </View>
                    {this.renderTheTelItem()}
                </KeyboardAwareScrollView>
            </View>
        );
    }

    renderTheTelItem = () => {
        return (
            <View style={styles.contactRoot}>
                <Text style={styles.textStyle}>您的联系方式</Text>
                <TextInput
                    placeholder='请留下QQ/电话哦'
                    style={styles.contactItem}
                    placeholderTextColor={'#BBBBBB'}
                    onChangeText={(text) => {
                        this.setState({ contactValue: text })
                    }}
                    onBlur={() => {
                        this.setState({ onFocus: false });
                    }}
                    onFocus={() => {
                        this.setState({ onFocus: true });
                    }}
                    value={this.state.contactValue}
                />
            </View>
        );
    }

    sendTheSuggestion = () => {
        if (this.state.suggestion === '') {
            let payload = {
                content: '请输入遇到的问题',
                bottomObjs: [
                    {
                        key: 'confirm',
                        type: 'button',
                        title: '确定',
                    },
                ]
            };
            NavigationService.alert(payload);
            return;
        }

        if (this.state.contactValue === '') {
            let payload = {
                content: '请输入联系方式',
                bottomObjs: [
                    {
                        key: 'confirm',
                        type: 'button',
                        title: '确定',
                    },
                ]
            };
            NavigationService.alert(payload);
            return;
        }

        Loading.show();
        ApiModule.sendTheFeedbackWithTheSessionID(this.state.suggestion, this.state.contactValue)
            .then((result) => {
                Loading.hidden();
                let feedback = result;
                if (result.status == 'ok') {
                    Toast.show('反馈成功');
                    setTimeout(()=>{NavigationService.back(this);},1500);
                } else {
                    Toast.show('反馈失败');
                }
            });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00132D'
    },
    setViewRoot: {
        flex: 1,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        width: SCREEN_WIDTH,
    },
    suggestionRoot: {
        marginLeft: 15,
        marginTop: 15,
        width: SCREEN_WIDTH - 30,
        borderRadius: 5,
        backgroundColor: '#042045',
        height: 300,
    },
    problemInput: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 20,
        flex: 1,
        color: '#BBBBBB',
        textAlignVertical: 'top'
    },
    inputNumRoot: {
        marginTop: 0,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 0,
        height: 20,
        width: SCREEN_WIDTH - 60,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    contactRoot: {
        marginTop: 20,
        marginRight: 15
    },
    contactItem: {
        marginTop: 15,
        marginLeft: 15,
        borderRadius: 5,
        height: 50,
        width: SCREEN_WIDTH - 30,
        backgroundColor: '#042045ed',
        color: '#BBBBBB'
    },
    textStyle: {
        marginLeft: 15,
        marginTop: 15,
        fontSize: 14,
        color: 'white'
    }
});