import { AccountInfo, MemberContext, PrescriptionOrder } from 'atlas-services/src/models';
import { PrescriptionCartCheckout } from 'atlas-services/src/models/prescriptionCart';

export default class PlaceOrder {
    constructor(
        private cartCheckout: PrescriptionCartCheckout,
        private memberContext: MemberContext,
        private accountBalance: number,
        private pbmAccountBalances: AccountInfo[]
    ) {}

    public consolidateOrder = (): PrescriptionOrder => {
        return {
            accountBalance: this.accountBalance,
            cartCheckout: this.cartCheckout,
            memberContext: this.memberContext,
            pbmAccountBalances: this.pbmAccountBalances,
            selectedPharmacyPrescriptions: this.cartCheckout.selectedPharmacyPrescriptions,
            selectedSpecialtyPrescriptions: this.cartCheckout.selectedSpecialtyPrescriptions,
        };
    };
}
