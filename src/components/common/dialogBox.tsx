import React from 'react';
import { View } from 'react-native';
import { TextLink } from '.';
import StyledComponent from '../styledComponent';
import defaultStyle, { DialogBoxStyleSchema } from './dialogBox.style';
import Modal from './modal';

export interface Props {
    // passing styles in for now here - not sure how to get around this
    children: (parent: DialogBox) => React.ReactNode;
    isVisible?: boolean;
    onClose: () => void;
    primaryMethod?: () => void;
    primaryText?: string;
    secondaryMethod?: () => void;
    secondaryText?: string;
    style?: Partial<DialogBoxStyleSchema>;
    tertiaryMethod?: () => void;
    tertiaryText?: string;
    title?: string;
}

const defaultProps = {
    children: ({ Buttons }: DialogBox) => <Buttons />,
    isVisible: true,
};

export default class DialogBox extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'DialogBox';
    public style: DialogBoxStyleSchema;

    public Buttons = () => {
        const { primaryMethod, secondaryMethod, tertiaryMethod, primaryText, secondaryText, tertiaryText } = this.props;
        const style = this.style;
        return (
            <>
                {!!primaryText && (
                    <View style={this.style.primaryButtonContainer}>
                        <TextLink
                            accessibilityLabel={primaryText}
                            onPress={() => primaryMethod && primaryMethod()}
                            style={{ textLink: this.style.primaryButtonText }}
                        >
                            {primaryText}
                        </TextLink>
                    </View>
                )}
                {!!secondaryText && (
                    <View style={this.style.primaryButtonContainer}>
                        <TextLink
                            accessibilityLabel={this.props.secondaryText}
                            onPress={() => secondaryMethod && secondaryMethod()}
                            style={{ textLink: this.style.alternateButtonText }}
                        >
                            {secondaryText}
                        </TextLink>
                    </View>
                )}
                {!!tertiaryText && (
                    <View style={this.style.primaryButtonContainer}>
                        <TextLink
                            accessibilityLabel={this.props.tertiaryText}
                            onPress={() => tertiaryMethod && tertiaryMethod()}
                            style={{ textLink: this.style.alternateButtonText }}
                        >
                            {tertiaryText}
                        </TextLink>
                    </View>
                )}
            </>
        );
    };

    public render() {
        const { isVisible, onClose, title } = this.props;
        const style = this.style;
        return (
            <Modal
                onClose={onClose}
                isVisible={isVisible}
                onBackdropPress={() => onClose()}
                title={title}
                style={{ titleContainer: this.style.titleContainer, titleText: this.style.titleText }}
            >
                <>{this.props.children(this)}</>
            </Modal>
        );
    }
}
