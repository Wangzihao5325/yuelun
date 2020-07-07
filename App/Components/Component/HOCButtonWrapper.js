import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import { interceptTime } from '../../Config/SystemConfig';
import * as TimerManager from '../../Functions/Time/TimeManager';
import * as LogManager from '../../Functions/LogManager/LogManager';

const buttonWrapper = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this._clickTime = this.returnTheCurrentTime();
        }

        render() {
            const { clickEvent, style, underlayColor, ...others } = this.props;
            return (
                <TouchableHighlight
                    onPress={this.buttonClickEvent}
                >
                    <WrappedComponent {...others} />
                </TouchableHighlight>
            );
        }

        buttonClickEvent = () => {
            let currentTime = this.returnTheCurrentTime();
            let differenceValue = currentTime - this._clickTime;

            this._clickTime = currentTime;
            if (differenceValue < interceptTime) {
                console.log('重复点击拦截');
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
}

export default buttonWrapper;