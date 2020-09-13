import React, { Component } from 'react';
import { } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import { connect } from 'react-redux'

class NoticeWeb extends Component {
    state = {
        url: '',
        type: 'none'
    }

    componentDidMount() {
        const { url, type = 'none' } = this.props.route.params;
        this.setState({ url, type });
    }

    messageFromWeb = (event) => {
        console.log('in message From Web');
        const { type } = this.state;
        if (type !== 'center') return;
        let data = JSON.parse(event.nativeEvent.data);
        switch (data.key) {
            case 'getUserInfo':
                this.sendUserInfoToWeb();
                break;
            case 'getPackageList':
                this.sendPackageListToWeb();
                break;
            case 'makeOrder':
                this.makeOrder(data.data);
                break;
            default:
                break;
        }
    }

    sendUserInfoToWeb = () => {
        let payloadStr = JSON.stringify({ userName: this.props.name, phone: this.props.mobile });
        const successCallback = `window._unsafe_user_setState(${payloadStr})`;
        this.webView.injectJavaScript(successCallback);
    }

    sendPackageListToWeb = () => {
        Api.getPacektList().then((res) => {
            if (res.data) {
                let payloadStr = JSON.stringify(res.data);
                const successCallback = `window._unsafe_setState(${payloadStr})`;
                this.webView.injectJavaScript(successCallback);
            }
        });
    }

    makeOrder = (selectData) => {

        let price = selectData.price.split('.')[0];
        console.log('type', "1");
        console.log('package_id', selectData.package_id);
        console.log('id', selectData.id);
        console.log('strpayment_fee', price);
        console.log('strtotal_fee', price);
        console.log('strpayment_platform', "2");

        Api.createOrder("1", selectData.package_id, selectData.id, price, price, "2")
            .then((res) => {
                console.log('---this is order----');
                console.log(res);
            })
    }

    render() {
        const { url } = this.state;
        return url ?
            <WebView
                source={{ uri: url }}
                ref={webView => this.webView = webView}
                onMessage={this.messageFromWeb}
            />
            : null;
    }
}

const mapStateToProps = (state) => ({
    name: state.user.username,
    mobile: state.user.mobile,
})

export default connect(mapStateToProps)(NoticeWeb);