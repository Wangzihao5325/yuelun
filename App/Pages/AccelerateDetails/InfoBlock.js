import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store';
import { acc_type_change } from '../../store/actions/accelerateAction';
import VpnStateUtil from '../../Functions/Util/vpnStateUtil'
import * as Api from '../../Functions/NativeBridge/ApiModule';
import * as NavigationService from '../../Router/NavigationService';

class InfoBlock extends Component {
    state = {
        delay: '0ms'
    }

    componentDidMount() {
        //let onlineState = await VpnStateUtil(this.props.accelerateInfo, this.props.id)
        this.timer = setInterval(() => {
            Api.getDelay().then(res => {
                this.setState({
                    delay: `${res}ms`
                })
            })
        }, 1000)
    }

    componentWillUnmount() {
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
                        <Text style={styles.contentText}>时间</Text>
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
        color: '#fff'
    },
    contentText: {
        color: '#fff'
    },
    image: {
        height: 14,
        width: 14
    }
})