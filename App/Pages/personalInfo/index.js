import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { themeColor, SCREEN_WIDTH } from '../../Config/UIConfig';

import { SafeAreaView } from 'react-native-safe-area-context';
import buttonWrapper from '../../Components/Component/HOCButtonWrapper';
import Icon from 'react-native-vector-icons/FontAwesome';

const InfoItem = (props) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{`${props.title}`}</Text>
            <View style={{ flexDirection: 'row' }}>
                {
                    Boolean(props.content) &&
                    <Text style={styles.content}>{`${props.content}`}</Text>
                }
                {
                    Boolean(props.imageSource) &&
                    <Image style={styles.avater} source={props.imageSource} />
                }
                <View style={{ marginLeft: 10 }}>
                    <Icon name='arrow-right' size={20} color="#666" />
                </View>
            </View>
        </View>
    );
}

const ItemWrapper = buttonWrapper(InfoItem);

export default class PersonalInfo extends Component {
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                <ItemWrapper
                    title='头像'
                    imageSource={{ uri: 'https://avatars1.githubusercontent.com/u/20266841?s=60&v=4' }}
                    clickEvent={this.changeAvater}
                />
                <ItemWrapper
                    title='昵称'
                    content='131231231'
                    clickEvent={this.changeNickName}
                />
                <ItemWrapper
                    title='手机号'
                    content='18210841112'
                    clickEvent={this.changePhone}
                />
            </SafeAreaView>
        );
    }

    changeAvater = () => {
        console.log('更换头像');
    }

    changeNickName = () => {
        console.log('更换昵称');
    }

    changePhone = () => {
        console.log('更换手机');
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 50,
        width: SCREEN_WIDTH,
        borderBottomWidth: 1,
        borderBottomColor: '#011a3a',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 17,
        color: 'white'
    },
    content: {
        fontSize: 17,
        color: 'white'
    },
    avater: {
        height: 35,
        width: 35,
        borderRadius: 17
    }
});