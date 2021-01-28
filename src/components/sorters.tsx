import moment from 'moment';
import React from 'react';
import { BaseSorter, Comparison, Sorter, SortGroup, SortMethod } from '../models/sorts';
import { IconNames } from '../styles';
import { _get, removeFromArray } from '../utils';
import { TextLink } from './common';
import ListModal, { ListModalItem } from './common/listModal';
import StyledComponent, { StyleProps } from './styledComponent';

const DEFAULT_SORTER_SET_LABEL = 'Sort By';

export interface Props<T> extends StyleProps {
    children: string | ((filter: Sorters<T>) => JSX.Element);
    onChange: (selectedValues: string[]) => void;
    selectedValues: string[];
    sortGroup: SortGroup<T>;
}

const defaultProps = {
    children: ({ toggleModalVisible }: Sorters<any>) => (
        <TextLink onPress={() => toggleModalVisible(true)}>Sort</TextLink>
    ),
};

interface State {
    isModalVisible: boolean;
}

class Sorters<T> extends StyledComponent<Props<T>, State> {
    public static apply: <T>(items: T[], sorters: SortGroup<T>, selectedSortValues: string[]) => T[];
    public static create: <T>(options: SortersCreateOptions<T>) => SortGroup<T>;
    public static defaultProps = defaultProps;
    public static getSelected: <T>(
        sortGroup: SortGroup<T>,
        selectedValues: string[],
        selectedSorts: BaseSorter[]
    ) => BaseSorter[];
    public static sortByDate: <T>(item: T[], property: string) => T[];
    public name = 'SortModal';

    constructor(props: Props<T>) {
        super(props);
        this.state = { isModalVisible: false };
    }

    public render() {
        return (
            <>
                {this.toggleLink()}
                <ListModal
                    isVisible={this.state.isModalVisible}
                    headerRightText={() => this.labels.sorters.headerRightText}
                    initialItem={this.toListModalItemSet()}
                    onClose={() => this.toggleModalVisible(false)}
                    onPressFooter={this.onPressFooter}
                />
            </>
        );
    }

    public toggleModalVisible = (isModalVisible: boolean) => {
        this.setState({ isModalVisible });
    };

    protected footerText = (currentItem: ListModalItem) =>
        currentItem.labelFooter || `${this.labels.sorters.footerText} ${currentItem.label}`;

    protected onPressFooter = (currentItem: ListModalItem) => {
        if (currentItem.label === this.props.sortGroup.label) {
            this.props.onChange([]);
            return;
        }
        const allChildValues = (currentItem.children || []).map((o: ListModalItem) => o.value);
        const selectedValues = removeFromArray(this.props.selectedValues, ...allChildValues);
        this.props.onChange(selectedValues);
    };

    protected toggleLink = () => {
        const children = this.props.children || this.labels.sorters.toggleLink;
        if (typeof children === 'string') {
            return <TextLink onPress={() => this.toggleModalVisible(true)}>{children}</TextLink>;
        }
        return children(this);
    };

    protected toListModalItemSet = (): ListModalItem => {
        const { selectedValues, onChange } = this.props;
        const toListModalItem = (sort: Sorter<T>, parentSort?: SortGroup<T>): ListModalItem => {
            const { label, labelReset, value } = sort;
            const listItem = {
                children: null,
                label,
                labelFooter: labelReset || `${this.labels.sorters.listModalItemLabelFooter} ${label}`,
                onPress: () => onChange(this.updateSelectedValues(sort, parentSort)),
                rightIcon: null,
                textMiddle: '',
                value,
            } as ListModalItem;

            const isSelected = selectedValues.includes(value);
            if (isSelected) {
                listItem.rightIcon = IconNames.LIST_ITEM_SELECTED_ICON;
            }

            if (sort.children) {
                const sortGroup = sort as SortGroup<T>;
                listItem.rightIcon = IconNames.LIST_ITEM_NAVIGATE_ICON;
                listItem.children = sortGroup.children.sorters.map(sortChild => toListModalItem(sortChild, sortGroup));
                listItem.textMiddle = sortGroup.children.sorters
                    .filter(sortChild => selectedValues.includes(sortChild.value))
                    .map(sortChild => sortChild.label)
                    .join(', ');
            }

            return listItem;
        };
        return toListModalItem(this.props.sortGroup);
    };

