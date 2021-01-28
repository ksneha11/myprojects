import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from '.';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import Icon from './icon';
import defaultStyle, { RadioButtonSelectorStyleSchema } from './radioButtonSelector.style';

export interface Props extends StyleProps {
    accessibilityLabel?: string;
    action?: string;
    actionAccessibilityLabel?: string;
    actionText?: string;
    children?: (parent: RadioButtonSelector) => React.ReactNode;
    content?: React.ReactNode[];
    contentAccessibilityLabel?: string;
    contentLabel: string;
    hasRadioButtons: boolean;
    isSelected: boolean;
    item: any;
    lowerRightIconName?: IconNames;
    onActionPress: (action: string) => void;
    onRadioPress: (item: any) => void;
    style?: Partial<RadioButtonSelectorStyleSchema>;
}

export const defaultProps: Partial<Props> = {
    accessibilityLabel: '',
    children: ({
        CardAction,
        CardText,
        MainContent,
        props: {
            action,
            actionText,
            content,
            hasRadioButtons,
            isSelected,
            item,
            lowerRightIconName,
            onActionPress,
            onRadioPress,
        },
        CardRadioButton,
        style,
        SubContent,
    }) => {
        return (
            <>
                <MainContent>
                    {hasRadioButtons && (
                        <CardRadioButton isSelected={isSelected} item={item} onPress={onRadioPress} style={style} />
                    )}
                    <CardText content={content} />
                </MainContent>
                <SubContent action={action} onActionPress={onActionPress}>
                    <CardAction actionText={actionText} />
                    <Icon name={lowerRightIconName} style={{ rootItem: style.iconStyle }} />
                </SubContent>
            </>
        );
    },
    hasRadioButtons: true,
    isSelected: false,
};

export default class RadioButtonSelector extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'RadioButtonSelector';
    public style: RadioButtonSelectorStyleSchema;

    public CardAction = ({ actionText }: { actionText?: string }): JSX.Element => {
        return (
            <View style={this.style.actionContainer}>
                <Text style={this.style.actionText}>{actionText && actionText}</Text>
            </View>
        );
    };

    public CardRadioButton = ({
        item,
        isSelected,
        onPress,
        style,
    }: {
        isSelected: boolean;
        item: any;
        onPress: (item) => void;
        style: RadioButtonSelectorStyleSchema;
    }): JSX.Element => {
        return (
            <View style={style.radioButtonContainer}>
                <RadioButton onPress={() => onPress(item)} selected={isSelected} />
            </View>
        );
    };

    public CardText = ({ content }: { content?: React.ReactNode[] }): JSX.Element => {
        return (
            <View
                accessible
                style={
                    this.props.hasRadioButtons
                        ? this.style.hasRadioButtontextContainer
                        : this.style.hasNoRadioButtonTextContainer
                }
            >
                {content &&
                    content.map((text, index) => (
                        <>
                            {!!text && (
                                <Text key={Math.random()} style={this.style.text}>
                                    {text}
                                </Text>
                            )}
                        </>
                    ))}
            </View>
        );
    };

    public Container = ({ children }): JSX.Element => {
        return (
            <View style={[this.style.rootContainer, this.props.isSelected && this.style.selectedContainerColor]}>
                {children}
            </View>
        );
    };

    public MainContent = ({ children }) => {
        return <View style={this.style.contentContainer}>{children}</View>;
    };

    public render = () => {
        return <this.Container>{this.props.children(this)}</this.Container>;
    };

    public SubContent = ({
        action,
        onActionPress,
        children,
    }: {
        action: string;
        children: Children;
        onActionPress?: (action: string) => void;
    }) => (
        <TouchableOpacity
            accessibilityLabel={this.props.accessibilityLabel}
            accessibilityRole="button"
            onPress={() => onActionPress && onActionPress(action)}
            style={this.style.subContentContainer}
        >
            {children}
        </TouchableOpacity>
    );
}
