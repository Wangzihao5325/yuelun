import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    NavigationHelpersContext,
    useNavigationBuilder,
    TabRouter,
    TabActions,
} from '@react-navigation/native';
import SafeAreaProviderCompat from './SafeAreaProviderCompat';
import LinearGradient from 'react-native-linear-gradient';


import { BottomTabView } from '@react-navigation/bottom-tabs';


function TabNavigator({
    initialRouteName,
    children,
    screenOptions,
    tabBarStyle,
    contentStyle,
}) {
    const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
        children,
        screenOptions,
        initialRouteName,
    });
    console.log('dddd');
    console.log(state);
    console.log(navigation);
    console.log(descriptors);
    return (
        <NavigationHelpersContext.Provider value={navigation}>
            <SafeAreaProviderCompat>
                <View style={[{ flex: 1 }, contentStyle]}>
                    {descriptors[state.routes[state.index].key].render()}
                </View>

                <View style={tabBarStyle}>
                    <LinearGradient colors={['#021D48', '#00132F']} style={{ flex: 1, flexDirection: 'row' }}>
                        {state.routes.map(route => (
                            <TouchableOpacity
                                key={route.key}
                                onPress={() => {
                                    const event = navigation.emit({
                                        type: 'tabPress',
                                        target: route.key,
                                        canPreventDefault: true,
                                    });

                                    if (!event.defaultPrevented) {
                                        navigation.dispatch({
                                            ...TabActions.jumpTo(route.name),
                                            target: state.key,
                                        });
                                    }
                                }}
                                style={styles.tabTouchable}
                            >
                                {
                                    descriptors[route.key].options.tabBarIcon({ focused: state.routes[state.index].key === route.key })//根据focused状态渲染icon
                                }
                                <Text style={state.routes[state.index].key === route.key ? styles.activeTabText : styles.defaultTabText}>{descriptors[route.key].options.title || route.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </LinearGradient>
                </View>
            </SafeAreaProviderCompat>
        </NavigationHelpersContext.Provider>
    );
}

export default TabNavigator;

const styles = StyleSheet.create({
    tabTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    defaultTabText: {
        color: '#8FADD7',
        marginTop: 7.5
    },
    activeTabText: {
        color: '#CDCE21',
        marginTop: 7.5
    }
});