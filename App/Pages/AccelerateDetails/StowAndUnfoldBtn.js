import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

const StowAndUnfoldBtn = (props) => {
    return (
        <TouchableOpacity
            style={styles.stowAndUnfoldBtn}
            onPress={props.onPress}
        >
            <Image
                style={{ height: 12, width: 6, transform: [{ rotate: props.isRotate ? '180deg' : '0deg' }] }}
                source={require('../../resource/Image/AccelerateDetails/more_details.png')}
            />
        </TouchableOpacity>
    );
}

export default StowAndUnfoldBtn;

const styles = StyleSheet.create({
    stowAndUnfoldBtn: {
        alignSelf: 'center',
        marginTop: 6,
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});