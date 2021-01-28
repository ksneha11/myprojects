import React from 'react';
import { View } from 'react-native';
import StyledComponent, { StyleProps } from '../styledComponent';
import { H1 } from '.';
import defaultStyle, { PageTitleStyleSchema } from './pageTitle.style';

export interface Props extends StyleProps {
    style?: Partial<PageTitleStyleSchema>;
    text: string;
}

const defaultProps = {
    text: '',
};

export default class PageTitle extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'PageTitle';
    public pageTitleRef;
    public style: PageTitleStyleSchema;

    public render() {
        return (
            <>
                {this.props.text && (
                    <View style={this.style.rootContainer}>
                        <H1
                            ref={component => {
                                this.pageTitleRef = component;
                            }}
                        >
                            {this.props.text}
                        </H1>
                    </View>
                )}
            </>
        );
    }
}
