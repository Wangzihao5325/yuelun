import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import StowAndUnfoldBtn from './StowAndUnfoldBtn';
import CustomChart from './CustomChart';
import InfoBlock from './InfoBlock';
import CustomButton from '../../Components/Component/CustomButton';
import Cover from './Cover';

const BottomPart = (props) => {
    return (
        <View style={{ backgroundColor: '#001B41', display: 'flex' }}>
            {/* <StowAndUnfoldBtn
                onPress={props.stowAndUnfoldBtnPress}
            /> */}
            {Boolean(props.gameId) && props.accelerateInfo && Object.values(props.accelerateInfo).length > 0 &&
                <InfoBlock
                    gameId={props.gameId}
                    accelerateInfo={props.accelerateInfo}
                    isAccelerate={props.isAccelerate}
                />
            }
            {/* <CustomChart
                isAccelerate={props.isAccelerate}
            /> */}
            <View style={{ display: 'flex', flexDirection: 'row', width: 320, alignSelf: 'center', justifyContent: 'space-around' }}>
                <CustomButton
                    title={props.isAccelerate ? '停止加速' : '立即加速'}
                    buttonStyle={styles.speedupButton}
                    titleStyle={{ color: '#000' }}
                    clickEvent={props.speedUpBtnPress}
                />
                <CustomButton
                    title={'启动游戏'}
                    buttonStyle={styles.speedupButton}
                    titleStyle={{ color: '#000' }}
                    clickEvent={props.runGame}
                />
            </View>
        </View>
    )
}

const StowPage = (props) => {
    return (
        <>
            <Cover
                showModal={props.showModal}
                modelTitle={props.modelTitle}
                name={props.name}
                icon={props.icon}
                isAccelerate={props.isAccelerate}
                navigation={props.navigation}
            />
            <BottomPart
                stowAndUnfoldBtnPress={props.pageTypeChange}
                speedUpBtnPress={props.speedUp}
                runGame={props.runGame}
                isAccelerate={props.isAccelerate}
                gameId={props.gameId}
                accelerateInfo={props.accelerateInfo}
            />
        </>
    );
}

export default StowPage;

const styles = StyleSheet.create({
    speedupButton: {
        display: 'flex',
        height: 45,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2cc2e',
        borderRadius: 45,
        alignSelf: 'center',
        marginTop: 27.5,
        marginBottom: 17.5
    },
});