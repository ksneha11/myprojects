import { AppState, AppStateActions } from '../models';

export default interface AccessibilityAppStateActions extends AppStateActions {
    accessibility: {
        setScreenReaderEnabled: (isScreenReaderEnabled: boolean) => void;
    };
}

export class AccessibilityReducers {
    public static setScreenReaderEnabled = (
        previousState: AppState,
        isScreenReaderEnabled: boolean
    ): Partial<AppState> => {
        previousState.isScreenReaderEnabled = isScreenReaderEnabled;
        return previousState;
    };
}
