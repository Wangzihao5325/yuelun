import React, { Component } from 'react';
import { View, Dimensions, AppState } from 'react-native';
import {
    Surface,
    Shape,
    Group,
    Path,
    Transform,
    LinearGradient,
} from '@react-native-community/art';
import { navigationRef } from '../../Router/NavigationService';

export default class HcdWaveView extends Component {
    static defaultProps = {
        radius: 230
    }

    constructor(props) {
        super(props);
        this.radius = this.props.radius;
        this.state = {
            a: 1.5,
            b: 0,
            increase: false,
        };
    }

    _timer = () => {
        if (!this.intervalTimer) {
            this.intervalTimer = setInterval(() => {
                var a = this.state.a
                var b = this.state.b
                var increase = this.state.increase
                if (increase) {
                    a += 0.01
                } else {
                    a -= 0.01
                }
                if (a <= 1) {
                    increase = true
                }
                if (a >= 1.5) {
                    increase = false
                }
                b += 0.1
                this.setState({
                    a: a,
                    b: b,
                    increase: increase
                })
            }, 40)
        }
    }

    componentDidMount() {
        AppState.addEventListener("change", this._handleAppStateChange);
        this._timer()
        this._focus_unsubscribe = this.props.navigation.addListener('focus', () => {
            this._timer()
        });
        this._blur_unsubscribe = this.props.navigation.addListener('blur', () => {
            this.intervalTimer && clearInterval(this.intervalTimer)
            this.intervalTimer = null
        });
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
        if (this._focus_unsubscribe) {
            this._focus_unsubscribe()
        }
        if (this._blur_unsubscribe) {
            this._blur_unsubscribe()
        }
        this.intervalTimer && clearInterval(this.intervalTimer)
        this.intervalTimer = null
    }

    _handleAppStateChange = (nextAppState) => {
        if (
            nextAppState === "active"
        ) {
            this._timer()
            //App has come to the foreground
            //console.log("App has come to the foreground!");
        } else if (nextAppState.match(/inactive|background/)) {
            this.intervalTimer && clearInterval(this.intervalTimer)
            this.intervalTimer = null
        }
    };

    //绘制渐变的背景
    artBg() {
        const r = this.props.radius
        const pathBase = new Path()
            .moveTo(r / 2, 0) // 改变起点为 0,5 。默认为0,0
            .arc(0, r, r / 2) // 目标点
            .arc(0, -r, r / 2) // 目标点
            .close();
        let colors = ["#3E628F", "#061834",];
        let linearGradient = new LinearGradient(colors, 0, 0, 90, 280);

        return <View style={{ backgroundColor: 'transparent' }}>
            <Surface width={this.radius} height={this.radius} >
                <Shape d={pathBase} fill={linearGradient} />
                {this.wave(r / 4 * 3, 'rgba(20,181,178,0.67)')}
                {this.wave1('rgba(20,174,104,0.61)')}
                {this.wave2('rgba(0,183,239,0.61)')}
            </Surface>
        </View>
    }

    // 正弦曲线公式： y = A sin(Bx + C) + D

    // A 控制振幅，A 值越大，波峰和波谷越大，A 值越小，波峰和波谷越小；
    // B 值会影响周期，B 值越大，那么周期越短，B 值越小，周期越长。
    // C 值会影响图像左右移动，C 值为正数，图像右移，C 值为负数，图像左移。
    // D 值控制上下移动。

    //绘制波浪
    wave(startY, fl) {
        const a = this.state.a
        const b = this.state.b
        const r = this.props.radius
        const pathBase = new Path()
        pathBase.moveTo(0, startY) // 改变起点为 0,5 。默认为0,0
        for (var i = 0; i <= r / 68; i += 0.1) {
            var x = i * 70;
            var y = a * Math.cos(i + b) * 10 + startY;
            pathBase.lineTo(x, y);
        }
        pathBase.lineTo(r, r) // 目标点
        pathBase.lineTo(0, r);
        pathBase.close();
        return <Shape d={pathBase} fill={fl} />
    }

    wave1(fl) {
        const a = this.state.a
        const b = this.state.b
        const r = this.props.radius
        const pathBase = new Path()
        pathBase.moveTo(0, 180) // 改变起点为 0,5 。默认为0,0
        for (var i = 0; i <= r / 68; i += 0.1) {
            var x = i * 70;
            var y = a * Math.sin(i + b) * 10 + 175;
            pathBase.lineTo(x, y);
        }
        pathBase.lineTo(r, r) // 目标点
        pathBase.lineTo(0, r);
        pathBase.close();
        return <Shape d={pathBase} fill={fl} />
    }
    wave2(fl) {
        const a = this.state.a
        const b = this.state.b
        const r = this.props.radius
        const pathBase = new Path()
        pathBase.moveTo(0, 175) // 改变起点为 0,5 。默认为0,0
        for (var i = 0; i <= r / 98; i += 0.1) {
            var x = i * 100;
            var y = a * Math.sin(i + b) * 10 + 175;
            pathBase.lineTo(x, y);
        }
        pathBase.lineTo(r, r) // 目标点
        pathBase.lineTo(0, r);
        pathBase.close();
        return <Shape d={pathBase} fill={fl} />
    }

    render() {
        return (
            <View style={{ width: this.props.radius, height: this.props.radius, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.0)' }}>
                {this.artBg()}
            </View>
        )
    }
}