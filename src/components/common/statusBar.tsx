import React from 'react';
import { StatusBar, StatusBarProps, View } from 'react-native';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { StatusBarStyleSchema } from './statusBar.style';

interface Props extends StyleProps, StatusBarProps {
    lightBackground?: boolean;
    style?: Partial<StatusBarStyleSchema>;
}

const defaultProps = {};

export default class AppStatusBar extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'StatusBar';
    public style: StatusBarStyleSchema;

    public MyStatusBar = ({ backgroundColor, ...props }) => (
        <View style={[this.style.statusBar, { backgroundColor }]}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );

    public render() {
        return (
            <View style={this.style.rootContainer}>
                <this.MyStatusBar
                    backgroundColor={
                        this.props.lightBackground
                            ? this.style.statusBarLight.backgroundColor
                            : this.style.statusBar.backgroundColor
                    }
                    barStyle={this.props.lightBackground ? 'dark-content' : 'light-content'}
                    {...this.props}
                />
                <View style={this.style.content} />
            </View>
        );
    }
}
