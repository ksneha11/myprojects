import React from 'react';
import { View } from 'react-native';
import { BodyCopy, Modal } from '.';
import { PrimaryButton, SecondaryButton } from '..';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { DialogModalStyleSchema } from './dialogModal.style';

interface Props extends StyleProps {
    bodyText?: Children;
    isSingleButton?: boolean;
    isVisible: boolean;
    onClose?: noop;
    onPressPrimaryButton: noop;
    onPressSecondaryButton?: noop;
    primaryButtonTitle?: string;
    secondaryButtonTitle?: string;
    style?: Partial<DialogModalStyleSchema>;
    title?: string;
}

const defaultProps = {};

export default class DialogModal extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'DialogModal';
    public style: DialogModalStyleSchema;

    public Body = () => <BodyCopy style={{ bodyCopy: this.style.bodyCopy }}>{this.props.bodyText}</BodyCopy>;

    public render() {
        return (
            <Modal
                isVisible={this.props.isVisible}
                onClose={this.props.onClose || this.props.onPressSecondaryButton}
                title={this.props.title}
            >
                <>
                    <this.Body />
                    {this.props.isSingleButton ? <this.SingleButtonContainer /> : <this.TwoButtonContainer />}
                </>
            </Modal>
        );
    }

    public SingleButtonContainer = () => {
        return (
            <View style={this.style.buttonWrapper}>
                <PrimaryButton
                    onPress={this.props.onPressPrimaryButton}
                    style={{ buttonContainer: this.style.buttonContainer }}
                    title={this.props.primaryButtonTitle}
                />
            </View>
        );
    };

    public TwoButtonContainer = () => {
        return (
            <View style={[this.style.buttonWrapper, this.style.twoButtonWrapper]}>
                <SecondaryButton
                    onPress={this.props.onPressSecondaryButton}
                    style={{ buttonContainer: this.style.buttonContainer }}
                    title={this.props.secondaryButtonTitle}
                />
                <PrimaryButton
                    onPress={this.props.onPressPrimaryButton}
                    style={{ buttonContainer: this.style.buttonContainer }}
                    title={this.props.primaryButtonTitle}
                />
            </View>
        );
    };
}
