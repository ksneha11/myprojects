import React from 'react';
import ModalConfig from '../../models/modalConfig';
import { DialogModal } from '../common';
import StyledComponent, { StyleProps } from '../styledComponent';

export interface Props extends StyleProps, ModalConfig {
    isVisible: boolean;
    onClose: noop;
    onPressPrimaryButton: noop;
}

export default class GlobalModalView extends StyledComponent<Props> {
    public render() {
        return (
            <DialogModal
                onClose={this.props.onClose}
                isSingleButton={!this.props.secondaryButtonTitle}
                {...this.props}
            />
        );
    }
}
