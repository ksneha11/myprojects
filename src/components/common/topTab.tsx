import React from 'react';
import { Text, View } from 'react-native';
import { StyleProps } from '../styledComponent';
import AppComponent from './appComponent';
import defaultStyle, { TopTabStyleSchema } from './topTab.style';

interface Props extends StyleProps {
    accessibilityLabel?: string;
    focused: boolean;
    label: string;
    style?: Partial<TopTabStyleSchema>;
}

const defaultProps = {};

export default class TopTab extends AppComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'TopTab';
    public style: TopTabStyleSchema;

    public render() {
        const { focused, label } = this.props;
        return (
            <>
                <View style={[this.style.tabContainer, focused && this.style.activeTabContainer]}>
                    <Text
                        accessibilityLabel={this.props.accessibilityLabel}
                        style={[this.style.tabLabel, focused && this.style.activeTabLabel]}
                    >
                        {label}
                    </Text>
                </View>
                <View style={[this.style.tabIndicator, focused && this.style.activeTabIndicator]} />
            </>
        );
    }
}
