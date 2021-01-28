import React from 'react';
import { FlatList, Keyboard, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BodyCopy } from '.';
import { HorizontalRule } from '..';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import defaultStyle, { ExpandableDropdownStyleSchema } from './expandableDropdown.style';

export interface DropDownItem {
    label: string;
    value: any;
}

interface Props extends StyleProps {
    accessibilityLabel?: string;
    itemAccessibilityLabel?: string;
    items: DropDownItem[];
    onPressItem: (value: any) => void;
    placeholder?: string;
    rightIconName?: IconNames;
    scrollbarInset?: { right: number };
    selectedLabel: string;
    style?: Partial<ExpandableDropdownStyleSchema>;
}

interface State {
    isExpanded: boolean;
}

const defaultProps = {
    rightIconName: IconNames.DROPDOWN_ICON,
    scrollbarInset: { right: 5 },
};

export default class ExpandableDropdown extends StyledComponent<Props, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ExpandableDropdown';
    public style: ExpandableDropdownStyleSchema;

    constructor(props) {
        super(props);

        this.state = { isExpanded: false };
    }

    public ExpandedDropDown = () => {
        return (
            <ScrollView
                bounces={false}
                contentContainerStyle={this.style.listItemContainer}
                nestedScrollEnabled
                scrollIndicatorInsets={this.props.scrollbarInset}
                style={[this.style.listRootContainer, this.style.expandedStyles]}
            >
                <FlatList
                    data={this.props.items.slice(1)}
                    keyExtractor={(item: DropDownItem) => item.value}
                    ItemSeparatorComponent={this.ItemSeparator}
                    renderItem={this.Item}
                />
            </ScrollView>
        );
    };

    public Item = ({ item }: { item: DropDownItem }): JSX.Element => {
        const isSelected: boolean = item.label === this.props.selectedLabel;
        return (
            <TouchableOpacity
                accessibilityLabel={this.getItemAccessibilityLabel(item.label)}
                accessibilityRole="button"
                accessibilityStates={isSelected ? ['selected'] : null}
                onPress={() => this.onPressItem(item)}
                style={isSelected && this.style.selectedItem}
            >
                <BodyCopy style={{ bodyCopy: this.style.item }}>{item.label}</BodyCopy>
            </TouchableOpacity>
        );
    };

    public ItemSeparator = () => {
        return <HorizontalRule style={{ horizontalRule: this.style.horizontalRule }} />;
    };

    public render() {
        return (
            <>
                <this.SelectedField />
                {this.state.isExpanded && <this.ExpandedDropDown />}
            </>
        );
    }

    public SelectedField = () => {
        return (
            <TouchableOpacity
                accessibilityLabel={this.getFieldAccessibilityLabel()}
                activeOpacity={1}
                onPress={this.toggleModal}
                style={[this.style.textField, this.state.isExpanded && this.style.textFieldStyleHasFocus]}
            >
                <BodyCopy style={{ bodyCopy: this.style.text }}>
                    {this.props.selectedLabel || this.props.placeholder}
                </BodyCopy>
                {this.getIcon(this.props.rightIconName, { style: this.style.iconRight })}
            </TouchableOpacity>
        );
    };

    protected getFieldAccessibilityLabel = (): string => {
        return (
            this.props.accessibilityLabel ||
            (this.formatLabel(
                this.labels.dropDown.selectedField.accessibilityLabel,
                this.props.selectedLabel || this.props.placeholder
            ) as string[]).join()
        );
    };

    protected getItemAccessibilityLabel = (label: string): string => {
        const itemLabel = this.labels.dropDown.item;
        return (
            this.props.itemAccessibilityLabel ||
            (this.formatLabel(itemLabel.accessibilityLabel, label) as string[]).join()
        );
    };

    protected onPressItem = (item: DropDownItem) => {
        this.toggleModal();
        this.props.onPressItem(item);
    };

    protected toggleModal = () => {
        this.setState(prevState => ({ isExpanded: !prevState.isExpanded }), Keyboard.dismiss);
    };
}
