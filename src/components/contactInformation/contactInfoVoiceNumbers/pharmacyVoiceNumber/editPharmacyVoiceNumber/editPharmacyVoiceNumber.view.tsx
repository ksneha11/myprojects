import React from 'react';
import { PharmacyVoiceNumberView } from '..';
import { H1 } from '../../../../common';
import { StyleProps } from '../../../../styledComponent';

export interface Props extends StyleProps {}

export default class EditPharmacyVoiceNumberView extends PharmacyVoiceNumberView {
    public ScreenTitle = () => {
        return <H1>{this.labels.contactInfoVoiceNumbers.editPharmacyVoiceNumberView.title}</H1>;
    };
}
