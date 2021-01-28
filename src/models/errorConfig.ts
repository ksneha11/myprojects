export default interface ErrorConfig {
    footerText?: (errorCode: string) => string;
    onPressBackground?: (errorCode: string) => void;
    onPressFooter?: (errorCode: string) => void;
    primaryButtonAction?: (errorCode: string) => void;
    secondaryButton?: (errorCode: string) => boolean;
    secondaryButtonAction?: (errorCode: string) => void;
    showModal?: (errorCode: string) => boolean;
    tertiaryButton?: (errorCode: string) => boolean;
    tertiaryButtonAction?: (errorCode: string) => void;
}
