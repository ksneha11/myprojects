import React from 'react';
import { View } from 'react-native';
import { Pressable } from '../../models';
import StyledComponent, { StyleProps } from '../styledComponent';
import { BodyCopy, Modal, PrimaryButton, SecondaryButton, TextLink } from './../common';
import { defaultStyle, ErrorModalStyleSchema } from './index';

export interface Props extends StyleProps {
    footerText: string;
    isVisible?: boolean;
    links: Pressable[];
    message?: string;
    onClose: noop;
    onPressFooter: noop;
    onPressLink: (action: string) => void;
    onPressModalPrimaryButton?: noop;
    onPressModalSecondaryButton?: noop;
    onPressModalTertiaryButton?: noop;
    primaryButtonTitle: string;
    secondaryButtonTitle?: string;
    style?: Partial<ErrorModalStyleSchema>;
    tertiaryButtonTitle?: string;
    title?: string;
}

export const defaultProps = {
    children: ({ Body, ButtonContainer, FooterComponent, ModalContainer }: ErrorModalView) => {
        return (
            <>
                <ModalContainer>
                    <Body />
                    <ButtonContainer />
                    <FooterComponent />
                </ModalContainer>
            </>
        );
    },
};

export default class ErrorModalView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ErrorModal';
    public style: ErrorModalStyleSchema;

    public Body = () => {
        if (!this.props.links) {
            return <BodyCopy style={{ bodyCopy: this.style.modalBodyCopy }}>{this.props.message}</BodyCopy>;
        }
        return (
            <BodyCopy style={{ bodyCopy: this.style.modalBodyCopy }}>
                {this.formatLabel(
                    this.props.message,
                    ...this.props.links.map(link => {
                        return (
                            <TextLink key={link.text as string} onPress={() => this.props.onPressLink(link.action)}>
                                {link.text}
                            </TextLink>
                        );
                    })
                )}
            </BodyCopy>
        );
    };

    public ButtonContainer = () => (
        <View style={[this.style.buttonWrapper, this.props.secondaryButtonTitle && this.style.twoButtonWrapper]}>
            {this.props.secondaryButtonTitle && (
                <SecondaryButton
                    onPress={this.props.onPressModalSecondaryButton}
                    style={{ buttonContainer: this.style.buttonContainer }}
                    title={this.props.secondaryButtonTitle}
                />
            )}
            {this.props.primaryButtonTitle && (
                <PrimaryButton
                    onPress={this.props.onPressModalPrimaryButton}
                    style={{ buttonContainer: this.style.buttonContainer }}
                    title={this.props.primaryButtonTitle}
                />
            )}
        </View>
    );

    public Container = ({ children }: { children: React.ReactNode }) => (
        <View style={this.style.rootContainer}>{children}</View>
    );

    public FooterComponent = () => (
        <>
            {this.props.footerText && (
                <View style={this.style.footerContainer}>
                    <TextLink accessibilityRole="button" onPress={this.props.onPressFooter}>
                        {this.props.footerText}
                    </TextLink>
                </View>
            )}
        </>
    );

    public ModalContainer = ({ children }: { children? }) => (
        <Modal
            isVisible={this.props.isVisible}
            onClose={this.props.onClose}
            title={this.props.title ? this.props.title : undefined}
        >
            {children}
        </Modal>
    );

    public render() {
        return <this.Container>{defaultProps.children(this)}</this.Container>;
    }
}
