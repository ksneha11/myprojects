import React from 'react';
import { View } from 'react-native';
import {IconNames} from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { AddTextLinkStyleSchema } from './addTextLink.style';
import {TextLink} from './index';

interface Props extends StyleProps {
    field: string;
    onPressAdd: noop;
    style?: Partial<AddTextLinkStyleSchema>;
}

const defaultProps = {};

export default class AddTextLink extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'AddTextLink';
    public style: AddTextLinkStyleSchema;

    public AddLink = () => {
        return (
            <View style={this.style.rootContainer}>
                {this.getIcon(IconNames.FORM_ADD_ITEM_ICON, {
                    onPress: this.props.onPressAdd,
                    style: this.style.iconLeft,
                })}
                <TextLink
                    accessibilityRole="button"
                    onPress={this.props.onPressAdd}
                    style={{ textLink: this.style.addTextLink }}
                >
                    {this.props.field}
                </TextLink>
            </View>
        );
    };

    public render() {
        return <this.AddLink />
    }
}
