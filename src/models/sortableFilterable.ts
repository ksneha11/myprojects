/*
 * since Sorters/Filters don't share a common ancestor, it's not particularly easy to make a clean component
 * since the Sort/Filter components are identical, don't want to have to duplicate, or put in complex | logic to  handle multiple models
 * using one common interface
 * also - the sorters/filters are complex and need to be at least documented if not reworked
 *
 * TODO: work on name for this abstraction
 */
export interface SortableFilterable<T> {
    children?: {
        // TODO: WHY IS CHILDREN NOT JUS THE ACTUAL OBJECTS, like Node.children is normally a list of nodes directly
        // we currently literally have to call filter.children.filters, WHICH IS COMPLETELY UNINTUITIVE
        // PLUS, THEYRE TYPED AS ANY??????? SO YOU IMMEDIATELY WANT TO JUST START LOOPING OVER THE FILTERS and it blows up
        // THIS NEEDS TO BE REWORKED
        isSingle?: boolean; // TODO: WHAT EVEN IS THIS?????????, name is not intuitive at all
        sortableFilterables: SortableFilterable<T>;
    };
    label: string;
    labelReset?: string; // TODO: WHAT EVEN IS THIS????????, name is not intuitive at all
    value?: string;
}
