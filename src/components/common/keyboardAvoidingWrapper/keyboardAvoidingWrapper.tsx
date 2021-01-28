import React from 'react';
import { EmitterSubscription, Keyboard, View } from 'react-native';
import StyledComponent, { StyleProps } from '../../styledComponent';
import { defaultStyle, KeyboardAvoidingWrapperStyleSchema } from '.';

interface Props extends StyleProps {
    applyPadding?: boolean;
    onKeyboardHidden?: noop;
    onKeyboardVisible?: noop;
    style?: Partial<KeyboardAvoidingWrapperStyleSchema>;
}

interface State {
    isKeyboardVisible: boolean;
    keyboardHeight: number;
}

const defaultProps = {
    applyPadding: true,
};

export class KeyboardAvoidingWrapper extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public style: KeyboardAvoidingWrapperStyleSchema;

    protected keyboardWillHideSub: EmitterSubscription;
    protected keyboardWillShowSub: EmitterSubscription;

    constructor(props: Props) {
        super(props);
        this.state = {
            isKeyboardVisible: false,
            keyboardHeight: 0,
        };

        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.onKeyboardVisible);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.onKeyboardHidden);
    }

    public componentDidUpdate = (prevProps: Props, prevState: State) => {
        const { isKeyboardVisible } = this.state;
        const { onKeyboardHidden, onKeyboardVisible } = this.props;

        if (prevState.isKeyboardVisible && !isKeyboardVisible) {
            onKeyboardHidden && onKeyboardHidden();
        } else if (!prevState.isKeyboardVisible && isKeyboardVisible) {
            onKeyboardVisible && onKeyboardVisible();
        }
    };

    public componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    public onKeyboardHidden = (event: any) => {
        this.setState({ isKeyboardVisible: false, keyboardHeight: event?.endCoordinates?.height ?? 0 });
    };

    public onKeyboardVisible = (event: any) => {
        this.setState({ isKeyboardVisible: true, keyboardHeight: event?.endCoordinates?.height ?? 0 });
    };

    public render() {
        const { isKeyboardVisible, keyboardHeight } = this.state;
        const { applyPadding, children } = this.props;

        let dynamicStyle = {};
        if (applyPadding) {
            dynamicStyle = { marginBottom: isKeyboardVisible ? keyboardHeight : 0 };
        }

        return <View style={[this.style.wrapperContainer, dynamicStyle]}>{children}</View>;
    }
}

export default KeyboardAvoidingWrapper;
