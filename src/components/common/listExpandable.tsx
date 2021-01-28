import React from 'react';
import { AccessibilityStates, FlatList, TouchableOpacity, View } from 'react-native';
import { HorizontalRule } from '..';
import { IconNames } from '../../styles';
import StyledComponent, { StyleProps } from '../styledComponent';
import Icon from './icon';
import defaultStyle, { ListExpandableStyleSchema } from './listExpandable.style';

interface Props<T> extends StyleProps {
    data: T[];
    iconAccessibilityLabel?: string;
    iconExpanded: IconNames;
    iconMinimized: IconNames;
    keyExtractor?: (item) => string;
    renderItem: (item: T, isOpen: boolean) => JSX.Element;
    style?: Partial<ListExpandableStyleSchema>;
}

const defaultProps = {
    iconAccessibilityLabel: '',
    iconExpanded: IconNames.LIST_ITEM_EXPAND_ICON,
    iconMinimized: IconNames.LIST_ITEM_NAVIGATE_ICON,
    keyExtractor: item => item,
};

interface State {
    itemsOpen: { [key: number]: boolean };
}

export default class ListExpandable<T> extends StyledComponent<Props<T>, State> {
    public static defaultProps = defaultProps;
    public defaultStyle = defaultStyle;
    public name = 'ListExpandable';
    public style: ListExpandableStyleSchema;

    constructor(props: Readonly<Props<T>>) {
        super(props);
        this.state = { itemsOpen: {} };
    }

    public render() {
        const labels = this.labels.listExpandable;
        return (
            <View style={this.style.rootContainer}>
                <FlatList
                    extraData={this.state}
                    data={this.props.data}
                    keyExtractor={this.props.keyExtractor}
                    ItemSeparatorComponent={() => <HorizontalRule />}
                    renderItem={({ item, index }) => {
                        const isOpen = !!this.state.itemsOpen[index];
                        const collapsedOrExpanded: AccessibilityStates = isOpen ? 'expanded' : 'collapsed';
                        const expandedContainer = isOpen ? this.style.expandedContainer : {};
                        const accessibilityIconLabel = `${this.props.iconAccessibilityLabel} ${collapsedOrExpanded},`;
                        const doubleTapLabel = isOpen
                            ? labels.accessibilityLabelCollapse
                            : labels.accessibilityLabelExpand;
                        return (
                            <View style={{ ...this.style.itemRootContainer, ...expandedContainer }}>
                                <View style={this.style.itemToggleContainer}>
                                    <TouchableOpacity
                                        accessibilityLabel={`${accessibilityIconLabel} ${doubleTapLabel}`}
                                        accessibilityRole={'none'}
                                        style={this.style.itemToggleTouchable}
                                        onPress={() => this.toggleIndex(index)}
                                    >
                                        <Icon
                                            style={{ rootItem: this.style.itemToggleIcon }}
                                            name={isOpen ? this.props.iconExpanded : this.props.iconMinimized}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={this.style.itemContentContainer}>
                                    {this.props.renderItem(item, isOpen)}
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }

    protected toggleIndex(index: number) {
        const itemsOpen = {
            ...this.state.itemsOpen,
            [index]: !this.state.itemsOpen[index],
        };
        this.setState({ itemsOpen });
    }
}
