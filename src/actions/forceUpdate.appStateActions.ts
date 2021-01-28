import { AppStateActions } from '../models';

export default interface ForceUpdateAppStateActions extends AppStateActions {
    forceUpdate: {
        setForceUpdate: () => void;
    };
}
