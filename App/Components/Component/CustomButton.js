/**
 * custome button component
 * 
 * Creat by charlie
 * 
*/
import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight
} from 'react-native';
import { interceptTime } from '../../Config/SystemConfig';
import * as TimerManager from '../../Functions/Time/TimeManager';
import * as LogManager from '../../Functions/LogManager/LogManager';

let clickTime;  //Save click time to prevent duplicate clicks

export default class CustomButton extends Component {
    constructor(props) {
        super(props);
        clickTime = this.returnTheCurrentTime();

        this.state = {
            clickType: this.props.clickType ? this.props.clickType : this.props.title
        };
    }

    render() {
        const { buttonStyle, title, titleStyle, underlayColor } = this.props;
        return (
            <TouchableHighlight
                style={buttonStyle}
                onPress={this.buttonClickEvent}
                underlayColor={underlayColor}
            >
                <Text style={titleStyle}>{`${title}`}</Text>
            </TouchableHighlight>
        );
    }

    buttonClickEvent = () => {
        let currentTime = this.returnTheCurrentTime();
        let differenceValue = currentTime - clickTime;

        clickTime = currentTime;
        if (differenceValue < interceptTime) {
            console.log('重复点击拦截');
            return;
        }

        if (this.props.clickEvent) {
            this.props.clickEvent();
        }
        // console.log('点击触发'+this.state.clickType+'类型的点击'+'点击时间差为'+differenceValue);
        LogManager.recordTheClickEvent(this.props.title);
    }

    returnTheCurrentTime = () => {
        let time = TimerManager.getTheCurrentTime();
        return time;
    }
}