import { MailOrderInfo, RetailOrderRequest } from 'atlas-services/src/models';

export default interface SavingOpportunityInfo {
    mailOrder: MailOrderInfo;
    retailOrder: RetailOrderRequest;
}
