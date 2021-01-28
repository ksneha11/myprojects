import React from 'react';
import { PaperlessPrescriptionsView, Props } from '.';
import { SpecialtyFirstFillActions } from '../../../context/navigation/actions/specialtyFirstFill.actions';
import AppComponent from '../../common/appComponent';

export default class PaperlessPrescriptions extends AppComponent<Partial<Props>> {
    public render() {
        return (
            <PaperlessPrescriptionsView
                onEnrollment={this.onSuccessfullEnrollment}
                onPressBackButton={this.onPressBackButton}
                phoneNumberValidator={this.phoneNumberValidator}
                prescriberDetailsValidator={this.prescriberDetailsValidator}
                {...this.props}
            />
        );
    }

    protected onPressBackButton = () => {
        this.navigate(SpecialtyFirstFillActions.BACK_BUTTON_PRESSED);
    };

    // TODO: Form submit action will be implemented in future stories.
    protected onSuccessfullEnrollment = () => {
        this.navigate(SpecialtyFirstFillActions.SPECIALTY_SUCCESS_SCREEN_PRESSED);
    };

    protected phoneNumberValidator = (phoneNumber: string) => {
        return phoneNumber.length >= 10;
    };

    protected prescriberDetailsValidator = (inputText: string) => {
        return inputText.length > 0;
    };
}
