import React from 'react';
import { BaseFilter, Condition, Filter, FilterGroup, FilterOperator } from '../models';
import { IconNames } from '../styles';
import { _get, removeFromArray } from '../utils';
import { TextLink } from './common';
import ListModal, { ListModalItem } from './common/listModal';
import StyledComponent, { StyleProps } from './styledComponent';

const DEFAULT_FILTER_SET_LABEL = 'All Filters';
const DEFAULT_FILTER_OPERATOR: FilterOperator = FilterOperator.OR;

export interface Props<T> extends StyleProps {
    children?: string | ((filter: Filters<T>) => JSX.Element);
    filterGroup: FilterGroup<T>;
    // TODO:
    // I don't understand why onChange and selectedValues don't use the Filter<T> object directly
    // TODO: look at this and refactor, filters and sorters can be consolidated into one type as well
    onChange: (selectedValues: string[]) => void;
    selectedValues: string[];
}

const defaultProps = {};

export interface State {
    isModalVisible?: boolean;
}

class Filters<T> extends StyledComponent<Props<T>, State> {
    public static apply: <T>(
        items: T[],
        filters: FilterGroup<T>,
        selectedFilterValues: string[],
        ...conditions: Array<Condition<T>>
    ) => T[];
    public static create: <T>(options: FiltersCreateOptions<T>) => FilterGroup<T>;
    public static defaultProps = defaultProps;
    public static getSelected: <T>(
        filterGroup: FilterGroup<T>,
        selectedValues: string[],
        selectedFilters?: BaseFilter[]
    ) => BaseFilter[];
    public name = 'FilterModal';

    constructor(props: Props<T>) {
        super(props);
        this.state = { isModalVisible: false };
    }

