export type Condition<T> = (item: T) => boolean;

export enum FilterOperator {
    AND = 'AND',
    OR = 'OR',
}

export interface BaseFilter {
    description?: string;
    label: string;
    labelReset?: string;
    value?: string;
}

export interface FilterMethod<T> extends BaseFilter {
    children?: any; // TODO: WHY IS THIS NOT TYPED???????? WHY IS THIS ANY??????????????????
    method: Condition<T>;
}

export interface FilterGroup<T> extends BaseFilter {
    children: {
        filters: Array<Filter<T>>;
        isSingle?: boolean;
        operator?: FilterOperator;
    };
    method?: any;
}

export type Filter<T> = FilterMethod<T> | FilterGroup<T>;
