import { GeolocationPosition } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface LocationAppStateActions extends AppStateActions {
    location: {
        setCurrentLocation: (currentLocation: GeolocationPosition) => void;
        setLocationRequestStatus: (status: boolean) => void;
    };
}

export class LocationReducers {
    public static setCurrentLocation = (previousState: AppState, location: GeolocationPosition): Partial<AppState> => {
        return { currentPosition: location };
    };

    public static setLocationRequestStatus = (previousState: AppState, status: boolean): Partial<AppState> => {
        return { isCurrentLocationRequested: status };
    };
}
