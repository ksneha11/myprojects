import { AccessibilityInfo, findNodeHandle, Platform } from 'react-native';

export function setAccessibilityFocus(
    componentOrHandle: null | number | React.Component<any, any> | React.ComponentClass<any>,
    timeout: number = 500
) {
    setTimeout(() => {
        try {
            const reactTag: null | number = findNodeHandle(componentOrHandle);
            if (Platform.OS === 'ios') {
                AccessibilityInfo.setAccessibilityFocus(reactTag);
            }
        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log('error in setting focus', error);
        }
    }, timeout);
}
