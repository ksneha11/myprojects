import { IdCard } from 'atlas-services/src/models';
import { AppState, AppStateActions } from '../models';

export default interface IdCardAppStateActions extends AppStateActions {
    idCard: {
        setIdCards: (idCards: IdCard[]) => void;
    };
}

export class IdCardReducers {
    public static setIdCards = (previousState: AppState, idCards: IdCard[]): Partial<AppState> => {
        return { ...previousState, idCards };
    };
}
