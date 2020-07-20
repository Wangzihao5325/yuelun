import React, { Component, useState } from 'react';
import { Animated, View, ImageBackground, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor, SCREEN_WIDTH, fontSize } from '../../Config/UIConfig';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import { LineChart } from "react-native-chart-kit";
import CustomButton from '../../Components/Component/CustomButton';

const data = {
    datasets: [
        {
            data: [20, 79, 99, 70, 50],
            color: (opacity = 1) => `rgba(213, 202, 21, 1)`, // optional
            strokeWidth: 2 // optional
        },
        {
            data: [40, 54, 22, 45, 25],
            color: (opacity = 1) => `rgba(20, 215, 210, 1)`, // optional
            strokeWidth: 2 // optional
        }
    ],
};

const chartConfig = {
    backgroundGradientFrom: "#001B41",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#001B41",
    fillShadowGradient: '#001B41',
    fillShadowGradientOpacity: 0,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(143, 173, 215, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const Cover = (props) => {
    const [circleOne, setCircleOne] = useState(new Animated.ValueXY(0, 0));
    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={{ uri: props.icon }}
            resizeMode='cover'
        >
            <View style={styles.coverMask}>
                <Text style={styles.coverTips}>进入专属加速通道...</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.outerCircle}>
                        <View style={styles.middleCircle}>
                            <Image
                                style={styles.imageCircle}
                                source={{ uri: props.icon }}
                            />
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

const SpeedItem = (props) => {
    return (
        <View style={styles.speedItemContainer}>
            <View style={styles.speedItemHeader}>
                <Text style={styles.speedItemHeaderTitle}>{`${props.title}`}</Text>
                <View style={{ height: 1.5, width: 26, backgroundColor: props.color }} />
            </View>
            <Text style={styles.speedItemContent}>{73}<Text style={styles.speedItemContent2}>ms</Text></Text>
        </View>
    );
}

const BottomChart = (props) => {
    return (
        <View style={{ backgroundColor: '#001B41', display: 'flex' }}>
            <TouchableOpacity
                style={styles.bottomChartTopBtn}
            >
                <Image
                    style={{ height: 12, width: 6 }}
                    source={require('../../resource/Image/AccelerateDetails/more_details.png')}
                />
            </TouchableOpacity>
            <LineChart
                data={data}
                width={Dimensions.get("window").width - 50}
                height={100}
                segments={2}
                withVerticalLines={false}
                chartConfig={chartConfig}
                formatYLabel={value => `${parseInt(value)}ms`}
                withDots={false}
                bezier
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
                <SpeedItem
                    title='加速前延迟'
                    color='#CEC836'
                />
                <View style={{ height: 37, width: 0.5, backgroundColor: '#90A9D3' }} />
                <SpeedItem
                    title='加速后延迟'
                    color='#14D7D2'
                />
            </View>
            <CustomButton
                title='停止加速'
                buttonStyle={styles.speedupButton}
                titleStyle={{ color: '#000' }}
                clickEvent={props.callback}
            />
        </View>
    )
}

export default class AccelerateDetails extends Component {
    state = {
        icon: 'http://static.yuelun.com/game/game.png',
    }

    componentDidMount() {
        const { data } = this.props.route.params;
        let gameInfo = JSON.parse(data);
        /** gameInfo
            icon: "http://static.yuelun.com/game/game.png"
            id: "4"
            name: "王者荣耀"
         */
        this.props.navigation.setOptions({
            title: gameInfo.name,
            //headerTransparent: true
        });

        Api.getGameInfoById(gameInfo.id, '').then((request) => {
            /*
            game_info: {
                domain_black_list: ""
                domain_white_list: "[]"
                down_limit: "300"
                icon: "http://static.yuelun.com/game/game.png"
                id: "4"
                ip_list: "[]"
                name: "王者荣耀"
                process_list: "["com.tencent.tmgp.sgame"]"
                region: "王者荣耀-国服"
                system: "android"
                type_name: "国服"
                up_limit: "300"
                use_server_id: "[]"
            }
            timestamp: 1595213291
            */
            this.setState({
                ...request.game_info
            });
        })
    }
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                <Cover icon={this.state.icon} />
                <BottomChart
                    callback={() => { console.log('dddd'); }}
                />
            </SafeAreaView>
        );
    }
}

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
        alignItems: 'center'
    },
    imageCircle: {
        height: 193,
        width: 193,
        borderRadius: 96,
    },
    bottomChartTopBtn: {
        alignSelf: 'center',
        marginTop: 6,
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    speedItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    speedItemHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    speedItemHeaderTitle: {
        color: '#8FADD7',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Regular',
        marginRight: 4
    },
    speedItemContent: {
        marginTop: 13,
        fontSize: 15,
        color: '#fff',
        fontFamily: 'PingFang-SC-Regular',
        fontWeight: 'bold'
    },
    speedItemContent2: {
        color: '#8FADD7',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Regular',
    },
    speedupButton: {
        display: 'flex',
        height: 45,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2cc2e',
        borderRadius: 45,
        alignSelf: 'center',
        marginTop: 27.5,
        marginBottom: 17.5
    }
});