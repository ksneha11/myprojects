import { IdCard } from 'atlas-services/src/models';

export const getPbmPhoneNumber = (idCards: IdCard[]): string => {
    /*
     * apparently every id card has the same non user-specific id card info
     * it used to just pull this info from the first one
     * that seemed somewhat fragile to me in that we relied too much on the agg layer making sure it was populated in all of them
     * this goes through and finds the first one that actually has that value set and returns it
     */
    const hasPbmPhoneNumber = idCards.find(
        idCard => idCard.idCardInformation && idCard.idCardInformation.pbmPhoneNumber
    );
    return hasPbmPhoneNumber ? hasPbmPhoneNumber.idCardInformation.pbmPhoneNumber : null;
};
