import React from 'react';
import { TextStyle, View } from 'react-native';
import { P } from '..';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { StripesFlatListStyleSchema } from './stripesFlatList.style';

export interface Props extends StyleProps {
    additionalRowStyles: { [index: number]: TextStyle }; // This is an optional parameter to override style of a row based on index
    data: Array<{ title: string; value: string }>;
    style?: Partial<StripesFlatListStyleSchema>;
}

const defaultProps: Partial<Props> = {
    additionalRowStyles: {},
    data: [{ title: '', value: '' }],
};

export default class StripesFlatList extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'StripesFlatList';
    public style: StripesFlatListStyleSchema;

    public render() {
        const Override = this.appContext.getComponentOverride(this.name);
        if (Override) {
            return <Override context={this} />;
        }
        const { data } = this.props;
        return (
            <View style={this.style.rootContainer}>
                {data.map((item, index) => {
                    const customRowStyle = this.props.additionalRowStyles[index] || {};
                    return (
                        <View key={index} style={[this.style.row, index % 2 === 0 && this.style.oddRow]} accessible>
                            <View style={this.style.leftContent}>
                                <P style={{ paragraph: { ...this.style.leftContentText, ...customRowStyle } }}>
                                    {item.title}
                                </P>
                            </View>
                            <View style={this.style.rightContent}>
                                <P style={{ paragraph: { ...this.style.rightContentText, ...customRowStyle } }}>
                                    {item.value}
                                </P>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}
