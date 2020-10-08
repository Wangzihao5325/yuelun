import React, { useState, useEffect } from 'react';
import {
    ImageBackground,
    View,
    Text,
    Image,
    Animated,
    StyleSheet,
} from 'react-native';
import HcdWaveView from './Wave'

const Cover = (props) => {
    const [circleOne, setCircleOne] = useState(new Animated.ValueXY({ x: 120 - 4, y: 0 - 4 }));
    useEffect(() => {
        Animated.timing(circleOne, {
            toValue: { x: 0, y: 0 },
            duration: 10000
        }).start()
    }, [])
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
                            {/* <View>
                                <HcdWaveView
                                    radius={193}
                                />
                            </View> */}
                        </View>
                        <Animated.Image
                            style={{ position: 'absolute', bottom: circleOne.x, left: circleOne.y }}
                            source={require('../../resource/Image/AccelerateDetails/yellow_circle.png')}
                        />
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