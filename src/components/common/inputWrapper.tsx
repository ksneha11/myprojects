import React from 'react';
import { Platform, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import { _omit } from '../../utils';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { InputWrapperStyleSchema } from './inputWrapper.style';

interface Props extends Omit<StyleProps, 'style'>, Omit<Partial<KeyboardAwareScrollViewProps>, 'style'> {
    children: React.ReactNode;
    contentContainerStyle?: ViewStyle;
    style?: Partial<InputWrapperStyleSchema>;
}

const defaultProps = {};

export default class InputWrapper extends StyledComponent<Props> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'InputWrapper';
    public style: InputWrapperStyleSchema;

    public render() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={this.props.contentContainerStyle}
                enableAutomaticScroll={Platform.OS === 'ios'}
                enableOnAndroid={true}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                style={this.props.style?.rootContainer || this.style.rootContainer}
                {..._omit(this.props, 'style')}
            >
                {this.props.children}
            </KeyboardAwareScrollView>
        );
    }
}
