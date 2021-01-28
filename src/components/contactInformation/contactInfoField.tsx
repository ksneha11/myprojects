import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { IconNames } from '../../styles';
import { BodyCopy, MenuItem, TextLink } from '../common';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { ContactInfoFieldStyleSchema } from './contactInfoField.style';

interface Props extends StyleProps {
    /**
     * The field to be displayed.  Typical use is either the text for 'add a field', or the value of a field to edit
     */
    field: string;
    /**
     * Determines if this component should show the add symbol or the edit symbol
     * true means show the ad icon, false means show the edit icon
     */
    isAdd: boolean;
    onPressAdd: noop;
    onPressEdit: noop;
    style?: Partial<ContactInfoFieldStyleSchema>;
}

const defaultProps = {};

/**
 * Used to display a field that could either be text with an add icon on the left, or be a field with an edit icon on the right
 */
export default class ContactInfoField extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ContactInfoField';
    public style: ContactInfoFieldStyleSchema;

    public AddLink = () => {
        return (
            <View style={this.style.addContainer}>
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

    public EditLink = () => {
        return (
            <MenuItem
                onPress={this.props.onPressEdit}
                title={this.props.field}
                iconRight={IconNames.TAG_EDIT_ICON}
                style={{
                    iconLeft: this.style.iconLeft,
                    iconRight: this.style.iconRight,
                    rootContainer: this.style.menuItemRootContainer,
                    textContainer: this.style.menuItemTextContainer,
                    titleContainer: this.style.menuItemTitleContainer,
                }}
            >
                {({ props, style, TitleContainer }) => {
                    return (
                        <SafeAreaView style={style.safeAreaViewWrapper}>
                            <TouchableOpacity
                                accessible
                                accessibilityRole="button"
                                style={style.rootContainer}
                                onPress={props.onPress}
                            >
                                <TitleContainer>
                                    {/* Need to override children because the text here is a body copy */}
                                    <BodyCopy style={{ bodyCopy: this.style.field }}>{props.title}</BodyCopy>
                                </TitleContainer>
                            </TouchableOpacity>
                        </SafeAreaView>
                    );
                }}
            </MenuItem>
        );
    };

    public render() {
        return <>{this.props.isAdd ? <this.AddLink /> : <this.EditLink />}</>;
    }
}
