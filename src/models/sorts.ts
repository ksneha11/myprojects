export type Comparison<T> = (item1: T, item2: T) => -1 | 0 | 1;

export interface BaseSorter {
    default?: boolean;
    label: string;
    labelReset?: string;
    value?: string;
}

export interface SortMethod<T> extends BaseSorter {
    children?: any;
    method: Comparison<T>;
}

export interface SortGroup<T> extends BaseSorter {
    children: {
        isSingle?: boolean;
        sorters: Array<Sorter<T>>;
    };
    method?: any;
}

export type Sorter<T> = SortMethod<T> | SortGroup<T>;
