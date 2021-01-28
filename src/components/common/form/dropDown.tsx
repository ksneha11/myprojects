import React from 'react';
import { AccessibilityStates, Picker, Platform, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { P } from '../..';
import { IconNames } from '../../../styles';
import StyledComponent, { StyleProps } from '../../styledComponent';
import Icon from '../icon';
import defaultStyle, { DropDownStyleSchema } from './dropDown.style';
import DropDownModal from './dropDownModal';

const isAndroid = Platform.OS === 'android';

export interface DropDownItem {
    accessibilityLabel?: string | Children;
    label: string;
    value: string | number;
}

interface Props extends StyleProps {
    accessibilityLabel?: string;
    androidComponent?: JSX.Element;
    displayValue?: string;
    hasIconSeparator?: boolean;
    height?: number | string;
    isDisabled?: boolean;
    items: DropDownItem[];
    onChange: (value: any) => void;
    onClose?: (value: any) => void;
    placeholder?: string;
    rightIconName?: IconNames;
    style?: Partial<DropDownStyleSchema>;
    title?: string;
    value?: string | number;
}

const defaultProps: Partial<Props> = {
    hasIconSeparator: false,
    height: '40%',
    isDisabled: false,
    items: [],
    onClose: value => {},
    rightIconName: IconNames.DROPDOWN_ICON,
    title: 'Select Option',
};

interface State {
    isModalVisible: boolean;
}

export default class DropDown extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'DropDown';
    public style: DropDownStyleSchema;

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
    }

    public AndroidDropDown = () => {
        return this.props.androidComponent ? (
            this.props.androidComponent
        ) : (
            <View style={this.style.pickerAndroid}>{this.picker()}</View>
        );
    };

    public getDropdownAccessbilityLabel = () => {
        const label = this.props.title;

        return this.props.accessibilityLabel || label;
    };

    public getDropdownAccessbilityStates = () => {
        const states: AccessibilityStates[] = [];

        if (this.props.isDisabled) {
            states.push('disabled');
        } else {
            if (this.state.isModalVisible) {
                states.push('expanded');
            } else {
                states.push('collapsed');
            }
        }

        return states;
    };

    public IOSDropDown = () => {
        return (
            <>
                <TouchableWithoutFeedback
                    accessibilityRole="combobox"
                    accessibilityStates={this.getDropdownAccessbilityStates()}
                    accessibilityLabel={this.getDropdownAccessbilityLabel()}
                    disabled={this.props.isDisabled}
                    onPress={this.openModal}
                >
                    <View accessible={false} style={this.style.iosDropDownContainer}>
                        <P style={{ paragraph: this.style.dropDownText }}>
                            {this.props.displayValue || this.props.value}
                        </P>
                        <View
                            style={[
                                this.style.rightIconContainer,
                                this.props.hasIconSeparator && this.style.rightIconContainerWithBorder,
                            ]}
                        >
                            <Icon
                                name={this.props.rightIconName}
                                style={{
                                    rootItem: {
                                        ...(!this.props.isDisabled
                                            ? this.style.rightIcon
                                            : this.style.rightIconDisabled),
                                    },
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <DropDownModal
                    isFixedBottom
                    isVisible={this.state.isModalVisible}
                    onClose={this.closeModal}
                    title={this.props.title}
                >
                    {this.picker()}
                </DropDownModal>
            </>
        );
    };

    public render() {
        return <>{isAndroid ? <this.AndroidDropDown /> : <this.IOSDropDown />}</>;
    }

    protected closeModal = () => {
        this.setState({ isModalVisible: false });
        this.props.onClose(this.props.value);
    };

    protected handleOpenModal = () => {
        if (this.props.isDisabled) {
            this.openModal();
        }
    };

    protected openModal = () => {
        this.setState({ isModalVisible: true });
    };

    protected picker = () => (
        <Picker
            accessible
            accessibilityRole={'combobox'}
            enabled={!this.props.isDisabled}
            mode="dialog"
            onAccessibilityTap={this.closeModal}
            onMagicTap={this.closeModal}
            onValueChange={itemValue => this.props.onChange(this.props.items.find(({ value }) => value === itemValue))}
            selectedValue={this.props.value}
            style={isAndroid ? {} : this.style.pickerIOS}
        >
            {this.props.items.map(item => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
        </Picker>
    );
}
