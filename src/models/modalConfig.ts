export default interface ModalConfig {
    bodyText: Children;
    onPressBackdrop?: noop;
    onPressPrimaryButton?: noop;
    onPressSecondaryButton?: noop;
    primaryButtonTitle?: string;
    secondaryButtonTitle?: string;
    title: string;
}
