import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../Config/UIConfig';
import * as navigator from '../../Router/NavigationService';

import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../Components/Component/CustomButton';
/*
react-navigation 5.x 传递非序列化数据的问题:
https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
*/
export default class Alert extends Component {
    render() {
        const { content = '', bottomObjs = null } = this.props.route.params;
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ alignSelf: 'center' }}>
                    {
                        Boolean(content) &&
                        <View style={styles.contentContainer}>
                            <Text style={styles.content}>{`${content}`}</Text>
                        </View>
                    }
                    <View style={styles.bottomBtnsContainer}>
                        {
                            Boolean(bottomObjs) &&
                            bottomObjs.map((item, index) => {
                                let additionalStyle = (index === (bottomObjs.length - 1)) ? { marginTop: 6, marginBottom: 15 } : null;
                                let textAdditionStyle = (index === (bottomObjs.length - 1)) ? { color: '#999' } : null;
                                return (
                                    <CustomButton
                                        key={item.key}
                                        title={item.title}
                                        buttonStyle={[styles.btnItems, additionalStyle]}
                                        titleStyle={[styles.btnTitle, textAdditionStyle]}
                                        clickEvent={() => this.bottomBtnItemClick(item.callback)}
                                    />
                                );
                            })
                        }
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    bottomBtnItemClick = (callback) => {
        if (callback) {
            callback(this.state, this.props);
        }
        navigator.back(this);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column-reverse',
        alignItems: 'center'
    },
    contentContainer: {
        display: 'flex',
        width: SCREEN_WIDTH - 60,
        paddingHorizontal: 15,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#173a70',
        borderRadius: 5
    },
    content: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        lineHeight: 20
    },
    bottomBtnsContainer: {
        marginTop: 2,
        alignSelf: 'center'
    },
    btnItems: {
        height: 45,
        width: SCREEN_WIDTH - 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#173a70',
        borderRadius: 5
    },
    btnTitle: {
        fontSize: 16,
        color: 'white'
    },
    separator: {
        height: 50,
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#c9cacb'
    }
});