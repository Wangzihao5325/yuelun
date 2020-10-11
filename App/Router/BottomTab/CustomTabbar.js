import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    NavigationHelpersContext,
    useNavigationBuilder,
    TabRouter,
    TabActions,
    useTheme,
} from '@react-navigation/native';
import SafeAreaProviderCompat from './SafeAreaProviderCompat';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenContainer } from 'react-native-screens';
import ResourceSavingScene from './ResourceSavingScene';

function SceneContent({
    isFocused,
    children,
}) {
    const { colors } = useTheme();

    return (
        <View
            accessibilityElementsHidden={!isFocused}
            importantForAccessibility={isFocused ? 'auto' : 'no-hide-descendants'}
            style={[styles.sceneContent, { backgroundColor: colors.background }]}
        >
            {children}
        </View>
    );
}


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
    const { routes } = state;
    return (
        <NavigationHelpersContext.Provider value={navigation}>
            <SafeAreaProviderCompat>
                <View style={styles.container}>
                    <ScreenContainer style={styles.pages}>
                        {routes.map((route, index) => {
                            const descriptor = descriptors[route.key];
                            const { unmountOnBlur } = descriptor.options;
                            const isFocused = state.index === index;

                            if (unmountOnBlur && !isFocused) {
                                return null;
                            }

                            return (
                                <ResourceSavingScene
                                    key={route.key}
                                    style={StyleSheet.absoluteFill}
                                    isVisible={isFocused}
                                >
                                    <SceneContent isFocused={isFocused}>
                                        {descriptor.render()}
                                    </SceneContent>
                                </ResourceSavingScene>

                            );
                        })}
                    </ScreenContainer>

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
                </View>
            </SafeAreaProviderCompat>
        </NavigationHelpersContext.Provider>
    );
}

export default TabNavigator;

const styles = StyleSheet.create({
    sceneContent: {
        flex: 1,
        overflow: 'hidden',
    },
    container: {
        flex: 1
    },
    pages: {
        flex: 1
    },
    resourceSaving: {
        flex: 1,
        overflow: 'hidden',
    },
    attached: {
        flex: 1,
    },
    detached: {
        flex: 1,
        top: 1000//FAR_FAR_AWAY
    },
    content: {
        flex: 1,
    },
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