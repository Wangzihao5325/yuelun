import React, { Component, ReactElement } from 'react';
import { View, TextInput, TouchableOpacity, Image, Platform, StyleSheet } from 'react-native';
import { themeColor } from '../../Config/UIConfig';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomInput extends Component {
    render() {
        const { secureTextEntry = false, value, onChangeText, iconName = '"mobile-phone"', iconComponent, placeholder, style, placeholderTextColor = '#818995' } = this.props;
        //待优化 assign会拷贝所有可枚举对象,不需要那么多
        let containerStyle = Object.assign({}, styles.defaultContainer, style);

        // $$typeof 是用来鉴别react element的属性 issue:https://www.jianshu.com/p/f93b8a400002
        // 确定传入的值是element才进行加载
        let isCustomIcon = iconComponent && (iconComponent.$$typeof === Symbol.for('react.element'));
        let isShowClearBtn = this.clearBtnHandle();
        return (
            <View style={containerStyle} >
                {
                    isCustomIcon ?
                        iconComponent : <Icon name={iconName} size={30} color="#666" />
                }
                {/* <View style={[styles.separator, { height: containerStyle.height - 14 }]} /> */}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                />
                {isShowClearBtn &&
                    <TouchableOpacity onPress={this.clearValue}>
                        <Image style={styles.clearBtn} source={require('../../resource/Image/GameHomePage/clear_gray.png')} />
                    </TouchableOpacity>
                }
            </View>
        );
    }

    clearValue = () => {
        this.props.onChangeText('');
    }

    clearBtnHandle = () => {
        let isShowClearBtn = false;
        switch (this.props.clearButtonMode) {
            case 'never':
                isShowClearBtn = false;
                break;
            case 'while-editing':
                isShowClearBtn = this.props.value ? true : false;
                break;
            case 'always':
                isShowClearBtn = true;
                break;
            default:
                break;
        }
        return isShowClearBtn;
    }
}

const styles = StyleSheet.create({
    defaultContainer: {
        height: 45,
        width: 350,
        borderRadius: 45,
        backgroundColor: themeColor.inputBgColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    separator: {
        height: 30,
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#fff',
        marginHorizontal: 12
    },
    input: {
        flex: 1,
        height: 30,
        color: 'white',
        paddingHorizontal: 5,
        fontSize: 18,
        paddingVertical: 0,
        fontFamily: 'PingFang-SC-Regular'
    },
    clearBtn: {
        height: 15,
        width: 15,
        marginHorizontal: 5
    }
});