import React from 'react';
import { DialogModal } from '.';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { ChangesNotSavedModalStyleSchema } from './changesNotSavedModal.style';

interface Props extends StyleProps {
    body?: string;
    /**
     * On update screens this modal has differnt text than on add screens
     */
    isEditScreen?: boolean;
    isVisible: boolean;
    onPressCancel: noop;
    onPressContinue: noop;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    style?: Partial<ChangesNotSavedModalStyleSchema>;
    title?: string;
}

const defaultProps = {
    isEditScreen: false,
};

export default class ChangesNotSavedModal extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ChangesNotSavedModal';
    public style: ChangesNotSavedModalStyleSchema;

    public render() {
        const { body, primaryButtonText, secondaryButtonText, title } = this.props;
        const modalLabels = this.getLabelSource();
        return (
            <DialogModal
                bodyText={body || modalLabels.body}
                isVisible={this.props.isVisible}
                onPressSecondaryButton={this.props.onPressCancel}
                onPressPrimaryButton={this.props.onPressContinue}
                primaryButtonTitle={primaryButtonText || modalLabels.buttonContainer.primaryButtonTitle}
                secondaryButtonTitle={secondaryButtonText || modalLabels.buttonContainer.secondaryButtonTitle}
                title={title || modalLabels.title}
            />
        );
    }

    protected getLabelSource = () => {
        if (this.props.isEditScreen) {
            return this.labels.changesNotSavedModal.updates;
        }
        return this.labels.changesNotSavedModal;
    };
}
