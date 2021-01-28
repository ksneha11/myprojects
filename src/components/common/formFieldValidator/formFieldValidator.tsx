import React from 'react';
import AppComponent from '../appComponent';
import FormFieldValidatorView from './formFieldValidator.view';

export interface InputValidator {
    accessibleErrorMessage?: string;
    errorMessage: string;
    isValid: (input: string, secondaryInput?: string) => boolean;
}

export interface Props {
    input: string;
    isFocused: boolean;
    secondaryInput?: string; // sometimes needed to validate input against (e.g., no chars in input from secondaryInput)
    title: string;
    validators: InputValidator[];
}

export interface State {
    isDirty?: boolean;
}

export default class FormFieldValidator extends AppComponent<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            isDirty: false,
        };
    }

    public componentDidUpdate(previousProps: any) {
        if (previousProps.input !== this.props.input) {
            this.checkIfInputEmpty(this.props.input);
        }
    }

    public render() {
        return (
            <FormFieldValidatorView
                isDirty={this.state.isDirty}
                isFocused={this.props.isFocused}
                input={this.props.input}
                secondaryInput={this.props.secondaryInput}
                title={this.props.title}
                validators={this.props.validators}
            />
        );
    }

    protected checkIfInputEmpty = (input: string) => {
        this.setState({ isDirty: input !== '' });
    };
}
