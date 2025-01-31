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

//let clickTime;  //Save click time to prevent duplicate clicks

export default class CustomButton extends Component {
    constructor(props) {
        super(props);
        this.clickTime = this.returnTheCurrentTime();

        this.state = {
            clickType: this.props.clickType ? this.props.clickType : this.props.title,
            title: `${this.props.title}`
        };
    }

    render() {
        const { buttonStyle, titleStyle, underlayColor, isActive = true, codeMode = false } = this.props;
        return (
            <TouchableHighlight
                style={buttonStyle}
                onPress={this.buttonClickEvent}
                underlayColor={underlayColor}
            >
                <Text style={titleStyle}>{`${this.props.title}`}</Text>
            </TouchableHighlight>
        );
    }

    buttonClickEvent = () => {
        let currentTime = this.returnTheCurrentTime();
        let differenceValue = currentTime - this.clickTime;

        this.clickTime = currentTime;
        if (differenceValue < interceptTime) {
            return;
        }

        if (this.props.clickEvent) {
            this.props.clickEvent();
        }
        LogManager.recordTheClickEvent(this.props.title);
    }

    returnTheCurrentTime = () => {
        let time = TimerManager.getTheCurrentTime();
        return time;
    }
}