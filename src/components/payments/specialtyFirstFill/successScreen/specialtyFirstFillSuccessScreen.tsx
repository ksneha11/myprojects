import React from 'react';
import { Props, SpecialtyFirstFillSuccessScreenView } from '.';
import { SpecialtyFirstFillActions } from '../../../../context/navigation/actions/specialtyFirstFill.actions';
import AppComponent from '../../../common/appComponent';

export default class SpecialtyFirstFillSuccessScreen extends AppComponent<Partial<Props>> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <SpecialtyFirstFillSuccessScreenView
                onPressOk={this.onPressOk}
                onPressSubmitAgain={this.onPressSubmitAgain}
            />
        );
    }

    protected onPressOk = () => {
        return this.navigate(SpecialtyFirstFillActions.CANCEL_FIRST_FILL_PRESSED);
    };

    protected onPressSubmitAgain = () => {
        return this.navigate(SpecialtyFirstFillActions.SPECIALTY_FIRST_FILL_HOME_PRESSED);
    };
}
