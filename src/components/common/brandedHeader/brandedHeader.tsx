import React from 'react';
import { BrandedHeaderView, ViewProps } from '.';
import { LandingPageActions } from '../../../context/navigation/actions';
import AppComponent from '../appComponent';

class BrandedHeader extends AppComponent<Partial<ViewProps>> {

    public onPressProfileIcon = () => {
        this.navigate(LandingPageActions.PROFILE_PRESSED);
    };
    public render() {
        return <BrandedHeaderView onPressProfileIcon={this.onPressProfileIcon} style={this.style} />;
    }
}

export default BrandedHeader;
