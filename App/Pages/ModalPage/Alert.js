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
        const { title = '', content = '', imageContent = null, bottomObjs = null } = this.props.route.params;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.alertContainer}>
                    {
                        Boolean(title) &&
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{`${title}`}</Text>
                        </View>
                    }
                    {
                        Boolean(imageContent) &&
                        <Image
                            source={imageContent.source}
                            style={[styles.defaultImageContainer, imageContent.style]}
                        />
                    }
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
                                if (item.type == 'button') {
                                    return (
                                        <CustomButton
                                            key={item.key}
                                            title={item.title}
                                            buttonStyle={styles.btnItems}
                                            titleStyle={styles.btnTitle}
                                            clickEvent={() => this.bottomBtnItemClick(item.callback)}
                                            underlayColor='white'
                                        />
                                    );
                                } else {
                                    return (
                                        <View key={item.key} style={styles.separator} />
                                    );
                                }
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertContainer: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    titleContainer: {
        display: 'flex',
        height: 50,
        width: SCREEN_WIDTH - 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#c9cacb'
    },
    title: {
        alignSelf: 'center',
        color: 'rgb(34,34,34)',
        fontSize: 20
    },
    defaultImageContainer: {
        alignSelf: 'center',
        height: 130,
        width: 280
    },
    contentContainer: {
        display: 'flex',
        width: SCREEN_WIDTH - 60,
        height: 90,
        paddingHorizontal: 15,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#c9cacb'
    },
    content: {
        alignSelf: 'center',
        color: 'rgb(34,34,34)',
        fontSize: 16,
        lineHeight: 20
    },
    bottomBtnsContainer: {
        display: 'flex',
        height: 50,
        width: SCREEN_WIDTH - 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTitle: {
        fontSize: 16,
        color: '#1b82fb'
    },
    separator: {
        height: 50,
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#c9cacb'
    }
});