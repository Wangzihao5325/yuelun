//此文件是从@react-navigation/bottom-tabs中copy出来，处理切换tab切换时render次数过多的问题
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { Screen, screensEnabled } from 'react-native-screens';

const FAR_FAR_AWAY = 30000; // this should be big enough to move the whole view out of its container

export default class ResourceSavingScene extends React.Component {
    render() {
        // react-native-screens is buggy on web
        if (screensEnabled?.() && Platform.OS !== 'web') {
            const { isVisible, ...rest } = this.props;

            //// @ts-expect-error: stackPresentation is incorrectly marked as required
            return <Screen active={isVisible ? 1 : 0} {...rest} />;
        }

        const { isVisible, children, style, ...rest } = this.props;

        return (
            <View
                style={[
                    styles.container,
                    Platform.OS === 'web'
                        ? { display: isVisible ? 'flex' : 'none' }
                        : null,
                    style,
                ]}
                collapsable={false}
                removeClippedSubviews={
                    // On iOS, set removeClippedSubviews to true only when not focused
                    // This is an workaround for a bug where the clipped view never re-appears
                    Platform.OS === 'ios' ? !isVisible : true
                }
                pointerEvents={isVisible ? 'auto' : 'none'}
                {...rest}
            >
                <View style={isVisible ? styles.attached : styles.detached}>
                    {children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    attached: {
        flex: 1,
    },
    detached: {
        flex: 1,
        top: FAR_FAR_AWAY,
    },
});
