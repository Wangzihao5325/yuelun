import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import StowAndUnfoldBtn from './StowAndUnfoldBtn';
import CustomChart from './CustomChart';
import CustomButton from '../../Components/Component/CustomButton';
import Cover from './Cover';

const BottomPart = (props) => {
    return (
        <View style={{ backgroundColor: '#001B41', display: 'flex' }}>
            <StowAndUnfoldBtn
                onPress={props.stowAndUnfoldBtnPress}
            />
            <CustomChart
                isAccelerate={props.isAccelerate}
            />
            <CustomButton
                title={props.isAccelerate ? '停止加速' : '立即加速'}
                buttonStyle={styles.speedupButton}
                titleStyle={{ color: '#000' }}
                clickEvent={props.speedUpBtnPress}
            />
        </View>
    )
}

const StowPage = (props) => {
    return (
        <>
            <Cover
                name={props.name}
                icon={props.icon}
                isAccelerate={props.isAccelerate}
            />
            <BottomPart
                stowAndUnfoldBtnPress={props.pageTypeChange}
                speedUpBtnPress={props.speedUp}
                isAccelerate={props.isAccelerate}
            />
        </>
    );
}

export default StowPage;

const styles = StyleSheet.create({
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
    },
});