export default class NavigationAction {
    public readonly navigationAction: string;
    public readonly navigationParams?: any;

    constructor(navigationAction: string, navigationParams?: any) {
        this.navigationAction = navigationAction;
        this.navigationParams = navigationParams || {};
    }
}
