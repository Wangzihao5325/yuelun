import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight, AppState } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store';
import { acc_type_change } from '../../store/actions/accelerateAction';
import VpnStateUtil from '../../Functions/Util/vpnStateUtil'
import * as Api from '../../Functions/NativeBridge/ApiModule';
import * as NavigationService from '../../Router/NavigationService';

class InfoBlock extends Component {
    state = {
        delay: '0ms',
        time: '00:00:00',
    }

    calTime = (startTime) => {
        let date = Date.parse(new Date());
        let gameDate = Date.parse(startTime);
        let alreadyAccelerate = date - gameDate;
        alreadyAccelerate = Math.floor(alreadyAccelerate / 1000);

        let h = Math.floor(alreadyAccelerate / 3600);
        let m = Math.floor((alreadyAccelerate - 3600 * h) / 60);
        let s = alreadyAccelerate - 3600 * h - 60 * m;

        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;

        return `${h}:${m}:${s}`
    }

    _handleAppStateChange = (nextAppState) => {
        if (
            AppState.currentState.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            if (this.props.isAccelerate) {
                if (!this.timer) {
                    this.timer = setInterval(() => {
                        Api.getDelay().then(res => {
                            let time = this.calTime(this.props.accelerateInfo[this.props.gameId]._timeReg)
                            this.setState({
                                delay: `${res}ms`,
                                time
                            })
                        })
                    }, 1000)
                }
            }
        } else if (AppState.currentState === 'active' && nextAppState.match(/inactive|background/)) {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        }
    }

    async componentDidMount() {
        AppState.addEventListener("change", this._handleAppStateChange);
        let { isAppAccele, isTheGameAccele, newLocalData } = await VpnStateUtil(this.props.accelerateInfo, this.props.gameId)
        if (isTheGameAccele) {
            this.timer = setInterval(() => {
                Api.getDelay().then(res => {
                    let time = this.calTime(newLocalData[this.props.gameId]._timeReg)
                    this.setState({
                        delay: `${res}ms`,
                        time
                    })
                })
            }, 1000)

        }

    }

    componentDidUpdate() {
        if (this.props.isAccelerate) {
            if (!this.timer) {
                this.timer = setInterval(() => {
                    Api.getDelay().then(res => {
                        let time = this.calTime(this.props.accelerateInfo[this.props.gameId]._timeReg)
                        this.setState({
                            delay: `${res}ms`,
                            time
                        })
                    })
                }, 1000)
            }
        } else {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        }
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }
    }

    accelerateTypeChange = () => {
        Api.getTunnelState().then(res => {
            if (res.bacc) {
                NavigationService.alert({
                    title: '提示',
                    content: '正在加速中，请先暂停加速再进行切换',
                    bottomObjs: [
                        {
                            key: 'cancel',
                            type: 'button',
                            title: '确定'
                        }
                    ]
                });
            } else {
                store.dispatch(acc_type_change())
            }
        })
    }

    render() {
        return (
            <View style={{ height: 150, width: 300, display: 'flex', justifyContent: 'space-around', alignSelf: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.itemWrapper}>
                        <TouchableHighlight
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                            onPress={this.accelerateTypeChange}
                        >
                            <>
                                <Text style={styles.titleText}>加速模式</Text>
                                <Image style={styles.image} source={require('../../resource/Image/AccelerateDetails/exchange.png')} />
                            </>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.titleText}>已加速</Text>
                    </View>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.titleText}>延迟</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', position: 'relative', marginTop: -50 }}>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.contentText}>{`${this.props.accType === 'auto' ? '自动模式' : '智能模式'}`}</Text>
                    </View>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.contentText}>{`${this.state.time}`}</Text>
                    </View>
                    <View style={styles.itemWrapper}>
                        <Text style={styles.contentText}>{`${this.state.delay}`}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    accType: state.acc.accelerateType
})

export default connect(mapStateToProps)(InfoBlock)

const styles = StyleSheet.create({
    itemWrapper: {
        width: 100,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    titleText: {
        color: 'rgba(242,204,46,0.9)'
    },
    contentText: {
        color: '#fff'
    },
    image: {
        height: 14,
        width: 14
    }
})