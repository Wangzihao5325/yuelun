import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import StowAndUnfoldBtn from './StowAndUnfoldBtn';
import CustomChart from './CustomChart';

const chartConfig = {
    backgroundGradientFrom: "#00132C",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#00132C",
    fillShadowGradient: '#00132C',
    fillShadowGradientOpacity: 0,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(143, 173, 215, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const InternetStateItem = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.internetStateTitle, { fontSize: 12 }]}>{`${props.title}`}</Text>
            <Text style={[styles.internetStateTitle, { fontSize: 12, color: 'white', marginTop: 8 }]}>{`${props.content}`}</Text>
        </View>
    );
}

const InternetState = () => {
    const [netType, setNetType] = useState('');
    useEffect(() => {
        NetInfo.fetch().then(state => {//state.type state.isConnected
            setNetType(state.type.toUpperCase());
        });
    });
    return (
        <View>
            <Text style={[styles.internetStateTitle, { marginTop: 14 }]}>网络详情</Text>
            <View style={styles.internetStateContent}>
                <InternetStateItem
                    title='正在使用'
                    content={netType}
                />
                <InternetStateItem
                    title='加速后网络状态'
                    content='极好'
                />
                <InternetStateItem
                    title='双通道极加速'
                    content='已开启'
                />
            </View>
        </View>
    );
}

const UnfoldPage = (props) => {
    return (
        <View style={styles.unfoldPage}>
            <StowAndUnfoldBtn
                isRotate
                onPress={props.pageTypeChange}
            />
            <View style={{ flex: 1, alignItems: 'center' }}>
                <InternetState />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#91ADD7', marginTop: 24 }}>- <Text style={styles.chartTitle}>延迟曲线</Text> -</Text>
                    <CustomChart
                        width={Dimensions.get("window").width - 20}
                        height={150}
                        segments={3}
                        chartConfig={chartConfig}
                    />
                </View>
                <View>
                    <Text style={{ color: '#91ADD7', marginTop: 24, alignSelf: 'center', marginBottom: 20 }}>- <Text style={styles.chartTitle}>诊断与优化</Text> -</Text>
                    <View style={{ width: 300 }}>
                        <Text style={styles.tips}>加速效果极好</Text>
                        <Text style={styles.tips}>月轮专用加速器通道已连接，提速11%</Text>
                        <Text style={styles.tips}>双通道加速已开启，提速7%</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default UnfoldPage;

const styles = StyleSheet.create({
    unfoldPage: {
        flex: 1,
        backgroundColor: '#00132C',
        alignItems: 'center'
    },
    internetStateTitle: {
        fontSize: 15,
        color: '#666',
        fontFamily: 'PingFang-SC-Medium',
        alignSelf: 'center'
    },
    internetStateContent: {
        width: 322.5,
        height: 62,
        borderRadius: 5,
        backgroundColor: '#071B34',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 18,
        alignSelf: 'center'
    },
    chartTitle: {
        color: '#666',
        fontSize: 13,
        fontFamily: 'PingFang-SC-Medium'
    },
    tips: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'PingFang-SC-Medium'
    }
});