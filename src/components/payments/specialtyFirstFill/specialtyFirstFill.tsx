import React from 'react';
import { Props, SpecialtyFirstFillView } from '.';
import { SpecialtyFirstFillActions } from '../../../context/navigation/actions/specialtyFirstFill.actions';
import AppComponent from '../../common/appComponent';

interface State {
    radioButtonSelectedStatus: boolean;
    selectedRadioButtonIndex: number;
}

export class SpecialtyFirstFill extends AppComponent<Partial<Props>, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            radioButtonSelectedStatus: true,
            selectedRadioButtonIndex: -1,
        };
    }

    public render() {
        return (
            <SpecialtyFirstFillView
                radioButtonSelectedStatus={this.state.radioButtonSelectedStatus}
                nextButtonClicked={this.nextButtonClicked}
                onRadioButtonSelection={this.onRadioButtonSelection}
                onCancelPress={this.onCancelPress}
                selectedRadioButtonIndex={this.state.selectedRadioButtonIndex}
                {...this.props}
            />
        );
    }

    protected clearRadioSelection = () => {
        this.setState({ selectedRadioButtonIndex: -1, radioButtonSelectedStatus: true });
    };

    protected nextButtonClicked = () => {
        if (this.state.selectedRadioButtonIndex === 0) {
            this.navigate(SpecialtyFirstFillActions.SHOW_PAPER_SCREEN_PRESSED);
        } else {
            this.navigate(SpecialtyFirstFillActions.SHOW_PAPERLESS_SCREEN_PRESSED);
        }
        this.clearRadioSelection();
    };

    protected onCancelPress = () => {
        this.clearRadioSelection();
        this.navigate(SpecialtyFirstFillActions.CANCEL_FIRST_FILL_PRESSED);
    };

    protected onRadioButtonSelection = (index: number) => {
        this.setState({ selectedRadioButtonIndex: index, radioButtonSelectedStatus: false });
    };
}

export default SpecialtyFirstFill;
