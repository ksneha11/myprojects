import React from 'react';
import { Keyboard, Platform, TouchableOpacity } from 'react-native';
import { BottomTabBar as TabBar } from 'react-navigation-tabs';
import defaultStyle, { BottomTabBarStyleSchema } from './bottomTabBar.style';
import AppComponent from './common/appComponent';
interface State {
    visible: boolean;
}

export default class BottomTabBar extends AppComponent<{}, State> {
    public defaultStyle = defaultStyle;
    public keyboardDidHideListener: any;

    public keyboardDidShowListener: any;
    public name = 'BottomTabBar';
    public style: BottomTabBarStyleSchema;

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    public componentWillMount() {
        /*
            We need to add this keyboard event listner because currently the bottom tabbar moves up when the keyboard is activated on Android. This is to show/hide the bottom tab bar based on keyboard state.
        */
        if (Platform.OS === 'android') {
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
                this.setState({ visible: false })
            );
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
                this.setState({ visible: true })
            );
        }
    }

    public componentWillUnmount() {
        if (Platform.OS === 'android') {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
    }

    public render() {
        // TODO - @lookmai
        // Add a more elegant way to show/hide this so it doesn't just flashes in when the keyboard is dismissed
        // Maybe animated the bar up and down
        if (!this.state.visible) {
            return null;
        }

        return (
            <TabBar
                {...this.props}
                activeTintColor={this.style.textContainer.color}
                getButtonComponent={() => {
                    return TouchableOpacity;
                }}
                inactiveTintColor={this.style.textContainer.color}
                style={this.style}
                tabStyle={this.style.tabContainer}
            />
        );
    }
}
