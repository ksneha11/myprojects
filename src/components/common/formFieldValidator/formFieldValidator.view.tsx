import React from 'react';
import { Text, View } from 'react-native';
import { P } from '..';
import { IconNames, StyleType } from '../../../styles';
import StyledComponent, { StyleProps } from '../../styledComponent';
import Icon from '../icon';
import { InputValidator } from './formFieldValidator';
import { defaultStyle, FormFieldValidatorStyleSchema } from './index';

export interface Props extends StyleProps {
    children: (parent: FormFieldValidatorView) => React.ReactNode;
    input: string;
    isDirty: boolean;
    isFocused: boolean;
    secondaryInput?: string;
    style?: Partial<FormFieldValidatorStyleSchema>;
    title: string;
    validators: InputValidator[];
}

export const defaultProps = {
    children: ({ TitleContainer, ValidatorList }: FormFieldValidatorView) => {
        return (
            <>
                <TitleContainer />
                <ValidatorList />
            </>
        );
    },
};

export default class FormFieldValidatorView extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'FormFieldValidator';
    public style: FormFieldValidatorStyleSchema;

    public Container = ({ children }: { children: Children }) => {
        return <View style={this.style.rootContainer}>{children}</View>;
    };

    public render() {
        return <this.Container>{this.props.children(this)}</this.Container>;
    }

    public TitleContainer = () => {
        return (
            <>
                {this.props.isFocused && (
                    <View style={this.style.titleContainer}>
                        <Icon style={{ rootItem: this.style.titleContainerIcon }} name={IconNames.INPUT_SECURE_ICON} />
                        <P style={{ paragraph: this.style.validatorTitle }}>{this.props.title}</P>
                    </View>
                )}
            </>
        );
    };

    public ValidatorItem = (isValid: boolean, errorMessage: string, accessibleErrorMessage: string) => {
        const label = this.labels.formFieldValidator.validatorItem;
        const inputStyle = this.getInputStyle(isValid, this.props.isDirty);

        return (
            <View style={this.style.validatorItemContainer}>
                {this.props.isDirty ? (
                    <Icon
                        accessibilityLabel={isValid ? label.matchedCondition : label.unmatchedCondition}
                        name={isValid ? IconNames.INPUT_VALIDATOR_VALID_ICON : IconNames.INPUT_VALIDATOR_INVALID_ICON}
                        style={{ rootItem: isValid ? this.style.validIcon : this.style.invalidIcon }}
                    />
                ) : (
                    <Text> {'\u2022   '}</Text>
                )}

                <Text
                    accessibilityLabel={accessibleErrorMessage ? accessibleErrorMessage : errorMessage}
                    style={
                        this.props.isDirty
                            ? { ...inputStyle, ...this.style.validatorText }
                            : { ...inputStyle, ...this.style.unstyledValidatorText }
                    }
                >
                    {errorMessage}
                </Text>
            </View>
        );
    };

    public ValidatorList = () => {
        return (
            <>
                {this.props.isFocused && (
                    <View style={this.style.validatorList}>
                        {this.props.validators.map(
                            ({ isValid, errorMessage, accessibleErrorMessage }: InputValidator) =>
                                this.ValidatorItem(
                                    isValid(this.props.input, this.props.secondaryInput),
                                    errorMessage,
                                    accessibleErrorMessage
                                )
                        )}
                    </View>
                )}
            </>
        );
    };

    protected getInputStyle(isValid: boolean, isDirty: boolean): StyleType {
        let inputStyle: {};

        if (isValid && isDirty) {
            inputStyle = this.style.validInput;
        } else if (!isValid && isDirty) {
            inputStyle = this.style.invalidInput;
        } else {
            inputStyle = this.style.input;
        }

        return inputStyle;
    }
}
