import { NavigationLeafRoute, NavigationState } from 'react-navigation';

// Goes deeper in the navigator until there are no child routes, meaning you're at the latest navigator.
// Then it gets the current navigator
export const getActiveRoute = (navState: Partial<NavigationState>): NavigationLeafRoute => {
    if (!navState.routes) {
        return navState as NavigationLeafRoute;
    }
    return getActiveRoute(navState.routes[navState.index]);
};
