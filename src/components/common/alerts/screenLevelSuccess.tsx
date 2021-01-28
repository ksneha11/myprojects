import React from 'react';
import { BodyCopy, ScreenLevelAlert } from '..';
import StyledComponent from '../../styledComponent';
import LabelCopy from '../text/labelCopy';
import { AlertProps } from './inlineAlert';
import defaultStyle, { ScreenLevelSuccessStyleSchema } from './screenLevelSuccess.style';

interface Props extends Partial<AlertProps> {
    isVisible: boolean;
    message?: string;
    style?: Partial<ScreenLevelSuccessStyleSchema>;
    title?: string;
}

const defaultProps = {
    isVisible: true,
};

export default class ScreenLevelSuccess extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ScreenLevelSuccess';
    public style: ScreenLevelSuccessStyleSchema;

    public Body = () => {
        const title = this.props.title || this.labels.successBanner.body.title;
        // TODO:  Style this for when there's no title
        return (
            <>
                <LabelCopy style={{ labelCopy: this.style.successTitle }}>{title + '\n'}</LabelCopy>
                <BodyCopy style={{ bodyCopy: this.style.successBody }}>{this.props.message}</BodyCopy>
            </>
        );
    };

    public render() {
        return (
            <>
                {this.props.isVisible && (
                    <ScreenLevelAlert
                        alertType="confirm"
                        style={{
                            confirmIcon: this.style.confirmIcon,
                            container: this.style.alertContainer,
                            errorMessage: this.style.errorMessage,
                            errorMessageContainer: this.style.errorMessageContainer,
                            iconNormalSize: this.style.leftIcon,
                            rootContainer: this.style.container,
                            warningContainer: this.style.warningContainer,
                        }}
                        {...this.props}
                    >
                        {this.props.children ? this.props.children : <this.Body />}
                    </ScreenLevelAlert>
                )}
            </>
        );
    }
}
