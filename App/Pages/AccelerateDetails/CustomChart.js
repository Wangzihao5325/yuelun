import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    AppState
} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { useFocusEffect } from '@react-navigation/native';
import * as Api from '../../Functions/NativeBridge/ApiModule';

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

const no_data = {
    datasets: [
        {
            data: [0, 0, 0, 0, 0],
            color: (opacity = 1) => `rgba(213, 202, 21, 0)`, // optional
            strokeWidth: 2 // optional
        },
        {
            data: [0, 0, 0, 0, 0],
            color: (opacity = 1) => `rgba(20, 215, 210, 0)`, // optional
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

const SpeedItem = (props) => {
    let speed = props.isAccelerate ? props.flowData : '/ ';

    return (
        <View style={styles.speedItemContainer}>
            <View style={styles.speedItemHeader}>
                <Text style={styles.speedItemHeaderTitle}>{`${props.title}`}</Text>
                <View style={{ height: 1.5, width: 26, backgroundColor: props.color }} />
            </View>
            <Text style={styles.speedItemContent}>{`${speed}`}<Text style={styles.speedItemContent2}></Text></Text>
        </View>
    );
}

const CustomChart = (props) => {
    let timer;
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [flowData, setFlowData] = useState(0)
    const [chartData, setChartData] = useState(data)
    //const [unit, setUnit] = useState([])
    /*
    _spdDataTrans = (spdStr) => {
        let regArr = spdStr.split(' ')
        let spd = parseFloat(regArr[0])
        switch (regArr[1]) {
            case 'KB/s':
                break
            case 'MB/s':
                spd = 1000 * spd
                break
            case 'GB/s':
                spd = 1000000 * spd
                break
        }
        return spd
    }
    */

    _flowDataTrans = (spd) => {
        let uploadData = [...chartData.datasets[0].data];
        let downloadData = [...chartData.datasets[1].data];
        uploadData.push(spd);
        if (uploadData.length > 5) {
            uploadData.shift();
        }
        downloadData.push(spd);
        if (downloadData.length > 5) {
            downloadData.shift();
        }
        const newChartData = { ...chartData };
        newChartData.datasets[0].data = uploadData;
        newChartData.datasets[1].data = downloadData;
        setChartData(newChartData);
    }

    _getFlowTimer = () => {
        if (!timer) {
            timer = setInterval(() => {
                Api.getDelay().then(res => {
                    console.log('res==>', res)
                    setFlowData(res);
                    _flowDataTrans(res)
                })
            }, 2000)
        }
    }

    useFocusEffect(React.useCallback(() => {
        _getFlowTimer();
        return () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }
    }, []))

    const _handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            _getFlowTimer()
        } else if (appState.current === 'active' &&
            nextAppState.match(/inactive|background/)
        ) {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
    };

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        }
    }, [])


    const { width = Dimensions.get("window").width - 50, height = 100, segments = 2 } = props;
    return (
        <>
            <LineChart
                data={chartData}
                width={width}
                height={height}
                segments={segments}
                withVerticalLines={false}
                chartConfig={{ ...chartConfig, ...props.chartConfig }}
                formatYLabel={value => `${parseInt(value)}KB`}
                withDots={false}
                bezier
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
                <SpeedItem
                    isAccelerate={props.isAccelerate}
                    title='上行速度'
                    color='#CEC836'
                    flowData={flowData}
                />
                <View style={{ height: 37, width: 0.5, backgroundColor: '#90A9D3' }} />
                <SpeedItem
                    isAccelerate={props.isAccelerate}
                    title='下行速度'
                    color='#14D7D2'
                    flowData={flowData}
                />
            </View>
        </>
    );
}

export default CustomChart;

const styles = StyleSheet.create({
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
});