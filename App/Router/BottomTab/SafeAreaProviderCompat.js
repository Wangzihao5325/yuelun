//此文件是从@react-navigation/bottom-tabs中copy出来，自定义tabbar使用
//源文件路径 @react-navigation/bottom-tabs/src/views/SafeAreaProviderCompat.tsx
import * as React from 'react';
import {
    SafeAreaProvider,
    SafeAreaConsumer,
    initialWindowSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
    getStatusBarHeight,
    getBottomSpace,
} from 'react-native-iphone-x-helper';

// The provider component for safe area initializes asynchornously
// Until the insets are available, there'll be blank screen
// To avoid the blank screen, we specify some initial values
const initialSafeAreaInsets = {
    // Approximate values which are good enough for most cases
    top: getStatusBarHeight(true),
    bottom: getBottomSpace(),
    right: 0,
    left: 0,
    // If we are on a newer version of the library, we can get the correct window insets
    // The component might not be filling the window, but this is good enough for most cases
    ...initialWindowSafeAreaInsets,
};

export default function SafeAreaProviderCompat(props) {
    return (
        <SafeAreaConsumer>
            {(insets) => {
                if (insets) {
                    // If we already have insets, don't wrap the stack in another safe area provider
                    // This avoids an issue with updates at the cost of potentially incorrect values
                    // https://github.com/react-navigation/react-navigation/issues/174
                    return props.children;
                }

                return (
                    <SafeAreaProvider initialSafeAreaInsets={initialSafeAreaInsets}>
                        {props.children}
                    </SafeAreaProvider>
                );
            }}
        </SafeAreaConsumer>
    );
}