    protected updateSelectedValues(sort: Sorter<T>, parent?: SortGroup<T>) {
        const { selectedValues } = this.props;

        // selected - so unselect it
        if (selectedValues.includes(sort.value)) {
            return selectedValues.filter(val => val !== sort.value);
        }

        // not selected - so unselect siblings then select
        if (parent && parent.children.isSingle) {
            const siblingValues = parent.children.sorters.map(childSort => childSort.value);
            return [...selectedValues.filter(val => !siblingValues.includes(val)), sort.value];
        }

        // not selected - no single siblings selected to remove
        return [...selectedValues, sort.value];
    }
}

/**
 * Returns the provided items sorted.
 */
Sorters.apply = function apply<T>(items: T[], sorters: SortGroup<T>, selectedSortValues: string[]): T[] {
    const methods: Array<Comparison<T>> = [];
    function setSortMethods(sort: Sorter<T>): Array<Comparison<T>> {
        const { children } = sort;
        if (children) {
            children.sorters.forEach(childSort => {
                if (childSort.children) {
                    setSortMethods(childSort);
                } else if (selectedSortValues.includes(childSort.value)) {
                    methods.push(childSort.method);
                }
            });
        } else if (selectedSortValues.includes(sort.value)) {
            methods.push(sort.method);
        }
        return methods;
    }
    setSortMethods(sorters);
    let itemsSorted = [...items];
    methods.forEach((method: Comparison<T>) => {
        itemsSorted = itemsSorted.sort(method);
    });
    return itemsSorted;
};

export interface SortersCreateOptions<T> {
    isSingle?: boolean;
    label?: string;
    labelReset?: string;
    sorters: Array<Sorter<T>>;
}

/**
 * Sets defaults for sorters.
 */
Sorters.create = function createSortGroup<T>({
    sorters,
    label = DEFAULT_SORTER_SET_LABEL,
    isSingle = false,
    labelReset,
}: SortersCreateOptions<T>): SortGroup<T> {
    function tidy(cleanedUpSorts: Array<Sorter<T>>, sort: Sorter<T>) {
        const cleanSort = { ...sort, value: sort.value || sort.label };
        if (cleanSort.children) {
            cleanSort.children = {
                isSingle: !!cleanSort.children.isSingle,
                sorters: cleanSort.children.sorters.reduce(tidy, []),
            };
        }
        return cleanedUpSorts.concat([cleanSort]);
    }
    const baseSortGroup = {
        children: {
            isSingle,
            sorters: sorters.reduce(tidy, []),
        },
        label,
        labelReset: labelReset || label,
        method: false,
        value: label,
    };
    return baseSortGroup;
};

/**
 * Returns a simple flat list of all selected sort labels and values
 */
Sorters.getSelected = function getSelected<T>(
    sortGroup: SortGroup<T>,
    selectedValues: string[],
    selectedSorts: BaseSorter[] = []
): BaseSorter[] {
    return sortGroup.children.sorters.reduce((selected, sort) => {
        const { label, value, children } = sort;
        if (selectedValues.includes(value)) {
            selected.push({ label, value });
        }
        if (children) {
            selected = Sorters.getSelected<T>(sort as SortGroup<T>, selectedValues, selected);
        }
        return selected;
    }, selectedSorts);
};

/**
 * Returns sorted list based on date string
 */
Sorters.sortByDate = function sortByDate<T>(items: T[], property: string): T[] {
    return items.sort((itemOne, itemTwo) => {
        return moment(itemOne[property]).valueOf() - moment(itemTwo[property]).valueOf();
    });
};

export default Sorters;
