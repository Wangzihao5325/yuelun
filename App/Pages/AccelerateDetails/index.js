import React, { Component } from 'react';
import { View, ImageBackground, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor, SCREEN_WIDTH, fontSize } from '../../Config/UIConfig';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import { LineChart } from "react-native-chart-kit";

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days"] // optional
};

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const Cover = (props) => {
    return (
        <ImageBackground
            style={{ flex: 1.3 }}
            source={{ uri: props.icon }}
            resizeMode='cover'
        >
            <View style={styles.coverMask}>
                <View>
                    <Text style={styles.coverTips}>进入专属加速通道...</Text>
                    <View style={styles.outerCircle}>
                        <View style={styles.middleCircle}>
                            <Image
                                style={styles.imageCircle}
                                source={{ uri: props.icon }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const BottomChart = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#001B41', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LineChart
                data={data}
                width={300}
                height={256}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
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
            headerTransparent: true
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
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
                <Cover icon={this.state.icon} />
                <BottomChart />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    coverMask: {
        flex: 1,
        backgroundColor: 'rgba(1,20,44,0.95)',
        justifyContent: 'center',
    },
    coverTips: {
        alignSelf: 'center',
        color: '#8FADD7',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Medium'
    },
    outerCircle: {
        height: 241,
        width: 241,
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
        height: 223,
        width: 223,
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
    }
});