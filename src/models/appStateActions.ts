/*
 * TODO:
 * i think this is fine, but all the individual feature actions aren't quite right
 * i wanted to make one interface for AppStateActions, and anothe for feature actions
 *
 * interface AppStateActions {
 *     [featureName: string]: FeatureActions
 * }
 *
 * interface FeatureActions {
 *     [actionName]: (...params: any[]) => void;
 * }
 *
 * i ran into a situation where this didn't work how I was wanting it to
 * i'll continue to mess with it
 *
 * plus i'm not sure how much the actions will change across features - it might be nice to not have a variable feature actions?
 * want/need to discuss this in more depth
 *
 * this will be usable for now regardless
 * it won't be a super heavy refactor if it has to change
 */
export default interface AppStateActions {
    [featureName: string]: {
        // TODO: consolidate this so there's no void | Promise<void>
        [actionName: string]: (...params: any[]) => void | Promise<void>;
    };
}
