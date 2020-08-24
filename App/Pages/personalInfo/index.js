import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { themeColor, SCREEN_WIDTH } from '../../Config/UIConfig';
import { connect } from 'react-redux';
import * as navigator from '../../Router/NavigationService';
import PageName from '../../Config/PageName';

import { SafeAreaView } from 'react-native-safe-area-context';
import buttonWrapper from '../../Components/Component/HOCButtonWrapper';
import Icon from 'react-native-vector-icons/FontAwesome';

const InfoItem = (props) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{`${props.title}`}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    Boolean(props.content) &&
                    <Text style={styles.content}>{`${props.content}`}</Text>
                }
                {
                    Boolean(props.imageSource) &&
                    <Image style={styles.avater} source={props.imageSource} />
                }
                <View style={{ marginLeft: 15 }}>
                <Image source={require('../../resource/Image/GameHomePage/more.png')}
                        style={styles.setIcon} />
                </View>
            </View>
        </View>
    );
}

const ItemWrapper = buttonWrapper(InfoItem);

class PersonalInfo extends Component {
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                <ItemWrapper
                    title='头像'
                    imageSource={require('../../resource/Image/Normal/avater.png')}
                    clickEvent={this.changeAvater}
                />
                <ItemWrapper
                    title='昵称'
                    content={this.props.username}
                    clickEvent={this.changeNickName}
                />
                <ItemWrapper
                    title='手机号'
                    content={this.props.mobile}
                    clickEvent={this.changePhone}
                />
            </SafeAreaView>
        );
    }

    changeAvater = () => {
        console.log('更换头像');
    }

    changeNickName = () => {
        navigator.jump(this, PageName.NORMAL_CHANGE_NICK_NAME)
    }

    changePhone = () => {
        navigator.jump(this, PageName.NORMAL_CHANGE_PHONE_NUM)
    }
}

const mapStateToProps = (state) => ({
    username: state.user.username,
    mobile: state.user.mobile
})

export default connect(mapStateToProps)(PersonalInfo);

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
    },
    setIcon: {
        width: 7,
        height: 12,
        marginRight: 10
    }
});