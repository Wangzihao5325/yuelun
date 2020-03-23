import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import { SCREEN_WIDTH, BannerWidth, BannerHeight } from '../../Config/UIConfig';

export default class CustomeSwiper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    height={BannerHeight}
                    loop={true}
                    index={0}
                    horizontal={true}
                    showsButtons={false}
                    autoplay={true}>
                    {this.renderImage()}
                </Swiper>
            </View>
        );
    };

    renderImage() {
        let imageDataArray = this.props.bannerData;
        let imageSourceArray = this.renderTheImageSource(imageDataArray);
        let imageViewsArray = [];
        for (let i = 0; i < imageSourceArray.length; i++) {
            let untilData = imageDataArray[i];
            let untilSource = imageSourceArray[i];
            imageViewsArray.push(
                this.renderTheImageView(i, untilSource, untilData)
            );
        }

        return imageViewsArray;
    }

    renderTheImageSource(imageDataArray) {
        let imageSource = [];
        for (let i = 0; i < imageDataArray.length; i++) {
            let unitData = imageDataArray[i];
            let source = { uri: unitData.imageUrl };
            imageSource.push(source);
        }

        return imageSource;
    }

    renderTheImageView(key, source, unitData) {
        return (
            <ImageBackground
                key={key}
                style={{ flex: 1, width: BannerWidth, height: BannerHeight }}
                source={source}>
                <TouchableOpacity
                    style={{ width: BannerWidth, height: BannerHeight }}
                    onPress={
                        () => { this.bannerClickFunction(unitData) }
                    }
                />
            </ImageBackground>
        );
    }

    bannerClickFunction = (unitData) => {
        console.log('图片点击事件' + unitData.imageUrl);

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 360 / 750
    },
});