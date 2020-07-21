import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import { LineChart } from "react-native-chart-kit";

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

const CustomChart = (props) => {
    const { width = Dimensions.get("window").width - 50, height = 100, segments = 2 } = props;
    return (
        <>
            <LineChart
                data={data}
                width={width}
                height={height}
                segments={segments}
                withVerticalLines={false}
                chartConfig={{ ...chartConfig, ...props.chartConfig }}
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