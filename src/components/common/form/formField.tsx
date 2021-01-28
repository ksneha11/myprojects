import React, { useState } from 'react';
import { NativeSyntheticEvent, Platform, TextInputFocusEventData, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import { InlineAlert } from '../..';
import { _omit } from '../../../utils';
import StyledComponent, { InputStyleProps } from '../../styledComponent';
import AutoCompleteSuggestions, { AutoCompleteData } from '../autoCompleteSuggestions';
import defaultStyle, { FormFieldStyleSchema } from './formField.style';

export interface Props extends InputStyleProps {
    autoCompleteItems: AutoCompleteData[];
    isFocus?: boolean;
    onPressAutoCompleteItem: (item: object) => void;
    style?: Partial<FormFieldStyleSchema>;
}

interface State {
    isFocus: boolean;
    showAutoCompleteItems: boolean;
}

const defaultProps: Partial<Props> = {
    accessibilityHint: '',
    accessibilityLabel: '',
    autoCompleteItems: [],
    errorMessage: '',
    importantForAccessibility: 'no',
    label: '',
    multiline: false,
    onPressAutoCompleteItem: (item: object) => { },
    textAlignVertical: 'center',
};

export default class FormField extends StyledComponent<Props, State> {
    public static defaultProps: Partial<Props> = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'FormField';
    public style: FormFieldStyleSchema;
    private inputRef: Input;

    constructor(props: any) {
        super(props);
        this.state = {
            isFocus: false,
            showAutoCompleteItems: true,
        };
    }

    public AndroidFormField = () => {
        // Required for talk-back to be able to read form fields
        return (
            <TouchableOpacity
                accessibilityLabel={(this.props.label || ' ') + ', ' + this.labels.formField.accessibilityLabel}
                accessibilityRole="text"
                activeOpacity={1}
                onPress={() => {
                    // focus input child
                    // on focus of touchable parent
                    this.inputRef && this.inputRef.focus();
                }}
            >
                <this.InputField {...{ importantForAccessibility: this.props.importantForAccessibility }} />
            </TouchableOpacity>
        );
    };

    public componentDidUpdate(prevProps) {
        const { isFocus } = this.props;
        if (prevProps.isFocus !== isFocus) {
            this.setState({
                isFocus,
            });
            if (isFocus) {
                this.inputRef.focus();
            }
        }
    }

    public InputField = (inputProps: InputStyleProps = {}) => {
        const hasError = this.props.errorMessage.length > 0;
        return (
            <Input
                {..._omit(this.props, 'style', 'className')}
                accessibilityHint={this.props.accessibilityHint}
                accessibilityLabel={this.getAccessibilityLabel() as string}
                autoFocus={this.state.isFocus}
                errorMessage={null} // override error message prop because we're going to use Inline Error component instead
                importantForAccessibility={inputProps.importantForAccessibility}
                inputContainerStyle={[
                    this.style.inputContainerStyle,
                    this.props.inputContainerStyle,
                    hasError && this.style.inputContainerStyleHasError,
                    this.state.isFocus && this.style.inputStyleHasFocus,
                ]}
                inputStyle={[this.style.inputStyle, this.props.inputStyle]}
                labelStyle={[this.style.formFieldLabel, this.props.labelStyle]}
                onChangeText={this.onChangeText}
                onFocus={this.onFocusInput}
                onBlur={this.onBlurInput}
                textAlignVertical={this.props.textAlignVertical}
                ref={ref => {
                    ref && (this.inputRef = ref);
                }}
            />
        );
    };

    public iOSFormField = () => {
        return <this.InputField />;
    };

    public render() {
        const hasError = this.props.errorMessage.length > 0;
        const hasAutoComplete = this.props.autoCompleteItems.length > 0;

        return (
            <View style={this.style.rootContainer}>
                {Platform.OS === 'android' ? <this.AndroidFormField /> : <this.iOSFormField />}
                {hasError && (
                    <View style={this.style.errorMessageContainer}>
                        <InlineAlert style={{ errorMessage: this.style.errorMessage, warningIcon: this.style.warningIcon }} useMiniIcon>
                            {this.props.errorMessage}
                        </InlineAlert>
                    </View>
                )}
                {/* TODO: Autocomplete functionality should maybe be a separate wrapper component to FormField, rather than putting this on every instance */}
                {hasAutoComplete && (
                    <AutoCompleteSuggestions
                        isVisible={this.state.showAutoCompleteItems}
                        items={this.props.autoCompleteItems}
                        onPressItem={this.onPressAutoCompleteItem}
                        style={{ rootContainer: this.style.autoCompleteRootContainer }}
                    />
                )}
            </View>
        );
    }

    protected getAccessibilityLabel = () => {
        if (this.props.placeholder) {
            return '';
        }
        return this.props.accessibilityLabel || this.props.label;
    };

    protected onBlurInput = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        this.setState({ isFocus: false });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };

    protected onChangeText = (item: string) => {
        this.props.onChangeText(item);
        this.setState({ showAutoCompleteItems: true });
    };

    protected onFocusInput = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        this.setState({ isFocus: true });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };

    protected onPressAutoCompleteItem = (item: AutoCompleteData) => {
        this.props.onChangeText(item.display);
        this.props.onPressAutoCompleteItem(item.data);
        this.setState({ showAutoCompleteItems: false });
    };
}
