import React, { Component, ReactElement } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomInput extends Component {
    render() {
        const { value, onChangeText, iconName = '"mobile-phone"', iconComponent, placeholder, style, placeholderTextColor = '#818995' } = this.props;
        //待优化 assign会拷贝所有可枚举对象,不需要那么多
        let containerStyle = Object.assign({}, styles.defaultContainer, style);

        // $$typeof 是用来鉴别react element的属性 issue:https://www.jianshu.com/p/f93b8a400002
        // 确定传入的值是element才进行加载
        let isCustomIcon = iconComponent && (iconComponent.$$typeof === Symbol.for('react.element'));

        return (
            <View style={containerStyle} >
                {
                    isCustomIcon ?
                        iconComponent : <Icon name={iconName} size={30} color="#666" />
                }
                <View style={[styles.separator, { height: containerStyle.height - 14 }]} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    defaultContainer: {
        height: 45,
        width: 350,
        borderRadius: 45,
        backgroundColor: '#1a4482',
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
        fontSize: 18
    }
});