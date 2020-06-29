import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


//containerStyle

const ProgressRate = (props) => {
    let rate = typeof props.value === 'number' ? props.value : 0;
    let extra = 100 - rate;
    let isRateShow = props.value <= 0 ? false : true;
    let isExtraShow = extra <= 0 ? false : true;
    let containerStyle = { ...Styles.container, ...props.containerStyle };
    let progressBorderStyle = { width: containerStyle.width - 30 };
    let tipsContainer = { width: containerStyle.width - 30 };
    return (
        <View style={containerStyle}>
            <View style={[Styles.tipsContainer, tipsContainer]}>
                {isRateShow && <View style={{ flex: rate }} />}
                <View style={Styles.tips}>
                    <Text style={{ color: 'white' }}>{`${props.value}%`}</Text>
                </View>
                {isExtraShow && <View style={{ flex: extra }} />}
            </View>
            <View style={[Styles.progressBorder, progressBorderStyle]}>
                {isRateShow && <View style={{ flex: rate, borderRadius: 10, backgroundColor: '#67dbf9' }} />}
                {isExtraShow && <View style={{ flex: extra, backgroundColor: 'transparent' }} />}
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        height: 60,
        width: 300,
        paddingHorizontal: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    progressBorder: {
        height: 20,
        borderRadius: 10,
        // borderColor: '#282c34',
        // borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#282c34',
        flexDirection: 'row',
        marginTop: 5
    },
    tipsContainer: {
        height: 20,
        flexDirection: 'row'
    },
    tips: {
        height: 20,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 5,
        backgroundColor: '#32363e'
    }
});

export default ProgressRate;