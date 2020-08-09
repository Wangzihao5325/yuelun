import React, { Component } from 'react';
import { } from 'react-native';
import { WebView } from 'react-native-webview';

export default class NoticeWeb extends Component {
    state = {
        url: ''
    }
    componentDidMount() {
        const { url } = this.props.route.params;
        this.setState({ url });
    }
    render() {
        const { url } = this.state;
        return url ? <WebView source={{ uri: url }} /> : null;
    }
}