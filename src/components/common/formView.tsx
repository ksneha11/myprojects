import React from 'react';
import { View } from 'react-native';
import { PageTitle, PrimaryButton, SecondaryButton, TextLink } from '.';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { FormViewStyleSchema } from './formView.style';

interface Props extends StyleProps {
    children?: (parent: FormView) => React.ReactNode;
    onPressPrimaryButton?: noop;
    onPressTextLink?: noop;
    primaryButtonDisabled: boolean;
    primaryButtonText?: string;
    textLinkDisabled: boolean;
    textLinkText?: string;
}

const defaultProps = {
    areButtonsFixed: false,
    children: ({ Buttons }: FormView) => {
        return <Buttons />;
    },
    primaryButtonDisabled: false,
    textLinkDisabled: false,
};

export default class FormView<P extends Props = Props> extends StyledComponent<P> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'FormView';
    public style: FormViewStyleSchema;

    public Buttons = (): JSX.Element => {
        const {
            primaryButtonDisabled,
            primaryButtonText,
            onPressPrimaryButton,
            onPressTextLink,
            textLinkDisabled,
            textLinkText,
        } = this.props;

        return (
            <>
                {primaryButtonText && (
                    <View style={this.style.buttonContainer}>
                        <PrimaryButton
                            isDisabled={primaryButtonDisabled}
                            onPress={onPressPrimaryButton}
                            title={primaryButtonText}
                        />
                    </View>
                )}
                {textLinkText && (
                    <View style={this.style.buttonContainer}>
                        <TextLink
                            accessibilityLabel={textLinkText}
                            isDisabled={textLinkDisabled}
                            onPress={onPressTextLink}
                        >
                            {textLinkText}
                        </TextLink>
                    </View>
                )}
            </>
        );
    };

    public render() {
        return <View style={this.style.rootContainer}>{this.props.children(this)}</View>;
    }
}