    public render() {
        return (
            <>
                {this.toggleLink()}
                <ListModal
                    footerText={this.footerText}
                    headerRightText={() => this.labels.filters.headerRightText}
                    initialItem={this.toListModalItemSet()}
                    isVisible={this.state.isModalVisible}
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
        currentItem.labelFooter || `${this.labels.filters.reset} ${currentItem.label}`;

    protected onPressFooter = (currentItem: ListModalItem) => {
        if (currentItem.label === this.props.filterGroup.label) {
            this.props.onChange([]);
            return;
        }
        const allChildValues = (currentItem.children || []).map((o: ListModalItem) => o.value);
        const selectedValues = removeFromArray(this.props.selectedValues, ...allChildValues);
        this.props.onChange(selectedValues);
    };

    protected toggleLink = () => {
        const children = this.props.children || this.labels.filters.filters;
        if (typeof children === 'string') {
            return <TextLink onPress={() => this.toggleModalVisible(true)}>{children}</TextLink>;
        } else {
            return (children as (filter: Filters<T>) => JSX.Element)(this);
        }
    };

    protected toListModalItemSet = (): ListModalItem => {
        const { selectedValues, onChange } = this.props;
        const toListModalItem = (filter: Filter<T>, parentFilter?: FilterGroup<T>): ListModalItem => {
            if (filter) {
                const { description, label, value } = filter;
                const listItem = {
                    children: null,
                    description,
                    label,
                    onPress: () => onChange(this.updateSelectedValues(filter, parentFilter)),
                    rightIcon: null,
                    textMiddle: '',
                    value,
                };
                const isSelected = selectedValues.includes(value);
                if (isSelected) {
                    listItem.rightIcon = IconNames.LIST_ITEM_SELECTED_ICON;
                }
                if (filter.children) {
                    const filterGroup = filter as FilterGroup<T>;
                    listItem.rightIcon = IconNames.LIST_ITEM_NAVIGATE_ICON;
                    listItem.children = filterGroup.children.filters.map(filterChild =>
                        toListModalItem(filterChild, filterGroup)
                    );
                    listItem.textMiddle = filterGroup.children.filters
                        .filter(filterChild => selectedValues.includes(filterChild.value))
                        .map(filterChild => filterChild.label)
                        .join(', ');
                }

                return listItem;
            }
            return {} as ListModalItem;
        };
        return toListModalItem(this.props.filterGroup);
    };

    protected updateSelectedValues(filter: Filter<T>, parent?: FilterGroup<T>) {
        const { selectedValues } = this.props;

        // selected - so unselect it
        if (selectedValues.includes(filter.value)) {
            return selectedValues.filter(val => val !== filter.value);
        }

        // not selected - so unselect siblings then select
        if (parent && parent.children.isSingle) {
            const siblingValues = parent.children.filters.map(childFilter => childFilter.value);
            return [...selectedValues.filter(val => !siblingValues.includes(val)), filter.value];
        }

        // not selected - no single siblings selected to remove
        return [...selectedValues, filter.value];
    }
}

/**
 * Returns the provided items filtered.
 */
Filters.apply = function apply<T>(
    items: T[],
    filters: FilterGroup<T>,
    selectedFilterValues: string[], // DONT KNOW WHY THIS DOESNT JUST PASS THE FILTERS DIRECTLY ~ should reuse the same interfaces so we don't have to do all this weird mapping
    ...conditions: Array<Condition<T>>
): T[] {
    const methods: Array<Condition<T>> = conditions || [];
    function setFilterMethods(filter: Filter<T>): Array<Condition<T>> {
        if (filter) {
            const { children } = filter;

            if (children) {
                const { operator } = children;
                const methodGroup: Array<Condition<T>> = [];
                children.filters.forEach(childFilter => {
                    if (childFilter.children) {
                        setFilterMethods(childFilter);
                    } else if (selectedFilterValues.includes(childFilter.value)) {
                        methodGroup.push(childFilter.method);
                    }
                });
                if (methodGroup.length) {
                    if (operator === FilterOperator.OR) {
                        methods.push((item: T) => methodGroup.some(method => method(item)));
                    }
                    if (operator === FilterOperator.AND) {
                        methods.push((item: T) => methodGroup.every(method => method(item)));
                    }
                }
            } else if (selectedFilterValues.includes(filter.value)) {
                methods.push(filter.method);
            }
            return methods;
        }
        return [];
    }
    setFilterMethods(filters);
    return items.filter(item => methods.every(method => method(item)));
};

export interface FiltersCreateOptions<T> {
    filters: Array<Filter<T>>;
    isSingle?: boolean;
    label?: string;
    labelReset?: string;
    operator?: FilterOperator;
}

/**
 * Sets defaults for filters.
 */
Filters.create = function createFilterGroup<T>({
    filters,
    label = DEFAULT_FILTER_SET_LABEL,
    operator = DEFAULT_FILTER_OPERATOR,
    isSingle = false,
    labelReset,
}: FiltersCreateOptions<T>): FilterGroup<T> {
    function tidy(cleanedUpFilters: Array<Filter<T>>, filter: Filter<T>) {
        const cleanFilter = { ...filter, value: filter.value || filter.label };
        if (cleanFilter.children) {
            cleanFilter.children = {
                filters: cleanFilter.children.filters.reduce(tidy, []),
                isSingle: !!cleanFilter.children.isSingle,
                operator: cleanFilter.children.operator || 'AND',
            };
        }
        return cleanedUpFilters.concat([cleanFilter]);
    }
    return {
        children: {
            filters: filters.reduce(tidy, []),
            isSingle,
            operator,
        },
        label,
        labelReset: labelReset || label,
        method: false,
        value: label,
    };
};

/**
 * Returns a simple flat list of all selected filter labels and values
 */
Filters.getSelected = function getSelected<T>(
    filterGroup: FilterGroup<T>,
    selectedValues: string[],
    selectedFilters: BaseFilter[] = []
): BaseFilter[] {
    return filterGroup.children.filters.reduce((selected, filter) => {
        const { label, value, children } = filter;
        if (selectedValues.includes(value)) {
            selected.push({ label, value });
        }
        if (children) {
            selected = Filters.getSelected<T>(filter as FilterGroup<T>, selectedValues, selected);
        }
        return selected;
    }, selectedFilters);
};

export default Filters;
