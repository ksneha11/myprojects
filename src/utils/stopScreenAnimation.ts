// This util should be used if you want no animation if you're coming from a specific screen.
// Something like this can be modified in the future if you want to stop to a screen, or from A->B specifically
export const stopScreenAnimation = (props, screenToStopFrom) => {
    const routesLength = props.scenes.length;
    // the -2 is because the screen you're coming from will always be the second to last screen in the array (-1)
    // and -1 more because arrays are index'd 0, and .length does not account for that
    if (routesLength - 2 >= 0 && props.scenes[routesLength - 2].route.routeName === screenToStopFrom) {
        return {
            screenInterpolator: () => {},
        };
    }
};
