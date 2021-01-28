import React from 'react';
import { Text, View } from 'react-native';
import { setAccessibilityFocus } from '../../utils';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { PageHeaderStyleSchema } from './pageHeader.style';

interface Props extends StyleProps {
    children?: (component: PageHeader) => React.ReactNode;
    shouldRecieveFocus?: boolean;
    style?: Partial<PageHeaderStyleSchema>;
    title: string;
}

const defaultProps = {
    children: ({ PageHeaderTitle }) => {
        return (
            <>
                <PageHeaderTitle />
            </>
        );
    },
    getText: () => new PageHeaderTextConfig('Welcome'),
    shouldRecieveFocus: true,
};

export class PageHeaderTextConfig {
    public readonly title: string;
    constructor(title = '') {
        this.title = title;
    }
}

export default class PageHeader extends StyledComponent<Props> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public headerTitle;
    public name = 'PageHeader';
    public style: PageHeaderStyleSchema;
    protected hasRecievedFocus: boolean = false;

    public PageHeaderTitle = (): JSX.Element => {
        return (
            <Text
                accessibilityRole="header"
                accessibilityLiveRegion="assertive"
                ref={el => (this.headerTitle = el)}
                style={this.style.pageTitle}
            >
                {this.props.title}
            </Text>
        );
    };

    public render() {
        if (this.props.shouldRecieveFocus && this.headerTitle && !this.hasRecievedFocus) {
            setAccessibilityFocus(this.headerTitle);
            this.hasRecievedFocus = true;
        }
        return <View style={this.style.pageHeader}>{this.props.children(this)}</View>;
    }
}
