import React from 'react';
import { TextStyle } from 'react-native';
import { IconNames } from '../../../styles';
import StyledComponent, { InputStyleProps } from '../../styledComponent';
import { default as FormField, Props as FormFieldProps } from '../form/formField';
import defaultStyle, { MaskableFormFieldStyleSchema } from './maskableFormField.style';

interface Props extends InputStyleProps {
    iconStyle?: TextStyle;
    isFocus?: boolean;
    label?: string;
    maskOffIconName: IconNames;
    maskOnIconName: IconNames;
    onChangeText: (text: string) => void;
    style?: Partial<MaskableFormFieldStyleSchema>;
    value: string;
}

interface State {
    icon: () => JSX.Element;
    isMasked: boolean;
}

const defaultProps = {};

export default class MaskableFormField extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'MaskableFormField';
    public style: Partial<MaskableFormFieldStyleSchema>;

    constructor(props: any) {
        super(props);
        this.state = {
            icon: this.maskOnIcon,
            isMasked: true,
        };
    }

    public render() {
        return (
            <FormField
                inputContainerStyle={this.props.inputContainerStyle}
                inputStyle={[this.props.inputStyle, this.style.inputStyle]}
                labelStyle={this.style.formFieldLabel}
                rightIcon={this.state.icon}
                rightIconContainerStyle={this.style.rightIconContainer}
                secureTextEntry={this.state.isMasked}
                style={{
                    errorMessage: this.style.errorMessage,
                    formFieldLabel: this.style.formFieldLabel,
                    warningIcon: this.style.warningIcon,
                }}
                {...this.props}
                multiline={false}
            />
        );
    }

    protected getAccessibilityLabel = (accessibilityLabel: string): string => {
        return (this.formatLabel(accessibilityLabel, this.props.label) as string[]).join('');
    };

    protected maskOffIcon = (): JSX.Element => {
        return this.getIcon(this.props.maskOffIconName, {
            accessibilityLabel: this.getAccessibilityLabel(this.labels.maskableFormfield.maskOffIcon.acessibilityLabel),
            accessibilityRole: 'button',
            onPress: this.toggleMask,
            style: [this.style.iconStyle, this.props.iconStyle],
        });
    };

    protected maskOnIcon = (): JSX.Element => {
        return this.getIcon(this.props.maskOnIconName, {
            accessibilityLabel: this.getAccessibilityLabel(this.labels.maskableFormfield.maskOnIcon.acessibilityLabel),
            accessibilityRole: 'button',
            onPress: this.toggleMask,
            style: [this.style.iconStyle, this.props.iconStyle],
        });
    };

    protected toggleMask = (): void => {
        this.setState(prevState => ({
            icon: prevState.isMasked ? this.maskOffIcon : this.maskOnIcon,
            isMasked: !prevState.isMasked,
        }));
    };
}
