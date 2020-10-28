import React from 'react';
import {
    ImageBackground,
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
//import HcdWaveView from './Wave'

const Cover = (props) => {
    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={{ uri: props.icon }}
            resizeMode='cover'
        >
            <View style={styles.coverMask}>
                <Text style={styles.coverTips}>{props.isAccelerate ? '正使用专属加速通道...' : '专属通道未开启'}</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.outerCircle}>
                        <View style={styles.middleCircle}>
                            <Image
                                style={styles.imageCircle}
                                source={{ uri: props.icon }}
                            />
                            {
                                /*水波动画不开放
                                isShowImage &&
                                    <View style={{ width: 193, height: 193, borderRadius: 96.5, overflow: "hidden", position: 'relative' }}>
                                        <HcdWaveView
                                            navigation={props.navigation}
                                            radius={193}
                                        />
                                        <View style={{ position: 'absolute', top: 50, left: 0, right: 0, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 30, color: '#14D7D2' }} >{`${0} MB`}</Text>
                                        </View>
                                    </View>
                                */
                            }
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

export default Cover;

const styles = StyleSheet.create({
    coverMask: {
        flex: 1,
        backgroundColor: 'rgba(1,20,44,0.95)',
    },
    coverTips: {
        alignSelf: 'center',
        color: '#8FADD7',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Medium'
    },
    outerCircle: {
        height: 240,
        width: 240,
        borderRadius: 120,
        borderWidth: 1,
        borderColor: '#14D7D2',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        marginTop: 15.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    middleCircle: {
        height: 222,
        width: 222,
        borderRadius: 111,
        borderWidth: 1,
        borderColor: '#637583',
        backgroundColor: '#223047',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageCircle: {
        height: 193,
        width: 193,
        borderRadius: 96,
    },
});